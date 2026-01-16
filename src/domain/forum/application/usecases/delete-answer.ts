import { left, right, type Either } from "@/core/either.ts";
import type { AnswersRepository } from "../repositories/answers-repository.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";

type DeleteAnswerUseCaseRequest = {
  id: string;
  authorId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute({ id, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(id);

    if (!answer)
      return left(new ResourceNotFoundError());

    if (answer.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    await this.answersRepository.delete(answer);

    return right({});
  }
}