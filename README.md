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
|user_name|string|null: false, index: true|
### Association
- has_many :groups,through: :members
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|group_name|string|null: false|
### Association
- has_many :users, through: :members
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|content|text|null: false, foreign_key: true|
|image|bytea||
|create_at|date|null: false|
|users.id|integer|null: false, foreign_key: true|（投稿者）
|groups.id|intenger|null: false|
### Association
- belongs_to :users
- belongs_to :groups

## membersテーブル(中間)
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|groups.id|integer|null: false, foreign_key: true|
|users.id|integer|null: false, foreign_key: true|
### Association
- belongs_to :groups
- belongs_to :users


