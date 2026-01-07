import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebagentService {
  constructor(private http: HttpClient) {}

  getChat(prompt: string, selectedLLM: number) {
    console.log('getChat:', prompt, selectedLLM);
    let hostname = window.location.hostname;
    let result;
    let url =
      'http://piai:8123/chat?prompt=' +
      encodeURIComponent(prompt) +
      '&llmService=' +
      selectedLLM.toString();

    if (hostname.toLowerCase().startsWith('piai')) {
      // Use the hostname to access the piai service (incases where domain name is part of host name)
      let url =
        'http://' +
        hostname +
        ':8123/chat?prompt=' +
        encodeURIComponent(prompt) +
        '&llmService=' +
        selectedLLM.toString();
    }
    result = this.http.get<string>(url);
    return result;
  }
}
