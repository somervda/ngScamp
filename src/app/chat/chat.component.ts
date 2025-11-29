import { Component } from '@angular/core';
import { WebagentService } from '../services/webagent.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
    this.webagent.getChat(prompt).subscribe((result) => {
      console.log(result);
      this.agentResponse = result;
    });
  }
  sendPrompt() {
    this.agentResponse = '';
    this.agentChat(this.myForm.value.prompt);
    // Perform desired actions here
  }
}
