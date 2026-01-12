import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository.ts";
import type { Question } from "@/domain/forum/enterprise/entities/question.ts";
import type { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug.ts";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public data: Question[] = [];

  async create(question: Question): Promise<void> {
    this.data.push(question);
  }

  async findBySlug(slug: Slug): Promise<Question | undefined> {
    return this.data.find((question) => question.slug.value === slug.value);
  }
}