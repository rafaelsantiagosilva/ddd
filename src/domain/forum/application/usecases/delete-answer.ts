import type { AnswersRepository } from "../repositories/answers-repository.ts";

type DeleteAnswerUseCaseRequest = {
  id: string;
  authorId: string;
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute({ id, authorId }: DeleteAnswerUseCaseRequest) {
    const answer = await this.answersRepository.findById(id);

    if (!answer)
      throw new Error("Question not founnd");

    if (answer.authorId.toString() !== authorId)
      throw new Error("Not allowed");

    await this.answersRepository.delete(answer);
  }
}