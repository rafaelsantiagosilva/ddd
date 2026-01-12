import { makeQuestion } from "@/test/factories/make-question.ts";
import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository.ts";
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository.ts";
import { CommentOnQuestionUseCase } from "./comment-on-question.ts";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment On Question Use Case (Unit)", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository
    );
  });

  it("should be able to comment on a question", async () => {
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: "Test comment"
    });

    expect(inMemoryQuestionCommentsRepository.data[0]).toBeTruthy();
  });
});