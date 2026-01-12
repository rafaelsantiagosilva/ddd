import { makeAnswerComment } from "@/test/factories/make-answer-comment.ts";
import { InMemoryAnswerCommentsRepository } from "@/test/repositories/in-memory-answer-comments-repository.ts";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment.ts";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer Comment Use Case (Unit)", async () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to delete a answer comment", async () => {
    const createdAnswerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(createdAnswerComment);
    await sut.execute({
      id: createdAnswerComment.id.toString(),
      authorId: createdAnswerComment.authorId.toString()
    });

    expect(inMemoryAnswerCommentsRepository.data).toHaveLength(0);
  });

  it("should not be able to delete a answer comment from another user", async () => {
    const createdAnswerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(createdAnswerComment);

    await expect(async () => await sut.execute({
      id: createdAnswerComment.id.toString(),
      authorId: "inexisting-author-id"
    })).rejects.toThrowError();
  });

  it("should not be able to delete a inexisting answer comment", async () => {
    await expect(async () => await sut.execute({
      id: "inexisting-id",
      authorId: "inexisting-author-id"
    })).rejects.toThrowError();
  });
});

