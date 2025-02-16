import { Component } from '@angular/core';
import {FriendInviteService} from '../Services/friend-invite.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-invite-friend',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './invite-friend.component.html',
  styleUrl: './invite-friend.component.css'
})
export class InviteFriendComponent {

  email : string = ''; //email id will be the person whom I want to invite
  inviterId : string = "abc123@gmail.com";

  constructor(private friendInviteService : FriendInviteService){

  }

  sendInvite() {
    this.friendInviteService.sendInvite(this.email,this.inviterId).subscribe(
      response => {
        alert('Invitation send successfully!');
      }, error => {
        alert("Failed to send invite.")
      });
  }


}
