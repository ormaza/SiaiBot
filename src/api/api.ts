const axios = require('axios');
import { Message, Whatsapp } from 'venom-bot';
import { Memo } from '../models/memo';
var client: Whatsapp;
var message: Message;
const idOperadorBot = 9332;
const urlBaseTceAdmin = 'http://tceadmin2feature.tce.govrn/api/v2/';
const urlBaseTuite = "http://tuitefeature.tce.govrn/api/v1/"

var memory = new Map<string, Memo>();

var config = { headers: { 
  'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IjAxMzU2NjgzNDQ0Iiwicm9sZSI6Ik1Ua3lMakUyT0M0eE1UTXVNZyIsInRpcG9Db250YSI6IkQiLCJvcGVyYXRvciI6IjIiLCJpZFNlc3NhbyI6IjcyMzU0NCIsImlkVGlwb09wZXJhZG9yRXh0ZXJubyI6IjIiLCJQcmltZWlyb0FjZXNzbyI6InRydWUiLCJpZE9wZXJhZG9yIjoiMjM0MDIiLCJpc3MiOiJodHRwOi8vdGNlb2F1dGgudGNlLnJuLmdvdi5iciIsImF1ZCI6IjExYzYzOWZjNjg4NjRjODc5ZTE0YzM0MDJiNzRhMDRlIiwiZXhwIjoxNjQ5ODI0MDEyLCJuYmYiOjE2NDk4MTY4MTJ9.JZLaF1nCgkhHIuAIzu2pfvbmql22T8Z-jMqT3V0LAEw',
  'Content-Type': 'application/x-www-form-urlencoded'
}};

function getIdOperador(numeroCelular: string, msgEnviada: string, msgRecebida: string){
  axios.get(urlBaseTceAdmin + 'PessoaFisica/', config).then((res: any) => {

    let cpf;
    for(let i = 0; i < res.data.length; i++){
      if(res.data[i].telefoneCelularPessoaFisica == numeroCelular){
        cpf = res.data[i].cpf;
        break;
      } 
    }

    if(cpf != undefined){
      axios.get(urlBaseTceAdmin + 'OperadorExterno/GetByCPF?cpf=' + cpf, config).then((res: any) => {
        let idOperador = res.data[0].idOperador;
        postMessage(idOperador, numeroCelular, msgEnviada, msgRecebida, undefined);
      })
    } else {
      console.log('ERRO ao comunicar tuite: contato não cadastrado');
      sendMessage(msgEnviada);
      memory.set(numeroCelular, {
        idOperador: undefined!,
        idMensagemPai: undefined!,
      });
    }
  });
}

function postMessage(idOperador: number, numeroCelular: string, msgEnviada: string, msgRecebida: string, idMensagemPai?: number){

  let body = requisicaoMensagemRecebida(idOperador, msgRecebida);

  if(idMensagemPai != undefined){
    body += "&idMensagemPai=" + idMensagemPai;
  }

  axios.post(urlBaseTuite + 'Mensagem', body, config
        ).then((response: any) => {
          console.log("idMensagemCadastrada: ", response.data.idMensagem);
          idMensagemPai = response.data.idMensagem;

          body = requisicaoMensagemEnviada(idOperador, msgEnviada, idMensagemPai!);

          axios.post(urlBaseTuite + 'Mensagem', body, config
                ).then((response: any) => {
                  console.log("idMensagemCadastrada: ", response.data.idMensagem);
                  idMensagemPai = response.data.idMensagem;
                  
                  sendMessage(msgEnviada);
                  memory.set(numeroCelular, {
                    idOperador: idOperador,
                    idMensagemPai: idMensagemPai!,
                  });
                })
                .catch((error: any) => {
                  console.log(error);
                });
        })
        .catch((error: any) => {
          console.log(error);
        });

}

export function callApi(msgRecebida: string, msgEnviada: string, numeroCelular: string, clientL: Whatsapp, messageL: Message){
  client = clientL;
  message = messageL;

  if(memory.has(numeroCelular)){
    let idMensagemPai = memory.get(numeroCelular)?.idMensagemPai!;
    let idOperador: number = memory.get(numeroCelular)?.idOperador!;
    if(idMensagemPai == undefined || idOperador == undefined){
      sendMessage(msgEnviada);
    } else {
      postMessage(idOperador, numeroCelular, msgEnviada, msgRecebida, idMensagemPai);
    }
  } else {
    getIdOperador(numeroCelular, msgEnviada, msgRecebida);
  }

  memory.forEach((memo, key) => {
    console.log(memo);
  });
}

function requisicaoMensagemRecebida(idOperador: number, msgRecebida: string): string {
  let body = "idOperador=" + idOperador + "&";
      body += "assunto=ChatBot Recebe&"
      body += "mensagem=" + msgRecebida + "&"
      body += "podeResponder=true&"
      body += "destinatarios[0].idOperador=" + idOperadorBot;
  return body;
}

function requisicaoMensagemEnviada(idOperador: number, msgEnviada: string, idMensagemPai: number): string {
  let body = "idOperador=" + idOperadorBot + "&";
      body += "assunto=ChatBot Responde&"
      body += "mensagem=" + msgEnviada + "&"
      body += "podeResponder=true&"
      body += "idMensagemPai=" + idMensagemPai + "&"
      body += "destinatarios[0].idOperador=" + idOperador;
  return body;
}

function sendMessage(msgEnviada: string){
  client.sendText(message.from, "[Whatsapp Bot] " + msgEnviada);
}