import { makeAnswer } from "@/test/factories/make-answer.ts";
import { InMemoryAnswerAttachmentsRepository } from "@/test/repositories/in-memory-answer-attachments-repository.ts";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.ts";
import { OnAnswerCreated } from "./on-answer-created.ts";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
  });

  it("should send a notification when an answer is created", () => {
    new OnAnswerCreated();

    const answer = makeAnswer();

    inMemoryAnswersRepository.create(answer);
  });
});