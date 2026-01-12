import type { Question } from "../../enterprise/entities/question.ts";
import type { Slug } from "../../enterprise/entities/value-objects/slug.ts";

export interface QuestionsRepository {
  create(question: Question): Promise<void>;
  findBySlug(slug: Slug): Promise<Question | undefined>;
}