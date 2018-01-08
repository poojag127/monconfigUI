import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-render-comp',
  templateUrl: './render-comp.component.html',
  styleUrls: ['./render-comp.component.css']
})
export class RenderCompComponent implements OnInit {

  @Input()
  item:Object;

  @Input()
  disabled:boolean;

  constructor() { }

  ngOnInit() {
  }

}
