import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzMessageService} from "ng-zorro-antd/message";

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

  constructor(private msgSrv: NzMessageService) {
  }
  ngOnInit(): void {
    console.log('popup init')
  }

  sendMessage() {
    console.log('popup sendMessage')
    // @ts-ignore
    chrome.runtime.sendMessage({message: "hello"});
  }

  handleTab() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}).then(tabs => {
      let result = "无"
      if (tabs.length > 0) {
        result = tabs[0].title as string;
      }
      this.msgSrv.info("当前激活的标签页为: " + result)
    })
    // chrome.tabs.query({}).then(res => {
    //   console.log(res)
    // })


    // chrome.runtime.sendMessage({action: "getCurrentTab"}).then(r => {
    //   console.log(r)
    // });

  }

  getStorage() {
    chrome.storage.local.get("config").then((result) => {
      this.msgSrv.info(JSON.stringify(result['config']))
    });

  }

  registerDom() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}).then(tabs => {
      if (tabs.length <= 0) {
        this.msgSrv.error("当前没有激活的标签页")
        return;
      }
      let [tab] = tabs;
      chrome.tabs.sendMessage(tab.id as number,{action: "registerButton"}).then(r => {
        console.log(r)
      });
    })

  }
}
