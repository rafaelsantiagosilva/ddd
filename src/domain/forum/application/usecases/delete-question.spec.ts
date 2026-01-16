import { makeQuestion } from "@/test/factories/make-question.ts";
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.ts";
import { DeleteQuestionUseCase } from "./delete-question.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question Use Case (Unit)", async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to delete a question", async () => {
    const createdQuestion = makeQuestion();

    await inMemoryQuestionsRepository.create(createdQuestion);

    const result = await sut.execute({
      id: createdQuestion.id.toString(),
      authorId: createdQuestion.authorId.toString()
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionsRepository.data).toHaveLength(0);
  });

  it("should not be able to delete a question from another user", async () => {
    const createdQuestion = makeQuestion();

    await inMemoryQuestionsRepository.create(createdQuestion);

    const result = await sut.execute({
      id: createdQuestion.id.toString(),
      authorId: "inexisting-author-id"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("should not be able to delete a inexisting question", async () => {
    const result = await sut.execute({
      id: "inexisting-id",
      authorId: "inexisting-author-id"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});

