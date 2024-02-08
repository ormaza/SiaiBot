const historico = require("./historico");
var nodemailer = require('nodemailer');

module.exports = {
     enviarEmail(numTelefone){
        // Configurações do Email
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'ormazabalnascimento@gmail.com',
            pass: 'uwqnewutycuuzxby'
            // Para gerar uma senha no Gmail: 
            // 1 - Entre na configuração de segurança da conta da Google (https://myaccount.google.com/security)
            // 2 - Abra opção "App Passwords"
            // 3 - Escolha o App "Mail"
            // 4 - Escolha o Dispositivo "Other" e dê um nome desejado ("nodemailer", por exemplo)
            // 5 - Copie a senha gerada e cole aqui no código
          }
        });
        
        var mailOptions = {
          from: 'ormazabalnascimento@gmail.com',
          to: 'ormazaball@yahoo.com.br',
          subject: 'SIAI BOT HISTÓRICO',
          text: historico.getObjHist(numTelefone)
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            historico.clearHist(numTelefone);
          }
        });
      }
}