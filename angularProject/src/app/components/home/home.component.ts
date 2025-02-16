import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import {LeaderBoardComponent} from '../leader-board/leader-board.component';
import {Router, RouterLink} from '@angular/router';

interface Challenge {
  name: string;
  desc: string;
  id?: string;
  streak?: number;  // Optional streak property
  status?: string;  // Optional status property
  completedDates?: string[];  // Track the dates when the challenge was completed
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    LeaderBoardComponent,
    RouterLink
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  challenges: Challenge[] = [];
  defaultChallenges: Challenge[] = [
    { name: 'Run 10km', desc: 'Difficulty: Medium', id: 'default-1', streak: 5, status: 'In Progress' },
    { name: 'Meditate for 30 mins', desc: 'Difficulty: Easy', id: 'default-2', streak: 3, status: 'In Progress' }
  ];

  challengeName: string = '';
  challengeDesc: string = '';
  isEditing: boolean = false;
  currentChallenge: Challenge = { desc: '', name: '' }; // Holds the challenge being edited
  totalScore : number = 0;
  motivationalQuote : string = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.loadChallenges();

    const baseURL ="https://qapi.vercel.app/api/random";

    fetch(baseURL).then(basicData => basicData.json()).then(data=>{
      console.log(data);
      this.motivationalQuote = data.quote;
    });
  }

  // Load challenges from localStorage
  loadChallenges(): void {
    const savedChallenges = localStorage.getItem('challenges');
    this.challenges = savedChallenges ? JSON.parse(savedChallenges) : [];
  }

  // Add new challenge
  addChallenge(event: Event): void {
    event.preventDefault(); // Prevent form submission

    if (!this.challengeName.trim() || !this.challengeDesc.trim()) {
      alert('Please fill in both fields.');
      return;
    }

    const newChallenge: Challenge = {
      name: this.challengeName.trim(),
      desc: this.challengeDesc.trim(),
      id: this.generateUniqueId(),  // Ensure each challenge has a unique ID
      streak: 0,  // Initialize streak to 0
      status: 'In Process',  // Initialize status
      completedDates: []  // Initialize completedDates array
    };

    this.challenges.unshift(newChallenge);
    localStorage.setItem('challenges', JSON.stringify(this.challenges));

    this.challengeName = '';
    this.challengeDesc = '';
  }

  // Delete challenge
  deleteChallenge(index: number, isDefault: boolean = false): void {
    if (confirm('Are you sure you want to delete this challenge?')) {
      if (isDefault) {
        this.defaultChallenges.splice(index, 1);
      } else {
        this.challenges.splice(index, 1);
        localStorage.setItem('challenges', JSON.stringify(this.challenges));
      }
    }
  }

  // Edit challenge
  editChallenge(challenge: any) {
    this.isEditing = true;
    this.currentChallenge = { ...challenge }; // Creating a copy of the challenge
  }


  // Save updated challenge
  saveUpdatedChallenge(): void {
    if (!this.currentChallenge.name.trim() || !this.currentChallenge.desc.trim()) {
      alert('Please fill in both fields.');
      return;
    }

    const index = this.challenges.findIndex(c => c.id === this.currentChallenge.id);
    if (index !== -1) {
      this.challenges[index] = { ...this.currentChallenge };
      localStorage.setItem('challenges', JSON.stringify(this.challenges));
    }
    this.isEditing = false;
  }

  // Cancel editing
  cancelEdit(): void {
    this.isEditing = false;
  }

  // Generate unique ID for each challenge
  private generateUniqueId(): string {
    return 'challenge-' + new Date().getTime(); // Example: 'challenge-1629912020903'
  }

  // Clear form inputs
  clearForm(): void {
    this.challengeName = '';
    this.challengeDesc = '';
  }

  // Update status of a challenge
  updateStatus(challenge: Challenge): void {
    if (challenge.status === 'Completed') {
      this.markAsCompleted(challenge);
    } else if (challenge.status === 'Failed') {
      challenge.streak = 0; // Reset streak if the challenge is failed
    }
    localStorage.setItem('challenges', JSON.stringify(this.challenges));
  }

  // Mark challenge as completed
  markAsCompleted(challenge: Challenge): void {
    this.totalScore++;
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // If the challenge is not completed on the previous day, reset the streak
    if (challenge.completedDates && challenge.completedDates.length > 0) {
      const lastCompletedDate = challenge.completedDates[challenge.completedDates.length - 1];
      const lastDate = new Date(lastCompletedDate);
      const todayDate = new Date(today);

      // If the gap is more than 1 day, reset streak
      const dayDifference = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      if (dayDifference > 1) {
        challenge.streak = 1;
      }
    }

    // Check if the challenge was already completed today
    if (challenge.completedDates?.includes(today)) {
      alert('You have already completed this challenge for today.');
      return;
    }

    // Add today's date to the completedDates array
    if (!challenge.completedDates) {
      challenge.completedDates = [];
    }
    challenge.completedDates.push(today);

    // Update the streak
    if (challenge.streak === undefined) challenge.streak = 0;
    challenge.streak++;

    // Update the status
    challenge.status = 'Completed';

    // Save the updated challenges to localStorage
    localStorage.setItem('challenges', JSON.stringify(this.challenges));
  }


  navigateLink():void{
    this.router.navigate(['/leaderboard']);
  }
}
