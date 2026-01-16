import { left, right, type Either } from "@/core/either.ts";
import type { QuestionsRepository } from "../repositories/questions-repository.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

type DeleteQuestionUseCaseRequest = {
  id: string;
  authorId: string;
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ id, authorId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(id);

    if (!question)
      return left(new ResourceNotFoundError());

    if (question.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    await this.questionsRepository.delete(question);

    return right({});
  }
}