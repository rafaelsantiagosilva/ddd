import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { QuestionComment, type QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-comment.ts";
import { faker } from "@faker-js/faker";

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityId
) {
  const question = QuestionComment.create({
    authorId: new UniqueEntityId(),
    questionId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override
  }, id);

  return question;
}