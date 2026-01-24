import { NotAllowedError } from "@/domain/forum/application/usecases/errors/not-allowed-error.ts";
import { ResourceNotFoundError } from "@/domain/forum/application/usecases/errors/resource-not-found-error.ts";
import { makeNotification } from "@/test/factories/make-notification.ts";
import { InMemoryNotificationsRepository } from "@/test/repositories/in-memory-notifications-repository.ts";
import { ReadNotificationUseCase } from "./read-notification.ts";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe("Read Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("should be able to read a notification", async () => {
    const notification = makeNotification();
    await inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: notification.recipientId.toString()
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.data[0]?.readAt).toEqual(expect.any(Date));
  });

  it("should not be able to read a inexisting notification", async () => {
    const result = await sut.execute({
      notificationId: "1",
      recipientId: "1"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to read a notification from another user", async () => {
    const notification = makeNotification();
    await inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: "2"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});