$(function(){
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
                    ${message.text? `<p class="lower-message__content"> ${message.text} </p>` : "" }
                    ${message.image? `<img src=${message.image} class='lower-message__image'>` : "" }
                  </div>
                </div>`
    return html;
  }
  $("#new_message").submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop:$('#scroll').offset().top});
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
