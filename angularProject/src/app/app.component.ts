import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {DailyChallengesComponent} from './components/daily-challenges/daily-challenges.component';
import {HomeComponent} from './components/home/home.component';
import {LeaderBoardComponent} from './components/leader-board/leader-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DailyChallengesComponent, RouterLink, RouterLinkActive, HomeComponent, LeaderBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularProject';
}
