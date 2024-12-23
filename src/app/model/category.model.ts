import { Task } from "./task.model";

export interface Category {
    id: number;      // L'id de la catégorie
    name: string;    // Le nom de la catégorie
    description: string;
    tasks?: Task[];  // Un tableau optionnel de tâches
  }
  
  
  