import type { PaginationParams } from "@/core/repositories/pagination-params.ts";
import type { Answer } from "@/domain/forum/enterprise/entities/answer.ts";

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>;
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]>
  create(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
  delete(question: Answer): Promise<void>;
}