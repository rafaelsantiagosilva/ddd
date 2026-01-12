import type { PaginationParams } from "@/core/repositories/pagination-params.ts";
import type { Question } from "../../enterprise/entities/question.ts";
import type { Slug } from "../../enterprise/entities/value-objects/slug.ts";

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>;
  findBySlug(slug: Slug): Promise<Question | null>;
  findManyRecent(params: PaginationParams): Promise<Question[]>;
  create(question: Question): Promise<void>;
  save(question: Question): Promise<void>;
  delete(question: Question): Promise<void>;
}