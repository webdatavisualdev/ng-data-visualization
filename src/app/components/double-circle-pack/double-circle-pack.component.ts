import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-double-circle-pack',
  templateUrl: './double-circle-pack.component.html',
  styleUrls: ['./double-circle-pack.component.scss']
})
export class DoubleCirclePackComponent implements AfterViewInit, OnDestroy {
  @Input() data: any = {};
  @Input() rightTitle = '';
  @Input() leftTitle = '';
  @Input() totalTitle = '';
  @Input() id;
  @Input() totalStroke;
  @Input() leftStroke;
  @Input() rightStroke;
  @Input() leftRadius = 8;
  @Input() rightRadius = 8;
  @Input() totalRadius = 8;
  @Input() rightFontSize = 45;
  @Input() leftFontSize = 45;
  @Input() totalFontSize = 45;
  @Input() totalPosition = 'right';

  simulations = [];
  timers = [];

  constructor() { }

  ngAfterViewInit() {
    const width = d3.select(`#${this.id} #chart`).node().getBoundingClientRect().width;
    let height = d3.select(`#${this.id} #chart`).node().getBoundingClientRect().height;
    height = width > height ? height : width;
    const svg = d3.select(`#${this.id} #chart`)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    this.drawChart(this.data.total, this.getWidthPos(this.totalPosition, width), height, 'svg-total', false, this.totalRadius);
    if (this.totalTitle) {
      this.drawTitle(svg,
        this.getWidthPos(this.totalPosition, width),
        height,
        this.totalTitle,
        this.totalStroke,
        this.totalFontSize,
        'total-text-g');
    }
    const timer1 = setTimeout(() => {
      let arNodes = [];
      this.data.total.forEach(d => {
        arNodes = arNodes.concat(d3.range(d.value * d.width).map(() => {
          return {
            type: d.name,
            color: d.color,
            value: d.value,
            radius: Math.ceil(Math.random() * this.totalRadius + 2)
          };
        }));
      });
      const aG = d3.select('svg').append('g').attr('id', 'svg-temp')
        .attr('transform', `translate(${this.getWidthPos(this.totalPosition, width)}, ${height / 2})`);
      const aNode = aG.selectAll('circle')
        .data(arNodes)
        .enter().append('circle')
        .attr('r', d => d.radius)
        .style('opacity', 0)
        .attr('fill', d => d.color);
      const simulation = d3.forceSimulation(arNodes)
        .force('collide', d3.forceCollide().strength(1).radius(d => d.radius + 0.3))
        .force('r', d3.forceRadial(d => d.value).strength(0.1))
        .on('tick', () => {
          aNode.attr('cx', d => d.x)
            .attr('cy', d => d.y);
        })
        .alphaTarget(0.005)
        .alphaDecay(0.15);

      const timer2 = setTimeout(() => {
        simulation.stop();
        d3.select('#svg-temp').selectAll('circle')
        .data(arNodes)
        .transition()
        .duration(3000)
        .on('start', function() {
          d3.select(this).style('opacity', 0.6);
        })
        .style('opacity', 0)
        .remove()
        .attr('cx', d => d.radius * (Math.random() * -100))
        .attr('cy', d => d.radius * (Math.random() * 15));
      }, 1000);
      this.timers.push(timer2);
    }, 500);
    this.timers.push(timer1);

    const timer3 = setTimeout(() => {
      this.drawChart(this.data.left, width / 4, height, 'svg-left', true, this.leftRadius);
      this.removeChart('svg-total');
      this.removeChart('total-text-g');
      this.drawChart(this.data.right, width * 3 / 4, height, 'svg-right', true, this.rightRadius);
      if (this.rightTitle) {
        this.drawTitle(svg, width * 3 / 4, height, this.rightTitle, this.rightStroke, this.rightFontSize, 'right-text-g');
      }
      if (this.leftTitle) {
        this.drawTitle(svg, width / 4, height, this.leftTitle, this.leftStroke, this.leftFontSize, 'left-text-g');
      }
    }, 2500);
    this.timers.push(timer3);
  }

  drawTitle(svg, width, height, title, stroke, fontSize, id) {
    let y = -40;
    const textG = svg.append('g')
      .attr('id', id)
      .attr('transform', `translate(${width}, ${height / 2})`);
    const textlines = title.trim().split('  ');
    if (textlines.length === 2) {
      y = -20;
    }
    for (let tl = 0; tl < textlines.length; tl++) {
      textG.append('text')
        .attr('opacity', 0)
        .attr('y', () => {
          return tl === 0 ? y : y += 50;
        })
        .attr('fill', '#ffffff')
        .attr('font-size', fontSize)
        .attr('paint-order', 'stroke')
        .attr('stroke', stroke)
        .attr('stroke-width', 9)
        .attr('stroke-linecap', 'butt')
        .attr('stroke-linejoin', 'miter')
        .attr('class', 'name-text')
        .text(textlines[tl])
        .attr('letter-spacing', 3)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Roboto, sans-serif');
      textG.selectAll('text')
        .transition()
        .duration(3000)
        .style('opacity', 1);
    }
  }

  drawChart(data, width, height, id, animation, radius) {
    let nodes = [];
    data.forEach(d => {
      nodes = nodes.concat(d3.range(d.value * d.width).map(() => {
        return {
          type: d.name,
          color: d.color,
          value: d.value,
          radius: Math.ceil(Math.random() * radius + 2)
        };
      }));
    });
    const g = d3.select('svg').append('g').attr('id', id)
    .attr('transform', `translate(${width}, ${height / 2})`);
    const node = g.selectAll('circle')
    .data(nodes)
    .enter().append('circle')
    .attr('r', d => d.radius)
    .attr('fill', d => d.color)
    .style('opacity', animation ? 0 : 1);

    const simulation = d3.forceSimulation(nodes)
    .force('collide', d3.forceCollide().strength(1).radius(d => d.radius + 0.3))
    .force('r', d3.forceRadial(d => d.value).strength(0.1))
    .on('tick', () => {
      node.attr('cx', d => d.x)
        .attr('cy', d => d.y);
    })
    .alphaTarget(0.005)
    .alphaDecay(0.15);

    this.simulations.push(simulation);

    if (animation) {
      g.selectAll('circle')
      .transition().duration(2000)
      .style('opacity', 1);
    }
  }

  getWidthPos(position, width) {
    if (position === 'center') {
      return width / 2;
    } else if (position === 'left') {
      return width / 4;
    } else {
      return width * 3 / 4;
    }
  }

  removeChart(id) {
    d3.selectAll(`#${id}`).remove();
  }

  ngOnDestroy() {
    d3.select(`#${this.id} #chart svg`).remove();
    this.simulations.forEach(s => {
      s.stop();
    });
    this.timers.forEach(t => {
      clearTimeout(t);
    });
  }
}
