import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.ts";
import { Question } from "../../enterprise/entities/question.ts";
import { Slug } from "../../enterprise/entities/value-objects/slug.ts";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug.ts";
import { makeQuestion } from "@/test/factories/make-question.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug Use Case (Unit)", async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to get a question by slug", async () => {
    const createdQuestion = makeQuestion({
      slug: Slug.create("example-question")
    });

    await inMemoryQuestionsRepository.create(createdQuestion);

    const { question } = await sut.execute({
      slug: Slug.create("example-question")
    });

    expect(question.id).toBeTruthy();
    expect(question.slug.value).toBe("example-question");
  });

  it("should not be able to get a inexisting question by slug", async () => {
    expect(async () => await sut.execute({
      slug: Slug.create("new-title")
    })).rejects.toThrowError();
  })
});

