import { battery } from 'power';
import clock from 'clock';
import { display } from 'display';
import document from 'document';
import { HeartRateSensor } from 'heart-rate';
import { me } from 'appbit';
import { today } from 'user-activity';
import stats from './stat-handlers';
import { timeFormat, dateFormat } from './formatters';
import { preferences, locale, units } from 'user-settings';
import { UserPreferences } from './types/user-preferences';

// gather user prefs into a single object to throw around
const userPreferences: UserPreferences = {
  preferences,
  locale,
  units
}

// Elements
const dateElement = document.getElementById('date');
const clockElement = document.getElementById('time');
const hrmElement = document.getElementById('hrm');
const batteryElement = document.getElementById('battery');
const statElement = document.getElementById('stat');
const statIconElement = document.getElementById('statIcon');
const svg = document.getElementById('container');

// HRM
let hrm = null;
if (HeartRateSensor && !hrm) {
  hrm = new HeartRateSensor();

  hrm.onreading = function () {
    hrmElement.text = `${hrm.heartRate || '--'}`;
  };

  hrm.start();
}

// clock.granularity = 'seconds';
clock.ontick = function (clockTickEvent) {
  // todo: can we redraw this when the preferences changes, since tick will be min not sec
  clockElement.text = timeFormat(clockTickEvent.date, preferences.clockDisplay === '24h');

  dateElement.text = dateFormat(clockTickEvent.date);
}

// TODO: this is throwing an error 61:7 - cannot read property activated of null - perms?
display.addEventListener('change', () => {
  // on display change = on: draw stats, set timeout for stats draw every few seconds (6?)
  // on display change = off: clear timeout for stats draw, 
  if (display.on) {
    handleDisplayOn();
  } else {
    handleDisplayOff();
  }
});

function handleDisplayOn() {
  // TODO: turn on hr sensor, draw stat, set timeout to draw stats
  if (hrm && !hrm.activated) {
    hrm.start();
  }  
}

function handleDisplayOff() {
  if (hrm && hrm.activated) {
    hrm.stop();
  }
}

// Battery display
batteryElement.text = `${battery.chargeLevel.toFixed(0)}`;
battery.onchange = function() {
  batteryElement.text = `${battery.chargeLevel.toFixed(0)}`;
}

let state = 0;
draw();

function draw() {
  // draw stat
  stats[state].init(statElement, today, userPreferences);
  
  // set new icon
  // TODO

  // Shift icon according to length of data in stat element
  // @ts-ignore : Element.x is valid for SVG elements
  statIconElement.x = (statElement.text.length * -4.5) + -18;
}

// Click handling
svg.onclick = () => {
  setTimeout(() => {
    // increment states
    state = (state + 1) % stats.length;
    draw();
  }, 200)
};