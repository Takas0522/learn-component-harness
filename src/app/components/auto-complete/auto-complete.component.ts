import { Component, OnInit, ViewChild } from '@angular/core';
import { AutoCompleteService } from './auto-complete.service';
import { MatInput } from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {

  private baseAutoCompleteArray: { id: number, name: string }[] = [];
  autoCompleteArray: { id: number, name: string }[] = [];
  testInputCtrl = new FormControl();

  constructor(
    private service: AutoCompleteService
  ) { }

  ngOnInit(): void {
    this.service.get$().subscribe(data => {
      this.baseAutoCompleteArray = data;
      this.autoCompleteArray = data;
    });
    this.testInputCtrl.valueChanges.subscribe(x => {
      if (x !== '') {
        const array = this.baseAutoCompleteArray.filter(f => f.name.includes(x));
        this.autoCompleteArray = array;
      } else {
        this.autoCompleteArray = this.baseAutoCompleteArray;
      }
    });
  }

  changeControlState() {
    this.testInputCtrl.disabled ? this.testInputCtrl.enable() : this.testInputCtrl.disable();
  }

}
