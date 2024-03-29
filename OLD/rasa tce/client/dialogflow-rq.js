const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

module.exports = {
  async sendDialogFlow(messagem, sessionId) {
    try {
      var projectId = 'siaiconcursos-twdq';
      const sessionClient = new dialogflow.SessionsClient();
      // console.log(sessionId);
      const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: messagem,
            languageCode: 'pt-BR',
          },
        },
      };
      var intentName;
      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;
      if (result.intent) {
        intentName = result.intent.displayName;
      } else {
        intentName = "fallback";
      }
      var ret = {
        "Query": result.queryText,
        "Response": result.fulfillmentText,
        "Parameters": result.parameters,
        "IntentName": intentName,
        "intentDetectionConfidence": result.intentDetectionConfidence,
        "sentimentAnalysisResult": result.sentimentAnalysisResult?.queryTextSentiment.score,
      }

      return ret;
    } catch (erro) {
      console.log("Invalid Format");
    }
  }
}