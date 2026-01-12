import type { QuestionsRepository } from "../repositories/questions-repository.ts";

type DeleteQuestionUseCaseRequest = {
  id: string;
  authorId: string;
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ id, authorId }: DeleteQuestionUseCaseRequest) {
    const question = await this.questionsRepository.findById(id);

    if (!question)
      throw new Error("Question not founnd");

    if (question.authorId.toString() !== authorId)
      throw new Error("Not allowed");

    await this.questionsRepository.delete(question);
  }
}