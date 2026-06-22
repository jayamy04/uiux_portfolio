# Chatbase widget avatar — manual dashboard update

The chat widget (blue **Amy Seunghyun Lee** tab) is loaded by **Chatbase** outside this repo. A full grep of all HTML/JS files found **no Chatbase embed script** in the repository — the avatar URL is configured in the Chatbase dashboard, not in site source.

## Source of truth

Home `#about` section portrait (same on `about.html`):

```
assets/images/about/amy-about-graduation.png
```

## Updated avatar files (2026-06-22)

Square crop from `amy-about-graduation.png` — face + purple HCDE stole, **not** the old blazer headshot.

| File | Purpose |
|------|---------|
| `assets/images/about/amy-chat-about.png` | **New** primary URL for Chatbase (800×800, cache-bust filename) |
| `assets/images/about/amy-chat-avatar.png` | Legacy Chatbase URL (512×512) |
| `assets/images/about/amy-headshot.png` | Site / legacy references (512×512) |
| `assets/images/about/amy-avatar-stole.png` | Stole-focused variant (512×512) |

**Crop:** full width 682 px, box `(0, 72)–(682, 754)` from source, resized to 512×512 (legacy) or 800×800 (`amy-chat-about.png`).

## Action required in Chatbase dashboard

1. Open [Chatbase](https://www.chatbase.co/) → your bot → **Settings** → **Appearance** (or Profile image).
2. Set the profile/avatar URL to:

   ```
   https://seunghyun-lee.com/assets/images/about/amy-chat-about.png?v=20260622about
   ```

3. Save and hard-refresh the live site (or wait for Chatbase CDN cache to expire).

Until the dashboard URL is updated, the widget will keep showing the previously uploaded blazer headshot even though repo assets are updated.
