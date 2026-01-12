import type { AnswerComment } from "../../enterprise/entities/answer-comment.ts";

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>;
  create(comment: AnswerComment): Promise<void>;
  delete(comment: AnswerComment): Promise<void>;
}