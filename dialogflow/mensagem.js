const historico = require('./historico');

module.exports = {
    async enviarMensagem(client, message, mensagem)
    {
        var numTelefone = message.from.substring(0,message.from.length-5);
        await client.sendText(message.from, mensagem).then((result) => {
            // console.log('Result: ', result);
            historico.addHist(numTelefone, mensagem, true)
            // historico.getHist(numTelefone)
        });
    }
}