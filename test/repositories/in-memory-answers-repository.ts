import type { PaginationParams } from "@/core/repositories/pagination-params.ts";
import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository.ts";
import type { Answer } from "@/domain/forum/enterprise/entities/answer.ts";

export class InMemoryAnswersRepository implements AnswersRepository {
  public data: Answer[] = [];

  async findById(id: string): Promise<Answer | null> {
    return this.data.find((answer) => answer.id.toString() === id) ?? null;
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<Answer[]> {
    const answers = this.data
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async create(answer: Answer): Promise<void> {
    this.data.push(answer);
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.data.findIndex((item) => item.id === answer.id);
    this.data[answerIndex] = answer;
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.data.findIndex((item) => item.id === answer.id);
    this.data.splice(answerIndex, 1);
  }
}