import { Message, Whatsapp } from "venom-bot";
import { callApi } from "./api/api";
import { createMsgSaudacao } from "./api/extra";

//https://docs.google.com/document/d/1eyDmMN8y23Nbj1iAoMKknIhnpxGShFmB/edit#

export function loadLanguage(manager: any){
  manager = loadEntities(manager);

  manager.addDocument('pt', '%saudacoes%', 'saudacao');
  manager.addAnswer('pt', 'saudacao', '{{saudacoes}}. Como posso ajudá-lo?');
  manager.addAnswer('pt', 'saudacao', '{{saudacoes}}. Em que posso ser útil?');

  manager.addDocument('pt', '%preciso% obter ajuda', 'sistema.obter');
  manager.addAnswer('pt', 'sistema.obter', 'Entendido. Para qual sistema SIAI você necessita de ajuda?');

  manager.addDocument('pt', 'siai concursos', 'concursos.obter');
  manager.addAnswer('pt', 'concursos.obter', 'Entendido. Qual a sua dúvida sobre o SIAI Concursos?');

  manager.addDocument('pt', 'cadastro concurso', 'concursos.cadastro.concurso');
  manager.addAnswer('pt', 'concursos.cadastro.concurso', 'Existe algumas formas de cadastrar um concurso: \n' +
                    '1. Na tela inicial, clique no botão CADASTRAR UM NOVO CONCURSO \n' +
                    '2. No menu lateral, selecione CONCURSOS e em seguida, CADASTRAR NOVO CONCURSO');

  manager.addDocument('pt', 'cadastro ato concurso', 'concursos.cadastro.ato');
  manager.addAnswer('pt', 'concursos.cadastro.ato', 'Existe algumas formas de cadastrar um  ato concurso: \n' +
                    '1. Na tela inicial, clique no botão CONSULTAR LISTAGEM DE CONCURSOS CADASTRADOS \n' +
                    '1.1 Escolha um dos concursos da lista, e clica no botão Ato do Concurso \n' +
                    '2. No menu lateral, selecione CONCURSOS e em seguida, CONSULTAR LISTAGEM DE CONCURSOS CADASTRADOS e siga o passo 1.1 já descrito');








  manager.addDocument('pt', 'não era isso', 'sistema.negativo');
  manager.addAnswer('pt', 'sistema.negativo', 'Desculpe o mau entendido :-(');

  return manager;
}

function loadEntities(manager: any){
  manager.addNamedEntityText(
    'saudacoes',
    'oi',
    ['pt'],
    ['oi', 'bom dia', 'boa tarde', 'boa noite', 'e ae', 'olá'],
  );
  manager.addNamedEntityText(
    'preciso',
    'quero',
    ['pt'],
    ['quero', 'preciso', 'necessito'],
  );

  return manager;
}

export function log(response: any, message: Message, client: Whatsapp, callAPI: boolean){
  // console.log(response);
  // console.log(message);

  console.log("intent: ", response.intent);
  console.log("score: ", response.score);
  console.log("mensagem recebida: ", response.utterance);
  console.log("mensagem respondida: ", response.answer);
  console.log("número de telefone do usuário: ", message.from.substring(0,message.from.length-5));
  console.log("número de telefone do bot: ", message.to.substring(0,message.to.length-5));

  let msgRecebida = response.utterance;
  let msgEnviada = response.answer;
  let telefone = message.from.substring(0,message.from.length-5);
  if(telefone.length == 12){
    telefone = message.from.substring(2,4) + '9' + message.from.substring(4,message.from.length-5);
  }
  if(response.intent === "None"){
      msgEnviada = "Desculpa. Não consegui te entender."
  }
  
  if(callAPI){
    callApi(msgRecebida, msgEnviada, telefone, client, message);
  } else {
    if(response.intent == 'saudacao'){
      createMsgSaudacao(msgRecebida, msgEnviada, telefone, client, message);
    } else {
      client.sendText(message.from, "[Whatsapp Bot] " + msgEnviada);
    }
    
  }

}



