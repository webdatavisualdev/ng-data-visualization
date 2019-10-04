import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  steps = [
    'Estimating population',
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
    name: 'female',
    population: 5340,
    color: '#ed6d68',
    width: 12,
    value: 60
  }, {
    name: 'male',
    population: 5460,
    color: '#75c46c',
    width: 4,
    value: 140
  }];

  civisList = [{
    name: 'female',
    population: 2200,
    color: '#ec98cb',
    width: 12,
    value: 100
  }, {
    name: 'male',
    population: 2320,
    color: '#3091d7',
    width: 4,
    value: 200
  }];

  civisTotalList = {
    total: [{
      name: 'female',
      population: 7540,
      color: '#ec98cb',
      width: 12,
      value: 100
    }, {
      name: 'male',
      population: 7780,
      color: '#3091d7',
      width: 4,
      value: 200
    }],
    right: [{
      name: 'female',
      population: 5340,
      color: '#ec98cb',
      width: 12,
      value: 80
    }, {
      name: 'male',
      population: 5460,
      color: '#3091d7',
      width: 4,
      value: 160
    }],
    left: [{
      name: 'female',
      population: 2200,
      color: '#ec98cb',
      width: 12,
      value: 15
    }, {
      name: 'male',
      population: 2320,
      color: '#3091d7',
      width: 4,
      value: 30
    }],
  };

  civisAndStreetTotalList = {
    total: [{
      name: 'female',
      population: 2200,
      color: '#ec98cb',
      width: 12,
      value: 15
    }, {
      name: 'male',
      population: 2320,
      color: '#3091d7',
      width: 4,
      value: 30
    }],
    right: [{
      name: 'female',
      population: 5340,
      color: '#ed6d68',
      width: 12,
      value: 80
    }, {
      name: 'male',
      population: 5460,
      color: '#75c46c',
      width: 4,
      value: 160
    }],
    left: [{
      name: 'female',
      population: 2200,
      color: '#ec98cb',
      width: 12,
      value: 15
    }, {
      name: 'male',
      population: 2320,
      color: '#3091d7',
      width: 4,
      value: 30
    }],
  };

  civisStreetList = [{
    name: 'civis-female',
    population: 2200,
    color: '#ec98cb',
    width: 10,
    value: 40
  }, {
    name: 'civis-male',
    population: 2320,
    color: '#3091d7',
    width: 5,
    value: 70
  }, {
    name: 'street-female',
    population: 5340,
    color: '#ed6d68',
    width: 3,
    value: 100
  }, {
    name: 'street-male',
    population: 5460,
    color: '#75c46c',
    width: 3,
    value: 140
  }];

  childList = {
    total: [{
      name: 'civis-female',
      population: 2200,
      color: '#ec98cb',
      width: 10,
      value: 40
    }, {
      name: 'civis-male',
      population: 2320,
      color: '#3091d7',
      width: 5,
      value: 70
    }, {
      name: 'street-female',
      population: 5340,
      color: '#ed6d68',
      width: 3,
      value: 100
    }, {
      name: 'street-male',
      population: 5460,
      color: '#75c46c',
      width: 3,
      value: 140
    }],
    left: [{
      name: 'civis-female',
      population: 2200,
      color: '#ec98cb',
      width: 10,
      value: 40
    }, {
      name: 'civis-male',
      population: 2320,
      color: '#3091d7',
      width: 5,
      value: 70
    }, {
      name: 'street-female',
      population: 5340,
      color: '#ed6d68',
      width: 3,
      value: 100
    }, {
      name: 'street-male',
      population: 5460,
      color: '#75c46c',
      width: 3,
      value: 140
    }],
    right: [{
      name: 'child',
      population: 2580,
      color: '#f6a15a',
      width: 12,
      value: 15
    }],
  };

  foreignList = {
    total: [{
      name: 'civis-female',
      population: 2200,
      color: '#ec98cb',
      width: 10,
      value: 40
    }, {
      name: 'civis-male',
      population: 2320,
      color: '#3091d7',
      width: 5,
      value: 70
    }, {
      name: 'child',
      population: 2580,
      color: '#f6a15a',
      width: 5,
      value: 90
    }, {
      name: 'street-female',
      population: 5340,
      color: '#ed6d68',
      width: 3,
      value: 100
    }, {
      name: 'street-male',
      population: 5460,
      color: '#75c46c',
      width: 3,
      value: 140
    }],
    left: [{
      name: 'civis-female',
      population: 2200,
      color: '#ec98cb',
      width: 10,
      value: 40
    }, {
      name: 'civis-male',
      population: 2320,
      color: '#3091d7',
      width: 5,
      value: 70
    }, {
      name: 'child',
      population: 2580,
      color: '#f6a15a',
      width: 5,
      value: 90
    }, {
      name: 'street-female',
      population: 5340,
      color: '#ed6d68',
      width: 3,
      value: 110
    }, {
      name: 'street-male',
      population: 5460,
      color: '#75c46c',
      width: 3,
      value: 150
    }],
    right: [{
      name: 'foreign',
      population: 400,
      color: '#81bab5',
      width: 5,
      value: 15
    }],
  };

  totalList = [{
    name: 'foreign',
    population: 400,
    color: '#81bab5',
    width: 5,
    value: 15
  }, {
    name: 'civis-female',
    population: 2200,
    color: '#ec98cb',
    width: 10,
    value: 40
  }, {
    name: 'civis-male',
    population: 2320,
    color: '#3091d7',
    width: 5,
    value: 70
  }, {
    name: 'child',
    population: 2580,
    color: '#f6a15a',
    width: 5,
    value: 90
  }, {
    name: 'street-female',
    population: 5340,
    color: '#ed6d68',
    width: 3,
    value: 110
  }, {
    name: 'street-male',
    population: 5460,
    color: '#75c46c',
    width: 3,
    value: 150
  }];

  stepperIndex = 0;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
  }

  getNumberOfList(list) {
    let num = 0;
    list.forEach(l => {
      num += l.population;
    });
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  changeStep(event) {
    this.stepperIndex = event.selectedIndex;
  }
}
