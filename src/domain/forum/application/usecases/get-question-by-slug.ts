import type { Question } from "../../enterprise/entities/question.ts";
import type { Slug } from "../../enterprise/entities/value-objects/slug.ts";
import type { QuestionsRepository } from "../repositories/questions-repository.ts";

type GetQuestionBySlugUseCaseRequest = {
  slug: Slug
}

type GetQuestionBySlugUseCaseResponse = {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ slug }:
    GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question)
      throw new Error("Question not found");

    return { question };
  }
}