import type { AnswerComment } from "../../enterprise/entities/answer-comment.ts";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository.ts";

type FetchAnswerCommentsUseCaseRequest = {
  page: number;
  answerId: string;
};

type FetchAnswerCommentsUseCaseResponse = {
  answerComments: AnswerComment[]
};

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) { }

  async execute({ answerId, page }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page });

    return { answerComments };
  }
}