# B-tory 公式サイト（website/）

B-tory（美容サロン向け 在庫・発注・納品・書類管理アプリ）の公式サイトです。
Apple Store 提出に必要な **サポートURL** と **プライバシーポリシーURL**、および紹介用ランディング・利用規約を含む静的サイトです。

外部CDN・広告・解析タグは使用していません（フォントはシステムフォント）。

## 構成

```
website/
  index.html       … ランディング（機能 / 使い方 / 料金プラン / FAQ など）
  privacy.html     … プライバシーポリシー（Apple Store 提出用）
  support.html     … サポート（Apple Store 提出用）
  terms.html       … 利用規約
  css/style.css    … Bauhaus 風ブランドスタイル
  assets/site-i18n.js … LPの言語判定・手動切替（EN/JP/ZH/ES）
  assets/          … ロゴ・マーク・favicon・OGP 画像
```

## 多言語表示の方針

LP（`index.html`）は英語を初期表示のデフォルトにしています。判定できない場合も英語を表示します。

言語判定の優先順位：

1. `localStorage` に保存された手動選択言語
2. URLパラメータ `?lang=ja` / `?lang=en` / `?lang=zh` / `?lang=es`
3. ブラウザ言語（`ja` / `zh` / `es` / `en`）
4. それ以外は `en`

現時点では GitHub Pages 上で動くように、ブラウザ言語・URLパラメータ・手動切替・`localStorage` 保存で対応しています。

将来TODO：IP国判定は、独自ドメイン公開後にCloudflareなどのエッジ側で必要に応じて検討します。

## ロゴマーク（現行版）

現行サイトでは、オーナー提供の新しいB-toryマークとワードマークをPNG化して使用しています。
元画像と差し替え前のサイト内ロゴは `assets/original/` に保存しています。

| ファイル | 用途 | 生成元 |
|---|---|---|
| `assets/btory-mark.png` | ヘッダー／フッター／ヒーロー（紫少なめ・ピンク主役・下にオレンジ/黄色の正方形マーク） | `assets/original/new-logo-source/` |
| `assets/btory-wordmark.png` | ヘッダー／フッター用ワードマーク | `b-torylogoname.png` を透明化 |
| `assets/favicon.png` | favicon（256px） | 新マークPNG |
| `assets/apple-touch-icon.png` | iOS ホーム画面アイコン（180px） | 新マークPNG |
| `assets/btory-ogp.png` | OGP 画像（1200×630） | 新マーク＋新ワードマーク |
| `assets/btory-logo.png` / `btory-logomark.png` / `btory-mark-transparent.png` | 予備の透明PNG | オーナー提供画像を透明化 |

### メモ
チェッカー背景が焼き込まれた元画像は、そのまま使わず黒いロゴ部分だけを透明PNG化しています。

## ローカル確認

```sh
cd /Users/dai/b-tory-free/website
python3 -m http.server 8080
# http://127.0.0.1:8080/
```

## 公開（重要：このリポジトリは private です）

`b-tory-free` は **private リポジトリ**です。GitHub Pages は無料プランでは public リポジトリのみ対応のため、次のいずれかで公開します。

### 推奨A：Webサイト専用の public リポジトリで公開（アプリは private のまま）
1. 新しい **public** リポジトリ（例 `b-tory-web`）を作成
2. この `website/` の中身をそのリポジトリの root に置いて push
3. Settings → Pages → Deploy from a branch → `main` / `/ (root)` → Save
4. 公開URL：`https://<account>.github.io/b-tory-web/`

> アプリ本体（`salon-inventory.html`）は public 化されず、サイトだけが公開されます。

### 推奨B：Netlify / Vercel（private リポジトリのまま public サイトを公開）
1. Netlify / Vercel で `b-tory-free` を連携
2. Publish directory（公開ディレクトリ）に `website` を指定
3. 発行された HTTPS URL を Apple Store に使用

### 参考C：このリポジトリを public にして GitHub Actions で `website/` を公開
- 同梱の `.github/workflows/pages.yml` が `website/` のみを Pages に公開します（root のアプリHTMLは公開されません）。
- Settings → Pages → Source: **GitHub Actions** を選択。
- ※ リポジトリを public にする必要があるため、アプリを非公開にしたい場合は推奨A/Bを選んでください。

### なぜ root 直下デプロイにしないか
リポジトリ root を Pages で公開すると `salon-inventory.html`（アプリ本体）まで配信されてしまいます。`website/` サブフォルダのみを公開する構成（推奨A〜C）にしています。

## Apple Store 提出用 URL（公開後に確定）

`<公開URL>` を実際のドメインに置き換えてください。

- Support URL：`<公開URL>/support.html`
- Privacy Policy URL：`<公開URL>/privacy.html`
- Marketing URL：`<公開URL>/`（index.html）

## B-tory distribution plan

B-tory is planned for the following app distribution paths:

1. iPhone app
2. iPad app
3. Mac desktop app
4. Windows desktop app

Download links will be connected later after each platform is ready.

Current public website should show platform-specific download buttons as planned/coming soon, not as active downloads.

Desktop app technology candidates:

- Tauri
- Electron

Current principle:
Use the existing B-tory HTML app assets as much as possible, and wrap them for iOS/iPadOS and desktop platforms.

## B-tory pricing strategy

B-tory is positioned as a BtoB salon operations app, not as an advertising-funded free service.

Planned plans:

1. Free Starter：¥0
2. Starter：30-day free trial planned, then ¥1,980/month or ¥19,800/year planned
3. Pro：¥4,980/month or ¥49,800/year planned
4. Max：from ¥9,800/month planned

Business logic:

- Free Starter is the entry point for trying the core salon workflow.
- Starter is the main plan for real use by solo salons and small salons.
- Pro is planned for teams, cloud backup, multi-device sync, and staff sharing.
- Max is planned for multi-store operation, external integrations, and advanced features such as AI/OCR.
- Paid plans, accounts, cloud backup, multi-device sync, external integrations, and AI/OCR are not implemented yet and must be described as planned / in preparation / under consideration.

Trial strategy:

Starter should be presented as a planned 30-day free trial, so salons can test product registration, photos, order sheets, receiving, receipt management, and reports in real daily work before paid use begins.

## Hero copy candidates for A/B testing

- A: 今日からスマホが、サロンの在庫管理端末に。
- B: 紙やExcelの抜け漏れを、B-toryでシンプルに。
- C: 在庫・発注・納品・領収書まで、サロンワークをひとつに。
- D: スマホで見える。発注までつながる。領収書も残せる。

## 事業者情報

公開ページには、以下の会社名・代表者・所在地・連絡先を掲載します。

### 日本語表記

- 会社名：The good things 株式会社
- 代表責任者：代表取締役社長　道下 大輔
- 所在地：〒150-0001 東京都渋谷区神宮前六丁目23番4号 桑野ビル2階
- 連絡先：salon@thegoodthings-inc.com / 03-6824-4380

### 英語表記

- Company：The good things K.K.
- Representative：Daisuke Michishita, CEO / Representative Director
- Address：Kuwano Bldg. 2F, 6-23-4 Jingumae, Shibuya-ku, Tokyo 150-0001, Japan
- Contact：salon@thegoodthings-inc.com / +81-3-6824-4380

### Apple Developer 登録情報（内部メモ）

一般公開ページには Apple Developer 登録IDを基本的に表示しません。Apple Store提出やアカウント確認時の内部メモとしてのみ使用します。

- Apple Developer 登録メール：salon@thegoodthings-inc.com
- Apple Developer 登録ID：954D65W9N7

## 公開前 TODO（プレースホルダー）

- [ ] 各 HTML の `canonical` / `og:url` / `og:image` の `https://thegoodthings-inc.github.io/b-tory-free/` を**実際の公開URL**に置換
  - ※ 現在の GitHub アカウントは `daimichishita-hue` です。`thegoodthings-inc` で公開する場合は同名の GitHub Organization が必要です。
- [ ] iPhone/iPad/Mac版のApple Store URL確定後、「Apple Storeで公開予定」ボタンを実リンクに差し替え
- [ ] Windows版のMicrosoft Store URLまたは公式ダウンロードURL確定後、「Windows版 準備中」ボタンを実リンクに差し替え
- [ ] Android版を提供する場合は、その時点で対応端末・FAQ・ダウンロード導線を追加
- [ ] 必要に応じて `/en/` `/zh/` `/es/` を追加（主要コピーは短く翻訳しやすい構成）

## ブランド方針

`../B-tory_DIFFERENTIATION.md` に準拠。他社LPのデザイン・文言・レイアウト・配色をコピーせず、B-tory 独自（仕入先別・メーカー別・カテゴリ別整理、書類管理、Free Starterスタート、Bauhaus風ブランド）を前面に出しています。

## Pricing strategy (Free Starter / Starter trial)

**Free Starter strategy:**
Free Starter remains visible as an entry plan, but it is limited and not intended for full salon operation.
It should let users experience B-tory's core workflow, while serious users naturally move to Starter.
Limits: 20 products / 10 photos / 5 documents / 20MB / 2 suppliers / 1 staff / 1 device /
3 order sheets per month / 1 Excel template per month / simple material cost only /
manual JSON backup only / no cloud sync / no multi-device sync / no staff sharing.

**Starter trial strategy:**
The 30-day Starter trial is shown as a standalone CTA (`#starter-trial`) below the pricing table,
not inside the Starter card. The Starter card emphasizes ¥1,980/month (¥19,800/year planned).
The trial is a conversion path for users who are interested but not ready to commit.
The Hero "30日無料トライアルを見る" button scrolls to `#starter-trial`.

All purchase/subscription/trial actions are NOT implemented yet — buttons stay
`is-disabled` / `aria-disabled="true"`. Copy is i18n-driven (`pricing`, `trial`, `faq`)
in `assets/site-i18n.js` for ja / en / zh / es.

## Pricing limit rationale (updated)

Small salons often manage a wide range of materials, including color products, treatment
products, retail products, consumables, suppliers, delivery notes, and receipts.
Free Starter should allow enough data to experience the B-tory workflow, so 50 products
is more appropriate than 20. Starter at 300 products is positioned for one-person and
small salons. Pro expands to 1000 products, cloud backup, multi-device sync, and staff sharing.

- Free Starter: 50 products / 30 photos / 10 documents / 100MB / 5 suppliers
- Starter: 300 products / 300 photos / 1GB / 30 suppliers
- Pro: 1000 products / 1000 photos / 5GB / 100 suppliers / 5 staff
- Max: large capacity / 50GB+ / 10+ staff / integrations

All paid plans, cloud, sync, and staff sharing are described as planned / in preparation;
buttons stay disabled (no billing implemented).
