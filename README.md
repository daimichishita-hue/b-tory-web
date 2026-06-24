# B-tory Official Website

Static official website for B-tory, a BtoB salon inventory, ordering, receiving, receipt, and document management app.

This public repository contains only the official website. The app source code is not included.

## URLs

- Marketing URL: `https://b-tory.com/`
- Support URL: `https://b-tory.com/support.html`
- Privacy Policy URL: `https://b-tory.com/privacy.html`
- Terms URL: `https://b-tory.com/terms.html`
- Backup GitHub Pages URL: `https://daimichishita-hue.github.io/b-tory-web/`

## Domain

- Domain provider: お名前.com
- Primary domain: `b-tory.com`
- GitHub Pages custom domain: `b-tory.com`

## App Review

This site is used for:

- Marketing URL
- Support URL
- Privacy Policy URL

## Multilingual Policy

The landing page defaults to English when a language cannot be determined.

Language priority:

1. Manually selected language saved in `localStorage`
2. URL parameter: `?lang=ja`, `?lang=en`, `?lang=zh`, `?lang=es`
3. Browser language: `ja`, `zh`, `es`, `en`
4. Fallback: `en`

Future TODO: IP-based regional detection may be considered later with Cloudflare or another edge layer.

## B-tory Distribution Plan

B-tory is planned for the following app distribution paths:

1. iPhone app
2. iPad app
3. Mac desktop app
4. Windows desktop app

Download links will be connected later after each platform is ready.

Current public website should show platform-specific download buttons as planned / coming soon, not as active downloads.

Desktop app technology candidates:

- Tauri
- Electron

Current principle:
Use the existing B-tory HTML app assets as much as possible, and wrap them for iOS/iPadOS and desktop platforms.

## B-tory Pricing Strategy

B-tory is positioned as a BtoB salon operations app, not as an advertising-funded free service.

Planned plans:

1. Free Starter: ¥0
2. Starter: 30-day free trial planned, then ¥1,980/month or ¥19,800/year planned
3. Pro: ¥4,980/month or ¥49,800/year planned
4. Max: from ¥9,800/month planned

Business logic:

- Free Starter is the entry point for trying the core salon workflow.
- Starter is the main plan for real use by solo salons and small salons.
- Pro is planned for teams, cloud backup, multi-device sync, and staff sharing.
- Max is planned for multi-store operation, external integrations, and advanced features such as AI/OCR.
- Paid plans, accounts, cloud backup, multi-device sync, external integrations, and AI/OCR are not implemented yet and must be described as planned, in preparation, or under consideration.

Trial strategy:

Starter should be presented as a planned 30-day free trial, so salons can test product registration, photos, order sheets, receiving, receipt management, and reports in real daily work before paid use begins.

## Hero Copy Candidates for A/B Testing

- A: 今日からスマホが、サロンの在庫管理端末に。
- B: 紙やExcelの抜け漏れを、B-toryでシンプルに。
- C: 在庫・発注・納品・領収書まで、サロンワークをひとつに。
- D: スマホで見える。発注までつながる。領収書も残せる。

## Public Page Copy Rules

Do not state that unreleased features are already available.

Use:

- planned
- in preparation
- under consideration
- coming soon

Avoid:

- active purchase links before release
- automatic sending claims
- cloud sync as already available
- POS / booking / accounting integrations as already available
- AI/OCR as already available
- competitor names, copy, layout, or visual imitation

## Operator Information

Public pages list:

- Company: The good things K.K.
- Representative: Daisuke Michishita, CEO / Representative Director
- Address: Kuwano Bldg. 2F, 6-23-4 Jingumae, Shibuya-ku, Tokyo 150-0001, Japan
- Contact: `salon@thegoodthings-inc.com` / `+81-3-6824-4380`

## Future TODO

- Replace planned Apple Store buttons after iPhone / iPad / Mac URLs are ready.
- Add Windows download URL after the Microsoft Store or official download route is ready.
- Add Android copy and download path only if an Android version is planned.
- Add specific commercial transaction law page if paid plans are officially launched.
