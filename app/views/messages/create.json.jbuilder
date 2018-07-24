json.text  @message.text
json.user_id  @message.user.id
json.user_name @message.user.name
json.created_at l @message.created_at, format: :long
json.image @message.image.url
