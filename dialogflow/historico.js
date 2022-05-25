var aMap = {};

module.exports = {
    addHist(key, value, isBot) {
        let data = new Date();
        let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds(); 
        var mensagem = "(" + dataFormatada + ")";
        if(aMap[key] == undefined) aMap[key] = "";
        if(isBot){
            mensagem += " SIAI BOT" + ": " + value + "\n";
        } else {
            mensagem += " " + key + ": " + value + "\n";
        }
        aMap[key] += mensagem;
    },

    getHist(key) {
        console.log("HISTORICO")
        console.log(aMap[key])
    },

    clearHist(key) {
        if(aMap[key] != undefined) aMap[key] = "";
    },

    getObjHist(key) {
        return aMap[key];
    }
}