import { Category } from "./category.model";
import { User } from "./users.models";

;

export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    version: number;
    user: User;
    category: Category;
  }
  