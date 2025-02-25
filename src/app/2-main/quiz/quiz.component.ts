import { ChangeDetectionStrategy, Component, computed, OnInit, Signal } from '@angular/core';
import { QuizStoreService } from './services/quiz-store.service';
import { CurrentQuestionEnum } from './enums/current-step.enum';
import { ProgresBarComponent } from './components/progres-bar/progres-bar.component';
import { ResultComponent } from './components/result/result.component';
import { QuizFormService } from './services/quiz-form.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Question1Component } from './components/questions/question-1/question-1.component';
import { Question2Component } from './components/questions/question-2/question-2.component';
import { Question3Component } from './components/questions/question-3/question-3.component';
import { Question4Component } from './components/questions/question-4/question-4.component';
import { fromEvent, merge, Subscription, switchMapTo, timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [
    ProgresBarComponent,
    Question1Component,
    Question2Component,
    Question3Component,
    Question4Component,
    ResultComponent,
    ReactiveFormsModule
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnInit {
  public readonly currentQuestion: Signal<CurrentQuestionEnum | null> = computed(() => this.quizStoreService.currentQuestion());
  public readonly isCompleted: Signal<boolean> = computed(() => this.quizStoreService.isCompleted());
  public readonly CurrentQuestionEnum = CurrentQuestionEnum;
  private inactivitySubscription!: Subscription;
  quizForm: FormGroup;
  /** Boolean czy wyświetlać widok pytań */
  public readonly questionsViewActive: Signal<boolean | null> = computed(() => {
    return this.currentQuestion() !== null
  });
  /** Boolean czy wyświetlać widok resultatu/wyniku quizu */
  public readonly resultViewActive: Signal<boolean | null> = computed(() => {
    return this.isCompleted() && this.currentQuestion() === null;
  });

  constructor(
    private quizStoreService: QuizStoreService,
    private quizFormService: QuizFormService,
    private router: Router) {
      this.quizForm = this.quizFormService.getForm();
    }

    ngOnInit() {
      this.quizStoreService.setQuizStartedState(true);
    }

  onSubmit() {
    this.quizFormService.submit();
  }

  ngAfterViewInit(): void {
    this.startInactivityTimer();
  }

  startInactivityTimer() {
    const activityEvents = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'touchstart')
    );

    this.inactivitySubscription = activityEvents.pipe(
      switchMapTo(timer(300000))
    ).subscribe(() => {
      this.router.navigate(['']);
    });
  }

  ngOnDestroy(): void {
    if (this.inactivitySubscription) {
      this.inactivitySubscription.unsubscribe();
    }
  }
}
