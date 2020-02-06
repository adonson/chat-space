$(function () {
  last_message_id = $('.message:last').data("message-id");
  console.log(last_message_id);
  function buildHTML(message) {
    var imageUrl = message.image ? message.image : '';
    var html = `<div class="chat-main__message-list__head" data-message-id="${message.id}">
                <div class="chat-main__message-list__head__user-name">
                  ${message.user_name}
                </div>
                <div class="chat-main__message-list__head__post-time">
                  ${message.created_at}
                </div>
              </div>
              <div class="chat-main__message-list__posted-message">
                ${message.content}
              </div>
              <div class="posted-message__image">
                <img class="" src="${imageUrl}">
              </div>
                </div>`
    return html
  }

  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (data) {
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight });
    })
    .fail(function () {
      alert("メッセージ送信に失敗しました");
      $('.form__submit').prop('disabled', false);
    });
  })

  var reloadMessages = function() {
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.chat-main__message-list').append(insertHTML);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight });
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 5000);
  }
});

