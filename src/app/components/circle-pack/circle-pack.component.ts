import { Component, AfterViewInit, Input, OnDestroy } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-circle-pack',
  templateUrl: './circle-pack.component.html',
  styleUrls: ['./circle-pack.component.scss']
})
export class CirclePackComponent implements AfterViewInit, OnDestroy {
  @Input() data = [];
  @Input() title = '';
  @Input() id;
  @Input() titleStroke;
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
          color: d.color,
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
      .force('collide', d3.forceCollide().strength(1).radius(d => d.radius + 0.3))
      .force('r', d3.forceRadial(d => d.value).strength(0.1))
      .on('tick', () => {
        node.attr('cx', d => d.x)
          .attr('cy', d => d.y);
      })
      .alphaTarget(0.005)
      .alphaDecay(0.15);

    let y = -40;
    const textG = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
    const textLlines = this.title.trim().split('  ');
    if (textLlines.length === 2) {
      y = -20;
    }
    for (let tl = 0; tl < textLlines.length; tl++) {
      textG.append('text')
        .attr('opacity', 0)
        .attr('y', () => {
          return tl === 0 ? y : y += 50;
        })
        .attr('fill', '#ffffff')
        .attr('font-size', 45)
        .attr('paint-order', 'stroke')
        .attr('stroke', this.titleStroke)
        .attr('stroke-width', 9)
        .attr('stroke-linecap', 'butt')
        .attr('stroke-linejoin', 'miter')
        .attr('class', 'name-text')
        .text(textLlines[tl])
        .attr('letter-spacing', 3)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Roboto, sans-serif');
      textG.selectAll('text')
        .transition()
        .duration(3000)
        .style('opacity', 1);
    }
  }

  ngOnDestroy() {
    d3.select(`#${this.id} #chart svg`).remove();
  }
}
