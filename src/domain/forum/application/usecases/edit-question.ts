import { left, right, type Either } from "@/core/either.ts";
import type { QuestionsRepository } from "../repositories/questions-repository.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

type EditQuestionUseCaseRequest = {
  id: string;
  authorId: string;
  title: string;
  content: string;
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ id, authorId, title, content }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(id);

    if (!question)
      return left(new ResourceNotFoundError());

    if (question.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);

    return right({});
  }
}