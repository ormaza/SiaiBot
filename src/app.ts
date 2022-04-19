import { create, Whatsapp } from 'venom-bot';
import { loadLanguage, log } from './load';
const { NlpManager } = require('node-nlp');
var manager = new NlpManager({ languages: ['pt'], forceNER: true });
var chamarAPITuite = false;

manager = loadLanguage(manager);
// manager.load();

(async() => {
    await manager.train();
    manager.save();

    create('SIAI BOT')
    .then((client) => {

      client.onMessage(async(message) => {

        if(message.isGroupMsg === false){
          const response = await manager.process('pt', message.body.toLowerCase());
          log(response, message, client, chamarAPITuite);

          // console.log(response);
          // console.log(message);
        }

      });

    })
    .catch((erro) => {
      console.log(erro);
    });

})();

