import type { AnswersRepository } from "../repositories/answers-repository.ts";

type EditAnswerUseCaseRequest = {
  id: string;
  authorId: string;
  content: string;
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute({ id, authorId, content }: EditAnswerUseCaseRequest) {
    const answer = await this.answersRepository.findById(id);

    if (!answer)
      throw new Error("Answer not found");

    if (answer.authorId.toString() !== authorId)
      throw new Error("Not allowed");

    answer.content = content;

    await this.answersRepository.save(answer);
  }
}