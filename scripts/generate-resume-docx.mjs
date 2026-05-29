#!/usr/bin/env node
/**
 * Generate resume DOCX from resume-print.html.
 * Usage:
 *   node scripts/generate-resume-docx.mjs
 * Requires: npm install (docx, cheerio)
 *
 * Font mapping (web → Word; no custom embed):
 *   Fraunces (--print-font-heading) → Georgia
 *   DM Sans (--print-font-body)       → Calibri
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  ExternalHyperlink,
} from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "assets", "documents");

const RESUME_HTML = "resume-print.html";
const RESUME_DOCX = "Amy_Lee_Resume.docx";

function parseArgs(argv) {
  const args = argv.slice(2);
  let html = RESUME_HTML;
  let docx = RESUME_DOCX;

  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a === "--input" || a === "-i") {
      html = args[++i];
    } else if (a === "--output" || a === "-o") {
      docx = args[++i];
    }
  }

  return { html, docx };
}

const ACCENT = "C42D8A";
const FONT_BODY = "Calibri";
const FONT_HEADING = "Georgia";

const SP_AFTER_TIGHT = { after: 60 };
const SP_SECTION = { before: 280, after: 80 };

function norm(text) {
  return text.replace(/\s+/g, " ").trim();
}

function collectTextRuns($, el, defaults = {}) {
  const runs = [];
  $(el).contents().each((_, node) => {
    if (node.type === "text") {
      const t = String(node.data || "");
      if (t) runs.push(new TextRun({ text: t, ...defaults }));
    } else if (node.type === "tag") {
      const $node = $(node);
      if (node.tagName === "a") {
        const href = $node.attr("href") || "";
        const t = norm($node.text());
        if (t && href) {
          runs.push(
            new ExternalHyperlink({
              children: [
                new TextRun({
                  text: t,
                  style: "Hyperlink",
                  underline: {},
                  ...defaults,
                }),
              ],
              link: href,
            }),
          );
        }
      } else if (node.tagName === "span" && $node.hasClass("resume-print__accent")) {
        const t = norm($node.text());
        if (t) runs.push(new TextRun({ text: t, color: ACCENT, bold: true, ...defaults }));
      } else if (node.tagName === "strong" || node.tagName === "b") {
        const t = norm($node.text());
        if (t) runs.push(new TextRun({ text: t, bold: true, ...defaults }));
      } else {
        runs.push(...collectTextRuns($, node, defaults));
      }
    }
  });
  return runs;
}

function paragraphFromEl($, el, opts = {}) {
  const runDefaults = { font: FONT_BODY, size: 22, ...(opts.run || {}) };
  const runs = collectTextRuns($, el, runDefaults);
  if (!runs.length) return null;
  return new Paragraph({
    children: runs,
    spacing: { after: opts.after ?? 120, before: opts.before ?? 0 },
    heading: opts.heading,
  });
}

function p(children, opts = {}) {
  const runDefaults = { font: FONT_BODY, ...(opts.run || {}) };
  const runs = Array.isArray(children)
    ? children
    : [new TextRun({ text: children, ...runDefaults })];
  return new Paragraph({
    children: runs,
    spacing: { after: opts.after ?? 120, before: opts.before ?? 0 },
    heading: opts.heading,
  });
}

function eyebrow(text) {
  return p(
    [new TextRun({ text: text.toUpperCase(), bold: true, size: 20, color: ACCENT, font: FONT_BODY })],
    { before: SP_SECTION.before, after: SP_AFTER_TIGHT.after },
  );
}

function entryTitle(title, when) {
  const runs = [new TextRun({ text: title, bold: true, size: 24, font: FONT_HEADING })];
  if (when) {
    runs.push(new TextRun({ text: `\t${when}`, size: 20, color: "666666", font: FONT_BODY }));
  }
  return p(runs, { after: 40 });
}

function subLine(text) {
  return p(text, { after: 60, run: { italics: false, size: 20, font: FONT_BODY, color: "666666" } });
}

function bodyParagraphFromEl($, el) {
  return paragraphFromEl($, el, { after: 140, run: { size: 22, font: FONT_BODY } });
}

function sectionByLabel($, page, label) {
  return $(".resume-print__block", page).filter((_, el) => {
    return norm($(el).find(".resume-print__label").first().text()) === label;
  }).first();
}

function buildFromHtml($) {
  const blocks = [];
  const page = $(".resume-print__page");

  // Header — name
  const $name = $(".resume-print__name", page);
  const nameRuns = [];
  $name.contents().each((_, node) => {
    if (node.type === "text") {
      const t = norm(String(node.data || ""));
      if (t) nameRuns.push(new TextRun({ text: t, bold: true, size: 52, font: FONT_HEADING }));
    } else if (node.type === "tag" && node.tagName === "span") {
      const t = norm($(node).text());
      if (t) nameRuns.push(new TextRun({ text: t, bold: true, size: 52, color: ACCENT, font: FONT_HEADING }));
    }
  });
  if (!nameRuns.length) {
    nameRuns.push(new TextRun({ text: "Amy Seunghyun Lee", bold: true, size: 52, font: FONT_HEADING }));
  }

  blocks.push(
    new Paragraph({
      children: nameRuns,
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 40 },
    }),
  );

  // Contact rows
  $(".resume-print__contact-row", page).each((rowIndex, row) => {
    const contactRuns = [];
    const $row = $(row);
    const spans = $row.children("span");
    spans.each((index, spanEl) => {
      if (index > 0) {
        contactRuns.push(new TextRun({ text: " · ", size: 20, color: "888888", font: FONT_BODY }));
      }
      const $span = $(spanEl);
      const link = $span.find("a").first();
      if (link.length) {
        const href = link.attr("href") || "";
        const label = norm(link.text());
        contactRuns.push(
          new ExternalHyperlink({
            children: [new TextRun({ text: label, style: "Hyperlink", underline: {}, size: 20, font: FONT_BODY })],
            link: href,
          }),
        );
      } else {
        const label = norm($span.text());
        const color =
          $span.hasClass("resume-print__contact-note") ||
          $row.hasClass("resume-print__contact-row--note") ||
          $row.hasClass("resume-print__contact-row--personal")
            ? "666666"
            : "444444";
        const italics = $row.hasClass("resume-print__contact-row--personal");
        contactRuns.push(new TextRun({ text: label, size: 20, color, font: FONT_BODY, italics }));
      }
    });
    if (contactRuns.length) {
      const isLastRow = rowIndex === $(".resume-print__contact-row", page).length - 1;
      blocks.push(new Paragraph({ children: contactRuns, spacing: { after: isLastRow ? 120 : 40 } }));
    }
  });

  // Experience
  const expSection = sectionByLabel($, page, "Experience");
  if (expSection.length) {
    blocks.push(eyebrow("Experience"));
    expSection.find(".resume-print__exp").each((_, item) => {
      const $item = $(item);
      const org = norm($item.find(".resume-print__exp-org").text());
      const when = norm($item.find(".resume-print__exp-when").text());
      const role = norm($item.find(".resume-print__exp-role").text());
      if (org) blocks.push(entryTitle(org, when));
      if (role) blocks.push(p(role, { after: 30, run: { bold: true, size: 20, color: "666666", font: FONT_BODY } }));
      const descPara = paragraphFromEl($, $item.find(".resume-print__exp-text").first(), {
        after: 120,
        run: { size: 20, font: FONT_BODY, color: "666666" },
      });
      if (descPara) blocks.push(descPara);
    });
  }

  // Community & leadership
  const communitySection = sectionByLabel($, page, "Community & leadership");
  if (communitySection.length) {
    blocks.push(eyebrow("Community & leadership"));
    communitySection.find(".resume-print__community-line").each((_, line) => {
      const para = paragraphFromEl($, line, {
        after: 50,
        run: { size: 20, font: FONT_BODY, color: "666666" },
      });
      if (para) blocks.push(para);
    });
  }

  // Education
  const eduSection = sectionByLabel($, page, "Education");
  if (eduSection.length) {
    blocks.push(eyebrow("Education"));
    eduSection.find(".resume-print__item").each((_, entry) => {
      const $e = $(entry);
      const title = norm($e.find(".resume-print__item-title").text());
      const when = norm($e.find(".resume-print__item-when").text());
      blocks.push(entryTitle(title, when));
      $e.find(".resume-print__item-sub").each((_, subEl) => {
        const sub = norm($(subEl).text());
        if (sub) blocks.push(subLine(sub));
      });
    });
  }

  // Publications
  const pubSection = sectionByLabel($, page, "Publications");
  if (pubSection.length) {
    blocks.push(eyebrow("Publications"));
    pubSection.find(".resume-print__item").each((_, entry) => {
      const $e = $(entry);
      const title = norm($e.find(".resume-print__item-title").text());
      blocks.push(p(title, { after: 40, run: { bold: true, size: 22, font: FONT_HEADING } }));
      const sub = norm($e.find(".resume-print__item-sub").text());
      if (sub) blocks.push(subLine(sub));
      blocks.push(p("", { after: 60 }));
    });
  }

  // Skills
  const skillsSection = sectionByLabel($, page, "Skills");
  if (skillsSection.length) {
    blocks.push(eyebrow("Skills"));
    skillsSection.find(".resume-print__skill").each((_, group) => {
      const $g = $(group);
      const label = norm($g.find("dt").text());
      const items = norm($g.find("dd").text());
      if (label) {
        blocks.push(p(label, { after: 30, run: { bold: true, size: 20, font: FONT_BODY, color: "666666" } }));
      }
      if (items) {
        blocks.push(p(items, { after: 80, run: { size: 20, font: FONT_BODY } }));
      }
    });
  }

  // Beyond the screen
  const beyondSection = sectionByLabel($, page, "Beyond the screen");
  if (beyondSection.length) {
    blocks.push(eyebrow("Beyond the screen"));
    const beyondEl = beyondSection.find(".resume-print__beyond").first();
    const para = paragraphFromEl($, beyondEl, {
      after: 0,
      run: { size: 20, font: FONT_BODY, color: "666666", italics: true },
    });
    if (para) blocks.push(para);
  }

  return blocks;
}

async function main() {
  let config;
  try {
    config = parseArgs(process.argv);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const htmlPath = path.join(root, config.html);
  const outPath = path.join(outDir, config.docx);

  if (!fs.existsSync(htmlPath)) {
    console.error("Missing", config.html, "at", htmlPath);
    process.exit(1);
  }

  console.log(`Building ${config.html} → ${config.docx}`);
  const html = fs.readFileSync(htmlPath, "utf8");
  const $ = cheerio.load(html);
  const children = buildFromHtml($);

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: FONT_BODY, size: 22 },
        },
        heading1: {
          run: { font: FONT_HEADING, bold: true, size: 52 },
        },
      },
      paragraphStyles: [
        {
          id: "Hyperlink",
          name: "Hyperlink",
          basedOn: "Normal",
          run: {
            font: FONT_BODY,
            color: ACCENT,
            underline: {},
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children,
      },
    ],
  });

  fs.mkdirSync(outDir, { recursive: true });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);

  const stat = fs.statSync(outPath);
  console.log("Wrote", outPath);
  console.log("Size:", Math.round(stat.size / 1024), "KB");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
