import { DomainEvents } from "@/core/events/domain-events.ts";
import type { EventHandler } from "@/core/events/event-handler.ts";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/events/answer-created-event.ts";

export class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name
    );
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    console.log(answer);
  }
}