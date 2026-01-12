import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { AnswerComment } from "../../enterprise/entities/answer-comment.ts";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository.ts";
import type { AnswersRepository } from "../repositories/answers-repository.ts";

type CommentOnAnswerUseCaseRequest = {
  content: string;
  authorId: string;
  answerId: string;
}

type CommentOnAnswerUseCaseResponse = {
  answerComment: AnswerComment;
}

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
      throw new Error("Answer not found");

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      answerId: new UniqueEntityId(answerId),

    });

    await this.answerCommentsRepository.create(answerComment);

    return {
      answerComment
    }
  }
}