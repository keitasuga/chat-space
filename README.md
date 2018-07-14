* Database creation

## usersテーブル

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true, null: false, unique: true|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|string||
|image|string||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: faise, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group