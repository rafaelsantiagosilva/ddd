import { left, right, type Either } from "@/core/either.ts";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list.ts";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment.ts";
import type { QuestionAttachmentRepository } from "../repositories/question-attachments-repository.ts";
import type { QuestionsRepository } from "../repositories/questions-repository.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

type EditQuestionUseCaseRequest = {
  id: string;
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentRepository
  ) { }

  async execute({ id, authorId, title, content, attachmentsIds }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(id);

    if (!question)
      return left(new ResourceNotFoundError());

    if (question.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    const currentQuestionAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(id);
    const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments);

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id
      })
    });

    questionAttachmentList.update(questionAttachments);

    question.title = title;
    question.content = content;
    question.attachments = questionAttachmentList;

    await this.questionsRepository.save(question);

    return right({});
  }
}