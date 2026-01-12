import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { QuestionComment } from "../../enterprise/entities/question-comment.ts";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository.ts";
import type { QuestionsRepository } from "../repositories/questions-repository.ts";

type CommentOnQuestionUseCaseRequest = {
  content: string;
  authorId: string;
  questionId: string;
}

type CommentOnQuestionUseCaseResponse = {
  questionComment: QuestionComment;
}

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
      throw new Error("Question not found");

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId),

    });

    await this.questionCommentsRepository.create(questionComment);

    return {
      questionComment
    }
  }
}