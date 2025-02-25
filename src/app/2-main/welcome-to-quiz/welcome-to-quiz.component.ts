import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStoreService } from '../quiz/services/quiz-store.service';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-welcome-to-quiz',
  imports: [TranslocoModule],
  templateUrl: './welcome-to-quiz.component.html',
  styleUrl: './welcome-to-quiz.component.scss'
})
export class WelcomeToQuizComponent {

  constructor(
    private router: Router,
    private quizStoreService: QuizStoreService) {}

  onStartQuiz() {
    this.router.navigate(['quiz']);
    this.quizStoreService.setQuizStartedState(true);
  }
}
