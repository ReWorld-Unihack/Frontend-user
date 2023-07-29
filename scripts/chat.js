(function(){
    var chat = {
      keyword: ['xin chào', 'tai nạn', 'đắt không', 'gói dịch vụ', 'quá trình hỏa táng', 'là gì'],
      messageToSend: '',
      messageResponses: [
        'Xin chào bạn! Chúng tôi là ForeverPawprints, chúng tôi cung cấp dịch vụ hỏa táng cho thú cưng.',
        'Có, chúng tôi nhận thú cưng bị chết do tai nạn giao thông.', 
        'Chính sách giá của chúng tôi rất hợp lý và phù hợp với nhu cầu của khách hàng.',
        'Xin chào bạn thân mến, Hiện nay chúng tôi có 2 loại hình dịch vụ hỏa táng thú cưng là hỏa táng truyền thống và hỏa táng xác định',
        'Giá cả dịch vụ hỏa táng thú cưng phụ thuộc vào nhiều yếu tố như loại hình dịch vụ, khu vực, quy mô và các yêu cầu khác.',
        'Hỏa táng xác định thú cưng là quá trình đốt thi thể của thú cưng bằng lò đốt thi thể có kiểm soát nhiệt độ và thời gian."',
      ],
      init: function() {
        this.cacheDOM();
        this.bindEvents();
        this.render();
      },
      cacheDOM: function() {
        this.$chatHistory = $('.chat-history');
        this.$button = $('button');
        this.$textarea = $('#message-to-send');
        this.$chatHistoryList =  this.$chatHistory.find('ul');
      },
      bindEvents: function() {
        this.$button.on('click', this.addMessage.bind(this));
        this.$textarea.on('keyup', this.addMessageEnter.bind(this));
      },
      render: function() {
        this.scrollToBottom();
        if (this.messageToSend.trim() !== '') {
          var template = Handlebars.compile( $("#message-template").html());
          var context = { 
            messageOutput: this.messageToSend,
            time: this.getCurrentTime()
          };
  
          this.$chatHistoryList.append(template(context));
          this.scrollToBottom();
          this.$textarea.val('');
          // responses
          var templateResponse = Handlebars.compile( $("#message-response-template").html());
          var contextResponse = { 
            response: this.getResponseItem(this.keyword, this.messageResponses),
            // response: this.getRandomItem(this.messageResponses),
            time: this.getCurrentTime()
          };
          setTimeout(function() {
            this.$chatHistoryList.append(templateResponse(contextResponse));
            this.scrollToBottom();
          }.bind(this), 1500);
        }
      },
      
      addMessage: function() {
        this.messageToSend = this.$textarea.val()
        this.render();         
      },
      addMessageEnter: function(event) {
          // enter was pressed
          if (event.keyCode === 13) {
            this.addMessage();
          }
      },
      scrollToBottom: function() {
         this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
      },
      getCurrentTime: function() {
        return new Date().toLocaleTimeString().
                replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
      },
      getRandomItem: function(arr) {
          return arr[Math.floor(Math.random()*arr.length)];
        },
      getResponseItem: function(key, arr) {
          let res = '' 
          const asks = document.querySelectorAll('.message.other-message')
          let ask = asks[asks.length-1].textContent.replace(/\s/g, '').toLowerCase();
          key.forEach((text, index) => {
            let newText = text.replace(/\s/g, '')
            if(ask.includes(newText)) {
                res = arr[index]
            }
          })
          if(res) return res
          else return 'Xin lỗi chúng tôi chưa hiểu câu hỏi, bạn có thể giải thích rõ hơn không!';
      }
      
    };
    
    chat.init();
    
  })();
  