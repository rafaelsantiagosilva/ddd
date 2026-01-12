import type { Answer } from "@/domain/forum/enterprise/entities/answer.ts";

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>;
  create(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
  delete(question: Answer): Promise<void>;
}