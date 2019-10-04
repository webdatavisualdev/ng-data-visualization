import { Component, AfterViewInit, OnDestroy, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-rect-pack',
  templateUrl: './rect-pack.component.html',
  styleUrls: ['./rect-pack.component.scss']
})
export class RectPackComponent implements AfterViewInit, OnDestroy {
  @Input() id = 'chart';
  @Input() data = [];
  @Input() radius = 8;

  constructor() { }

  ngAfterViewInit() {
    const width = d3.select(`#${this.id} #chart`).node().getBoundingClientRect().width;
    let height = d3.select(`#${this.id} #chart`).node().getBoundingClientRect().height;
    height = width > height ? height : width;
    const svg = d3.select(`#${this.id} #chart`)
      .append('svg')
        .attr('width', width)
        .attr('height', height);

    let nodes = [];
    this.data.forEach(d => {
      nodes = nodes.concat(d3.range(d.value * d.width).map(() => {
        return {
          type: d.name,
          color: Math.random() > 0.5 ? '#ec98cb' : '#3091d7',
          value: d.value,
          radius: Math.ceil(Math.random() * this.radius + 2)
        };
      }));
    });

    const g = svg.append('g').attr('id', 'svg-right')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
    const node = g.selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => d.color);

    d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody())
      .force('collide', d3.forceCollide().strength(1).radius(d => d.radius + 0.3))
      // .force('r', d3.forceRadial(d => d.value).strength(0.1))
      .on('tick', () => {
        node.attr('cx', d => d.x)
          .attr('cy', d => d.y);
      })
      .alphaTarget(0.005)
      .alphaDecay(0.35);
  }

  ngOnDestroy() {
    d3.select(`#${this.id} #chart svg`).remove();
  }
}
