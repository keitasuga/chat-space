$(document).on('turbolinks:load', function() {
  function scroll() {
    $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
  }
  function buildHTML(message){
    var html = `<div class="message" data-id= ${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content"> ${message.text}
                    </p>
                    ${message.image? `<img src=${message.image} class='lower-message__image'>` : "" }
                  </div>
                </div>`
    return html;
  }
  $("#new_message").submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var messages = $('.messages')
      var html = buildHTML(data);
      messages.append(html);
      scroll();
      $('#new_message')[0].reset();
      $(".form__submit").prop("disabled", false);
    })
    .fail(function(){
      alert('error');
      $('#new_message')[0].reset();
      $(".form__submit").prop("disabled", false);
    })
  })
  $(function(){
    setInterval(update, 5000);

  });

  function update(){
    if($('.messages')[0]){
      var message_id = $('.message:last').data('id');
      var url = $(this).attr('baseURI')
    }
    else {
      var message_id = 0
    }
    $.ajax({
     url: url,
     type: 'GET',
     data: {
       message: { id: message_id }
     },
     dataType: 'json'
    })
    .always(function(messages){
      if (messages.length > 0){
        messages.forEach(function(message){
          var html = buildHTML(message);
          $('.messages').append(html)
          scroll();
        });
      }
    });
  }
})
