import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.ts";
import { Slug } from "../../enterprise/entities/value-objects/slug.ts";
import { makeQuestion } from "@/test/factories/make-question.ts";
import { DeleteQuestionUseCase } from "./delete-question.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question Use Case (Unit)", async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to delete a question", async () => {
    const createdQuestion = makeQuestion({
      slug: Slug.create("example-question")
    });

    await inMemoryQuestionsRepository.create(createdQuestion);
    await sut.execute({
      id: createdQuestion.id.toString(),
      authorId: createdQuestion.authorId.toString()
    });

    expect(inMemoryQuestionsRepository.data).toHaveLength(0);
  });

  it("should not be able to delete a question from another user", async () => {
    const createdQuestion = makeQuestion({
      slug: Slug.create("example-question")
    });

    await inMemoryQuestionsRepository.create(createdQuestion);

    await expect(async () => await sut.execute({
      id: createdQuestion.id.toString(),
      authorId: "inexisting-author-id"
    })).rejects.toThrowError();
  });

  it("should not be able to delete a inexisting question", async () => {
    await expect(async () => await sut.execute({
      id: "inexisting-id",
      authorId: "inexisting-author-id"
    })).rejects.toThrowError();
  });
});

