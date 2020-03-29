import { Component, ElementRef, Input } from '@angular/core';
import { BlockableUI } from 'primeng/api'; 

@Component({
  selector: 'app-ui-div',
  templateUrl: './ui-div.component.html',
  styleUrls: ['./ui-div.component.scss']
})
export class UiDivComponent implements BlockableUI {

  @Input() style: any;
  @Input() class: any;

  constructor(private el: ElementRef) { }

  getBlockableElement(): HTMLElement {
    return this.el.nativeElement.children[0];
  }

}
