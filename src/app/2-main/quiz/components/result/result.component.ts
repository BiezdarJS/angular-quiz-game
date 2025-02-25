import { Component, computed, Signal } from '@angular/core';
import { QuizStoreService } from '../../services/quiz-store.service';
import { QuizFormService } from '../../services/quiz-form.service';
import { ScoreAmountEnum } from '../../enums/score-amount.enum';
import { CurrentQuestionEnum } from '../../enums/current-step.enum';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-result',
  imports: [TranslocoModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {

  public readonly ScoreAmountEnum = ScoreAmountEnum;
  public readonly scoreAmount: Signal<ScoreAmountEnum | null> = computed(() => this.quizStoreService.scoreVerdict());
  public numberOfQuestions!: number;
  public score!: number;
  public readonly CurrentQuestionEnum = CurrentQuestionEnum;

  constructor(
    private quizStoreService: QuizStoreService,
    private quizFormService: QuizFormService) { }

  ngOnInit() {
    this.numberOfQuestions = this.quizStoreService.numberOfQuestions;
    this.score = this.quizFormService.getQuestionScorePublic();
  }

  public checkAnswers() {
    this.quizStoreService.setCurrentQuizQuestion(CurrentQuestionEnum.FIRST);
  }
}
