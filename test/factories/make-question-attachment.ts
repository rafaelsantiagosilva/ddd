import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { QuestionAttachment, type QuestionAttachmentProps } from "@/domain/forum/enterprise/entities/question-attachment.ts";

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId
) {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: id ?? new UniqueEntityId(),
      ...override
    }
  );

  return questionAttachment;
}