import type { Answer } from "@/domain/forum/enterprise/entities/answer.ts";
import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository.ts";
import { AnswerQuestionUseCase } from "./answer-question.ts";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.ts";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Answer Question Use Case (Unit)", async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to answer a question / create a new answer", async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      answerContent: "New answer"
    });

    expect(answer.id).toBeTruthy();
    expect(answer.content).toBe("New answer");
    expect(inMemoryAnswersRepository.data[0]).toBe(answer);
  })
});

