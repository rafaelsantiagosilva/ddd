import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.ts";
import { makeAnswer } from "@/test/factories/make-answer.ts";
import { EditAnswerUseCase } from "./edit-answer.ts";

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

    await sut.execute({
      id: createdAnswer.id.toString(),
      authorId: createdAnswer.authorId.toString(),
      content: "New content to this answer..."
    });

    const result = await inMemoryAnswersRepository.findById(createdAnswer.id.toString());

    expect(result).toBeTruthy();
    expect(result!.content).toBe("New content to this answer...");
  });

  it("should not be able to edit a answer from another user", async () => {
    const createdAnswer = makeAnswer();

    await inMemoryAnswersRepository.create(createdAnswer);

    await expect(async () => await sut.execute({
      id: createdAnswer.id.toString(),
      authorId: "inexisting-author-id",
      content: "New content to this answer..."
    })).rejects.toThrowError();
  });

  it("should not be able to edit a inexisting answer", async () => {
    await expect(async () => await sut.execute({
      id: "inexisting-id",
      authorId: "inexisting-author-id",
      content: "New content to this answer..."
    })).rejects.toThrowError();
  });
});

