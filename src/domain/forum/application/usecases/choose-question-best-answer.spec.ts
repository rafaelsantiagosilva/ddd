import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { makeAnswer } from "@/test/factories/make-answer.ts";
import { makeQuestion } from "@/test/factories/make-question.ts";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.ts";
import { InMemoryQuestionAttachmentsRepository } from "@/test/repositories/in-memory-question-attachments-repository.ts";
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.ts";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer.ts";
import { NotAllowedError } from "./errors/not-allowed-error.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer (Unit)", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
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

    const result = await sut.execute({
      authorId: createdQuestion.authorId.toString(),
      answerId: createdAnswer.id.toString()
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionsRepository.data[0]?.bestAnswerId).toBe(createdAnswer.id);
  });

  it("should not be able to choose another user question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId("author-1")
    });

    const answer = makeAnswer({
      questionId: question.id
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: "author-2"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});