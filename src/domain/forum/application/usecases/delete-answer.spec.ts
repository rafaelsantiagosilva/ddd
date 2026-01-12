import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.ts";
import { Slug } from "../../enterprise/entities/value-objects/slug.ts";
import { makeAnswer } from "@/test/factories/make-answer.ts";
import { DeleteAnswerUseCase } from "./delete-answer.ts";

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
    await sut.execute({
      id: createdAnswer.id.toString(),
      authorId: createdAnswer.authorId.toString()
    });

    expect(inMemoryAnswersRepository.data).toHaveLength(0);
  });

  it("should not be able to delete a answer from another user", async () => {
    const createdAnswer = makeAnswer();

    await inMemoryAnswersRepository.create(createdAnswer);

    await expect(async () => await sut.execute({
      id: createdAnswer.id.toString(),
      authorId: "inexisting-author-id"
    })).rejects.toThrowError();
  });

  it("should not be able to delete a inexisting answer", async () => {
    await expect(async () => await sut.execute({
      id: "inexisting-id",
      authorId: "inexisting-author-id"
    })).rejects.toThrowError();
  });
});

