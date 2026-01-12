import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.ts";
import { makeQuestion } from "@/test/factories/make-question.ts";
import { EditQuestionUseCase } from "./edit-question.ts";
import { Slug } from "../../enterprise/entities/value-objects/slug.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question Use Case (Unit)", async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => {
    const createdQuestion = makeQuestion();

    await inMemoryQuestionsRepository.create(createdQuestion);

    await sut.execute({
      id: createdQuestion.id.toString(),
      authorId: createdQuestion.authorId.toString(),
      title: "New Title",
      content: "New content to this question..."
    });

    const result = await inMemoryQuestionsRepository.findBySlug(Slug.create("new-title"));

    expect(result).toBeTruthy();
    expect(result!.content).toBe("New content to this question...");
  });

  it("should not be able to edit a question from another user", async () => {
    const createdQuestion = makeQuestion();

    await inMemoryQuestionsRepository.create(createdQuestion);

    await expect(async () => await sut.execute({
      id: createdQuestion.id.toString(),
      authorId: "inexisting-author-id",
      title: "New Title",
      content: "New content to this question..."
    })).rejects.toThrowError();
  });

  it("should not be able to edit a inexisting question", async () => {
    await expect(async () => await sut.execute({
      id: "inexisting-id",
      authorId: "inexisting-author-id",
      title: "New Title",
      content: "New content to this question..."
    })).rejects.toThrowError();
  });
});

