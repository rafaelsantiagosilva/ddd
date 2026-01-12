import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { Question } from "../../enterprise/entities/question.ts";
import type { QuestionsRepository } from "../repositories/questions-repository.ts";

type CreateQuestionUseCaseRequest = {
  title: string;
  content: string;
  authorId: string;
}

type CreateQuestionUseCaseResponse = {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository
  ) { }

  async execute({
    authorId,
    title,
    content }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content
    });

    await this.questionsRepository.create(question);

    return {
      question
    }
  }
}