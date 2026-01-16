import { left, right, type Either } from "@/core/either.ts";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { AnswerComment } from "../../enterprise/entities/answer-comment.ts";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository.ts";
import type { AnswersRepository } from "../repositories/answers-repository.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

type CommentOnAnswerUseCaseRequest = {
  content: string;
  authorId: string;
  answerId: string;
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, { answerComment: AnswerComment }>;

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
  ) { }

  async execute({
    answerId,
    authorId,
    content }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer)
      return left(new ResourceNotFoundError());

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      answerId: new UniqueEntityId(answerId),

    });

    await this.answerCommentsRepository.create(answerComment);

    return right({ answerComment });
  }
}