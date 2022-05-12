const venom = require('venom-bot');
const fs = require('fs');
const dFlow = require('./dialogflow-rq');
var nodemailer = require('nodemailer');
const uuid = require('uuid');

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
      var sessionId = getSession(numTelefone);
      var machineLearningRequest = await dFlow.sendDialogFlow(message.body, sessionId);

      // console.log("intent: ", machineLearningRequest.IntentName)
      // console.log('machineLearningRequest:', machineLearningRequest);

      switch(machineLearningRequest.IntentName)
      {
        case 'saudacao':
          addNomeOperador(client, message, machineLearningRequest.Response);
          break;
        case 'concursos.cadastro.concurso':
          enviarMensagem(client, message, machineLearningRequest.Response);
          client.sendImage(message.from, 'https://raw.githubusercontent.com/ormaza/ormaza.github.io/master/siai%20bot/images/concursos.cadastro.concurso.png','','');
          break;
        case 'Default Fallback Intent - yes':
          enviarMensagem(client, message, machineLearningRequest.Response);
          enviarEmail(numTelefone);
          break;
        default:
          enviarMensagem(client, message, machineLearningRequest.Response);
          break;
      }

      //HISTORICO
      addHist(numTelefone, message.body, false)
      addHist(numTelefone, machineLearningRequest.Response, true)
      // getHist(numTelefone)
    }
  });
}

async function enviarMensagem(client, message, response)
{
  await client.sendText(message.from, response).then((result) => {
    // console.log('Result: ', result);
  });
}

async function addNomeOperador(client, message, msgEnviada)
{
  const urlBaseTceAdmin = 'http://tceadmin2feature.tce.govrn/api/v2/';
  const axios = require('axios');
  var config = { headers: { 
    'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IlNJQUkgQk9UIiwicm9sZSI6Ik1UQXVNalF1TUM0eE13IiwidGlwb0NvbnRhIjoiUyIsIm9wZXJhdG9yIjoiMyIsImlkU2Vzc2FvIjoiMCIsImlkVGlwb09wZXJhZG9yRXh0ZXJubyI6IjAiLCJQcmltZWlyb0FjZXNzbyI6ImZhbHNlIiwiaWRPcGVyYWRvciI6IiIsImlzcyI6Imh0dHA6Ly90Y2VvYXV0aC50Y2Uucm4uZ292LmJyIiwiYXVkIjoiZTFhNWFkNjdiYWEyNDM1YzhlNWYyMzdhODhlZThmZTYiLCJleHAiOjI1MzQwMjMwMDgwMCwibmJmIjoxNjQ5NzMyNDkxfQ.8vaYbiswt-EoW6SMMyJl0kkBixOrDRI_XaZXUEWEUso',
    'Content-Type': 'application/x-www-form-urlencoded'
  }};
  var numeroCelular = message.from.substring(0,message.from.length-5);
  if(numeroCelular.length == 12){
    numeroCelular = message.from.substring(2,4) + '9' + message.from.substring(4,message.from.length-5);
  }
  var enviou = false;

  axios.get(urlBaseTceAdmin + 'PessoaFisica/', config).then((res) => {
    for(let i = 0; i < res.data.length; i++){
      if(res.data[i].telefoneCelularPessoaFisica == numeroCelular){
        let nomeOperador = res.data[i].nomePessoaFisica;
        msgEnviada = msgEnviada.substring(0, msgEnviada.indexOf("!")) + ' ' + nomeOperador + msgEnviada.substring(msgEnviada.indexOf("!"), msgEnviada.length);
        client.sendText(message.from, msgEnviada).then((result) => {
          // console.log('Result: ', result);
        });
        enviou = true;
        break;
      } 
    }

    if(!enviou) enviarMensagem(client, message, msgEnviada);
  })
  .catch((error) => {
    // console.log(error);
    enviarMensagem(client, message, msgEnviada);
  });
}


//HISTORICO

var aMap = {};

function addHist(key, value, isBot) {
  let data = new Date();
  let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds(); 
  var mensagem = "(" + dataFormatada + ")";
  if(aMap[key] == undefined) aMap[key] = "";
  if(isBot){
    mensagem += " SIAI BOT" + ": " + value + "\n";
  } else {
    mensagem += " " + key + ": " + value + "\n";
  }
  aMap[key] += mensagem;
}

function getHist(key) {
    console.log("HISTORICO")
    console.log(aMap[key])
}

function clearHist(key) {
  if(aMap[key] != undefined) aMap[key] = "";
}

//GERENCIADOR DE SESSOES

var aSession = {};

function getSession(key) {
  if(aSession[key] == undefined) {
    aSession[key] = uuid.v4();
  } 
  return aSession[key];
}


//EMAIL

function enviarEmail(numTelefone){
  // Configurações do Email
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ormazabalnascimento@gmail.com',
      pass: 'uwqnewutycuuzxby'
      // Para gerar uma senha no Gmail: 
      // 1 - Entre na configuração de segurança da conta da Google (https://myaccount.google.com/security)
      // 2 - Abra opção "App Passwords"
      // 3 - Escolha o App "Mail"
      // 4 - Escolha o Dispositivo "Other" e dê um nome desejado ("nodemailer", por exemplo)
      // 5 - Copie a senha gerada e cole aqui no código
    }
  });
  
  var mailOptions = {
    from: 'ormazabalnascimento@gmail.com',
    to: 'ormazaball@yahoo.com.br',
    subject: 'SIAI BOT HISTÓRICO',
    text: aMap[numTelefone] 
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      clearHist(numTelefone);
    }
  });
}