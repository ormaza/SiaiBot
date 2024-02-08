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
  client.onMessage(async (message) => {
    if (message.isGroupMsg == false) {
      var numTelefone = message.from.substring(0,message.from.length-5);
      var sessionId = sessao.getSession(numTelefone);
      var machineLearningRequest = await dFlow.sendDialogFlow(message.body, sessionId);

      historico.addHist(numTelefone, message.body, false);

      // console.log('machineLearningRequest:', machineLearningRequest);

      switch(machineLearningRequest.IntentName)
      {
        case 'saudacao':
          tceapi.addNomeOperador(client, message, machineLearningRequest.Response);
          break;
        case 'concursos.cadastro.concurso':
          mensagem.enviarMensagem(client, message, machineLearningRequest.Response);
          client.sendImage(message.from, 'https://raw.githubusercontent.com/ormaza/ormaza.github.io/master/siai%20bot/images/concursos.cadastro.concurso.png','','');
          break;
        case 'selecao.sistema.concursos':
          tceapi.possuiPerfil(client, message, "SIAIAP CONCURSOS JURISDICIONADO")
          mensagem.enviarMensagem(client, message, machineLearningRequest.Response);
          break;
        case 'Default Fallback Intent - fallback - yes':
          mensagem.enviarMensagem(client, message, machineLearningRequest.Response);
          mail.enviarEmail(numTelefone);
          break;
        default:
          mensagem.enviarMensagem(client, message, machineLearningRequest.Response);
          break;
      }
    }
  });
}