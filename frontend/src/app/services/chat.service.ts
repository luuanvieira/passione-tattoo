import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatInteraction {
  session_id: string;
  message: string;
}

export interface ChatResponse {
  session_id: string;
  message: string;
  role: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8000';
  private sessionId: string = '';

  constructor(private http: HttpClient) {
    this.generateSessionId();
  }

  private generateSessionId(): void {
    this.sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getSessionId(): string {
    return this.sessionId;
  }

  resetSession(): void {
    this.generateSessionId();
  }

  sendMessage(message: string): Observable<ChatResponse> {
    const chatInteraction: ChatInteraction = {
      session_id: this.sessionId,
      message: message
    };

    return this.http.post<ChatResponse>(`${this.apiUrl}/chat`, chatInteraction);
  }
} 