import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { faEdit, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  faSpinner = faSpinner;
  fetching = false;
  error: string = null;

  isLoginMode = true;

  constructor(private authService: AuthService, private toastr: ToastrService, private router:Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const name = "Ivan Gonzalez";
    const password_confirmation = form.value.password;

    let authObs : Observable<AuthResponseData>;

    this.fetching = true;

    if(this.isLoginMode){
     authObs = this.authService.login(email, password);
    } else {
     authObs = this.authService.signup(email, password, password_confirmation, name);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.fetching = false;
        this.router.navigate(['/admin']);
      },
      error => {
        console.log(error)
        this.error = 'An error ocurred'
        this.toastr.error(this.error);
        this.fetching = false;
      }
    );
      form.reset();

  }

}
