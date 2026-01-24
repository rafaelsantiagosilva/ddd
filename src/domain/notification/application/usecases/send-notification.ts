import { right, type Either } from "@/core/either.ts";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { Notification } from "../../enterprise/entities/notification.ts";
import type { NotificationRepository } from "../repositories/notification-repository.ts";

type SendNotificationUseCaseRequest = {
  content: string;
  recipientId: string;
  title: string;
}

type SendNotificationUseCaseResponse = Either<null, { notification: Notification }>;

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationRepository) { }

  async execute({
    content,
    recipientId,
    title
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      content,
      recipientId: new UniqueEntityId(recipientId),
      title
    });

    await this.notificationsRepository.create(notification);

    return right({ notification });
  }
}