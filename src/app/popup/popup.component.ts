import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzRowDirective,
    NzColDirective
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit{
  ngOnInit(): void {
    console.log('popup init')
  }

  sendMessage() {
    console.log('popup sendMessage')
    // @ts-ignore
    chrome.runtime.sendMessage({message: "hello"});
  }
}
