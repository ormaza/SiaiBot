const uuid = require('uuid');
var aSession = {};

module.exports = {
    getSession(key) {
        if(aSession[key] == undefined) {
            aSession[key] = uuid.v4();
        } 
        return aSession[key];
    }
}