import type { Question } from "../../enterprise/entities/question.ts";
import type { QuestionsRepository } from "../repositories/questions-repository.ts";

type FetchRecentQuestionsUseCaseRequest = {
  page: number;
};

type FetchRecentQuestionsUseCaseResponse = {
  questions: Question[]
};

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page });

    return { questions };
  }
}