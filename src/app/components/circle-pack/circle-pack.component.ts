import { Component, OnInit, AfterViewChecked, AfterViewInit, Input, ViewChild, OnDestroy } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-circle-pack',
  templateUrl: './circle-pack.component.html',
  styleUrls: ['./circle-pack.component.scss']
})
export class CirclePackComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() data = [];
  @Input() title = '';
  @Input() size = 0;
  @Input() id;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const width = d3.select(`#${this.id} #chart`).node().getBoundingClientRect().width;
    let height = d3.select(`#${this.id} #chart`).node().getBoundingClientRect().height;
    height = width > height ? height : width;
    const svg = d3.select(`#${this.id} #chart`)
      .append('svg')
        .attr('width', width)
        .attr('height', height);

    const data = [];
    let totalNum = 0;
    this.data.forEach(d => {
      totalNum += d.value;
    });
    const divider = parseInt((totalNum / this.size).toFixed(), 10);
    this.data.sort((a, b) => {
      return a.value > b.value ? 1 : -1;
    });
    this.data.forEach((d) => {
      for (let i = 0 ; i < parseInt((d.value / divider).toFixed(), 10) ; i ++) {
        const radius = Math.random() * 10;
        data.push({color: d.color, radius: radius > 7 ? radius : 7});
      }
    });

    const node = svg.append('g')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr('r', (d) => d.radius)
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .style('fill', (d) => d.color)
        .style('fill-opacity', 0.5);

    const simulation = d3.forceSimulation()
        .force('center', d3.forceCenter().x(width / 2).y(height / 2))
        .force('charge', d3.forceManyBody().strength(0.1))
        .force('collide', d3.forceCollide().strength(0.1).radius(1).iterations(0.01));

    simulation
    .nodes(data)
    .on('tick', () => {
      node.attr('cx', d =>  d.x)
        .attr('cy', d =>  d.y);
    });
  }

  ngOnDestroy() {
    d3.select(`#${this.id} #chart svg`).remove();
  }
}
