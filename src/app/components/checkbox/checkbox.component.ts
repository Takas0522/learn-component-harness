import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange, MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  testInputCtrl = new FormControl();
  @ViewChild('checkbox2')
  private checkBox2!: MatCheckbox;

  constructor() { }

  ngOnInit(): void {
  }

  changeState(change: MatCheckboxChange) {
    if (change.checked) {
      this.testInputCtrl.disable();
    } else {
      this.testInputCtrl.enable();
    }
  }

  buttonClick() {
    this.checkBox2.disabled = !this.checkBox2.disabled;
  }

}
