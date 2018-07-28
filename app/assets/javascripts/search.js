$(function(){
  function appendUser(user){
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name=${user.name}>追加</a>
              </div>`
    $("#user-search-result").append(html);
    console.log(user)
  }

  function appendNoUser(user){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user }
              </div>`
    $("#user-search-result").append(html);
  }

  function addToGroup(userId, userName){
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value= ${userId}>
                <p class='chat-group-user__name'> ${userName}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    $("#chat-group-users").append(html);
    console.log()
  }

  $('#user-search-field').on('keyup', function() {
    var input = $(this).val();
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser('該当するユーザーはいません。');
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
    $(document).on('click', '.user-search-add', function () {
      console.log(this)
      var userId = $(this).attr("data-user-id")
      var userName = $(this).attr("data-user-name")
      console.log(userName)
      $(this).parent(".chat-group-user").empty();
      addToGroup(userId, userName);
    });
    $(document).on('click', '.user-search-remove', function () {
      $(this).parent(".chat-group-user").empty();
    });
  });
});
