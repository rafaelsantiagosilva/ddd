import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.ts";
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.ts";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer.ts";
import { makeQuestion } from "@/test/factories/make-question.ts";
import { makeAnswer } from "@/test/factories/make-answer.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer (Unit)", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository
    );
  });

  it("should be able to choose a best answer", async () => {
    const createdQuestion = makeQuestion();

    await inMemoryQuestionsRepository.create(createdQuestion);

    const createdAnswer = makeAnswer({
      questionId: createdQuestion.id
    });

    await inMemoryAnswersRepository.create(createdAnswer);

    const { question } = await sut.execute({
      authorId: createdQuestion.authorId.toString(),
      answerId: createdAnswer.id.toString()
    });

    expect(question.bestAnswerId).toBe(createdAnswer.id);
  });
});