import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter, Routes} from '@angular/router';
import {DailyChallengesComponent} from './app/components/daily-challenges/daily-challenges.component';
import {LeaderBoardComponent} from './app/components/leader-board/leader-board.component';
import {HomeComponent} from './app/components/home/home.component';


const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent }, // Default route (home)
  { path: 'leaderboard', component: LeaderBoardComponent }, // Leaderboard page
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
}).then(r => console.log('Bootstrap successful'));
