#!/usr/bin/env node
/**
 * Generate resume PDF from resume-print.html via Puppeteer.
 * Usage:
 *   node scripts/generate-resume-pdf.mjs
 *   node scripts/generate-resume-pdf.mjs --input resume-print.html --output Amy_Lee_Resume.pdf
 */
import fs from "fs";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const RESUME_HTML = "resume-print.html";
const RESUME_PDF = "Amy_Lee_Resume.pdf";

function parseArgs(argv) {
  const args = argv.slice(2);
  let html = RESUME_HTML;
  let pdf = RESUME_PDF;

  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a === "--input" || a === "-i") {
      html = args[++i];
    } else if (a === "--output" || a === "-o") {
      pdf = args[++i];
    }
  }

  return { html, pdf };
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "assets", "documents");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
};

const chromeCandidates = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

function resolveChrome() {
  for (const candidate of chromeCandidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return undefined;
}

function createStaticServer(rootDir, defaultHtml) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const relPath = urlPath === "/" ? `/${defaultHtml}` : urlPath;
      const filePath = path.normalize(path.join(rootDir, relPath));

      if (!filePath.startsWith(rootDir)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
    });

    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

async function waitForPortfolioFonts(page) {
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const families = [
      { family: "DM Sans", weight: "400" },
      { family: "DM Sans", weight: "600" },
      { family: "DM Sans", weight: "700" },
      { family: "Fraunces", weight: "600" },
      { family: "Fraunces", weight: "700" },
    ];

    await Promise.all(
      families.map(({ family, weight }) =>
        document.fonts.load(`${weight} 16px "${family}"`).catch(() => undefined),
      ),
    );

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });

  const fontsLoaded = await page.evaluate(() => {
    const check = (family, weight) => document.fonts.check(`${weight} 16px "${family}"`);
    return {
      dmSans400: check("DM Sans", "400"),
      dmSans600: check("DM Sans", "600"),
      dmSans700: check("DM Sans", "700"),
      fraunces600: check("Fraunces", "600"),
      fraunces700: check("Fraunces", "700"),
    };
  });

  const missing = Object.entries(fontsLoaded)
    .filter(([, loaded]) => !loaded)
    .map(([name]) => name);

  if (missing.length) {
    console.warn("Warning: some portfolio fonts may not have loaded:", missing.join(", "));
  } else {
    console.log("Portfolio fonts loaded: DM Sans + Fraunces");
  }
}

async function generateOne({ html, pdf }) {
  const htmlPath = path.join(root, html);
  const outPath = path.join(outDir, pdf);

  if (!fs.existsSync(htmlPath)) {
    console.error("Missing", html, "at", htmlPath);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });

  const { server, baseUrl } = await createStaticServer(root, html);

  const executablePath = resolveChrome();
  const launchOptions = {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  };
  if (executablePath) {
    launchOptions.executablePath = executablePath;
    console.log("Using browser:", executablePath);
  } else {
    console.log("Using Puppeteer bundled Chromium");
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  try {
    console.log(`Rendering ${html} → ${pdf}`);
    await page.goto(`${baseUrl}/${html}`, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    await waitForPortfolioFonts(page);
    await page.emulateMediaType("print");

    await page.pdf({
      path: outPath,
      format: "Letter",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
  } finally {
    await browser.close();
    server.close();
  }

  const stat = fs.statSync(outPath);
  console.log("Wrote", outPath);
  console.log("Size:", Math.round(stat.size / 1024), "KB");
}

async function main() {
  let config;
  try {
    config = parseArgs(process.argv);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  await generateOne({
    html: config.html,
    pdf: config.pdf,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
