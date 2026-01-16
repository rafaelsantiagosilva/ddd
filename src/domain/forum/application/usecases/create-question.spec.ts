import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.ts";
import { CreateQuestionUseCase } from "./create-question.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question Use Case (Unit)", async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      authorId: "1",
      title: "New Question Title",
      content: "New question content...."
    });

    const { value } = result;

    expect(result.isRight()).toBe(true);
    expect(value?.question.slug.value).toBe("new-question-title");
    expect(inMemoryQuestionsRepository.data[0]).toBe(value?.question);
  })
});

