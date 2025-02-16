import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendInviteService {

  private apiUrl = "http://localhost:4200/api";
  constructor(private http: HttpClient) { }

  sendInvite(email: string, inviterId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-invite`, { email, inviterId });
  }

  checkInviteStatus(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/invite-status?email=${email}`);
  }

  assignChallenge(inviterId: string, receiverId: string, challengeId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/assign-challenge`, { inviterId, receiverId, challengeId });
  }
}
