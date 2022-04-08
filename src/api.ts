const axios = require('axios');

  axios.post('http://tuitefeature.tce.govrn/api/v1/Mensagem', {
    idDiretoria: '63',
    idSistema: '4038',
    assunto: 'titulo',
    mensagem: 'mensagem',
    podeResponder: true
  },
    {
        headers: { 
            'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IjAwOTUxODM3NDQzIiwicm9sZSI6Ik1Ua3lMakUyT0M0eE1UTXVNZyIsInRpcG9Db250YSI6IkQiLCJvcGVyYXRvciI6IjEiLCJpZFNlc3NhbyI6IjcyMTcwMyIsImlkVGlwb09wZXJhZG9yRXh0ZXJubyI6IjAiLCJQcmltZWlyb0FjZXNzbyI6InRydWUiLCJpZE9wZXJhZG9yIjoiOTMzMiIsImlzcyI6Imh0dHA6Ly90Y2VvYXV0aC50Y2Uucm4uZ292LmJyIiwiYXVkIjoiYjEyOTAxODdlYTI2NDdkY2EzYTA1MGVjOTRhOTI4OTEiLCJleHAiOjE2NDkzOTIzMTQsIm5iZiI6MTY0OTM4NTExNH0.KEureeODCjySENxx9eVHVPJnjkGV4wB0Enu1Uq4ycQA',
            'Content-Type' : 'text/plain' 
        }
    }
  ).then((response: any) => {
    console.log(response);
  })
  .catch((error: any) => {
    console.log(error);
  });