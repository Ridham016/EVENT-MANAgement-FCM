import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Route, Router } from '@angular/router';
import { NavController,IonRefresher, AlertController  } from '@ionic/angular';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
  @ViewChild(IonRefresher, { static: false })
  refresher!: IonRefresher;
 listData:any;
 id: any;


  constructor(private http: HttpClient, private navController: NavController,private alertCtrl: AlertController,private router:Router) {
    this.getData();
  }

  ngOnInit() {
  }
navigate(){
  this.router.navigate(['/update-user'], {
    queryParams: {
      id:this.id
    }
  });
}
updateTask(id: string){
  this.id=id;
console.log(id);
this.navigate();

}

deleteTask(id: any){
  console.log(id);
  const g={id:""+id};
  this.http.post('https://technostoregg.000webhostapp.com/delete_user.php/',JSON.stringify(g)).subscribe(
          (response) => {
            console.log('Data sent successfully');

          },
          (error) => {
            console.error('Error sending data:', error);
          }
        );

}

getData(){
  this.http.get("https://technostoregg.000webhostapp.com/getuser_login.php").subscribe((response)=>{
    this.listData=response;
  })
}
refresh() {
  this.getData();
  this.refresher.complete();
}
Logout(){
  this.router.navigate(['/home']);
  localStorage.removeItem('username');
  localStorage.removeItem('password');
 }



 async presentDeleteConfirm(id:any) {
  const alert = await this.alertCtrl.create({
    header: 'Confirm',
    message: 'Are you sure you want to delete this item?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Delete',
        handler: () => {
          console.log('Confirm Okay');
          this.deleteTask(id);
        }
      }
    ]
  });

  await alert.present();
}
}
