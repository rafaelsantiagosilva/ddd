import type { Notification } from "../../enterprise/entities/notification.ts";

export interface NotificationRepository {
  findById(id: string): Promise<Notification | null>
  create(notification: Notification): Promise<void>;
  save(notification: Notification): Promise<void>;
}