import { right, type Either } from "@/core/either.ts";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment.ts";
import { Question } from "../../enterprise/entities/question.ts";
import type { QuestionsRepository } from "../repositories/questions-repository.ts";

type CreateQuestionUseCaseRequest = {
  title: string;
  content: string;
  authorId: string;
  attachmentsIds: string[];
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>;

export class CreateQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository
  ) { }

  async execute({
    authorId,
    title,
    content,
    attachmentsIds
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content
    });

    question.attachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id
      })
    });

    await this.questionsRepository.create(question);

    return right({ question });
  }
}