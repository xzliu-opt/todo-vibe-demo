export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  isFavorite: boolean;
  createdAt: number;
  completedAt: number | null;
}
