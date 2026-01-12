import type { QuestionComment } from "../../enterprise/entities/question-comment.ts";

export interface QuestionCommentsRepository {
  create(comment: QuestionComment): Promise<void>;
}