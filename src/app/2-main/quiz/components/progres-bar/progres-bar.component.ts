import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { QuizStoreService } from '../../services/quiz-store.service';
import { CurrentQuestionEnum } from '../../enums/current-step.enum';

@Component({
  selector: 'app-progres-bar',
  imports: [],
  templateUrl: './progres-bar.component.html',
  styleUrl: './progres-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgresBarComponent {

  public readonly currentQuestion: Signal<CurrentQuestionEnum | null> = computed(() => this.quizStoreService.currentQuestion());
  public readonly progressBarWidth: Signal<string> = computed(() => `${this.quizStoreService.progresBarWidth()}%`);

  constructor(private quizStoreService: QuizStoreService) { }
}
