import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { HomePage } from '../home/home';
import { UsersPage } from '../users/users';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	userFromForm='';
	passFromForm='';

	@ViewChild('username') user;
	@ViewChild('password') password;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, private toastCtrl: ToastController, private http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

   usersRedirect () {
  	this.navCtrl.push(UsersPage);
  }

  signInUser () {
	let headers = new Headers();
	headers.append("content-type","application/json");
	var params = JSON.stringify({
	  user:this.userFromForm,
	  password:this.passFromForm
	});
	this.http.post("http://18.219.243.249/login.php", params, {headers:headers}).subscribe(data => {
		var respy = JSON.parse(data["_body"]);
		if (respy.resp == "true") {
          this.navCtrl.push(UsersPage);
        } else {
          let toast = this.toastCtrl.create({
	    	message: 'Invalid username or password',
	    	duration: 3000,
	    	position: 'top',
	  		});
	  		toast.present();
        }
	});
  }

goHome(){
	this.navCtrl.push(HomePage);
}
 
}
