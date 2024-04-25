import requests
import yaml
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# YAMLファイルのURL
url = 'https://18.233.147.77:8080/location.yaml'

# 証明書の検証を無視するためのセッションを作成
session = requests.Session()
session.verify = False  # 警告: これはセキュリティリスクを伴います

# HTTP GETリクエストを送信してYAMLファイルを取得
response = session.get(url)

# レスポンスのステータスコードを確認
if response.status_code == 200:
    # レスポンスの内容をYAMLとして解析
    data = yaml.safe_load(response.content)
    # 解析したデータを表示
    print(data)
else:
    print(f'Error: Unable to fetch YAML file. Status code: {response.status_code}')
