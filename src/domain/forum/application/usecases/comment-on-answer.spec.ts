import { makeAnswer } from "@/test/factories/make-answer.ts";
import { InMemoryAnswerCommentsRepository } from "@/test/repositories/in-memory-answer-comments-repository.ts";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository.ts";
import { CommentOnAnswerUseCase } from "./comment-on-answer.ts";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("Comment On Answer Use Case (Unit)", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository
    );
  });

  it("should be able to comment on a answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "Test comment"
    });

    expect(inMemoryAnswerCommentsRepository.data[0]).toBeTruthy();
  });
});