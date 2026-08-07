# AI Website Slop — Combined Reference Checklist

A merged checklist of "tells" that a website was AI-generated / vibe-coded with no
deliberate design direction, combined from several sources (see Sources at bottom).
Not part of the live site — this is a reference doc for building/reviewing future
sites (including this one).

No single item proves anything. A handful of these stacking with zero deviation
anywhere is the actual signature — not any one pattern in isolation.

## Fonts

- Inter used for everything, especially centered hero headlines
- Geist (Vercel/v0's default) — climbing fast as "the new Inter"
- Space Grotesk — the reach when trying to escape Inter, itself now a tell
- Instrument Serif, usually italic, usually huge, usually in a hero
- Serif italic on a single accent word inside an otherwise all-Inter hero
- Five fonts (Inter, DM Sans, Poppins, Roboto, Montserrat) cover ~94% of AI frontends

## Colors

- Purple/indigo/violet gradient hero (Tailwind `indigo-500`/`violet-500`/`purple-500`, ~78% of indexed marketing sites vs ~10% in 2020)
- Blue-to-indigo diagonal gradient specifically (`from-blue-600 to-indigo-800`, `to-br`/`to-r`)
- "Cream and beige tasteful" palette — the second-wave default after purple became a joke
- Emerald fallback accent when purple is explicitly banned in a prompt
- Gradient text (`bg-clip-text`) on headings/big metric numbers, carrying no meaning
- Neon-on-dark with colored glow / box-shadow behind cards and buttons
- Perma dark mode with medium-grey body text + all-caps section labels
- Barely-passing body-text contrast in dark themes (dark-brown/beige-on-dark, fails WCAG ~4.5:1)
- Timid, evenly-weighted palettes — several muted colors, no dominant color, no sharp accent
- Gradient orbs/blobs floating behind the hero, sometimes cursor-following

## Hero section

- Centered hero in a generic sans, full stack: badge → oversized headline → one-line subhead → two CTAs → gradient orb behind
- Eyebrow pill / badge directly above the H1 ("New", "v2.0 is here"), often with a sparkle emoji prefix
- Decorative dot prefix + trailing thin line next to the eyebrow label
- Copy so generic it could describe any product

## Layout / structure

- Exactly three identical feature cards below the hero, each icon-heading-two-lines (the single most-cited tell across every source)
- Bento grid — the "safe alternative" once three-card rows got called out; now a tell of its own
- Icon-tile-stacked-above-heading as the universal feature-card template
- Numbered section markers (01/02/03) or a step row with circled numbers
- Same tiny uppercase kicker label repeated above every section heading (FEATURES / PRICING / FAQ)
- Fixed cookie-cutter page skeleton: hero → logo wall → 3-card features → testimonial carousel → stats row → pricing table → FAQ → footer w/ repeated CTA
- Animated stat counters with implausible/unverifiable numbers ("Trusted by 5,000+ teams" on a month-old domain)
- Logo soup — grayscale client/partner logo wall, sometimes fully fabricated
- Monotonous spacing — identical padding everywhere, no rhythm variation
- Stat banner rows
- Sidebar/nav with emoji icons

## Cards, borders, surfaces

- `rounded-2xl` (16–24px radius) applied to every card, button, input, and image uniformly
- Untouched shadcn defaults: `rounded-2xl shadow-lg p-6`, 1px light border, default muted primary — nothing customized
- "Ghost card": hairline border + wide diffuse shadow on the same element (two edge treatments, no commitment)
- Colored left/top border accent strip on ordinary (non-alert) cards
- Cards nested inside cards, used as a substitute for real visual hierarchy
- Reflexive glassmorphism (`backdrop-blur-md`) with no actual layering problem to solve
- Sticky nav: `backdrop-blur-md bg-white/70 border-b border-white/20` — v0/Lovable/Bolt default

## Icons & imagery

- Lucide icon set, same recurring picks everywhere: Sparkles=AI, Zap=fast, Shield=secure, Check=benefit, BarChart3=analytics, ArrowRight on every CTA
- Emoji standing in for designed icons in feature cards/headings/bullets (rocket, gear, sparkle, check, lightbulb, target) — one of the stronger tells, rare in professional hand-built work
- Fake terminal-window hero mockup (3 macOS traffic-light dots) on a product that isn't a dev tool — appears in 70%+ of dev-tool landing pages
- Plastic 3D blob illustrations; generated headshots with too-perfect skin and nothing behind the eyes

## Motion / interaction

- Identical fade-up entrance (`opacity:0, y:20`) scroll-triggered on every section, uniform stagger
- `transition: all` used everywhere instead of specific properties
- `animate-pulse` on the "Most Popular" pricing tier
- Bounce/elastic easing on dialogs and cards (overshoot springs)
- Motion incoherence — some elements animate elaborately, others snap with zero transition, inconsistent hover states

## Trust / pricing / footer

- Testimonial wall of one-line generic praise ("Game-changing tool!") from generic names (Sarah Chen, Marcus Williams) with stock/AI avatars, no specifics
- Fabricated trust chrome: fake compliance badges, invented user counts, roadmap implying momentum that doesn't exist
- Three-tier pricing, "Most Popular" badge on the middle tier, checkmark lists, "Contact us" enterprise tier — fine on its own, tell is template-identical execution
- Footer: 4–5 link columns (Product/Company/Resources/Legal) + generic "passionate team building the future of X" blurb + default favicon
- Generator attribution left in ("Built with v0", "Built on Lovable")

## Copy

- "Get Started" as the default CTA — no specific meaning or urgency
- Banned-phrase diction: "unlock", "seamless", "leverage", "empower", "elevate", "revolutionize", "game-changing"
- "It's not just X, it's Y" sentence cadence
- Vague benefit statements with no concrete specifics anywhere on the page

## Code-level tells (view-source)

- Verbatim Tailwind class stacks: `bg-gradient-to-br from-blue-600 to-purple-500`, `rounded-2xl shadow-lg p-6`
- Spacing exclusively in `gap-4`/`p-6`/`my-8` multiples, nothing off-grid
- `dark:` prefix sprayed on every single element
- Tool signatures: `@/components/ui/*` imports + Geist → v0; Vite + visible Supabase boilerplate → Bolt; `lovable.dev` meta tag → Lovable; Material Symbols instead of Lucide → Gemini
- Missing alt text, skipped heading levels, div soup, no form validation, no keyboard support

## Structural residue (beneath the visible layer)

Per one comparative audit (131 AI-built sites vs. 10 human-led controls), the *visible*
"AI look" was nearly a coin flip between groups (50.4% vs 50.0%) — not very diagnostic
on its own. The stronger, more reliable signal was a bundle appearing in 82.4% of
AI-built sites vs. 10.0% of controls:
- Concentrated/embedded styling (inline styles, duplicated CSS blocks)
- Shallow/thin trust surface (no real about/contact/proof depth beyond the homepage)
- Weak semantic HTML / accessibility baseline gaps (missing landmarks, skipped heading levels)

Practical takeaway: don't just eyeball the homepage — check view-source, the About/Contact
pages, and basic a11y (heading order, alt text, contrast) before calling a site "done."

---

## Quick self-audit for this site (subhasiniengg.com)

Checked against our actual `assets/style.css`, not just eyeballed:

- [ ] **Body font is Inter** (`--font-body: 'Inter', sans-serif`) — this is a real hit on the "Inter everywhere" tell. Mitigated somewhat by pairing with Barlow for all headings (not pure Inter-only), but still worth considering a body font swap if we want to move further from the default.
- [ ] **Hero badge is the "eyebrow pill" tell, almost exactly** — `.hero-badge` is an uppercase, pill-shaped (`border-radius:99px`), accent-colored label sitting directly above the H1, plus a `.hero-badge-dot` with a 2s pulse animation — this matches "tiny uppercase label + decorative dot prefix above a centered headline" almost verbatim. In our case the badge content ("Approved Vendor — Savli GIDC Unit") is a real, checkable fact, not an invented "New"/sparkle badge, which is the main mitigating factor — but the *shape* of the pattern is a direct match and worth knowing about.
- [x] Accent color is a muted blue (`#4a8db7`), not the purple/indigo/violet AI-gradient band
- [x] No fake terminal mockup, no fabricated trust badges/stats, no invented compliance claims
- [x] Real client list (14+ actual clients), real vendor code — checkable, not fabricated trust chrome
- [x] No emoji-as-icons, no emoji bullets
- [x] Card radius is differentiated (8px buttons vs 16px hero images), not one `rounded-2xl` slapped on everything
- [ ] Worth still double-checking: spacing rhythm consistency and heading level order (h1→h2→h3 without skips) across all 5 pages

Net take: not slop-free, but the two real hits (Inter body font, pill-shaped hero badge) are both explainable/intentional rather than unreviewed defaults — low priority to fix, but flagging honestly rather than claiming a clean sheet.

## Sources

- Adrian Krebs, ["Scoring Show HN submissions for AI design patterns"](https://www.adriankrebs.ch/blog/design-slop/) — the HN post that hit #1 (333 pts), scored ~1,590 Show HN pages against 16 patterns; live scorer at https://slopcop.adriankrebs.ch
- [`febbhav/signs-of-ai-design`](https://github.com/febbhav/signs-of-ai-design) — comprehensive field guide (websites, images, video, logos, decks, copy), modeled on Wikipedia's "Signs of AI writing"
- [`Nutlope/hallmark`](https://github.com/Nutlope/hallmark) (Together AI) — 58-gate anti-slop design skill for coding agents; companion checklist tool at [`shift-zero/hallmark-check`](https://github.com/shift-zero/hallmark-check)
- Sailop, ["10 Dead Giveaways Your Website Was Generated by AI"](https://sailop.com/blog/10-dead-giveaways-website-generated-by-ai)
- [`JCarterJohnson/vibecoded-design-tells`](https://github.com/JCarterJohnson/vibecoded-design-tells) — Reddit-mined study (3.2M posts scanned) ranking tells by how often people actually name them; shadcn/Tailwind defaults and "AI purple" gradient rank highest, bento grids/glassmorphism/aurora gradients rank lower or get rejected as noise
- SiteBlob, ["We Scanned 131 AI-Built Websites, and the 'AI Look' Wasn't the Biggest Tell"](https://siteblob.com/blog/we-scanned-131-ai-built-websites-ai-look-wasnt-the-tell) — the visible layer was a near coin-flip; structural residue (styling, trust depth, semantics) was the real signal
