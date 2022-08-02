import { Component, OnInit, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    // html2canvas(this.el.nativeElement).then(canvas => {
    //   document.body.appendChild(canvas)
    // })
  }

}
