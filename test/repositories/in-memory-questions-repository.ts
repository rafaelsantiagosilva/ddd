import type { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository.ts";
import type { Question } from "@/domain/forum/enterprise/entities/question.ts";
import type { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug.ts";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public data: Question[] = [];

  async findById(id: string): Promise<Question | null> {
    return this.data.find((question) => question.id.toString() === id) ?? null;
  }

  async create(question: Question): Promise<void> {
    this.data.push(question);
  }

  async findBySlug(slug: Slug): Promise<Question | null> {
    return this.data.find((question) => question.slug.value === slug.value) ?? null;
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.data.findIndex((item) => item.id === question.id);
    this.data.splice(questionIndex, 1);
  }
}