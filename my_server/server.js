const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const express = require('express');
const yaml = require('yaml'); // YAMLモジュールを追加
const app = express();

// SSL/TLS証明書の読み込み
const privateKey = fs.readFileSync('/etc/nginx/ssl/server.key', 'utf8');
const certificate = fs.readFileSync('/etc/nginx/ssl/server.crt', 'utf8');
const ca = fs.readFileSync('/etc/nginx/ssl/server.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: ca };

// HTTPSサーバーの作成
const httpsServer = https.createServer(credentials);

// 位置情報を保存するファイルのパス
const locationFilePath = 'location.yaml';

// WebSocketサーバーの作成
const wss = new WebSocket.Server({ server: httpsServer });

wss.on('connection', function connection(ws) {
  console.log('クライアントが接続しました');

  ws.on('message', function incoming(message) {
    console.log('受信したメッセージ:', message);

    // 受信したメッセージをYAMLファイルに保存
    try {
      const locationData = JSON.parse(message);
      const yamlStr = yaml.stringify(locationData);
      fs.writeFileSync(locationFilePath, yamlStr, 'utf8');
    } catch (e) {
      console.error('メッセージ処理エラー:', e);
    }

    // すべてのクライアントにメッセージをブロードキャスト
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', function close() {
    console.log('クライアントが切断しました');
  });
});

// YAMLファイルを提供するHTTPエンドポイント
app.get('/location.yaml', (req, res) => {
  res.sendFile(__dirname + '/' + locationFilePath);
});


// ExpressサーバーをWebSocketサーバーと同じHTTPSサーバー上で動かす
httpsServer.on('request', app);

// HTTPSサーバーをポート8080で起動
httpsServer.listen(8080, () => {
  console.log('HTTPSサーバーがポート8080で起動しました');
});

