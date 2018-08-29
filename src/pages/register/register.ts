import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	userFromForm='';
	emailFromForm='';
	passFromForm='';

	formgroup:FormGroup;
	formname:AbstractControl;
	formemail:AbstractControl;
	formpassword:AbstractControl;

	@ViewChild('username') user;
	@ViewChild('password') password;
	@ViewChild('email') email;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public formbuilder:FormBuilder, private http:Http) {
  	this.formgroup = formbuilder.group({
  		formname:['', Validators.required],  		
  		formemail:['', Validators.compose([
		Validators.required,
		Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
	])],
  		formpassword:['', Validators.required]
  	});
  	this.formname = this.formgroup.controls['formname'];
  }

registerUser(){
	if (this.userFromForm != "" && 
		this.passFromForm != "" && 
		this.emailFromForm != "") {
		if (this.validateEmail(this.emailFromForm)) {
			let headers = new Headers();
			headers.append("content-type","application/json");
			var params = JSON.stringify({
			  email:this.emailFromForm
			});
			this.http.post("http://18.219.243.249/check-email.php", params, {headers:headers}).subscribe(data => {
				var respy = JSON.parse(data["_body"]);
				console.log('consultando email no banco...');
				if(respy.exists) {
					console.log('este email está liberado');
					let headers = new Headers();
					headers.append("content-type","application/json");
					var params = JSON.stringify({
					  user:this.userFromForm
					});
					this.http.post("http://18.219.243.249/check-name.php", params, {headers:headers}).subscribe(data => {
						var respy = JSON.parse(data["_body"]);
						console.log('consultando nome no banco...');
						if(respy.exists) {
							console.log('este nome está liberado');
					  		let headers = new Headers();
							headers.append("content-type","application/json");
							var params = JSON.stringify({
							  user:this.userFromForm,
							  email:this.emailFromForm,
							  password:this.passFromForm
							});
							this.http.post("http://18.219.243.249/ionic-register.php", params, {headers:headers}).subscribe(data => {
								var respy = JSON.parse(data["_body"]);
								if (respy.resp == "success") {
									let toast = this.toastCtrl.create({
								    	message: 'User registered successfully',
								    	duration: 3000,
								    	position: 'top',
							  		});
							  		toast.present();
							  		this.navCtrl.push(LoginPage);
								} else {
									let toast = this.toastCtrl.create({
								    	message: 'Error in registering. Try again',
								    	duration: 3000,
								    	position: 'top',
								  	});
								  	toast.present();
								}
							});
						} else {
							console.log('este nome já existe');
							let toast = this.toastCtrl.create({
								message: 'This username already exists',
								duration: 3000,
								position: 'top',
							});
							toast.present();
						}
					});
				} else {
					console.log('este email já existe, abortar'); 
					let toast = this.toastCtrl.create({
						message: 'This email already exists',
						duration: 3000,
						position: 'top',
					});
					toast.present();
				}
			});			
		} else {
			let toast = this.toastCtrl.create({
		    	message: 'This is not a valid email',
		    	duration: 3000,
		    	position: 'top',
	  		});
	  		toast.present();
		}
	} else {
		let toast = this.toastCtrl.create({
	    	message: 'All fields must be completed',
	    	duration: 3000,
	    	position: 'top',
  		});
  		toast.present();
	}
	
}

goHome(){
	this.navCtrl.push(HomePage);
}

validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

}
