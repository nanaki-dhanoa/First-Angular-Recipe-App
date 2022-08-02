import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import html2canvas  from 'html2canvas'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  selectedFont = 'Times New Roman';
  canvas: HTMLCanvasElement;
  onChange(font) {
    this.selectedFont = font;
  }

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.autoLogin();
  }

}
