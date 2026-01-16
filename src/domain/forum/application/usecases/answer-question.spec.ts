import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.ts";
import { AnswerQuestionUseCase } from "./answer-question.ts";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Answer Question Use Case (Unit)", async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to answer a question / create a new answer", async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      answerContent: "New answer"
    });

    const { value } = result;

    expect(result.isRight()).toBe(true);
    expect(value?.answer.content).toBe("New answer");
    expect(inMemoryAnswersRepository.data[0]).toBe(value?.answer);
  })
});

