import { left, right, type Either } from "@/core/either.ts";
import type { Question } from "../../enterprise/entities/question.ts";
import type { AnswersRepository } from "../repositories/answers-repository.ts";
import type { QuestionsRepository } from "../repositories/questions-repository.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

type ChooseQuestionBestAnswerUseCaseRequest = {
  authorId: string;
  answerId: string;
};

type ChooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>;

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
      return left(new ResourceNotFoundError());

    const question = await this.questionsRepository.findById(answer.questionId.toString());

    if (!question)
      return left(new ResourceNotFoundError());

    if (question.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    question.bestAnswerId = answer.id;

    return right({ question });
  }
}