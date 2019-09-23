import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() language = new EventEmitter();
  public config: PerfectScrollbarConfigInterface = {};
  public showSearch = false;
  flag = '';
  langenglish: boolean;
  langarabic: boolean;
  username: any;
  useremail: any;
  userimgpath = this._user.userimgpath;

  constructor(
    private modalService: NgbModal,
    private _user: UserinfoService,
    private cmn: UserinfoService,
    public router: Router
  ) {

    this._user.myuname.subscribe(message => {
      this.username = message;
    });

    this.username = window.localStorage.getItem("name")

    this._user.myemail.subscribe(cemail => {
      this.useremail = cemail;
    })

    this.useremail = window.localStorage.getItem("username")

    // this.cmn.currentMessagecat.subscribe(message => {
    //   console.log(message);
    //   var languageoption = message.split("_")[1];
    //   console.log(languageoption);
    //    // this.cmn.changeMessagecat("uid_" + languageoption)
    // });
    // this.cmn.currentMessagecat.subscribe(message => {
    //   console.log(message);
    //   var languageoption = message.split("_")[1];
    //   console.log(languageoption);
    //    // this.cmn.changeMessagecat("uid_" + languageoption)
    // });

    this._user.loginselected_lang.subscribe(message3 =>{
      this.flag= message3;

      if(this.flag == "EN"){
        this.langenglish = true;
        this.langarabic = false;
      }else {
         this.langenglish = false;
      this.langarabic = true;
    }
    })

  
  }
  ngOnInit() {
    this.langenglish = true;
    this.langarabic = false;

    if(this.flag == ""){
      this.flag = 'EN';
    }

    this._user.changeMessagecat("uid_" + this.flag);
    // this.flag = 'EN';
    // alert( this.langarabic)
  }
  // This is for Notifications
  notifications = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    }
  ];

  // This is for Mymessages
  mymessages = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    }
  ];
  updateFlag = (flag) => {
    //  this.langenglish = true;
    this.langenglish = false;
    this.langarabic = false;
    // alert(flag)
    // alert(this.langenglish)
    if (flag === 'eng') {
      this.flag = 'EN';
      this._user.changeMessagecat("uid_" + this.flag);
      this.langenglish = true;
    } else {
      this.flag = 'AR';
      this._user.changeMessagecat("uid_" + this.flag);
      this.langarabic = true;
    }

    // this.cmn.currentuserlanguage(this.flag);
  }



  changelag = (lang) => {
    this.langenglish = false;
    this.langarabic = false;
    if (lang === 'English') {
      this.flag = 'EN';
      this.langenglish = true;
    } else {
      this.flag = 'AR';
      this.langarabic = true;
    }
  }


  ngAfterViewInit() { }

  logout() {
    localStorage.removeItem('isLoggedin');
    window.localStorage.clear();
    this.router.navigate(['/newlogin']);
  }

  ngOnDestroy(){
   
    this._user.currentMessagecat.subscribe(message3 =>{
      console.log(message3+"-Destroyed");
    })
  }
}
