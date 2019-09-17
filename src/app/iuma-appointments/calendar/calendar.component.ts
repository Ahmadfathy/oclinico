import { Component } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';
import * as $ from 'jquery';
declare const loadAllAppointments: any;
declare const languageChange:any

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent  {

  languageoption: string;
  constructor(public cmn : UserinfoService) {}
    ngOnInit() {
      $(".errormsg").hide();
      this.cmn.currentMessagecat.subscribe(message => {
        console.log(message);
        if(message) {
          this.languageoption = message.split("_")[1];
          console.log(this.languageoption);
          new languageChange(this.languageoption);
        }
       
        
    })
      let jsNode = document.createElement('script');
      jsNode.src = 'assets/fullcalendar/js/fullcalendar.js';
      jsNode.type = 'text/javascript';
      jsNode.async = false;
      jsNode.charset = 'utf-8';
      document.getElementsByTagName('body')[0].appendChild(jsNode);
    }
    }


