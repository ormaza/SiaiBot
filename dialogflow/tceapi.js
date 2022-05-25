const urlBaseTceAdmin = 'http://tceadmin2feature.tce.govrn/api/v2/';
const axios = require('axios');
const mensagem = require('./mensagem');

var config = { headers: { 
    'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IlNJQUkgQk9UIiwicm9sZSI6Ik1UQXVNalF1TUM0eE13IiwidGlwb0NvbnRhIjoiUyIsIm9wZXJhdG9yIjoiMyIsImlkU2Vzc2FvIjoiMCIsImlkVGlwb09wZXJhZG9yRXh0ZXJubyI6IjAiLCJQcmltZWlyb0FjZXNzbyI6ImZhbHNlIiwiaWRPcGVyYWRvciI6IiIsImlzcyI6Imh0dHA6Ly90Y2VvYXV0aC50Y2Uucm4uZ292LmJyIiwiYXVkIjoiZTFhNWFkNjdiYWEyNDM1YzhlNWYyMzdhODhlZThmZTYiLCJleHAiOjI1MzQwMjMwMDgwMCwibmJmIjoxNjQ5NzMyNDkxfQ.8vaYbiswt-EoW6SMMyJl0kkBixOrDRI_XaZXUEWEUso',
    'Content-Type': 'application/x-www-form-urlencoded'
}};

module.exports = {
    async addNomeOperador(client, message, msgEnviada)
    {
        var numeroCelular = message.from.substring(0,message.from.length-5);
        if(numeroCelular.length == 12){
            numeroCelular = message.from.substring(2,4) + '9' + message.from.substring(4,message.from.length-5);
        }
        var enviou = false;

        axios.get(urlBaseTceAdmin + 'PessoaFisica/', config).then((res) => {
            for(let i = 0; i < res.data.length; i++){
                if(res.data[i].telefoneCelularPessoaFisica == numeroCelular){
                    let nomeOperador = res.data[i].nomePessoaFisica;
                    msgEnviada = msgEnviada.substring(0, msgEnviada.indexOf("!")) + ' ' + nomeOperador + msgEnviada.substring(msgEnviada.indexOf("!"), msgEnviada.length);
                    mensagem.enviarMensagem(client, message, msgEnviada);
                    enviou = true;
                    break;
                } 
            }

            if(!enviou) mensagem.enviarMensagem(client, message, msgEnviada);
        })
        .catch((error) => {
            // console.log(error);
            mensagem.enviarMensagem(client, message, msgEnviada);
        });
    }
}