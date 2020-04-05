import * as p5 from 'p5';
import PARAMS from './pane';

console.log('p5 loaded');

new p5(p => {
  let x = 100;
  let y = 100;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
  };

  p.draw = () => {
    p.background(0);
    p.fill(255);
    p.rect(x, y, PARAMS.speed * 100, PARAMS.mountains * 50);
  };
}, document.querySelector(`.viewport`))