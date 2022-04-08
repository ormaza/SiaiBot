import { create, Whatsapp } from 'venom-bot';
import { loadLanguage, log } from './load';
const { NlpManager } = require('node-nlp');
var manager = new NlpManager({ languages: ['pt'], forceNER: true });

manager = loadLanguage(manager);

// Train and save the model.
(async() => {
    await manager.train();
    manager.save();

    create('BOT2')
    .then((client) => {

      client.onMessage(async(message) => {

        if(message.isGroupMsg === false){
          const response = await manager.process('pt', message.body.toLowerCase());
          // console.log(response);
          // console.log(message);

          log(response, message);

          if(response.intent === "None"){
            client.sendText(message.from, "[Whatsapp Bot] Desculpa po. Não te entendi.");
          } else {
            client.sendText(message.from, "[Whatsapp Bot] " + response.answer);
          }
          
        }

      });

    })
    .catch((erro) => {
      console.log(erro);
    });

})();

