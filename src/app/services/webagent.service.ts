import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebagentService {
  constructor(private http: HttpClient) {}

  getChat(prompt: string) {
    let hostname = window.location.hostname;
    let result;
    if (hostname.toLowerCase().startsWith('piai')) {
      // Use the hostname to access the piai service (incases where domain name is part of host name)
      result = this.http.get<string>(
        'http://' + hostname + ':8123/chat?prompt=' + encodeURIComponent(prompt)
      );
    } else {
      // Otherwise use piai without a domain suffix
      result = this.http.get<string>(
        'http://piai:8123/chat?prompt=' + encodeURIComponent(prompt)
      );
    }
    return result;
  }
}
