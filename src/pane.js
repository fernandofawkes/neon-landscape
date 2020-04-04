import Tweakpane from 'tweakpane';

// Parameter object
const PARAMS = {
  speed: 0.5,
  mountains: 0.5
};

// Pass the object and its key to pane
const pane = new Tweakpane();
pane.addInput(PARAMS, 'speed');
pane.addInput(PARAMS, 'mountains');