const axios = require('axios');
const urlBot = 'http://localhost:5005/';

module.exports = {
    sendMessageToBot(client, message, sessionId)
    {
        axios.post(urlBot + 'webhooks/rest/webhook', {
            message: message.body,
            sender: sessionId
        }).then((res) => {
            console.log(res.data[0].text);
            client.sendText(message.from, res.data[0].text).then((result) => {
                // console.log('Result: ', result);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
}