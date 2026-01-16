import { makeAnswer } from "@/test/factories/make-answer.ts";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.ts";
import { DeleteAnswerUseCase } from "./delete-answer.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer Use Case (Unit)", async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete a answer", async () => {
    const createdAnswer = makeAnswer();

    await inMemoryAnswersRepository.create(createdAnswer);

    const result = await sut.execute({
      id: createdAnswer.id.toString(),
      authorId: createdAnswer.authorId.toString()
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.data).toHaveLength(0);
  });

  it("should not be able to delete a answer from another user", async () => {
    const createdAnswer = makeAnswer();

    await inMemoryAnswersRepository.create(createdAnswer);

    const result = await sut.execute({
      id: createdAnswer.id.toString(),
      authorId: "inexisting-author-id"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("should not be able to delete a inexisting answer", async () => {
    const result = await sut.execute({
      id: "inexisting-id",
      authorId: "inexisting-author-id"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});

