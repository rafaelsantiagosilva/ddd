import type { QuestionsRepository } from "../repositories/questions-repository.ts";

type EditQuestionUseCaseRequest = {
  id: string;
  authorId: string;
  title: string;
  content: string;
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ id, authorId, title, content }: EditQuestionUseCaseRequest) {
    const question = await this.questionsRepository.findById(id);

    if (!question)
      throw new Error("Question not founnd");

    if (question.authorId.toString() !== authorId)
      throw new Error("Not allowed");

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);
  }
}