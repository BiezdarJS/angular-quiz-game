import { ChangeDetectionStrategy, Component, computed, Input, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { IQuestion } from '../../../interfaces/step.interface';
import { CurrentQuestionEnum } from '../../../enums/current-step.enum';
import { QuizStoreService } from '../../../services/quiz-store.service';
import { NgClass } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ANSWER_KEYS } from '../../../const/answer-keys';
import { TranslocoModule } from '@ngneat/transloco';
import { QUESTION_3_DATA } from '../../../data/question-3';

@Component({
  selector: 'app-question-3',
  imports: [NgClass, TranslocoModule],
  templateUrl: './question-3.component.html',
  styleUrl: './question-3.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Question3Component implements OnInit {
  @Input() quizForm!: FormGroup;
  /** Zwraca informację czy quiz został zakończony */
  public readonly isCompleted: Signal<boolean> = computed(() => this.quizStoreService.isCompleted());
   /** Zwraca obecnie wybrany element - prywatne */
   private _selectedIndex: WritableSignal<number | null> = signal(null);
   /** Zwraca obecnie wybrany element */
   public selectedIndex: Signal<number | null> = computed(() => this._selectedIndex());
  /** Czy przycisk next ma stan disabled? */
  public isDisabled: Signal<boolean> = computed(() => this._isDisabled());
  private _isDisabled: WritableSignal<boolean> = signal(true);
  /** Dane kroku */
  public question3Data: IQuestion[] = QUESTION_3_DATA;
  /** Możliwe klucze odpowiedzi */
  public readonly ANSWER_KEYS = ANSWER_KEYS;
  /** Enum dla określenia obecnie aktywnego pytania */
  public readonly CurrentQuestionEnum = CurrentQuestionEnum;

  constructor(private quizStoreService: QuizStoreService) { }

  ngOnInit() {
    this.checkAnswer()
    this.setNextButtonDisabledState();
  }

  private checkAnswer(): void {
    const previousAnswer = this.quizForm.get('question3')?.value;
    if (previousAnswer) {
      const selectedIdx = this.question3Data.findIndex(q => q.value === previousAnswer);
      this._selectedIndex.set(selectedIdx);
    }
  }

  public handleOptionChange(idx: number, value: string): void {
    if (this.isCompleted()) {
      return;
    }
    this._selectedIndex.set(idx);
    this.setNextButtonDisabledState();
    this.quizForm.get('question3')?.setValue(value);
  }

  private setNextButtonDisabledState(): void {
    if (this.selectedIndex() !== null || this.isCompleted()) {
      this._isDisabled.set(false);
    } else {
      this._isDisabled.set(true);
    }
  }

  public handlePreviousBtnAction(): void {
    this.quizStoreService.setCurrentQuizQuestion(CurrentQuestionEnum.SECOND);
    if (!this.isCompleted()) {
      this.quizStoreService.updateProgressBar();
    }
  }

  public handleNextBtnAction(): void {
    this.quizStoreService.setCurrentQuizQuestion(CurrentQuestionEnum.FOURTH);
    if (!this.isCompleted()) {
      this.quizStoreService.updateProgressBar();
    }
  }
}
