rasa test nlu --nlu data/nlu.yml --config config_bert.yml --cross-validation --folds 3
rasa test nlu --nlu data/nlu.yml --cross-validation --folds 3
rasa train --config config_xlnet.yml

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

2023-05-15 17:33:32 start
2023-05-16 04:51:26 INFO     rasa.model_testing  - CV evaluation (n=3)
2023-05-16 04:51:27 INFO     rasa.model_testing  - Intent evaluation results
2023-05-16 04:51:27 INFO     rasa.nlu.test  - train Accuracy: 0.982 (0.001)
2023-05-16 04:51:27 INFO     rasa.nlu.test  - train F1-score: 0.977 (0.001)
2023-05-16 04:51:27 INFO     rasa.nlu.test  - train Precision: 0.975 (0.001)
2023-05-16 04:51:27 INFO     rasa.nlu.test  - test Accuracy: 0.958 (0.003)
2023-05-16 04:51:27 INFO     rasa.nlu.test  - test F1-score: 0.951 (0.005)
2023-05-16 04:51:27 INFO     rasa.nlu.test  - test Precision: 0.952 (0.006)

----------------------------- atualizou nlu a partir daqui. se puder, refaça testes anteriores

### BERTimbau

2023-06-03 21:25:55 start
2023-06-04 09:06:20 INFO     rasa.model_testing  - CV evaluation (n=2)
2023-06-04 09:06:20 INFO     rasa.model_testing  - Intent evaluation results
2023-06-04 09:06:20 INFO     rasa.nlu.test  - train Accuracy: 0.988 (0.001)
2023-06-04 09:06:20 INFO     rasa.nlu.test  - train F1-score: 0.985 (0.001)
2023-06-04 09:06:20 INFO     rasa.nlu.test  - train Precision: 0.985 (0.001)
2023-06-04 09:06:20 INFO     rasa.nlu.test  - test Accuracy: 0.979 (0.001)
2023-06-04 09:06:20 INFO     rasa.nlu.test  - test F1-score: 0.977 (0.001)
2023-06-04 09:06:20 INFO     rasa.nlu.test  - test Precision: 0.977 (0.001)

2023-06-02 20:00:52 start
2023-06-03 16:43:58 INFO     rasa.model_testing  - CV evaluation (n=3)
2023-06-03 16:43:58 INFO     rasa.model_testing  - Intent evaluation results
2023-06-03 16:43:58 INFO     rasa.nlu.test  - train Accuracy: 0.986 (0.001)
2023-06-03 16:43:58 INFO     rasa.nlu.test  - train F1-score: 0.982 (0.002)
2023-06-03 16:43:58 INFO     rasa.nlu.test  - train Precision: 0.982 (0.002)
2023-06-03 16:43:58 INFO     rasa.nlu.test  - test Accuracy: 0.981 (0.002)
2023-06-03 16:43:58 INFO     rasa.nlu.test  - test F1-score: 0.977 (0.003)
2023-06-03 16:43:58 INFO     rasa.nlu.test  - test Precision: 0.976 (0.003)

### BERTlabse

2023-06-02 07:26:04 start
2023-06-02 19:25:09 INFO     rasa.model_testing  - CV evaluation (n=2)
2023-06-02 19:25:09 INFO     rasa.model_testing  - Intent evaluation results
2023-06-02 19:25:09 INFO     rasa.nlu.test  - train Accuracy: 0.989 (0.001)
2023-06-02 19:25:09 INFO     rasa.nlu.test  - train F1-score: 0.986 (0.002)
2023-06-02 19:25:09 INFO     rasa.nlu.test  - train Precision: 0.986 (0.003)
2023-06-02 19:25:09 INFO     rasa.nlu.test  - test Accuracy: 0.982 (0.000)
2023-06-02 19:25:09 INFO     rasa.nlu.test  - test F1-score: 0.979 (0.001)
2023-06-02 19:25:09 INFO     rasa.nlu.test  - test Precision: 0.979 (0.001)

2023-06-01 09:26:12 start
2023-06-02 06:15:24 INFO     rasa.model_testing  - CV evaluation (n=3)
2023-06-02 06:15:24 INFO     rasa.model_testing  - Intent evaluation results
2023-06-02 06:15:24 INFO     rasa.nlu.test  - train Accuracy: 0.988 (0.001)
2023-06-02 06:15:24 INFO     rasa.nlu.test  - train F1-score: 0.985 (0.002)
2023-06-02 06:15:24 INFO     rasa.nlu.test  - train Precision: 0.985 (0.002)
2023-06-02 06:15:24 INFO     rasa.nlu.test  - test Accuracy: 0.983 (0.001)
2023-06-02 06:15:24 INFO     rasa.nlu.test  - test F1-score: 0.979 (0.002)
2023-06-02 06:15:24 INFO     rasa.nlu.test  - test Precision: 0.979 (0.002)


https://towardsdatascience.com/labse-language-agnostic-bert-sentence-embedding-by-google-ai-531f677d775f
https://medium.com/@kmkaran212/language-agnostic-sentence-embeddings-57445eba02a#:~:text=What%20are%20Language%20agnostic%20sentence,the%20dissimilar%20ones%5B1%5D.
https://arxiv.org/pdf/2007.01852.pdf
https://ai.googleblog.com/2020/08/language-agnostic-bert-sentence.html

### DistilBERT

2023-05-30 14:15:18 start
2023-05-31 09:41:59 INFO     rasa.model_testing  - CV evaluation (n=3)
2023-05-31 09:41:59 INFO     rasa.model_testing  - Intent evaluation results
2023-05-31 09:41:59 INFO     rasa.nlu.test  - train Accuracy: 0.985 (0.001)
2023-05-31 09:41:59 INFO     rasa.nlu.test  - train F1-score: 0.982 (0.002)
2023-05-31 09:41:59 INFO     rasa.nlu.test  - train Precision: 0.981 (0.002)
2023-05-31 09:41:59 INFO     rasa.nlu.test  - test Accuracy: 0.979 (0.001)
2023-05-31 09:41:59 INFO     rasa.nlu.test  - test F1-score: 0.976 (0.001)
2023-05-31 09:41:59 INFO     rasa.nlu.test  - test Precision: 0.975 (0.001)

2023-05-22 08:54:36 start
2023-05-22 19:25:06 INFO     rasa.model_testing  - CV evaluation (n=2)
2023-05-22 19:25:06 INFO     rasa.model_testing  - Intent evaluation results
2023-05-22 19:25:06 INFO     rasa.nlu.test  - train Accuracy: 0.988 (0.001)
2023-05-22 19:25:06 INFO     rasa.nlu.test  - train F1-score: 0.986 (0.002)
2023-05-22 19:25:06 INFO     rasa.nlu.test  - train Precision: 0.986 (0.001)
2023-05-22 19:25:06 INFO     rasa.nlu.test  - test Accuracy: 0.979 (0.000)
2023-05-22 19:25:06 INFO     rasa.nlu.test  - test F1-score: 0.976 (0.001)
2023-05-22 19:25:06 INFO     rasa.nlu.test  - test Precision: 0.976 (0.001)

### GPT

2023-05-23 19:11:23 start
2023-05-24 16:11:52 INFO     rasa.model_testing  - CV evaluation (n=3)
2023-05-24 16:11:52 INFO     rasa.model_testing  - Intent evaluation results
2023-05-24 16:11:52 INFO     rasa.nlu.test  - train Accuracy: 0.983 (0.001)
2023-05-24 16:11:52 INFO     rasa.nlu.test  - train F1-score: 0.979 (0.002)
2023-05-24 16:11:52 INFO     rasa.nlu.test  - train Precision: 0.979 (0.003)
2023-05-24 16:11:52 INFO     rasa.nlu.test  - test Accuracy: 0.977 (0.001)
2023-05-24 16:11:52 INFO     rasa.nlu.test  - test F1-score: 0.973 (0.001)
2023-05-24 16:11:52 INFO     rasa.nlu.test  - test Precision: 0.972 (0.001)

2023-05-24 17:38:03 start
2023-05-25 05:20:40 INFO     rasa.model_testing  - CV evaluation (n=2)
2023-05-25 05:20:40 INFO     rasa.model_testing  - Intent evaluation results
2023-05-25 05:20:40 INFO     rasa.nlu.test  - train Accuracy: 0.984 (0.000)
2023-05-25 05:20:40 INFO     rasa.nlu.test  - train F1-score: 0.981 (0.000)
2023-05-25 05:20:40 INFO     rasa.nlu.test  - train Precision: 0.981 (0.000)
2023-05-25 05:20:40 INFO     rasa.nlu.test  - test Accuracy: 0.974 (0.003)
2023-05-25 05:20:40 INFO     rasa.nlu.test  - test F1-score: 0.969 (0.002)
2023-05-25 05:20:40 INFO     rasa.nlu.test  - test Precision: 0.970 (0.001)

### GPT 2

2023-05-26 11:17:37 start
2023-05-27 09:41:30 INFO     rasa.model_testing  - CV evaluation (n=3)
2023-05-27 09:41:30 INFO     rasa.model_testing  - Intent evaluation results
2023-05-27 09:41:30 INFO     rasa.nlu.test  - train Accuracy: 0.959 (0.015)
2023-05-27 09:41:30 INFO     rasa.nlu.test  - train F1-score: 0.951 (0.018)
2023-05-27 09:41:30 INFO     rasa.nlu.test  - train Precision: 0.953 (0.016)
2023-05-27 09:41:30 INFO     rasa.nlu.test  - test Accuracy: 0.937 (0.020)
2023-05-27 09:41:30 INFO     rasa.nlu.test  - test F1-score: 0.925 (0.025)
2023-05-27 09:41:30 INFO     rasa.nlu.test  - test Precision: 0.928 (0.026)

2023-05-27 10:00:00 start
2023-05-27 22:17:41 INFO     rasa.model_testing  - CV evaluation (n=2)
2023-05-27 22:17:41 INFO     rasa.model_testing  - Intent evaluation results
2023-05-27 22:17:41 INFO     rasa.nlu.test  - train Accuracy: 0.792 (0.040)
2023-05-27 22:17:41 INFO     rasa.nlu.test  - train F1-score: 0.753 (0.048)
2023-05-27 22:17:41 INFO     rasa.nlu.test  - train Precision: 0.764 (0.051)
2023-05-27 22:17:41 INFO     rasa.nlu.test  - test Accuracy: 0.740 (0.043)
2023-05-27 22:17:41 INFO     rasa.nlu.test  - test F1-score: 0.697 (0.051)
2023-05-27 22:17:41 INFO     rasa.nlu.test  - test Precision: 0.711 (0.056)

### RoBERTa

2023-05-28 17:11:16 start
2023-05-29 14:09:03 INFO     rasa.model_testing  - CV evaluation (n=3)
2023-05-29 14:09:03 INFO     rasa.model_testing  - Intent evaluation results
2023-05-29 14:09:03 INFO     rasa.nlu.test  - train Accuracy: 0.983 (0.001)
2023-05-29 14:09:03 INFO     rasa.nlu.test  - train F1-score: 0.979 (0.001)
2023-05-29 14:09:03 INFO     rasa.nlu.test  - train Precision: 0.979 (0.002)
2023-05-29 14:09:03 INFO     rasa.nlu.test  - test Accuracy: 0.977 (0.001)
2023-05-29 14:09:03 INFO     rasa.nlu.test  - test F1-score: 0.972 (0.001)
2023-05-29 14:09:03 INFO     rasa.nlu.test  - test Precision: 0.971 (0.000)

2023-05-29 17:23:14 start
2023-05-30 05:19:38 INFO     rasa.model_testing  - CV evaluation (n=2)
2023-05-30 05:19:38 INFO     rasa.model_testing  - Intent evaluation results
2023-05-30 05:19:38 INFO     rasa.nlu.test  - train Accuracy: 0.985 (0.000)
2023-05-30 05:19:38 INFO     rasa.nlu.test  - train F1-score: 0.982 (0.000)
2023-05-30 05:19:38 INFO     rasa.nlu.test  - train Precision: 0.981 (0.001)
2023-05-30 05:19:38 INFO     rasa.nlu.test  - test Accuracy: 0.979 (0.001)
2023-05-30 05:19:38 INFO     rasa.nlu.test  - test F1-score: 0.975 (0.002)
2023-05-30 05:19:38 INFO     rasa.nlu.test  - test Precision: 0.976 (0.003)

a testar:
rasa train --config config_bertlabse.yml
rasa train --config config_distilbert.yml

2023-05-09 08:23:20.204433: E tensorflow/compiler/xla/stream_executor/cuda/cuda_driver.cc:267] failed call to cuInit: CUDA_ERROR_NO_DEVICE: no CUDA-capable device is detected
https://stackoverflow.com/questions/48658204/tensorflow-failed-call-to-cuinit-cuda-error-no-device

nvidia-smi
Unable to determine the device handle for GPU 0000:01:00.0: Not Found
https://forums.developer.nvidia.com/t/unable-to-determine-the-device-handle-for-gpu-000000-0-not-found/231710
