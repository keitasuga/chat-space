$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var html = `<div class="message" >
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
      var scroll = function() {
        messages.animate({scrollTop:messages[0].scrollHeight});
      }
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
})
