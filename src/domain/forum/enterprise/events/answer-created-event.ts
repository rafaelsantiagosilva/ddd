import type { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import type { DomainEvent } from "@/core/events/domain-event.ts";
import type { Answer } from "../entities/answer.ts";

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date;

  constructor(public answer: Answer) {
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.answer.id;
  }
}