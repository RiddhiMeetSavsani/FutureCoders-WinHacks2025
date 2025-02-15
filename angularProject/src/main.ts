import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter, Routes} from '@angular/router';
import {DailyChallengesComponent} from './app/daily-challenges/daily-challenges.component';


const routes: Routes = [
  { path: 'challenges', component: DailyChallengesComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
}).then(r => console.log('Bootstrap successful'));
