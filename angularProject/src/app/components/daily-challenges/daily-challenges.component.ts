import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';


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
    NgIf
  ],
  templateUrl: './daily-challenges.component.html',
  styleUrl: './daily-challenges.component.css'
})


export class DailyChallengesComponent {

  challengeList : Challenge[] = [];
  totalScore : number = 0;

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
  }

  markAsCompleted(challenge: Challenge) {
    challenge.status = 'completed';
    this.totalScore++;
  }

  skipChallenge(challenge: Challenge) {
    challenge.status = 'skipped';
  }


}
