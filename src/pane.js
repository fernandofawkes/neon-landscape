import Tweakpane from 'tweakpane';
console.log(`pane loaded`);

// Parameter object
const PARAMS = {
  speed: 0.5,
  mountains: 0.5
};

// Pass the object and its key to pane
const controlPannel = new Tweakpane();
controlPannel.addInput(PARAMS, 'speed');
controlPannel.addInput(PARAMS, 'mountains');

export default PARAMS;