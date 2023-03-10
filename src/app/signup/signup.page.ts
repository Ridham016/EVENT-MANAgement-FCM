import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
gg: FormGroup |any;
  data: any;


constructor(private formBuilder: FormBuilder,private router: Router,private alertController: AlertController,private http: HttpClient)  {
  this.gg = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
    fname: ['', Validators.required],
    event: ['', Validators.required]
  });
}
sendData(fullname1:string,email1:string,password1:string,event1:string) {

  const g={fullname:fullname1,email:''+email1,password:''+password1,event:''+event1}
  console.log(g);
  this.http.post('https://technostoregg.000webhostapp.com/signup_event.php/',JSON.stringify(g)).subscribe(
        (response) => {
          this.data=response;
          console.log(this.data['Status']);
          if(this.data['Status']==false){
            this.showAlertF();
          }
          else{
            this.showAlertT();
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          console.error('Error sending data:', error);
        }
      );
}
ngOnInit() {

}


onSubmit() {
  if (this.gg.valid) {
    const f=this.gg.get('fname').value;
    const em=this.gg.get('email').value;
    const p=this.gg.get('password').value;
    const e=this.gg.get('event').value;
    this.sendData(f,em,p,e);
  }
}
  async showAlertF() {
    const alert = await this.alertController.create({
      header: 'INVAILD',
      message: 'EMAIL ALready exist',
      buttons: ['OK']
    });
     await alert.present();
  }

  async showAlertT() {
    const alert = await this.alertController.create({
      header: 'USER REGISTERED',
      message: 'Now Can LogIn',
      buttons: ['OK']
    });
     await alert.present();
  }
}


