import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private language = new BehaviorSubject<string>('en'); // Default language
  private translations: any = {};

  constructor(private http: HttpClient) {
    this.loadTranslations(this.language.value);
  }

  loadTranslations(lang: string) {
    this.http.get(`assets/i18n/${lang}.json`).subscribe((data) => {
      this.translations = data;
    });
  }

  setLanguage(lang: string) {
    this.language.next(lang);
    this.loadTranslations(lang);
  }

  getTranslation(key: string): string {
    return this.translations[key] || key; // Return key if translation is missing
  }

  get language$() {
    return this.language.asObservable();
  }
}
