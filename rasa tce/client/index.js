const venom = require('venom-bot');
const fs = require('fs');
const dFlow = require('./dialogflow-rq');
const tceapi = require('./tceapi');
const historico = require('./historico');
const mensagem = require('./mensagem');
const sessao = require('./sessao');
const mail = require('./mail');

venom
  .create({
    session: 'SIAIBOT', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.isGroupMsg == false) {
      var numTelefone = message.from.substring(0,message.from.length-5);
      var sessionId = sessao.getSession(numTelefone);
      mensagem.sendMessageToBot(client, message, sessionId);
    }
  });
}