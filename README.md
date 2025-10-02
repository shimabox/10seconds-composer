# 10seconds-composer

10秒間の作曲家

## これは何？

任意の作曲家名を入力すると、その作曲家をイメージした音(コード進行)をブラウザ上で鳴らすことができます。

## 仕組み

- コード進行はOpenAIのAPIを使って生成させています
  - Next.js API Routeを経由してサーバーサイドでOpenAI APIを呼び出し
  - コード進行はjson形式で出力させています
  - 10秒程度の音が鳴るようにAIさんにしてもらっています
- [Tone.js](https://tonejs.github.io/ "Tone.js") を利用して、ブラウザ上で音を鳴らしています
- openAIのAPIで生成したjsonをパラメータとして、`Tone.js`に渡しています

## Demo

<div><video controls src="https://github.com/shimabox/10seconds-composer/assets/2285196/7375c542-714f-4486-8b49-4d6fd3aa4485
" muted="false"></video></div>

## :warning::warning: 注意(免責) :warning::warning:

Next.js API Routeを経由してサーバーサイドでOpenAI APIを呼び出すため、APIキーはブラウザに露出しませんが、エンドポイント（`/api/generate`）は誰でもアクセス可能なため、あくまでも個人、ローカルで楽しむようにしてください。

なにかあっても筆者は責任が取れません。

## 初期設定

### 環境

```sh
$ node -v
v20.18.0
$ yarn -v
4.1.1
```

※ [Volta](https://docs.volta.sh/guide/ "Introduction | Volta")を入れておくと楽です
※ Next.js 15を使用するため、Node.js 20.0.0以上が必要です

### 事前準備

OpenAIのAPIキーを発行してください。

### clone

```
$ git clone https://github.com/shimabox/10seconds-composer.git
$ cd 10seconds-composer
```

### envの設定

```
$ cp .env.example .env
$ vi .env
```

`OPENAI_API_KEY` に、事前準備で取得したOpenAIのAPIキーを入れてください。
`OPENAI_MODEL` は任意で修正してください。
※ デフォルトで [gpt-4o](https://platform.openai.com/docs/models/gpt-4o "Models - OpenAI API") を指定しています

```
OPENAI_API_KEY='xxxxx'
OPENAI_MODEL='gpt-4o'
```

### yarn install

```
$ yarn install
```

## 実行

### 開発モード

```
$ yarn dev
```

こちらのコマンドで http://localhost:3000 が立ち上がります。

### プロダクションビルド

```
$ yarn build
$ yarn start
```
