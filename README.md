# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|email|string|null: false, unique: true|
|password|string|null: false|
|user_name|string||
### Association


## groupテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|group_name|string|null: false|
|menber.id|string||
### Association


## messageテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|content|text|null: false, foreign_key: true|
|image|bytea||
|create_at|date||
|user.id|integer|foreign_key: true|（投稿者）
### Association
- belongs_to :user


## menberテーブル(中間)
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|group.id|integer|foreign_key: true|
|user.id|integer|foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

