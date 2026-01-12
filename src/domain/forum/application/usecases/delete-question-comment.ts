import type { QuestionCommentsRepository } from "../repositories/question-comments-repository.ts";

type DeleteQuestionCommentUseCaseRequest = {
  id: string;
  authorId: string;
}

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRepository
  ) { }

  async execute({ id, authorId }: DeleteQuestionCommentUseCaseRequest) {
    const questionComment = await this.questionCommentsRepository.findById(id);

    if (!questionComment)
      throw new Error("Question comment not founnd");

    if (questionComment.authorId.toString() !== authorId)
      throw new Error("Not allowed");

    await this.questionCommentsRepository.delete(questionComment);
  }
}