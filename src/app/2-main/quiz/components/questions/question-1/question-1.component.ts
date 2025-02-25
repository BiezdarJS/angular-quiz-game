import { ChangeDetectionStrategy, Component, computed, ElementRef, Input, OnInit, QueryList, signal, Signal, ViewChildren, WritableSignal } from '@angular/core';
import { IQuestion } from '../../../interfaces/step.interface';
import { NgClass } from '@angular/common';
import { QuizStoreService } from '../../../services/quiz-store.service';
import { CurrentQuestionEnum } from '../../../enums/current-step.enum';
import { FormGroup } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { ANSWER_KEYS } from '../../../const/answer-keys';
import { QUESTION_1_DATA } from '../../../data/question-1';

@Component({
  selector: 'app-question-1',
  imports: [NgClass, TranslocoModule],
  templateUrl: './question-1.component.html',
  styleUrl: './question-1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Question1Component implements OnInit {
  @Input() quizForm!: FormGroup;
  /** Zwraca informację czy quiz został zakończony */
  public readonly isCompleted: Signal<boolean> = computed(() => this.quizStoreService.isCompleted());
  /** Zwraca obecnie wybrany element - prywatne */
  private _selectedIndex: WritableSignal<number | null> = signal(null);
  /** Zwraca obecnie wybrany element */
  public selectedIndex: Signal<number | null> = computed(() => this._selectedIndex());
  /** Zwraca informację czy przycisk next ma stan disabled - prywatne */
  private _isDisabled: WritableSignal<boolean> = signal(true);
  /** Zwraca informację czy przycisk next ma stan disabled */
  public isDisabled: Signal<boolean> = computed(() => this._isDisabled());

  /** Dane kroku */
  public question1Data: IQuestion[] = QUESTION_1_DATA;
  /** Enum obecnie wybranego pytania */
  public readonly CurrentQuestionEnum = CurrentQuestionEnum;
  /** Możliwe klucze odpowiedzi */
  public readonly ANSWER_KEYS = ANSWER_KEYS;

  constructor(private quizStoreService: QuizStoreService) { }


  ngOnInit() {
    this.checkAnswer();
    this.setNextButtonDisabledState();
  }

  private checkAnswer(): void {
    const previousAnswer = this.quizForm.get('question1')?.value;
    if (previousAnswer) {
      const selectedIdx = this.question1Data.findIndex(q => q.value === previousAnswer);
      this._selectedIndex.set(selectedIdx);
    }
  }

  public handleOptionChange(idx: number, value: string): void {
    if (this.isCompleted()) {
      return;
    }
    this._selectedIndex.set(idx);
    this.setNextButtonDisabledState();
    this.quizForm.get('question1')?.setValue(value);
  }

  private setNextButtonDisabledState(): void {
    if (this.selectedIndex() !== null || this.isCompleted()) {
      this._isDisabled.set(false);
    } else {
      this._isDisabled.set(true);
    }
  }

  public handleNextBtnAction(): void {
    this.quizStoreService.setCurrentQuizQuestion(CurrentQuestionEnum.SECOND);
    if (!this.isCompleted()) {
      this.quizStoreService.updateProgressBar();
    }
  }
}
