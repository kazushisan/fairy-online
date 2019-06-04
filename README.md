# FOM: Fairy Online Manager

https://www.stb.tsukuba.ac.jp/~fairyski/
筑波大学体育会フェアリースキークラブのウェブサイトおよび合宿の管理システム

サークルで冬の間に行われるスキー合宿のたびに次の作業が必要でした。
- スキー合宿の実施と日程、参加者の募集を知らせるメールの送信
- 参加希望者から個別に来るメールの集計
- 参加者募集の締め切り日をリマインドするメールの送信
- 締め切り後の変更への対応
- 宿泊先、講習の手配
- 合宿レジュメの公開

このような作業をなるべく楽にこなしたかった・またメールでの管理には限界があるので、合宿のスケジュールおよび参加者を管理するシステムを開発しました。また、ついでに古くなってたウェブサイトも更新しておきました。

当初はVue.jsとES6で適当に作ったものを利用していましたが、勉強も兼ねてReact, Typescriptなどでリファクタしました。維持できなければ意味がないので、なるべくDependencyを減らして、管理者がいなくても（しばらくは）とりあえず動くものを目指しました。本当はFirebaseあたりを使ってバックエンドを作るといい感じだと思いますが、そのような方針もあって今回は大学が提供するApache + PHPサーバを利用しました。[（こちら）](http://www.stb.tsukuba.ac.jp/)

そのため、データはjsonファイルに保存する（微妙な）仕様にしました。

大学のサーバはせいぜいPHPが動くぐらいなので、通知を送信することができません。そのため、Google Apps Scriptを使ってTypescriptのスクリプトを定期実行し、リマインドや通知のメールを送信するようにしました。

## 使ったもの

- React
- MobX
- Ant Design React Components
- Typescript
- Sass
- Webpack
- Docker
- PHP
- Google Apps Scripts
- yarn
- CircleCI

などなど

![structure](https://user-images.githubusercontent.com/29304238/52542714-07513000-2de6-11e9-8ddc-39ae0825a9f1.png)

↑フロントエンドを中心とした構成がだいたいわかる図

## Prerequisites
- Docker
- Node.js v10.15

## 開発環境の構築
```
$ yarn install
$ docker-compose run web composer install
$ php ./misc/generate_password.php # ./data/passwords.json がない場合
$ echo "[]" > ./data/events.json #データを保存する`data/events.json`の初期化
```

## Development Envrionment
```
$ docker-compose up # サーバの起動
$ yarn watch # ファイルのビルド
```
`http://localhost:8000/~fairyski`にサーバが立ち上がります。実際の管理画面は`http://localhost:8000/~fairyski/login`よりログインできます。


## TODO

- バックエンドが微妙なのでLaravel Lumenあたりを使ってリファクタする。
- 404ページの作成
