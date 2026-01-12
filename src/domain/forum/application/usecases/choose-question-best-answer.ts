import type { Question } from "../../enterprise/entities/question.ts";
import type { AnswersRepository } from "../repositories/answers-repository.ts";
import type { QuestionsRepository } from "../repositories/questions-repository.ts";

type ChooseQuestionBestAnswerUseCaseRequest = {
  authorId: string;
  answerId: string;
};

type ChooseQuestionBestAnswerUseCaseResponse = {
  question: Question;
};

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository) { }

  async execute({
    authorId,
    answerId
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer)
      throw new Error("Answer not found");

    const question = await this.questionsRepository.findById(answer.questionId.toString());

    if (!question)
      throw new Error("Question not found");

    if (question.authorId.toString() !== authorId)
      throw new Error("Not allowed");

    question.bestAnswerId = answer.id;

    return {
      question
    };
  }
}