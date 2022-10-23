const urlBaseTceAdmin = 'http://tceadmin2feature.tce.govrn/api/v2/';
const axios = require('axios');
const mensagem = require('./mensagem');

var config = { headers: { 
    'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IlNJQUkgQk9UIiwicm9sZSI6Ik1UQXVNalF1TUM0eE13IiwidGlwb0NvbnRhIjoiUyIsIm9wZXJhdG9yIjoiMyIsImlkU2Vzc2FvIjoiMCIsImlkVGlwb09wZXJhZG9yRXh0ZXJubyI6IjAiLCJQcmltZWlyb0FjZXNzbyI6ImZhbHNlIiwiaWRPcGVyYWRvciI6IiIsImlzcyI6Imh0dHA6Ly90Y2VvYXV0aC50Y2Uucm4uZ292LmJyIiwiYXVkIjoiZTFhNWFkNjdiYWEyNDM1YzhlNWYyMzdhODhlZThmZTYiLCJleHAiOjI1MzQwMjMwMDgwMCwibmJmIjoxNjQ5NzMyNDkxfQ.8vaYbiswt-EoW6SMMyJl0kkBixOrDRI_XaZXUEWEUso',
    'Content-Type': 'application/x-www-form-urlencoded'
}};

var aCPF = {};

module.exports = {
    async addNomeOperador(client, message, msgEnviada)
    {
        var numeroCelular = message.from.substring(0,message.from.length-5);
        var key = numeroCelular;
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
                    if(aCPF[key] == undefined) aCPF[key] = res.data[i].cpf;
                    break;
                } 
            }

            if(!enviou) mensagem.enviarMensagem(client, message, msgEnviada);
        })
        .catch((error) => {
            // console.log(error);
            mensagem.enviarMensagem(client, message, msgEnviada);
        });
    },

    async possuiPerfil(client, message, perfil)
    {
        var numeroCelular = message.from.substring(0,message.from.length-5);
        var cpf = aCPF[numeroCelular];
        if(cpf == undefined) return;
        axios.get(urlBaseTceAdmin + 'Perfil/', config).then((res) => {
            for(let i = 0; i < res.data.length; i++){
                if(res.data[i].nomePerfil == perfil){
                    var idPerfil = res.data[i].idPerfil;
                    findPerfil(idPerfil, cpf, client, message);
                } 
            }
        }).catch((error) => {
            console.log(error);
        });
    }
}

function findPerfil(idPerfil, cpf, client, message)
{
    axios.get(urlBaseTceAdmin + 'OperadorExterno/GetByCPF?cpf=' + cpf, config).then((res) => {
        var idOperadorExterno = res.data[0].idOperadorExterno;
        findPerfilOperadorExterno(idOperadorExterno, idPerfil, client, message);
    }).catch((error) => {
        console.log(error);
    });
}

function findPerfilOperadorExterno(idOperadorExterno, idPerfil, client, message)
{
    axios.get(urlBaseTceAdmin + 'PerfilOperadorExterno/' + idOperadorExterno, config).then((res) => {
        var listaIdPerfil = res.data.perfis;
        var found = false;
        listaIdPerfil.forEach(element => {
            if(element == idPerfil) found = true;
        });
        var msg = "ATENÇÃO: Você não possui o perfil para acessar esse sistema. Contate o TCE para conseguir autorização."
        if(!found) mensagem.enviarMensagem(client, message, msg);
    }).catch((error) => {
        console.log(error);
    });
}