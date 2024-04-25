# 位置情報共有アプリケーション

このリポジトリには、Node.js、WebSocket、Pythonを使用した簡単な位置情報共有アプリケーションのファイルセットが含まれています。

## 概要

- `my_server/server.js`: HTTPSおよびWebSocketサーバーを起動し、クライアントからの位置情報を受け取って`location.yaml`ファイルに保存するNode.jsスクリプトです。また、HTTPエンドポイントを通じて`location.yaml`ファイルを提供します。
- `public_html/index.html`: ブラウザでユーザーの位置情報を取得し、WebSocketを介してサーバーに送信するためのクライアントサイドのインターフェースを提供するHTMLファイルです。
- `public_html/location.html`: WebSocketを介してサーバーから送信された位置情報を受信し、ブラウザに表示するためのクライアントサイドのインターフェースを提供するHTMLファイルです。
- `script/get_location.py`: HTTPS接続を介してサーバーから`location.yaml`ファイルを取得し、その内容をコンソールに出力するPythonスクリプトです。

## セットアップ

### 前提条件

- Node.jsとnpmがインストールされている必要があります。
- Pythonがインストールされており、`requests`、`pyyaml`、`urllib3`ライブラリが利用可能であること。

### インストール

1. リポジトリをローカルマシンにクローンします。
2. `my_server`ディレクトリに移動し、`npm install`を実行して必要なNode.jsモジュールをインストールします。
3. `server.js`に指定されているパスにSSL/TLS証明書ファイルが存在することを確認します。

## アプリケーションの実行

### サーバーの起動

1. `my_server`ディレクトリに移動します。
2. `node server.js`を実行してHTTPSおよびWebSocketサーバーを起動します。
3. サーバーはポート8080で接続を待ち受けます。

### クライアントインターフェースへのアクセス

- ウェブブラウザを開き、`https://<サーバーのアドレス>:8080`にアクセスして`index.html`ページにアクセスします。
- `location.html`ページを表示するには、`https://<サーバーのアドレス>:8080/location.html`にアクセスします。

### Pythonスクリプトの使用

1. `script`ディレクトリに移動します。
2. `python get_location.py`または`python3 get_location.py`を実行してスクリプトを実行します。
3. スクリプトはサーバーから`location.yaml`の内容を取得して表示します。

## セキュリティに関する注意

提供されているPythonスクリプト`get_location.py`は、自己署名証明書の使用によりSSL証明書の検証を無視します。これにはセキュリティリスクが伴うため、信頼できる環境でのみ使用してください。本番環境では、信頼できる認証局(CA)によって署名された証明書の使用が推奨されます。

## ライセンス

このプロジェクトはApache 2.0ライセンスのもとで公開されています - 詳細は[LICENSE](LICENSE)ファイルをご覧ください。
