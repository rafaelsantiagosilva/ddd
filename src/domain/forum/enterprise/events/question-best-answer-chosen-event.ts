import type { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import type { DomainEvent } from "@/core/events/domain-event.ts";
import type { Question } from "../entities/question.ts";

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  ocurredAt: Date;

  constructor(
    public question: Question,
    public bestAnswerId: UniqueEntityId
  ) {
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.question.id;
  }
}