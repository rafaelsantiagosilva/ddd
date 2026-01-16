import { right, type Either } from "@/core/either.ts";
import type { AnswerComment } from "../../enterprise/entities/answer-comment.ts";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository.ts";

type FetchAnswerCommentsUseCaseRequest = {
  page: number;
  answerId: string;
};

type FetchAnswerCommentsUseCaseResponse = Either<null, { answerComments: AnswerComment[] }>;

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) { }

  async execute({ answerId, page }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page });

    return right({ answerComments });
  }
}