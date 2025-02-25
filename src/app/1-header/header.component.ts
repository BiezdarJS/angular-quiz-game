import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { QuizVisibilityDirective } from '../2-main/quiz/directives/quiz-visibility.directive';
import { QuizStoreService } from '../2-main/quiz/services/quiz-store.service';

@Component({
  selector: 'app-header',
  imports: [TranslocoModule, RouterLink, QuizVisibilityDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public readonly quizStarted: Signal<boolean> = computed(() => this.quizStoreService.quizStarted());

  constructor(
    private quizStoreService: QuizStoreService,
    private translocoService: TranslocoService) {}

  public changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
