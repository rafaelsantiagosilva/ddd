import { makeAnswer } from "@/test/factories/make-answer.ts";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.ts";
import { EditAnswerUseCase } from "./edit-answer.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer Use Case (Unit)", async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a answer", async () => {
    const createdAnswer = makeAnswer();

    await inMemoryAnswersRepository.create(createdAnswer);

    const result = await sut.execute({
      id: createdAnswer.id.toString(),
      authorId: createdAnswer.authorId.toString(),
      content: "New content to this answer..."
    });

    const editedAnswer = await inMemoryAnswersRepository.findById(createdAnswer.id.toString());

    expect(result.isRight()).toBe(true);
    expect(editedAnswer).toBeTruthy();
    expect(editedAnswer!.content).toBe("New content to this answer...");
  });

  it("should not be able to edit a answer from another user", async () => {
    const createdAnswer = makeAnswer();

    await inMemoryAnswersRepository.create(createdAnswer);

    const result = await sut.execute({
      id: createdAnswer.id.toString(),
      authorId: "inexisting-author-id",
      content: "New content to this answer..."
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("should not be able to edit a inexisting answer", async () => {
    const result = await sut.execute({
      id: "inexisting-id",
      authorId: "inexisting-author-id",
      content: "New content to this answer..."
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});

