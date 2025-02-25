import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./2-main/welcome-to-quiz/welcome-to-quiz.component').then(c => c.WelcomeToQuizComponent)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./2-main/quiz/quiz.component').then(c => c.QuizComponent)
  },
];
