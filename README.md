# 学習記録アプリ

## 概要

学習内容と時間を記録し、可視化するためのアプリケーションです

## 機能

- 学習内容、学習時間を記録することができる
- 学習内容、学習時間を削除することができる
- 記録した学習内容、学習時間を一覧表示できる
- 記録した学習時間の合計を表示できる

## 使用技術

- React
- Supabase（Database）
- Jest（テスト）
- GitHub Actions（CI/CD）

## セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/Seripro/kadai2.git
cd kadai2
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

#### 3-1. .envの作成

.envファイルをプロジェクト直下に作成する

#### 3-2. Supabase URL, Supabase ANON keyの設定

以下のように.env内にSupabaseプロジェクトのURLとANONkeyを設定する（XXXを自分のものに書き換える）

```env
REACT_APP_SUPABASE_URL=XXX
REACT_APP_SUPABASE_ANON_KEY=XXX
```

#### 3-3. Supabaseテーブルの準備

このアプリでは `study-record` テーブルを使用します

| カラム名 | 説明     |
| -------- | -------- |
| id       | 主キー   |
| title    | 学習内容 |
| time     | 学習時間 |

### 4. CI/CDのセットアップ

#### 4-1. GitHub上でリポジトリのSettings → Secrets and variables → Actionsに移動

#### 4-2. 環境変数を設定

以下の4つの変数を設定します

- FIREBASE_PROJECT_ID
- FIREBASE_TOKEN
- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_ANON_KEY

## 起動方法

```bash
npm run start
```

このプロジェクトはFirebase Hostingでホストされており、以下のURLでアクセスできます<br/>
https://study-record-da496.web.app/

## その他コマンド一覧

```bash
# ビルド
npm run build
```

```bash
# デプロイ
npx firebase deploy
```

```bash
# テスト
npm run test
```
