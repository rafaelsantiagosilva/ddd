import { left, right, type Either } from "@/core/either.ts";
import type { AnswersRepository } from "../repositories/answers-repository.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

type EditAnswerUseCaseRequest = {
  id: string;
  authorId: string;
  content: string;
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute({ id, authorId, content }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(id);

    if (!answer)
      return left(new ResourceNotFoundError());

    if (answer.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    answer.content = content;

    await this.answersRepository.save(answer);

    return right({});
  }
}