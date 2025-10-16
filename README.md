# フロントエンドコーディング試験

このリポジトリは、株式会社ゆめみ様のフロントエンドコーディング試験の提出物です。  
指定された要件に基づき実装を行いました。

##  概要
- Next.js をベースに、TypeScript + Tailwind CSS で開発
- グラフ描画には Highcharts を使用
- コンポーネントの再利用性や視認性も意識した設計
- Figma で事前に簡易設計を実施し、Atomic Design にも配慮

## デプロイ

- Vercelによって自動でデプロイを行なっています
- 本番環境URL: [frontend-coding-chi.vercel.app](frontend-coding-chi.vercel.app)

## 技術スタック

|技術              |バージョン    |用途                       |
|-----------------|------------|---------------------------|
|React            |19.1.0      | UIライブラリ               |
|Next.js          |15.5.4      | フレームワーク              |
|TypeScript       |5.9.3       | 型定義                     |
|Tailwind CSS     |4.1.14      | CSS フレームワーク                |
|highcharts       |12.4.0      | グラフ描画ライブラリ            |
|React icons      |5.5.0       | アイコン                   |
|ESLint           |9.37.0      | 静的コード解析          |
|Prettier         |3.6.2       | コードフォーマッタ                 |
|Testing Library  |16.3.0      | テストユーティリティ         |
|ts-jest          |29.4.5      | JestでTypeScriptテスト                 |

---

## 実行までの環境セットアップ

1. リポジトリをクローンします

   ```bash
   git clone https://github.com/ice28992/frontend-coding.git
   cd frontend-coding
   ```

2. 依存関係をインストールします

   ```bash
   npm install
   ```

3. .env.localファイルを作成します

    ```bash
    NEXT_PUBLIC_API_KEY = "API KEY"
    ```

4. 開発サーバーを起動します

   ```bash
   npm run dev
   ```

5. ブラウザで `http://localhost:3000` を開いて動作を確認が可能です


## テスト実行用の環境セットアップ

1. jestとReact Testing Library依存関係のインストール

    ```bash
    npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
    ```




## ディレクトリ構成

```bash
## ディレクトリ構成

```bash
.
├── __test__/               # 単体テストなどのテストコード群
├── public/                 # 公開ファイル（icon）
├── src/                    # ソースコードのルート
│   ├── app/                # App Router用のページ構成
│   │   ├── favicon.ico     # サイトアイコン
│   │   ├── globals.css     # 全体のスタイル
│   │   ├── layout.tsx      # アプリ全体のレイアウト定義
│   │   ├── page.module.css # ページ固有のスタイル
│   │   └── page.tsx        # エントリポイント
│   └── components/         # コンポーネント群
│       ├── base/           # ヘッダー・フッターコンポーネント
│       └── ui/             # UIパーツ
├── .env.local              # 環境変数ファイル
├── .gitignore              # Git管理除外ファイル
├── .prettierignore         # Prettier整形対象除外ファイル
├── .prettierrc             # Prettier設定
├── eslint.config.mjs       # ESLint設定
├── jest.config.ts          # Jestの設定ファイル
├── jest.setup.ts           # Jestのセットアップファイル
├── next-env.d.ts           # Next.js 環境の型定義
├── next.config.ts          # Next.js の設定ファイル
├── package-lock.json       # npm依存関係ロックファイル
├── package.json            # プロジェクト設定・依存一覧
└── README.md               # プロジェクト概要
```

---

## 工夫した点・追加した機能
- モバイルファースト設計・レスポンシブ対応
- Atomic Design を意識したコンポーネント設計
- 型安全性を担保するため、props に明示的な型定義を徹底

- 都道府県の全選択/全解除ボタン：一括選択/解除が手軽にできる
- チェックボックス表示部分のみ折りたたみ機能：グラフの視認性向上

## 今後の改善点

- テストしやすいコードを意識的に書きたい
- コンポーネントの Storybook 化