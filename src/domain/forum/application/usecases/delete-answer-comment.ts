import { left, right, type Either } from "@/core/either.ts";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

type DeleteAnswerCommentUseCaseRequest = {
  id: string;
  authorId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;
export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository
  ) { }

  async execute({
    id,
    authorId
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(id);

    if (!answerComment)
      return left(new ResourceNotFoundError());

    if (answerComment.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    await this.answerCommentsRepository.delete(answerComment);

    return right({});
  }
}