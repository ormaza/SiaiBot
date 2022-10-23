const venom = require('venom-bot');
const fs = require('fs');
const dFlow = require('./dialogflow-rq');
const tceapi = require('./tceapi');
const historico = require('./historico');
const mensagem = require('./mensagem');
const sessao = require('./sessao');
const mail = require('./mail');

venom
  .create(
    'SIAIBOT',
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log(asciiQR); 
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      require('fs').writeFile(
        'img/out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
    },
    undefined,
    { logQR: false }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });


function start(client) {
  client.onMessage((message) => {
    if (message.isGroupMsg == false) {
      var numTelefone = message.from.substring(0,message.from.length-5);
      var sessionId = sessao.getSession(numTelefone);
      console.log("chama sendMessageToBot()")
      mensagem.sendMessageToBot(client, message, sessionId);
    }
  });
}

// venom
//   .create({
//     session: 'SIAIBOT', //name of session
//     multidevice: true // for version not multidevice use false.(default: true)
//   })
//   .then((client) => start(client))
//   .catch((erro) => {
//     console.log(erro);
//   });

// function start(client) {
//   client.onMessage((message) => {
//     console.log(message)
//     if (message.body === 'Hi' && message.isGroupMsg === false) {
//       client
//         .sendText(message.from, 'Welcome Venom 🕷')
//         .then((result) => {
//           console.log('Result: ', result); //return object success
//         })
//         .catch((erro) => {
//           console.error('Error when sending: ', erro); //return object error
//         });
//     }
//   });
//   return;
// }