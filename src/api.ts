const axios = require('axios');
var msgEnviadaG: string;
var msgRecebidaG: string;
const idOperadorBot = 9332;
var idMensagemPai: number;
const urlBaseTceAdmin = 'http://tceadmin2feature.tce.govrn/api/v2/';
const urlBaseTuite = "http://tuitefeature.tce.govrn/api/v1/"

var config = { headers: { 
  'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IjAxMzU2NjgzNDQ0Iiwicm9sZSI6Ik1Ua3lMakUyT0M0eE1UTXVNdyIsInRpcG9Db250YSI6IkQiLCJvcGVyYXRvciI6IjIiLCJpZFNlc3NhbyI6IjcyMjAzOSIsImlkVGlwb09wZXJhZG9yRXh0ZXJubyI6IjIiLCJQcmltZWlyb0FjZXNzbyI6InRydWUiLCJpZE9wZXJhZG9yIjoiMjM0MDIiLCJpc3MiOiJodHRwOi8vdGNlb2F1dGgudGNlLnJuLmdvdi5iciIsImF1ZCI6IjExYzYzOWZjNjg4NjRjODc5ZTE0YzM0MDJiNzRhMDRlIiwiZXhwIjoxNjQ5NTYxMjIyLCJuYmYiOjE2NDk1NTQwMjJ9.TOqeeOnk5RdRjXXRVx-eaHSvSXMK0LbtBu-p-QrJ-QA',
  'Content-Type': 'application/x-www-form-urlencoded'
}};

function getIdOperador(numeroCelular: string){
  axios.get(urlBaseTceAdmin + 'PessoaFisica/', config).then((res: any) => {

    let cpf;
    for(let i = 0; i < res.data.length; i++){
      if(res.data[i].telefoneCelularPessoaFisica == numeroCelular) cpf = res.data[i].cpf;
    }

    if(cpf != undefined){
      axios.get(urlBaseTceAdmin + 'OperadorExterno/GetByCPF?cpf=' + cpf, config).then((res: any) => {
        let idOperador = res.data[0].idOperador;
        sendMessage(idOperador);
      })
    } else {
      console.log('ENVIO NÃO REALIZADO: não foi possível obter o cpf')
    }
  });
}

function sendMessage(idOperador: number){

  let body = "idOperador=" + idOperador + "&";
      body += "assunto=ChatBot Recebe&"
      body += "mensagem=" + msgRecebidaG + "&"
      body += "podeResponder=true&"
      body += "destinatarios[0].idOperador=" + idOperadorBot;

  if(idMensagemPai != undefined){
    body += "&idMensagemPai=" + idMensagemPai;
  }

  axios.post(urlBaseTuite + 'Mensagem', body, config
        ).then((response: any) => {
          console.log("idMensagemCadastrada: ", response.data.idMensagem);
          idMensagemPai = response.data.idMensagem;

          body = "idOperador=" + idOperadorBot + "&";
          body += "assunto=ChatBot Responde&"
          body += "mensagem=" + msgEnviadaG + "&"
          body += "podeResponder=true&"
          body += "idMensagemPai=" + idMensagemPai + "&"
          body += "destinatarios[0].idOperador=" + idOperador;

          axios.post(urlBaseTuite + 'Mensagem', body, config
                ).then((response: any) => {
                  console.log("idMensagemCadastrada: ", response.data.idMensagem);
                  idMensagemPai = response.data.idMensagem;
                })
                .catch((error: any) => {
                  console.log(error);
                });
        })
        .catch((error: any) => {
          console.log(error);
        });

}



export function callApi(msgRecebida: string, msgEnviada: string, numeroCelular: string){
  msgEnviadaG = msgEnviada;
  msgRecebidaG = msgRecebida;
  getIdOperador(numeroCelular);
}