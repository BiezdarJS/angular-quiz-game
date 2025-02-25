import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { CurrentQuestionEnum } from '../enums/current-step.enum';
import { ScoreAmountEnum } from '../enums/score-amount.enum';

@Injectable({
  providedIn: 'root',
})
export class QuizStoreService {


  public readonly CurrentQuestionEnum = CurrentQuestionEnum;
  private _currentQuestion: WritableSignal<CurrentQuestionEnum | null> = signal(CurrentQuestionEnum.FIRST);
  public currentQuestion: Signal<CurrentQuestionEnum | null> = computed(() => this._currentQuestion());

  private _progresBarWidth: WritableSignal<number|null> = signal(null);
  public progresBarWidth: Signal<number|null> = computed(() => this._progresBarWidth());

  private _isCompleted: WritableSignal<boolean> = signal(false);
  public isCompleted: Signal<boolean> = computed(() => this._isCompleted());

  private _scoreVerdict: WritableSignal<ScoreAmountEnum | null> = signal(null);
  public scoreVerdict: Signal<ScoreAmountEnum | null> = computed(() => this._scoreVerdict());

  private _quizStarted: WritableSignal<boolean> = signal(false);
  public quizStarted: Signal<boolean> = computed(() => this._quizStarted());





  public numberOfQuestions: number = 4;

  public setQuizStartedState(value: boolean): void {
    this._quizStarted.set(value);
  }

  public setCurrentQuizQuestion(currentQuestion: CurrentQuestionEnum | null): void {
    this._currentQuestion.set(currentQuestion);
  }

  public setCompletedState(value: boolean): void {
    this._isCompleted.set(value);
  }

  public updateProgressBar(): void {
    const progress = ((this.currentQuestion() ?? this.numberOfQuestions) / this.numberOfQuestions) * 100;
    this._progresBarWidth.set(progress);
  }

  public handleScoreVerdict(score: number): void {
    switch(true) {
      case (score >= 0 && score <= 50):
        this._scoreVerdict.set(ScoreAmountEnum.LOW)
        break;
      case (score > 50 && score <= 80):
        this._scoreVerdict.set(ScoreAmountEnum.MEDIUM)
        break;
      case (score > 80 && score <= 100):
        this._scoreVerdict.set(ScoreAmountEnum.HIGH)
        break;
    }
  }
}
