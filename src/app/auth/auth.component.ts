import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import domtoimage from 'dom-to-image'
import html2canvas from 'html2canvas';
import { LoadingSpinnerService } from '../shared/loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading = false;
  error: string = null;
  input = "";
  @ViewChild('authComponent', {static: true}) authComp: ElementRef;
  constructor(private authService: AuthService,
    private router: Router,
    private el: ElementRef,
    private loadingService: LoadingSpinnerService) { }
  
    // createScreenShot() {
    //   domtoimage.toPng(this.authComp.nativeElement).then(dataUrl => {
    //     var img = new Image();
    //     img.src = dataUrl;
    //     document.body.appendChild(img);
    //   });
    // }

  ngOnInit(): void {
    console.log(this.authComp.nativeElement);
    this.loadingService.isLoading.subscribe(state => {
      this.isLoading = state;
    })
    // this.createScreenShot();

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onHandleError() {
    this.error = null;
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    let authObs: Observable<AuthResponseData>;
    const email = form.value.email;
    const password = form.value.password;

    this.loadingService.isLoading.next(true);
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }
    authObs.subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/recipes']);
        // this.isLoading = false;
      }, errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    )
    form.reset();
  }

}
