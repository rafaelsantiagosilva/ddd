import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.ts";
import { CreateQuestionUseCase } from "./create-question.ts";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";

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
      content: "New question content....",
      attachmentsIds: ['1', '2']
    });

    const { value } = result;

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionsRepository.data[0]).toBe(value?.question);
    expect(inMemoryQuestionsRepository.data[0]?.slug.value).toBe("new-question-title");
    expect(inMemoryQuestionsRepository.data[0]?.attachments.currentItems).toHaveLength(2);
    expect(inMemoryQuestionsRepository.data[0]?.attachments.currentItems).toStrictEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') })
    ]);
  })
});

