# FOM: Fairy Online Manager

> 筑波大学体育会フェアリースキークラブのウェブサイトおよび合宿の管理システム

## 目的

- メーリングリストを使った合宿実施および日程の連絡を，合宿の予定一覧を把握できる画面で置き換える
- メーリングリストに返信する形で合宿の参加申請を行っていたのを，オンラインのフォームで置き換える
- 合宿の参加者一覧を表として，誰でも確認できるようにする
- 古くなっていたサークルのホームページを更新する

## 前提

- docker
- docker-compose
- node.js v10.16.3
- yarn

## 開発環境の構築

### env設定

`.env` ファイルを生成します．

```bash
cp .env.example .env
```

`.env` ファイルの次の項目を設定する必要があります．

```
ADMIN_USER_NAME=
ADMIN_USER_PASSWORD=
GENERAL_USER_NAME=
GENERAL_USER_PASSWORD=
JWT_KEY=
```

`ADMIN_USER_NAME`, `GENERAL_USER_NAME` にはそれぞれ管理，一般ユーザのユーザ名を設定します．`JWT_KEY` はJWT生成に使われるキーになるので，適当な文字列を設定してください．`ADMIN_USER_PASSWORD` および `GENERAL_USER_PASSWORD` それぞれ管理，一般ユーザのパスワードハッシュです．

次のようなワンライナーを使ってパスワードハッシュを生成して，その結果を指定してください．

```bash
php -r "var_dump(password_hash(trim(fgets(STDIN)), PASSWORD_BCRYPT));"
# 実行すると入力を受け付けるので，ここにハッシュ化したいパスワードを入力します．
```

### PHPサーバの初期化

```bash
# php dependencies のインストール
docker-compose run web composer install
# sqliteファイルの生成
touch database/db.sqlite 
# データベースのマイグレーション
docker-compose run web php artisan migrate
```

### フロントエンドの初期化

以下は `frontend/` で実行します．

```bash
# npm dependenciesのインストール
yarn install
```

# 開発

```bash
# APIサーバの起動
docker-compose up
cd frontend
# webpack-dev-serverの起動
yarn dev
```

`localhost:8000/~fairyski` にAPIサーバが，`localhost:3000/~fairyski` にフロントエンドが立ち上がります．`localhost:3000/~fairyski/api/(.*)` にむけたリクエストは，`localhost:8000` のAPIサーバにむけられるので，開発の際は，`localhost:3000/~fairyski` を参照します．
