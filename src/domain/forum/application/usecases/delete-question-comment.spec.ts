import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository.ts";
import { makeQuestionComment } from "@/test/factories/make-question-comment.ts";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment.ts";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete Question Comment Use Case (Unit)", async () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to delete a question comment", async () => {
    const createdQuestionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(createdQuestionComment);
    await sut.execute({
      id: createdQuestionComment.id.toString(),
      authorId: createdQuestionComment.authorId.toString()
    });

    expect(inMemoryQuestionCommentsRepository.data).toHaveLength(0);
  });

  it("should not be able to delete a question comment from another user", async () => {
    const createdQuestionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(createdQuestionComment);

    await expect(async () => await sut.execute({
      id: createdQuestionComment.id.toString(),
      authorId: "inexisting-author-id"
    })).rejects.toThrowError();
  });

  it("should not be able to delete a inexisting question comment", async () => {
    await expect(async () => await sut.execute({
      id: "inexisting-id",
      authorId: "inexisting-author-id"
    })).rejects.toThrowError();
  });
});

