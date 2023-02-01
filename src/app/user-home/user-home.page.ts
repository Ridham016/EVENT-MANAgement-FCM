import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {
  fav_event: any;
  data: any;
  selectedEvent= 0;


  constructor(private router: Router,private http: HttpClient,private activatedRoute: ActivatedRoute) {


    this.fav_event=this.activatedRoute.snapshot.queryParams['intE'];
    this.sendData();

  }

  ngOnInit() {
  }

  sendData() {

    const g={foe:''+this.fav_event}

    this.http.post('https://technostoregg.000webhostapp.com/getuser_fav_event.php',JSON.stringify(g)).subscribe(
          (response) => {
            console.log('Data sent successfully');
            this.data=response;
          },
          (error) => {
            console.error('Error sending data:', error);
          }
        );
  }

   Logout(){
    this.router.navigate(['/home']);
    localStorage.removeItem('username');
    localStorage.removeItem('password');
   }

}
