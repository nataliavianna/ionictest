import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http) {
  }

  ionViewDidLoad() {
    var params = {};
    var results = "";
    let headers = new Headers();
    headers.append("content-type","application/json");
    this.http.post("http://18.219.243.249/userlist.php", params, {headers:headers}).subscribe(data => {
      var respy = JSON.parse(data["_body"]);
  		for (var i = 0; i < respy.ids.length; i++) {
        results += "<tr><td>"+respy.usersy[i]+"</td><td>"+respy.emaily[i]+"</td></tr>";
  		}
      document.getElementById("userList").innerHTML = results;
  	});
  }


exit() {
  	this.navCtrl.setRoot(HomePage);
  }

}
