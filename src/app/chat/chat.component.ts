import { Component } from '@angular/core';
import { WebagentService } from '../services/webagent.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})

export class ChatComponent {

    constructor(
    private webagent: WebagentService){
      this.webagent.getChat("Hi").subscribe(result =>{console.log(result)});
    }



  }
