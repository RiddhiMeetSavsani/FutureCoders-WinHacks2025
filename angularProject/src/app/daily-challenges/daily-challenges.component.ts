import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';


interface Challenge{
  id : number;
  title : String,
  type : String,
  status : "pending" | "completed" | "skipped",
  icon : String
}

@Component({
  selector: 'app-daily-challenges',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './daily-challenges.component.html',
  styleUrl: './daily-challenges.component.css'
})


export class DailyChallengesComponent {

  challengeList : Challenge[] = [];
  totalScore : number = 0;
  motivationalQuote : string = '';

  constructor() {
  }

  ngOnInit() : void {
    this.challengeList = [
      {id : 1, title:"Do 10 Push ups", type:"Fitness", status:"pending", icon: "fa-solid fa-dumbbell"},
      {id : 1, title:"Do 10 Push ups", type:"Fitness", status:"pending", icon: "fa-solid fa-dumbbell"},
      {id : 1, title:"Do 10 Push ups", type:"Fitness", status:"pending", icon: "fa-solid fa-dumbbell"},
      {id : 1, title:"Do 10 Push ups", type:"Fitness", status:"pending", icon: "fa-solid fa-dumbbell"},
      {id : 1, title:"Do 10 Push ups", type:"Fitness", status:"pending", icon: "fa-solid fa-dumbbell"}

    ]

    const baseURL = "https://qapi.vercel.app/api/random";
    fetch(baseURL)
      .then(response => response.json())
      .then(data => {
        this.motivationalQuote = data.quote;  // Store the quote in the component
      })
      .catch(error => console.error('Error fetching quote:', error));
  }

  markAsCompleted(challenge: Challenge) {
    challenge.status = 'completed';
    this.totalScore++;
  }

  skipChallenge(challenge: Challenge) {
    challenge.status = 'skipped';
  }


}
