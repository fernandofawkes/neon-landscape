import Tweakpane from 'tweakpane';
console.log(`pane loaded`);

// Parameter object
const PARAMS = {
  speed: 0.5,
  mountains: 3,
  scale: 100
};

export const VARS = {
  get width() {
    return window.innerWidth
  },
  get height() {
    return window.innerHeight
  }
};

// Pass the object and its key to pane
const controlPannel = new Tweakpane();
controlPannel.addInput(PARAMS, 'speed', {
  min: -5,
  max: 5,
  step: 0.1
});
controlPannel.addInput(PARAMS, 'mountains');
controlPannel.addInput(PARAMS, 'scale', {
  min: 30,
  max: 400
});

export default PARAMS;