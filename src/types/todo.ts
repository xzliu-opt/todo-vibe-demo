export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  isFavorite: boolean;
  reminderAt: number | null;
  createdAt: number;
  completedAt: number | null;
}
