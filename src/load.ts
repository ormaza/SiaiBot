import { Message, Whatsapp } from "venom-bot";
import { callApi } from "./api/api";

//https://docs.google.com/document/d/1eyDmMN8y23Nbj1iAoMKknIhnpxGShFmB/edit#

export function loadLanguage(manager: any){
  manager = loadEntities(manager);

  manager.addDocument('pt', '%saudacoes%', 'saudacao');
  manager.addAnswer('pt', 'saudacao', '{{saudacoes}}. Como posso ajudá-lo?');
  manager.addAnswer('pt', 'saudacao', '{{saudacoes}}. Em que posso ser útil?');

  manager.addDocument('pt', 'ajuda', 'sistema.obter');
  manager.addAnswer('pt', 'sistema.obter', 'Entendido. Para qual sistema SIAI você necessita de ajuda?');

  manager.addDocument('pt', 'ajuda sobre %siaiconcursos%', 'concursos.obter');
  manager.addAnswer('pt', 'concursos.obter', 'Entendido. Qual a sua dúvida sobre o SIAI Concursos?');

  manager.addDocument('pt', 'cadastro concurso', 'concursos.cadastro.concurso');
  manager.addAnswer('pt', 'concursos.cadastro.concurso', 'Existe algumas formas de cadastrar um concurso: \n' +
                    '1. Na tela inicial, clique no botão CADASTRAR UM NOVO CONCURSO \n' +
                    '2. No menu lateral, selecione CONCURSOS e em seguida, CADASTRAR NOVO CONCURSO');
  return manager;
}

function loadEntities(manager: any){
  manager.addNamedEntityText(
    'siaiconcursos',
    'siai concursos',
    ['pt'],
    ['Siai Concursos', 'siaiconcursos', 'siai-concursos', 'siai concurso'],
  );
  manager.addNamedEntityText(
    'saudacoes',
    'oi',
    ['pt'],
    ['oi', 'bom dia', 'boa tarde', 'boa noite', 'e ae', 'olá'],
  );

  return manager;
}

export function log(response: any, message: Message, client: Whatsapp){
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
      msgEnviada = "[Whatsapp Bot] Desculpa. Não consegui te entender."
  }
  
  callApi(msgRecebida, msgEnviada, telefone, client, message);
}



