import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebagentService {

  constructor(private http: HttpClient) {}

    getChat(prompt: string) {
    let result = this.http.get<string>(
      'http://piai:8123/chat?prompt=' + encodeURIComponent(prompt),
    );
    return result;
  }
}