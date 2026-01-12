import type { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository.ts";
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment.ts";

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public data: AnswerComment[] = [];

  async create(comment: AnswerComment): Promise<void> {
    this.data.push(comment);
  }
}