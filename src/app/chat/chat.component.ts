import { Component } from '@angular/core';
import { WebagentService } from '../services/webagent.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { marked } from 'marked';
import { DOCUMENT } from '@angular/common';
import { Inject, Renderer2 } from '@angular/core';

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
  wait = false;
  promptValue = '';

  constructor(
    private webagent: WebagentService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    this.myForm = new FormGroup({
      prompt: new FormControl(''), // Initial value can be set here
    });
  }

  agentChat(prompt: string) {
    // this.cursorService.showWaitingCursor()
    this.showProcessing(true);
    this.webagent.getChat(prompt).subscribe((data) => {
      console.log(data);
      this.showProcessing(false);
      this.agentResponse = marked(data, { async: false });
    });
  }
  sendPrompt() {
    this.agentResponse = '';
    this.agentChat(this.promptValue);
    // Perform desired actions here
  }

  onEnterPressed() {
    this.sendPrompt();
  }

  clrPrompt() {
    this.promptValue = '';
  }

  showProcessing(on: boolean) {
    if (on) {
      this.agentResponse = 'Processing...';
      this.renderer.addClass(this.document.body, 'waiting-cursor');
      this.wait = true;
    } else {
      this.agentResponse = '';
      this.renderer.removeClass(this.document.body, 'waiting-cursor');
      this.wait = false;
    }
  }
}
