rasa test nlu --nlu data/nlu.yml --config config_bert.yml --cross-validation --folds 3 
rasa train --config config_bert.yml

registros excluidos:
-registros sem resposta
-registros a cerca de processos/usuarios especificos
-registros que descrevem o atendimento e não apresentam a resposta
problemas:
-bertimbau/distilbert/gpt/gpt2/roberta uses a subword tokenizer (WordPiece), so the maximum length corresponds to 512 subword tokens. (grandes cadeias de texto foram excluidas)


### DIET
2023-05-05 17:21:04 start
2023-05-05 22:35:30 INFO     rasa.model_testing  - CV evaluation (n=3)
2023-05-05 22:35:30 INFO     rasa.model_testing  - Intent evaluation results
2023-05-05 22:35:30 INFO     rasa.nlu.test  - train Accuracy: 0.983 (0.002)
2023-05-05 22:35:30 INFO     rasa.nlu.test  - train F1-score: 0.978 (0.002)
2023-05-05 22:35:30 INFO     rasa.nlu.test  - train Precision: 0.977 (0.002)
2023-05-05 22:35:30 INFO     rasa.nlu.test  - test Accuracy: 0.956 (0.004)
2023-05-05 22:35:30 INFO     rasa.nlu.test  - test F1-score: 0.950 (0.005)
2023-05-05 22:35:30 INFO     rasa.nlu.test  - test Precision: 0.951 (0.005)

2023-05-07 17:19:18 start
2023-05-07 19:37:09 INFO     rasa.model_testing  - CV evaluation (n=2)
2023-05-07 19:37:09 INFO     rasa.model_testing  - Intent evaluation results
2023-05-07 19:37:09 INFO     rasa.nlu.test  - train Accuracy: 0.988 (0.001)
2023-05-07 19:37:09 INFO     rasa.nlu.test  - train F1-score: 0.985 (0.001)
2023-05-07 19:37:09 INFO     rasa.nlu.test  - train Precision: 0.984 (0.000)
2023-05-07 19:37:09 INFO     rasa.nlu.test  - test Accuracy: 0.964 (0.004)
2023-05-07 19:37:09 INFO     rasa.nlu.test  - test F1-score: 0.958 (0.005)
2023-05-07 19:37:09 INFO     rasa.nlu.test  - test Precision: 0.959 (0.005)

### BERTimbau





