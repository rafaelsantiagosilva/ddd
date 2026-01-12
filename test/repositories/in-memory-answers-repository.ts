import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository.ts";
import type { Answer } from "@/domain/forum/enterprise/entities/answer.ts";

export class InMemoryAnswersRepository implements AnswersRepository {
  public data: Answer[] = [];

  async findById(id: string): Promise<Answer | null> {
    return this.data.find((answer) => answer.id.toString() === id) ?? null;
  }

  async create(answer: Answer): Promise<void> {
    this.data.push(answer);
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.data.findIndex((item) => item.id === answer.id);
    this.data.splice(answerIndex, 1);
  }
}