import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-ng-test';
  langs = [
    {label: _('locale.english'), value: 'en'},
    {label: _('locale.spanish'), value: 'es'}
  ];
  selectedLang = 'en';

  constructor(private translate: TranslateService) {

    translate.addLangs(['en', 'es']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  setLanguage() {
    this.translate.use(this.selectedLang);
  }
}
