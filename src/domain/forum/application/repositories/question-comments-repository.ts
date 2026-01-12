import type { PaginationParams } from "@/core/repositories/pagination-params.ts";
import type { QuestionComment } from "../../enterprise/entities/question-comment.ts";

export interface QuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>;
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]>
  create(comment: QuestionComment): Promise<void>;
  delete(comment: QuestionComment): Promise<void>;
}