import { HttpClient } from '@angular/common/http';
import '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';





@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {
  listData: any;
  id: any;

  constructor(private http: HttpClient,private router:Router,private localNotifications: LocalNotifications) {
    this.getData();}

  ngOnInit() {
  }
  getData(){
    this.http.get("https://technostoregg.000webhostapp.com/getevent.php").subscribe((response)=>{
      this.listData=response;
    })
  }

  updateEvent(id :number){
    this.id=id;
    this.navigate();

  }
  navigate(){
    this.router.navigate(['/event-update'], {
      queryParams: {
        id:this.id
      }
    });
  }


  isDisabled(eDAte:string){
    const now = new Date().toISOString();

    if (now < eDAte) {

      return false;
    }
    return true;
  }

  showNoti(){
    this.localNotifications.schedule({
      id: 1,
      title: 'Local notification',
      text: 'Notification text'
    });
  }
  }

