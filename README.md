# Fantasy Botola Pro

# PROMPT À COPIER DANS LOVABLE (en une seule fois)



---



Build a mobile-first fantasy football web app called **"Fantasy Botola"** — an exact-style clone of the **Fantasy Premier League (FPL) official app**, but for the Moroccan Botola Pro league. The UI language is **French**. It must look and feel 100% like the FPL app: same layout, same interactions, same visual language. Only the league/content changes.



## DESIGN SYSTEM (FPL identity — do not deviate)

- Primary purple: `#37003c` (headers, backgrounds, buttons)

- Neon green: `#00ff87` (accents, CTAs, active states, pitch lines)

- Pink/magenta: `#ff2882` (captain badges, highlights)

- Dark purple: `#1a0a2e` (page background gradients)

- Font: system sans, bold condensed-style headings, uppercase labels with letter-spacing

- Rounded cards (12-16px radius), subtle shadows, pill-shaped badges

- Bottom tab bar (mobile app style) with 4 tabs: **Équipe | Points | Classement | Admin** (Admin visible only for commissioners)

- Top app header: manager name, gameweek pill (e.g. "J1"), deadline countdown



## DATA (fetch at runtime from these URLs)

- Players (341): `https://botola-fantasy.netlify.app/players.json` — fields: id, name, pos (GKP/DEF/MID/FWD), team (3-letter code), price

- Teams (16): `https://botola-fantasy.netlify.app/teams.json` — fields: code, name, logo (URL), colors

- Kits: `https://botola-fantasy.netlify.app/kits.json` — keyed by team code: base, sleeves, pattern (plain/stripes/hoops/sash), patternColor, trim — these are the REAL 2026-27 home kits, render them as SVG shirts on the pitch



## BACKEND — Supabase (already set up, tables exist)

- URL: `https://xavqtxablhshabsqdvzr.supabase.co`

- Anon key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhdnF0eGFibGhzaGFic3FkdnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2NDU5MDcsImV4cCI6MjEwNzIyMTkwN30.9GupM6MP_xp5z20F1rbpjtbmgf8j3Klmpj-qbrPC7Kk`

- Tables: `profiles` (id, username, is_commissioner), `gameweeks` (id, number, deadline, finished), `player_points` (gameweek_id, player_id, stats JSON, points), `squads` (user_id, gameweek_id, players JSONB, captain_id, vice_captain_id, chip_used)

- Auth: email/password signup (username field) + login. Auto-create profile on first login using the signup username.



## SCREENS & FEATURES



**1. Auth screen** — FPL-style purple gradient, app logo "Fantasy Botola", login/signup toggle, username field on signup.



**2. Équipe (Team) — the main screen, exactly like FPL:**

- Green football pitch with white line markings, viewed vertically

- 11 starters arranged in formation lines (GKP / DEF / MID / FWD) wearing their club's REAL kit rendered as SVG shirts (use kits.json patterns)

- Each shirt shows: player name, price, position badge (GKP/DEF/MID/FWD), captain "C" / vice-captain "V" marker

- Bench row below the pitch: 4 substitutes (1 GKP + 3 others) in order

- Tap a starter then a bench player → they swap instantly (like FPL)

- Tap a player → options: Make Captain (C), Make Vice-Captain (V)

- Header bar: budget remaining, players count (n/15), transfers info

- Player browser below: searchable/sortable list of all 341 players with price, team, position filter tabs (GKP/DEF/MID/FWD), "+" to add

- Squad rules enforced: 15 players (2 GKP, 5 DEF, 5 MID, 3 FWD), budget 100.0, max 3 per club, valid formations only

- Big neon-green "Sauvegarder" (Save) button when squad is complete

- Chips row: Wildcard, Free Hit, Bench Boost, Triple Captain (one-tap activation with confirm)



**3. Points screen — like FPL:**

- Gameweek points total (big number), rank, average, highest score

- Per-player points breakdown with the same shirt visuals

- Gameweek history list



**4. Classement (Standings) — like FPL leagues:**

- League table: rank, manager name, team, gameweek points, total points

- Highlight the current user



**5. Admin (commissioner only):**

- Create gameweek (number + deadline datetime)

- Enter player stats per gameweek: minutes, goals, assists, clean sheet, yellow/red cards → auto-compute FPL points (appearance 1-2, goals 6/6/5/4 by position, assist 3, clean sheet 4/4/1, yellow -1, red -3, captain x2, triple captain x3, bench boost adds bench)

- Close gameweek (locks squads, finalizes points)



## SCORING (FPL rules)

- Appearance: 1 pt (2 if 60+ min) · Goals: 6 (GKP/DEF), 5 (MID), 4 (FWD) · Assist: 3 · Clean sheet: 4 (GKP/DEF), 1 (MID) · Yellow: -1 · Red: -3 · Captain: x2 · Triple Captain: x3 · Bench Boost: bench counts



## REQUIREMENTS

- Mobile-first responsive (it will be used on phones), but usable on desktop

- French UI throughout, no emojis (use Lucide icons)

- Persist squad to Supabase on save; reload it on login

- Handle empty states gracefully (no gameweek yet → friendly message, not silent failure)

- Deadline countdown in the header; lock squad edits after deadline passes

- WhatsApp share button for the league table



Build it complete and polished in one go — this must feel like the real FPL app, not a prototype.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://fantasy-botola-pro.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2ee35d29-ab21-4f5f-8cdd-50dba863e9eb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
