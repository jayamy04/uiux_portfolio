/**
 * Dance page — anonymous creative outlet wall.
 *
 * Backend: Supabase (free tier — https://supabase.com/pricing).
 * When URL/key below are empty, runs in localStorage preview mode (this browser only).
 *
 * Setup:
 * 1. Create a Supabase project (free tier).
 * 2. SQL Editor → run:
 *
 *    create table public.dance_outlet_responses (
 *      id uuid primary key default gen_random_uuid(),
 *      body text not null check (char_length(body) <= 400),
 *      owner_token text not null,
 *      created_at timestamptz not null default now()
 *    );
 *    alter table public.dance_outlet_responses enable row level security;
 *    create policy "Public read" on public.dance_outlet_responses
 *      for select using (true);
 *    create policy "Anon insert" on public.dance_outlet_responses
 *      for insert with check (true);
 *    create policy "Anon delete own" on public.dance_outlet_responses
 *      for delete using (owner_token is not null);
 *
 *    Delete uses id + owner_token query filters (secret token stored in this browser only).
 *
 *    If upgrading an existing table, run:
 *    alter table public.dance_outlet_responses add column if not exists owner_token text;
 *    create policy "Anon delete own" on public.dance_outlet_responses
 *      for delete using (owner_token is not null);
 *
 * 3. Project Settings → API: copy Project URL and anon public key into constants below.
 */

const DANCE_OUTLET_SUPABASE_URL = "";
const DANCE_OUTLET_SUPABASE_ANON_KEY = "";
const DANCE_OUTLET_TABLE = "dance_outlet_responses";

const DANCE_OUTLET_MAX_LENGTH = 400;
const DANCE_OUTLET_STORAGE_KEY = "dance-outlet-wall-preview-v1";
const DANCE_OUTLET_OWNER_TOKEN_KEY = "dance-outlet-owner-token-v1";
const DANCE_OUTLET_OWNED_IDS_KEY = "dance-outlet-owned-ids-v1";

const DANCE_OUTLET_PROFANITY =
  /\b(fuck|fucking|shit|damn|bitch|asshole|cunt|bastard|dick|piss)\b/gi;

const isDanceOutletSupabaseConfigured = () => {
  const url = DANCE_OUTLET_SUPABASE_URL.trim();
  const key = DANCE_OUTLET_SUPABASE_ANON_KEY.trim();
  if (!url || !key) return false;
  if (/YOUR_|REPLACE|example\.com/i.test(url + key)) return false;
  return true;
};

const sanitizeDanceOutletBody = (raw) => {
  let text = String(raw || "")
    .replace(/\r\n/g, "\n")
    .trim()
    .replace(/\s+/g, " ");
  if (text.length > DANCE_OUTLET_MAX_LENGTH) {
    text = text.slice(0, DANCE_OUTLET_MAX_LENGTH);
  }
  text = text.replace(DANCE_OUTLET_PROFANITY, (match) =>
    "*".repeat(Math.min(match.length, 8))
  );
  return text;
};

const danceOutletSupabaseHeaders = (extra = {}) => ({
  apikey: DANCE_OUTLET_SUPABASE_ANON_KEY.trim(),
  Authorization: `Bearer ${DANCE_OUTLET_SUPABASE_ANON_KEY.trim()}`,
  "Content-Type": "application/json",
  ...extra,
});

const fetchDanceOutletResponsesSupabase = async () => {
  const base = DANCE_OUTLET_SUPABASE_URL.trim().replace(/\/$/, "");
  const params = new URLSearchParams({
    select: "id,body,created_at",
    order: "created_at.desc",
  });
  const res = await fetch(
    `${base}/rest/v1/${DANCE_OUTLET_TABLE}?${params}`,
    {
      headers: danceOutletSupabaseHeaders(),
    }
  );
  if (!res.ok) throw new Error(`Supabase read failed (${res.status})`);
  const rows = await res.json();
  return Array.isArray(rows) ? rows : [];
};

const insertDanceOutletResponseSupabase = async (body, ownerToken) => {
  const base = DANCE_OUTLET_SUPABASE_URL.trim().replace(/\/$/, "");
  const res = await fetch(`${base}/rest/v1/${DANCE_OUTLET_TABLE}`, {
    method: "POST",
    headers: danceOutletSupabaseHeaders({
      Prefer: "return=representation",
    }),
    body: JSON.stringify({ body, owner_token: ownerToken }),
  });
  if (!res.ok) throw new Error(`Supabase insert failed (${res.status})`);
  const rows = await res.json();
  return Array.isArray(rows) ? rows[0] : { body, created_at: new Date().toISOString() };
};

const deleteDanceOutletResponseSupabase = async (id, ownerToken) => {
  const base = DANCE_OUTLET_SUPABASE_URL.trim().replace(/\/$/, "");
  const params = new URLSearchParams({
    id: `eq.${id}`,
    owner_token: `eq.${ownerToken}`,
  });
  const res = await fetch(`${base}/rest/v1/${DANCE_OUTLET_TABLE}?${params}`, {
    method: "DELETE",
    headers: danceOutletSupabaseHeaders(),
  });
  if (!res.ok) throw new Error(`Supabase delete failed (${res.status})`);
};

const getDanceOutletOwnerToken = () => {
  try {
    let token = localStorage.getItem(DANCE_OUTLET_OWNER_TOKEN_KEY);
    if (!token) {
      token =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `local-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      localStorage.setItem(DANCE_OUTLET_OWNER_TOKEN_KEY, token);
    }
    return token;
  } catch {
    return `session-${Date.now()}`;
  }
};

const readDanceOutletOwnedIds = () => {
  try {
    const raw = localStorage.getItem(DANCE_OUTLET_OWNED_IDS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
};

const trackDanceOutletOwnedPost = (id) => {
  if (!id) return;
  const key = String(id);
  const ids = readDanceOutletOwnedIds();
  if (ids.includes(key)) return;
  try {
    localStorage.setItem(
      DANCE_OUTLET_OWNED_IDS_KEY,
      JSON.stringify([key, ...ids].slice(0, 200))
    );
  } catch {
    /* quota or private mode */
  }
};

const untrackDanceOutletOwnedPost = (id) => {
  if (!id) return;
  const key = String(id);
  const next = readDanceOutletOwnedIds().filter((entry) => entry !== key);
  try {
    localStorage.setItem(DANCE_OUTLET_OWNED_IDS_KEY, JSON.stringify(next));
  } catch {
    /* quota or private mode */
  }
};

const canDeleteDanceOutletPost = (item) => {
  if (!item?.id) return false;
  const ownedIds = readDanceOutletOwnedIds();
  if (ownedIds.includes(String(item.id))) return true;
  const token = getDanceOutletOwnerToken();
  return Boolean(item.owner_token && item.owner_token === token);
};

const readDanceOutletPreviewStore = () => {
  try {
    const raw = localStorage.getItem(DANCE_OUTLET_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeDanceOutletPreviewStore = (items) => {
  try {
    localStorage.setItem(DANCE_OUTLET_STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* quota or private mode */
  }
};

const sortDanceOutletNewestFirst = (items) =>
  [...items].sort(
    (a, b) =>
      new Date(b.created_at || 0).getTime() -
      new Date(a.created_at || 0).getTime()
  );

const escapeHtml = (value) => {
  const el = document.createElement("span");
  el.textContent = value;
  return el.innerHTML;
};

const initDanceOutletWall = () => {
  const root = document.getElementById("dance-outlet-wall");
  if (!root) return;

  const form = root.querySelector(".dance-outlet-wall__form");
  const textarea = root.querySelector(".dance-outlet-wall__textarea");
  const submitBtn = root.querySelector(".dance-outlet-wall__submit");
  const list = root.querySelector(".dance-outlet-wall__list");
  const emptyEl = root.querySelector(".dance-outlet-wall__empty");
  const statusEl = root.querySelector(".dance-outlet-wall__status");
  const counterEl = root.querySelector(".dance-outlet-wall__counter");

  if (!form || !textarea || !submitBtn || !list) return;

  const useSupabase = isDanceOutletSupabaseConfigured();
  let expandedCard = null;

  const collapseExpandedCard = () => {
    if (expandedCard) {
      expandedCard.classList.remove("is-expanded");
      expandedCard.setAttribute("aria-expanded", "false");
      expandedCard = null;
    }
  };

  const bindBubbleCard = (card, item) => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-expanded", "false");

    const removeBtn = card.querySelector(".dance-outlet-wall__remove");
    if (removeBtn) {
      removeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        deleteDanceOutletPost(item);
      });
    }

    const toggle = () => {
      const isOpen = card.classList.contains("is-expanded");
      collapseExpandedCard();
      if (!isOpen) {
        card.classList.add("is-expanded");
        card.setAttribute("aria-expanded", "true");
        expandedCard = card;
      }
    };

    card.addEventListener("click", (event) => {
      if (event.target.closest(".dance-outlet-wall__remove")) return;
      event.preventDefault();
      event.stopPropagation();
      toggle();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
      if (event.key === "Escape" && card.classList.contains("is-expanded")) {
        collapseExpandedCard();
      }
    });
  };

  const buildResponseCard = (item, index) => {
    const li = document.createElement("li");
    const noteVariant = (index % 5) + 1;
    const decor = index % 3 === 0 ? "pin" : "tape";
    li.className = [
      "dance-outlet-wall__card",
      "tj-fade",
      `dance-outlet-wall__card--note-${noteVariant}`,
      `dance-outlet-wall__card--${decor}`,
    ].join(" ");
    li.setAttribute("data-on-scroll", "0");
    if (item.id) li.dataset.postId = String(item.id);
    const body = item.body || "";
    const canDelete = canDeleteDanceOutletPost(item);
    const deleteBtn = canDelete
      ? `<button type="button" class="dance-outlet-wall__remove" aria-label="Remove your answer">Remove</button>`
      : "";
    li.innerHTML = `${deleteBtn}<blockquote class="dance-outlet-wall__quote">${escapeHtml(body)}</blockquote>`;
    return li;
  };

  const deleteDanceOutletPost = async (item) => {
    if (!item?.id || !canDeleteDanceOutletPost(item)) return;
    if (!window.confirm("Remove your answer from the wall?")) return;

    setStatus("");
    submitBtn.disabled = true;

    try {
      if (useSupabase) {
        await deleteDanceOutletResponseSupabase(item.id, getDanceOutletOwnerToken());
        const items = await fetchDanceOutletResponsesSupabase();
        renderResponses(items);
      } else {
        const next = readDanceOutletPreviewStore().filter(
          (entry) => String(entry.id) !== String(item.id)
        );
        writeDanceOutletPreviewStore(next);
        renderResponses(next);
      }

      untrackDanceOutletOwnedPost(item.id);
      setStatus("Your answer was removed.", "success");
    } catch {
      setStatus("Could not remove your answer. Please try again.", "error");
    } finally {
      submitBtn.disabled = false;
    }
  };

  const renderResponses = (items) => {
    const sorted = sortDanceOutletNewestFirst(items);
    collapseExpandedCard();
    list.innerHTML = "";

    if (!sorted.length) {
      if (emptyEl) emptyEl.hidden = false;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;

    sorted.forEach((item, index) => {
      const card = buildResponseCard(item, index);
      list.appendChild(card);
      bindBubbleCard(card, item);
    });

    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  };

  const setStatus = (message, type = "") => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = "dance-outlet-wall__status";
    if (type) statusEl.classList.add(`dance-outlet-wall__status--${type}`);
    statusEl.hidden = !message;
  };

  const updateCounter = () => {
    if (!counterEl) return;
    const len = textarea.value.length;
    counterEl.textContent = `${len} / ${DANCE_OUTLET_MAX_LENGTH}`;
    counterEl.classList.toggle(
      "dance-outlet-wall__counter--limit",
      len >= DANCE_OUTLET_MAX_LENGTH
    );
  };

  const scrollToNewest = () => {
    const target = list.querySelector(".dance-outlet-wall__card");
    if (!target) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  const loadResponses = async () => {
    setStatus("Loading responses…");
    submitBtn.disabled = true;

    try {
      let items;
      if (useSupabase) {
        items = await fetchDanceOutletResponsesSupabase();
      } else {
        items = readDanceOutletPreviewStore();
      }
      renderResponses(items);
      setStatus("");
    } catch {
      setStatus(
        useSupabase
          ? "Could not load responses. Try again in a moment."
          : "Could not load preview responses.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const body = sanitizeDanceOutletBody(textarea.value);
    if (!body) {
      setStatus("Write something before you share.", "error");
      textarea.focus();
      return;
    }

    setStatus("");
    submitBtn.disabled = true;

    try {
      const ownerToken = getDanceOutletOwnerToken();

      if (useSupabase) {
        const created = await insertDanceOutletResponseSupabase(body, ownerToken);
        if (created?.id) trackDanceOutletOwnedPost(created.id);
        const items = await fetchDanceOutletResponsesSupabase();
        renderResponses(items);
      } else {
        const entry = {
          id: `preview-${Date.now()}`,
          body,
          owner_token: ownerToken,
          created_at: new Date().toISOString(),
        };
        trackDanceOutletOwnedPost(entry.id);
        const items = sortDanceOutletNewestFirst([
          entry,
          ...readDanceOutletPreviewStore(),
        ]);
        writeDanceOutletPreviewStore(items);
        renderResponses(items);
      }

      textarea.value = "";
      updateCounter();
      setStatus("Thanks — your answer is live.", "success");
      scrollToNewest();
    } catch {
      setStatus("Could not post your answer. Please try again.", "error");
    } finally {
      submitBtn.disabled = false;
    }
  });

  textarea.addEventListener("input", () => {
    if (textarea.value.length > DANCE_OUTLET_MAX_LENGTH) {
      textarea.value = textarea.value.slice(0, DANCE_OUTLET_MAX_LENGTH);
    }
    updateCounter();
  });

  root.addEventListener("click", (event) => {
    if (!event.target.closest(".dance-outlet-wall__card")) {
      collapseExpandedCard();
    }
  });

  textarea.setAttribute("maxlength", String(DANCE_OUTLET_MAX_LENGTH));
  updateCounter();
  loadResponses();
};
