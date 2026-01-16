import { makeQuestionComment } from "@/test/factories/make-question-comment.ts";
import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository.ts";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

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
    const result = await sut.execute({
      id: createdQuestionComment.id.toString(),
      authorId: createdQuestionComment.authorId.toString()
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionCommentsRepository.data).toHaveLength(0);
  });

  it("should not be able to delete a question comment from another user", async () => {
    const createdQuestionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(createdQuestionComment);

    const result = await sut.execute({
      id: createdQuestionComment.id.toString(),
      authorId: "inexisting-author-id"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("should not be able to delete a inexisting question comment", async () => {
    const result = await sut.execute({
      id: "inexisting-id",
      authorId: "inexisting-author-id"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});

