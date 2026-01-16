import { right, type Either } from "@/core/either.ts";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository.ts";
import { Answer } from "@/domain/forum/enterprise/entities/answer.ts";

type AnswerQuestionUseCaseRequest = {
  instructorId: string;
  questionId: string;
  answerContent: string;
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>;

export class AnswerQuestionUseCase {
  constructor(
    private answerRepository: AnswersRepository
  ) { }

  async execute({
    instructorId,
    questionId,
    answerContent
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content: answerContent,
      questionId: new UniqueEntityId(questionId),
      authorId: new UniqueEntityId(instructorId)
    });

    await this.answerRepository.create(answer);

    return right({ answer });
  }
}