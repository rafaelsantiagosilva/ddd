import type { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import type { Question } from "../../enterprise/entities/question.ts";
import type { Slug } from "../../enterprise/entities/value-objects/slug.ts";

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>;
  create(question: Question): Promise<void>;
  save(question: Question): Promise<void>;
  findBySlug(slug: Slug): Promise<Question | null>;
  delete(question: Question): Promise<void>;
}