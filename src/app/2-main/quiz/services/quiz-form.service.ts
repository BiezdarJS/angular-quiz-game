import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizStoreService } from './quiz-store.service';
import { QUESTION_DATA_MAP } from '../data/question.data';

@Injectable({
  providedIn: 'root'
})
export class QuizFormService {

  private quizForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quizStoreService: QuizStoreService) {
    this.quizForm = this.fb.group({
      question1: [null],
      question2: [null],
      question3: [null],
      question4: [null],
    });
  }

  getForm(): FormGroup {
    return this.quizForm;
  }

  resetForm(): void {
    this.quizForm.reset();
  }

  getQuestion(field: string) {
    return this.quizForm.get(field);
  }


  private calculatePercentResult(): number {
    return (this.getQuestionScore(this.quizForm.value) / this.quizStoreService.numberOfQuestions) * 100;
  }


  private getQuestionScore(formValues: Record<string, string>): number {
    return Object.entries(formValues).reduce((score, [questionKey, selectedValue]) => {
      const questionData = QUESTION_DATA_MAP[questionKey];
      if (questionData) {
        const isCorrect = questionData.some(q => q.value === selectedValue && q.isCorrect);
        return score + (isCorrect ? 1 : 0);
      }
      return score;
    }, 0);
  }

  public getQuestionScorePublic() {
    return this.getQuestionScore(this.quizForm.value);
  }

  private handleFormSubmitLogic(): void {
    const score = this.calculatePercentResult();
    this.quizStoreService.setCurrentQuizQuestion(null);
    this.quizStoreService.updateProgressBar();
    this.quizStoreService.setCompletedState(true);
    this.quizStoreService.handleScoreVerdict(score);
  }

  public submit() {
    if (!this.quizForm.valid) {
      return;
    }
    this.handleFormSubmitLogic();
  }
}
