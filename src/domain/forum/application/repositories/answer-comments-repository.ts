import type { AnswerComment } from "../../enterprise/entities/answer-comment.ts";

export interface AnswerCommentsRepository {
  create(comment: AnswerComment): Promise<void>;
}