import { Routes } from '@angular/router';
import { LoginComponent } from './composants/login/login.component';
import { DashboardComponent } from './composants/dashboard/dashboard.component';
import { ProjectListComponent } from './composants/project/project-list/project-list.component';
import { TaskListComponent } from './composants/task/task-list/task-list.component';
import { CategoryListComponent } from './composants/category/category-list/category-list.component';
import { ProjectFormComponent } from './composants/project/project-form/project-form.component';
import { TaskFormComponent } from './composants/task/task-form/task-form.component';
import { CategoryFormComponent } from './composants/category/category-form/category-form.component';



export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'tasks', component: TaskListComponent },
     { path: 'tasks/new', component: TaskFormComponent },
    // { path: 'tasks/:id/edit', component: TaskEditComponent },
    // { path: 'tasks/:id/delete', component: TaskDeleteComponent },
    // { path: 'tasks/reorder', component: TaskReorderComponent },
    // { path: 'tasks/:id/files', component: TaskFilesComponent },
    // { path: 'tasks/:id/comments', component: TaskCommentsComponent },
     { path: 'projects', component: ProjectListComponent },
    { path: 'projects/new', component: ProjectFormComponent },
    // { path: 'projects/:id', component: ProjectDetailsComponent },
    // { path: 'projects/:id/edit', component: ProjectEditComponent },
     { path: 'categories', component: CategoryListComponent },
    { path: 'categories/new', component: CategoryFormComponent },
    // { path: 'tags', component: TagListComponent },
    // { path: 'tags/new', component: TagFormComponent },
    // { path: 'search', component: SearchFilterComponent },
    // { path: 'users', component: UserListComponent }, // Route pour UserListComponent
    // { path: 'users/:id', component: UserProfileComponent}, // Route pour UserFormComponent
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Route par défaut
    { path: '**', redirectTo: '/login' } // Route de secours pour les URLs non trouvées
];
