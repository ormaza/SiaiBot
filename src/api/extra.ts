const axios = require('axios');
import { Message, Whatsapp } from 'venom-bot';
var client: Whatsapp;
var message: Message;
const idOperadorBot = 9332;
const urlBaseTceAdmin = 'http://tceadmin2feature.tce.govrn/api/v2/';

var nome = new Map<string, string>();

var config = { headers: { 
  'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IlNJQUkgQk9UIiwicm9sZSI6Ik1UQXVNalF1TUM0eE13IiwidGlwb0NvbnRhIjoiUyIsIm9wZXJhdG9yIjoiMyIsImlkU2Vzc2FvIjoiMCIsImlkVGlwb09wZXJhZG9yRXh0ZXJubyI6IjAiLCJQcmltZWlyb0FjZXNzbyI6ImZhbHNlIiwiaWRPcGVyYWRvciI6IiIsImlzcyI6Imh0dHA6Ly90Y2VvYXV0aC50Y2Uucm4uZ292LmJyIiwiYXVkIjoiZTFhNWFkNjdiYWEyNDM1YzhlNWYyMzdhODhlZThmZTYiLCJleHAiOjI1MzQwMjMwMDgwMCwibmJmIjoxNjQ5NzMyNDkxfQ.8vaYbiswt-EoW6SMMyJl0kkBixOrDRI_XaZXUEWEUso',
  'Content-Type': 'application/x-www-form-urlencoded'
}};

function addNomeOperador(numeroCelular: string, msgEnviada: string, msgRecebida: string){
  axios.get(urlBaseTceAdmin + 'PessoaFisica/', config).then((res: any) => {
    for(let i = 0; i < res.data.length; i++){
      if(res.data[i].telefoneCelularPessoaFisica == numeroCelular){
        let nomeOperador = res.data[i].nomePessoaFisica;
        nome.set(numeroCelular, nomeOperador);
        msgEnviada = msgEnviada.substring(0, msgRecebida.length) + ' ' + nomeOperador + msgEnviada.substring(msgRecebida.length, msgEnviada.length);
        sendMessage(msgEnviada);
        break;
      } 
    }
  })
  .catch((error: any) => {
    console.log(error);
    sendMessage(msgEnviada);
  });
}

export function createMsgSaudacao(msgRecebida: string, msgEnviada: string, numeroCelular: string, clientL: Whatsapp, messageL: Message){
  client = clientL;
  message = messageL;

  if(nome.has(numeroCelular)){
    let nomeOperador = nome.get(numeroCelular);
    if(nomeOperador != undefined){
      msgEnviada = msgEnviada.substring(0, msgRecebida.length) + ' ' + nomeOperador + msgEnviada.substring(msgRecebida.length, msgEnviada.length);
    }
    sendMessage(msgEnviada);
  } else {
    nome.set(numeroCelular, undefined!);
    addNomeOperador(numeroCelular, msgEnviada, msgRecebida);
  }
}

export function sendMessage(msgEnviada: string){
  client.sendText(message.from, "[Whatsapp Bot] " + msgEnviada);
}