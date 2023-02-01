import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonDatetime, NavController } from '@ionic/angular';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.page.html',
  styleUrls: ['./event-update.page.scss'],
})
export class EventUpdatePage implements OnInit {

  gg: FormGroup |any;
  currentDate = new Date().toISOString();
  data=1;
  id: any;



  constructor(private formBuilder: FormBuilder, private navController: NavController,private activatedRoute: ActivatedRoute,private alertController: AlertController,private router: Router,private http: HttpClient)  {
    this.gg = this.formBuilder.group({
      title: ['', Validators.required],
      dnt: ['', Validators.required],
      dur: ['', Validators.required],
      desc: ['', Validators.required],
      tof: ['', Validators.required],
      Venue: ['', Validators.required]
    });
    this.id=this.activatedRoute.snapshot.queryParams['id'];
  }

  sendData(title:string,Date:IonDatetime,dur:number,desc:string,tof1:string,venu1:string ) {
    const g={title:""+title,dnt:''+Date,dur:''+dur,desc:''+desc,tof:''+tof1,venue:''+venu1,id:''+this.id}
    this.http.post('https://technostoregg.000webhostapp.com/event_update.php/',JSON.stringify(g)).subscribe(
      (response )=> {
        this.data=1;
          },
          (error)=>{
            this.data=0;
          });
  }
  ngOnInit(): void {

  }
  onSubmit() {
    if (this.gg.valid) {
      const f=this.gg.get('title').value;
      const em=this.gg.get('dnt').value;
      const p=this.gg.get('dur').value;
      const e=this.gg.get('desc').value;
      const t=this.gg.get('tof').value;
      const v=this.gg.get('Venue').value;
      this.sendData(f,em,p,e,t,v);
      if(this.data==0){
        this.showAlert();
      }
      else if(this.data==1){
        this.showAlert1();
      }
    }
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'NOt DONE',
      message: 'EVENT ADDED',
      buttons:  [
        {
          text: 'OK',
          handler: () => {
            this.navController.navigateForward('/admin-home');
          }
        }
      ]
    });
     await alert.present();
  }
  async showAlert1() {
    const alert = await this.alertController.create({
      header: ' DONE',
      message: 'EVENT  ADDED',
      buttons:  [
        {
          text: 'OK',
          handler: () => {
            this.navController.navigateForward('/event-list');
          }
        }
      ]
    });
     await alert.present();
  }
}
