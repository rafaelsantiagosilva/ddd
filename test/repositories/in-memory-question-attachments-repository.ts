import type { QuestionAttachmentRepository } from "@/domain/forum/application/repositories/question-attachments-repository.ts";
import type { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment.ts";

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentRepository {
  public data: QuestionAttachment[] = [];

  async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    return this.data.filter(item => item.questionId.toString() === questionId);
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const newData = this.data.filter(item => item.questionId.toString() !== questionId);
    this.data = newData;
  }
}