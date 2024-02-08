import argparse
import csv
from questiongenerator import QuestionGenerator
from questiongenerator import print_qa
from deep_translator import GoogleTranslator


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--answer_style",
        default="all",
        type=str,
        help="The desired type of answers. Choose from ['all', 'sentences', 'multiple_choice']",
    )
    parser.add_argument("--model_dir", type=str, default=None)
    parser.add_argument("--num_questions", type=int, default=10)
    parser.add_argument("--show_answers", dest="show_answers", action="store_true", default=True)
    parser.add_argument("--in_file", type=str, required=True)
    parser.add_argument("--use_qa_eval", dest="use_qa_eval", action="store_true", default=False)
    parser.add_argument("--x", type=int, default=0)
    parser.add_argument("--y", type=int, default=0)
    parser.add_argument("--out_csv", type=str, required=False)
    return parser.parse_args()

def read_cell(x, y):
    args = parse_args()
    with open(args.in_file, 'r') as f:
        reader = csv.reader(f)
        y_count = 0
        for n in reader:
            if y_count == y:
                cell = n[x]
                return cell
            y_count += 1

def write_cell(data):
    args = parse_args()
    file = open(args.out_csv, 'w+', newline ='')
    with file:   
        write = csv.writer(file)
        write.writerows(data)

if __name__ == "__main__":
    args = parse_args()
    qg = QuestionGenerator()
    filename = args.in_file
    if filename[-3:] == "txt":
        with open(args.in_file, 'r', encoding="utf8") as file:
            Lines = file.readlines()
        for line in Lines:
            print(line)
            # line = GoogleTranslator(source='pt', target='en').translate(line)
            qa_list = qg.generate(
                line,
                num_questions=int(args.num_questions),
                answer_style=args.answer_style,
                use_evaluator=args.use_qa_eval
            )
            print_qa(qa_list, show_answers=args.show_answers)
    else:
        i = args.x
        list_qa = []
        while read_cell(args.y, i) != None:
            line = GoogleTranslator(source='pt', target='en').translate(read_cell(args.y, i))
            print(read_cell(args.y, i))
            qa_list = qg.generate(
                    line,
                    num_questions=int(args.num_questions),
                    answer_style=args.answer_style,
                    use_evaluator=args.use_qa_eval
                )
            print_qa(qa_list, show_answers=args.show_answers)
            list_qa.append(qa_list)
            i+=1
        write_cell(list_qa)


# if __name__ == "__main__":
#     args = parse_args()
#     with open(args.in_file, 'r') as file:
#         text_file = file.read()
#     # print(text_file)
#     text_file = GoogleTranslator(source='pt', target='en').translate(text_file)
#     # print(text_file)
#     qg = QuestionGenerator()
#     qa_list = qg.generate(
#         text_file,
#         num_questions=int(args.num_questions),
#         answer_style=args.answer_style,
#         use_evaluator=args.use_qa_eval
#     )
#     # print(qa_list)
#     print_qa(qa_list, show_answers=args.show_answers)


