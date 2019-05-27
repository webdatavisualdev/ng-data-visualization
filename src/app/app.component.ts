import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  steps = [
    'Nantucket street list',
    'Civis adults',
    'Civis nantucketers not',
    'Civis nantucketers',
    'Civis & street list',
    'Adults',
    'Children',
    'Foreign nationals',
    'Permanent residents',
  ];

  streetList = [{
    name: 'male',
    value: 5460,
    color: 'green',
  }, {
    name: 'female',
    value: 5340,
    color: 'red',
  }];

  civisList = [{
    name: 'male',
    value: 2320,
    color: 'blue',
  }, {
    name: 'female',
    value: 2200,
    color: 'deeppink',
  }];

  childList = [{
    value: 2580,
    color: 'orange',
  }];

  foreignList = [{
    value: 400,
    color: 'grey',
  }];

  civisStreetList = [{
    name: 'male',
    value: 5460,
    type: 'street',
    color: 'green',
  }, {
    name: 'female',
    value: 5340,
    type: 'street',
    color: 'red',
  }, {
    name: 'male',
    value: 2320,
    type: 'civis',
    color: 'blue',
  }, {
    name: 'female',
    value: 2200,
    type: 'civis',
    color: 'deeppink',
  }];

  civisStreetChildList = [{
    name: 'male',
    value: 5460,
    type: 'street',
    color: 'green',
  }, {
    name: 'female',
    value: 5340,
    type: 'street',
    color: 'red',
  }, {
    name: 'male',
    value: 2320,
    type: 'civis',
    color: 'blue',
  }, {
    name: 'female',
    value: 2200,
    type: 'civis',
    color: 'deeppink',
  }, {
    type: 'child',
    value: 2580,
    color: 'orange',
  }];

  totalList = [{
    name: 'male',
    value: 5460,
    type: 'street',
    color: 'green',
  }, {
    name: 'female',
    value: 5340,
    type: 'street',
    color: 'red',
  }, {
    name: 'male',
    value: 2320,
    type: 'civis',
    color: 'blue',
  }, {
    name: 'female',
    value: 2200,
    type: 'civis',
    color: 'deeppink',
  }, {
    type: 'child',
    value: 2580,
    color: 'orange',
  }, {
    type: 'foreign',
    value: 400,
    color: 'grey',
  }];

  stepperIndex = 0;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
  }

  getNumberOfList(list) {
    let num = 0;
    list.forEach(l => {
      num += l.value;
    });
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  changeStep(event) {
    this.stepperIndex = event.selectedIndex;
  }
}
