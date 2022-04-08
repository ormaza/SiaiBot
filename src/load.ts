export function loadLanguage(manager: any){
  manager.addDocument('pt', 'bom dia', 'saudacao');
  manager.addDocument('pt', 'olá', 'saudacao');
  manager.addDocument('pt', 'olá tudo bem', 'saudacao');
  manager.addDocument('pt', 'oi', 'saudacao');
  manager.addDocument('pt', 'boa tarde', 'saudacao');
  manager.addDocument('pt', 'boa noite', 'saudacao');
  manager.addDocument('pt', 'e ae', 'saudacao');
  
  manager.addAnswer('pt', 'saudacao', 'Olá. Como posso ajudá-lo?');
  manager.addAnswer('pt', 'saudacao', 'Olá. Em que posso ser útil?');
  
  manager.addDocument('pt', 'onde fica', 'localizacao');
  manager.addDocument('pt', 'aonde fica', 'localizacao');
  manager.addDocument('pt', 'qual o ponto de referência', 'localizacao');
  manager.addDocument('pt', 'qual o endereço', 'localizacao');
  manager.addDocument('pt', 'qual a localização', 'localizacao');
  
  manager.addAnswer('pt', 'localizacao', 'Fica lá em riba');
  manager.addAnswer('pt', 'localizacao', 'Fica na pqp');
  return manager;
}

export function log(response: any, message: any){
  console.log("intent: ", response.intent);
  console.log("score: ", response.score);
  console.log("mensagem recebida: ", response.utterance);
  console.log("mensagem respondida: ", response.answer);
  console.log("número de telefone do usuário: ", message.from.substring(0,message.from.length-5));
  console.log("número de telefone do bot: ", message.to.substring(0,message.to.length-5));
  console.log("data e hora: ", new Date());
}



