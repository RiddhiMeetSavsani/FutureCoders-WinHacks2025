import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {DailyChallengesComponent} from './daily-challenges/daily-challenges.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DailyChallengesComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularProject';
}
