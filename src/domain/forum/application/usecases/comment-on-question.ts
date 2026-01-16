import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { QuestionComment } from "../../enterprise/entities/question-comment.ts";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository.ts";
import type { QuestionsRepository } from "../repositories/questions-repository.ts";
import { left, right, type Either } from "@/core/either.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

type CommentOnQuestionUseCaseRequest = {
  content: string;
  authorId: string;
  questionId: string;
}

type CommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError, { questionComment: QuestionComment }>;

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) { }

  async execute({
    questionId,
    authorId,
    content }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question)
      return left(new ResourceNotFoundError());

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId),

    });

    await this.questionCommentsRepository.create(questionComment);

    return right({ questionComment });
  }
}