import { AggregateRoot } from "../entities/aggregate-root.ts";
import type { UniqueEntityId } from "../entities/unique-entity-id.ts";
import type { DomainEvent } from "./domain-event.ts";
import { DomainEvents } from "./domain-events.ts";

class CustomAggregateCreatedEvent implements DomainEvent {
  public ocurredAt: Date;

  constructor(private aggregate: CustomAggregate) {
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(
      new CustomAggregateCreatedEvent(aggregate)
    );

    return aggregate;
  }
}

describe("Domain Events", () => {
  it("should be able to dispatch and listen events", () => {
    const callbackSpy = vi.fn();

    // Subscriber cadastrado
    DomainEvents.register(callbackSpy, CustomAggregateCreatedEvent.name); // listen

    const aggregate = CustomAggregate.create();
    expect(aggregate.domainEvents).toHaveLength(1);

    // Disparando evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(callbackSpy).toHaveBeenCalledOnce();
    expect(aggregate.domainEvents).toHaveLength(0);
  });
});