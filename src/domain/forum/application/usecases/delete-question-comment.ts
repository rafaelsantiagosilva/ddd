import { left, right, type Either } from "@/core/either.ts";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

type DeleteQuestionCommentUseCaseRequest = {
  id: string;
  authorId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRepository
  ) { }

  async execute({ id, authorId }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findById(id);

    if (!questionComment)
      return left(new ResourceNotFoundError());

    if (questionComment.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    await this.questionCommentsRepository.delete(questionComment);

    return right({});
  }
}