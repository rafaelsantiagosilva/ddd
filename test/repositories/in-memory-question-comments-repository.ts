import type { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository.ts";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment.ts";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public data: QuestionComment[] = [];

  async create(comment: QuestionComment): Promise<void> {
    this.data.push(comment);
  }
}