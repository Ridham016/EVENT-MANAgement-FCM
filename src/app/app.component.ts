import { Component, OnInit } from '@angular/core';
import{FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit{
  constructor( private fcm :FCM) {
  }
  ngOnInit(): void {
    this.fcm.getToken().then(token => {
      console.log(token);
      this.fcm.subscribeToTopic('all');
    });

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
  }
}
