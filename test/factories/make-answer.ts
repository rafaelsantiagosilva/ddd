import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { Answer, type AnswerProps } from "@/domain/forum/enterprise/entities/answer.ts";
import { faker } from "@faker-js/faker";

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId
) {
  const answer = Answer.create({
    authorId: new UniqueEntityId(),
    questionId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override
  }, id);

  return answer;
}