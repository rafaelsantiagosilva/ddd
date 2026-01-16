import { right, type Either } from "@/core/either.ts";
import type { Answer } from "../../enterprise/entities/answer.ts";
import type { Question } from "../../enterprise/entities/question.ts";
import type { AnswersRepository } from "../repositories/answers-repository.ts";

type FetchQuestionAnswersUseCaseRequest = {
  page: number;
  questionId: string;
};

type FetchQuestionAnswersUseCaseResponse = Either<null, { answers: Answer[] }>;

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute({ questionId, page }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });

    return right({ answers });
  }
}