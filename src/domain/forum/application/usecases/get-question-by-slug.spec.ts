import { makeQuestion } from "@/test/factories/make-question.ts";
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.ts";
import { Slug } from "../../enterprise/entities/value-objects/slug.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug.ts";

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

    const result = await sut.execute({
      slug: Slug.create("example-question")
    });

    expect(result.isRight()).toBe(true);
    // @ts-ignore is a success
    expect(result.value.question.slug.value).toBe("example-question");
  });

  it("should not be able to get a inexisting question by slug", async () => {
    const result = await sut.execute({
      slug: Slug.create("new-title")
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  })
});

