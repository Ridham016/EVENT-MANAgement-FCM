import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
log: FormGroup | any;
Status:any;
  data: any;
  id: any;
  rememberMe = false;

onSubmit() {

  const em=this.log.get('email').value;
  const p=this.log.get('password').value;
  this.getData(em,p);

  if (this.rememberMe) {
    localStorage.setItem('username', em);
    localStorage.setItem('password', p);
}

}

  constructor(private formBuilder: FormBuilder,private router: Router,private http: HttpClient,private alertController: AlertController) {
    this.log = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }
  getData(email1:string,password1:string) {

    const g={email:''+email1,password:''+password1};
    this.http.post('https://technostoregg.000webhostapp.com/login_event.php/',JSON.stringify(g)).subscribe(response => {
      this.data = response;
      if(this.data['Status']==true){
        this.id=this.data.UserData[0].intE;
        this.router.navigate(['/user-home'], {
          queryParams: {
            intE:this.id
          }
        });
       }
       else if(this.log.get('email').value=='admin@mail.com' && this.log.get('password').value=='admin12345'){
        this.router.navigate(['/admin-home']);
       }
       else{
         this.showAlertF();
       }
      })
  }

  ngOnInit() {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      this.log.get('email').setValue(storedUsername);
      this.log.get('password').setValue( storedPassword);
      this.rememberMe = true;
    }
  }


  async showAlertF() {
    const alert = await this.alertController.create({
      header: 'INVAILD',
      message: 'EMAIL or Password is wrong',
      buttons: ['OK']
    });
     await alert.present();
  }


}
