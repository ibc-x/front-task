import { Task } from "./task.model";

export interface User {
  id: number;            // Correspond à l'identifiant unique côté backend
  username: string;      // Nom d'utilisateur
  password: string;      // Mot de passe
  version: number;       // Utilisé pour la gestion de version des entités
  tasks?: Task[];        // Liste des tâches associées à l'utilisateur
}
