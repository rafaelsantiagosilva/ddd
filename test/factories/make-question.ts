import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { Question, type QuestionProps } from "@/domain/forum/enterprise/entities/question.ts";
import { faker } from "@faker-js/faker";

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId
) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: faker.word.words(3).toUpperCase(),
    content: faker.lorem.text(),
    ...override
  }, id);

  return question;
}

console.log(makeQuestion());