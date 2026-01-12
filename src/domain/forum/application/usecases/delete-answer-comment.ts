import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository.ts";

type DeleteAnswerCommentUseCaseRequest = {
  id: string;
  authorId: string;
}

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository
  ) { }

  async execute({ id, authorId }: DeleteAnswerCommentUseCaseRequest) {
    const answerComment = await this.answerCommentsRepository.findById(id);

    if (!answerComment)
      throw new Error("Answer comment not founnd");

    if (answerComment.authorId.toString() !== authorId)
      throw new Error("Not allowed");

    await this.answerCommentsRepository.delete(answerComment);
  }
}