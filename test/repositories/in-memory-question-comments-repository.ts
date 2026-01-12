import type { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository.ts";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment.ts";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public data: QuestionComment[] = [];

  async findById(id: string): Promise<QuestionComment | null> {
    return this.data.find(comment => comment.id.toString() === id) ?? null;
  }

  async create(comment: QuestionComment): Promise<void> {
    this.data.push(comment);
  }

  async delete(comment: QuestionComment): Promise<void> {
    const commentIndex = this.data.findIndex(item => item.id === comment.id);
    this.data.splice(commentIndex, 1);
  }
}