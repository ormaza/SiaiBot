rasa test nlu --nlu data/nlu.yml --config config_bertlabse.yml --cross-validation --folds 3
rasa test nlu --nlu data/nlu.yml --cross-validation --folds 3
rasa train --config config_gpt.yml

registros excluidos:
-registros sem resposta
-registros a cerca de processos/usuarios especificos
-registros que descrevem o atendimento e não apresentam a resposta
problemas:
-bertimbau/distilbert/gpt/gpt2/roberta uses a subword tokenizer (WordPiece), so the maximum length corresponds to 512 subword tokens. (grandes cadeias de texto foram excluidas)

ip: 10.7.15.145
usuário: ormazabal
senha: orm123
O acesso é por SSH e acredito que usa a porta padrão mesmo.

abra o terminal do git bash e digite: ssh ormazabal@10.7.15.145

.local/bin/rasa

cd tcc/rasa 
rasa train

remove all files: rm *

scp -r config.yml ormazabal@10.7.15.145:~/tcc/rasa
scp -r ormazabal@10.7.15.145:~/tcc/rasa/results \resultados


[20:22, 07/05/2023] Matheus Antonio: É que /tcc fica na pasta do teu usuário
[20:22, 07/05/2023] Matheus Antonio: Comando que a gente deu foi pwd
[20:23, 07/05/2023] Matheus Antonio: Aí ~ é um wildcard pra pasta do teu usuário
[20:23, 07/05/2023] Matheus Antonio: Sem ele seria algo do tipo :/home/ozama/tcc



# RESULTADOS


### DIET

2023-05-15 10:59:15 start
2023-05-15 17:27:40 INFO     rasa.model_testing  - CV evaluation (n=2)
2023-05-15 17:27:40 INFO     rasa.model_testing  - Intent evaluation results
2023-05-15 17:27:40 INFO     rasa.nlu.test  - train Accuracy: 0.986 (0.002)
2023-05-15 17:27:40 INFO     rasa.nlu.test  - train F1-score: 0.983 (0.002)
2023-05-15 17:27:40 INFO     rasa.nlu.test  - train Precision: 0.982 (0.002)
2023-05-15 17:27:40 INFO     rasa.nlu.test  - test Accuracy: 0.961 (0.000)
2023-05-15 17:27:40 INFO     rasa.nlu.test  - test F1-score: 0.955 (0.000)
2023-05-15 17:27:40 INFO     rasa.nlu.test  - test Precision: 0.957 (0.001)












2023-05-05 17:21:04 start
2023-05-05 22:35:30 INFO     rasa.model_testing  - CV evaluation (n=3)
2023-05-05 22:35:30 INFO     rasa.model_testing  - Intent evaluation results
2023-05-05 22:35:30 INFO     rasa.nlu.test  - train Accuracy: 0.983 (0.002)
2023-05-05 22:35:30 INFO     rasa.nlu.test  - train F1-score: 0.978 (0.002)
2023-05-05 22:35:30 INFO     rasa.nlu.test  - train Precision: 0.977 (0.002)
2023-05-05 22:35:30 INFO     rasa.nlu.test  - test Accuracy: 0.956 (0.004)
2023-05-05 22:35:30 INFO     rasa.nlu.test  - test F1-score: 0.950 (0.005)
2023-05-05 22:35:30 INFO     rasa.nlu.test  - test Precision: 0.951 (0.005)

"accuracy": 0.9562224669603524,
	"macro avg": {
	"precision": 0.9599774491294315,
	"recall": 0.9562224669603524,
	"f1-score": 0.9552718023533002,
	"support": 3632
}

### BERTimbau

2023-05-11 11:03:45 start CV (n=2)
2023-05-11 13:43:34

2023-05-14 07:30:32 INFO     rasa.model_testing  - CV evaluation (n=2)
2023-05-14 07:30:32 INFO     rasa.model_testing  - Intent evaluation results
2023-05-14 07:30:32 INFO     rasa.nlu.test  - train Accuracy: 0.983 (0.002)
2023-05-14 07:30:32 INFO     rasa.nlu.test  - train F1-score: 0.979 (0.002)
2023-05-14 07:30:32 INFO     rasa.nlu.test  - train Precision: 0.978 (0.002)
2023-05-14 07:30:32 INFO     rasa.nlu.test  - test Accuracy: 0.966 (0.003)
2023-05-14 07:30:32 INFO     rasa.nlu.test  - test F1-score: 0.962 (0.003)
2023-05-14 07:30:32 INFO     rasa.nlu.test  - test Precision: 0.964 (0.002)

"accuracy": 0.9666482910694597,
	"macro avg": {
	"precision": 0.9707788628130415,
	"recall": 0.9666482910694597,
	"f1-score": 0.9655151292417004,
	"support": 3628
}

2023-05-11 20:21:37 start CV (n=3)
2023-05-12 13:08:24 INFO     rasa.model_testing  - CV evaluation (n=3)
2023-05-12 13:08:24 INFO     rasa.model_testing  - Intent evaluation results
2023-05-12 13:08:24 INFO     rasa.nlu.test  - train Accuracy: 0.982 (0.002)
2023-05-12 13:08:24 INFO     rasa.nlu.test  - train F1-score: 0.977 (0.003)
2023-05-12 13:08:24 INFO     rasa.nlu.test  - train Precision: 0.975 (0.003)
2023-05-12 13:08:24 INFO     rasa.nlu.test  - test Accuracy: 0.963 (0.002)
2023-05-12 13:08:24 INFO     rasa.nlu.test  - test F1-score: 0.957 (0.003)
2023-05-12 13:08:24 INFO     rasa.nlu.test  - test Precision: 0.958 (0.003)

### BERTlabse

2023-05-12 09:19:14 start CV (n=2)
2023-05-12 11:58:31

2023-05-14 20:59:15 INFO     rasa.model_testing  - CV evaluation (n=2)      
2023-05-14 20:59:15 INFO     rasa.model_testing  - Intent evaluation results
2023-05-14 20:59:16 INFO     rasa.nlu.test  - train Accuracy: 0.991 (0.001) 
2023-05-14 20:59:16 INFO     rasa.nlu.test  - train F1-score: 0.989 (0.001) 
2023-05-14 20:59:16 INFO     rasa.nlu.test  - train Precision: 0.990 (0.000)
2023-05-14 20:59:16 INFO     rasa.nlu.test  - test Accuracy: 0.979 (0.001)  
2023-05-14 20:59:16 INFO     rasa.nlu.test  - test F1-score: 0.976 (0.000)  
2023-05-14 20:59:16 INFO     rasa.nlu.test  - test Precision: 0.977 (0.001) 

"accuracy": 0.9749173098125689,
  "macro avg": {
    "precision": 0.9754777655273797,
    "recall": 0.9749173098125689,
    "f1-score": 0.9736406433209079,
    "support": 3628
  }
}

2023-05-14 17:43:21 start CV (n=3)



### DistilBERT




a testar:
rasa train --config config_bertlabse.yml
rasa train --config config_distilbert.yml

2023-05-09 08:23:20.204433: E tensorflow/compiler/xla/stream_executor/cuda/cuda_driver.cc:267] failed call to cuInit: CUDA_ERROR_NO_DEVICE: no CUDA-capable device is detected
https://stackoverflow.com/questions/48658204/tensorflow-failed-call-to-cuinit-cuda-error-no-device

nvidia-smi
Unable to determine the device handle for GPU 0000:01:00.0: Not Found
https://forums.developer.nvidia.com/t/unable-to-determine-the-device-handle-for-gpu-000000-0-not-found/231710
