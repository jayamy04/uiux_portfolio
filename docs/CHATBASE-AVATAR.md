# Chatbase widget avatar — manual dashboard update

The chat widget (blue **Amy Seunghyun** tab) is loaded by **Chatbase** outside this repo. A full grep of all HTML/JS files found **no Chatbase embed script** in the repository — the avatar URL is configured in the Chatbase dashboard, not in site source.

## Updated avatar files (2026-06-20)

Graduation photo `R0000358` cropped to face + purple HCDE stole, saved as:

| File | Purpose |
|------|---------|
| `assets/images/about/amy-chat-avatar.png` | Primary URL for Chatbase |
| `assets/images/about/amy-headshot.png` | Site / legacy references |
| `assets/images/about/amy-avatar-stole.png` | Stole-focused variant |

**Crop:** 500×500 px region `(420, 0)–(920, 500)` from source, resized to 512×512.

## Action required in Chatbase dashboard

1. Open [Chatbase](https://www.chatbase.co/) → your bot → **Settings** → **Appearance** (or Profile image).
2. Set the profile/avatar URL to:

   ```
   https://seunghyun-lee.com/assets/images/about/amy-chat-avatar.png?v=20260620grad
   ```

3. Save and hard-refresh the live site (or wait for Chatbase CDN cache to expire).

Until the dashboard URL is updated, the widget will keep showing the previously uploaded blazer headshot even though repo assets are updated.
