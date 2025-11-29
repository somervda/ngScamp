import { Component } from '@angular/core';
import { WebagentService } from '../services/webagent.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { marked } from 'marked';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  agentResponse = '';
  myForm: FormGroup;

  constructor(private webagent: WebagentService) {
    this.myForm = new FormGroup({
      prompt: new FormControl(''), // Initial value can be set here
    });
  }

  agentChat(prompt: string) {
    this.webagent.getChat(prompt).subscribe((data) => {
      console.log(data);
      this.agentResponse = marked(data, { async: false });
    });
  }
  sendPrompt() {
    this.agentResponse = '';
    console.log(this.myForm.value);
    this.agentChat(this.myForm.value.prompt);
    // Perform desired actions here
  }
}
