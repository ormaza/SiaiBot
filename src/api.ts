const axios = require('axios');

var config = { headers: { 
  'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IjAxMzU2NjgzNDQ0Iiwicm9sZSI6Ik1Ua3lMakUyT0M0eE1UTXVOUSIsInRpcG9Db250YSI6IkQiLCJvcGVyYXRvciI6IjIiLCJpZFNlc3NhbyI6IjcyMTg5NyIsImlkVGlwb09wZXJhZG9yRXh0ZXJubyI6IjIiLCJQcmltZWlyb0FjZXNzbyI6InRydWUiLCJpZE9wZXJhZG9yIjoiMjM0MDIiLCJpc3MiOiJodHRwOi8vdGNlb2F1dGgudGNlLnJuLmdvdi5iciIsImF1ZCI6IjExYzYzOWZjNjg4NjRjODc5ZTE0YzM0MDJiNzRhMDRlIiwiZXhwIjoxNjQ5NDcyNDM1LCJuYmYiOjE2NDk0NjUyMzV9.S40yhJ_ZY2u_g2wIOm_DqwPHCpeIOBMD0epVq8LyCXw',
  'Content-Type': 'application/x-www-form-urlencoded'
}};

function getIdOperador(numeroCelular: string){
  axios.get('http://tceadmin2feature.tce.govrn/api/v2/PessoaFisica/', config).then((res: any) => {

    let cpf;
    for(let i = 0; i < res.data.length; i++){
      if(res.data[i].telefoneCelularPessoaFisica == numeroCelular) cpf = res.data[i].cpf;
    }

    if(cpf != null){
      axios.get('http://tceadmin2feature.tce.govrn/api/v2/OperadorExterno/GetByCPF?cpf=' + cpf, config).then((res: any) => {
        console.log("chegou dado!!")
        return res.data.idOperador;
      })
    }
  });
}

var body = "";
body += "idUnidadeJurisdicionada=2&"
body += "idSistema=4038&"
body += "assunto=Teste&"
body += "mensagem=Teste&"
body += "idMarcador=1&"
body += "podeResponder=true&"
body += "destinatarios[0].idDiretoria=2";

export function callApi(){
  // axios.post('http://localhost:50777/api/v1/Mensagem', body, config
  // ).then((response: any) => {
  //   console.log(response);
  // })
  // .catch((error: any) => {
  //   console.log(error);
  // });

  var idOperador = getIdOperador("84988994787");

  let stop = setInterval(() => {
    if (idOperador != undefined){
      console.log(idOperador)
      clearInterval(stop);
    }
    console.log("aguardando")
    console.log(idOperador)
  }, 5000);

}