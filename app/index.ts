import { battery } from 'power';
import clock from 'clock';
import { display } from 'display';
import document from 'document';
import { HeartRateSensor } from 'heart-rate';
import { me as appbit } from 'appbit';
import { today } from 'user-activity';
import stats from './stat-handlers';
import { timeFormat, dateFormat } from './formatters';
import { preferences, locale, units } from 'user-settings';
import { UserPreferences } from './types/user-preferences';
import * as appSettings from 'simple-fitbit-settings/app';
import { Settings } from '../companion/settings';

// gather user prefs into a single object to throw around
const userPreferences: UserPreferences = {
  preferences,
  locale,
  units,
  permissions: appbit.permissions,
}

// Elements
const flagElement = document.getElementById('flag');
const iconElement = document.getElementById('icon');
const dateElement = document.getElementById('date');
const clockElement = document.getElementById('time');
const clockBGElement = document.getElementById('timeBG');
const hrmElement = document.getElementById('hrm');
const batteryElement = document.getElementById('battery');
const batteryGroup = document.getElementById('batteryGroup');
const statElement = document.getElementById('stat');
const statIconElement = document.getElementById('statIcon');
const svg = document.getElementById('container');

// Handle settings
// get an instance of Settings
const settings = new Settings();

// Helper function, debounced apply background opacity to time BG
let setBackgroundTransparencyTimeout = null;
function setBackgroundTransparency(newOpacity) {
  clearTimeout(setBackgroundTransparencyTimeout);
  setBackgroundTransparencyTimeout = setTimeout(() => {
    // @ts-ignore: element.style is valid for html and svg elements
    clockBGElement.style.opacity = newOpacity;
  }, 500);
}

appSettings.initialize(
  settings,
  (newSettings: Settings) => {
    if (newSettings.flag !== undefined) {
      // @ts-ignore: element.href is valid for svg image elements
      flagElement.href = `flags/${newSettings.flag.values[0].value}.png`;
    }

    if (newSettings.icon !== undefined) {
      if (newSettings.icon.values[0].value === '') {
        // @ts-ignore: element.href is valid for svg image elements
        iconElement.href = '';
      } else {
        // @ts-ignore: element.href is valid for svg image elements
        iconElement.href = `icons/${newSettings.icon.values[0].value}.png`;
      }
    }
    
    if (newSettings.timeBGTransparency !== undefined) {
      // @ts-ignore: element.style is valid for html and svg elements
      setBackgroundTransparency(newSettings.timeBGTransparency / 100);
    }

    if (newSettings.timeColor !== undefined) {
      // @ts-ignore: element.class is valid for html and svg elements
      clockElement.class = newSettings.timeColor;
    }
  }
)

// HRM
let hrm = null;
if (appbit.permissions.granted('access_heart_rate') && HeartRateSensor && !hrm) {
  hrm = new HeartRateSensor();

  hrm.onreading = function () {
    hrmElement.text = `${hrm.heartRate || '--'}`;
  };

  hrm.start();
}

// Handle clock tick
function tick(date: Date) {
  clockElement.text = timeFormat(date, preferences.clockDisplay === '24h');

  dateElement.text = dateFormat(date);

  // resize time background to match new time
  // @ts-ignore: element.getBBox is valid for svg elements
  const boundingBox = clockElement.getBBox();

  // @ts-ignore: element.x is valid for svg elements
  clockBGElement.x = boundingBox.left - 2;
  // @ts-ignore: element.width is valid for svg rect elements
  clockBGElement.width = boundingBox.width + 4;
}

// Draw once on load
tick(new Date());

// Tick once per minute
clock.granularity = 'minutes';

// Set function as handler
clock.ontick = function(clockTickEvent) {
  tick(clockTickEvent.date);
};

let statTimeout = setInterval(draw, 3000);
display.addEventListener('change', () => {
  if (display.on) {
    toggleSensors(true);
    statTimeout = setInterval(draw, 3000);
  } else {
    toggleSensors(false);
    clearInterval(statTimeout);
    statTimeout = null;
  }
});

function toggleSensors(toggleOn: boolean = true) {
  if (toggleOn && hrm && !hrm.activated) {
    hrm.start();
  } else if (!toggleOn && hrm && hrm.activated) {
    hrm.stop();
  }
}

const batteryClasses = [
  '', // 85+
  'mid', // 50-85,
  'low', // 25-50,
  'critical', // 0-25
];

// Battery display
function drawBattery() {
  batteryElement.text = `${battery.chargeLevel.toFixed(0)}`;

  // Get classes for battery indicators
  const batteryClasses = [];
  
  // indicate charging
  if (battery.charging) {
    batteryClasses.push('charging'); 
  }

  // Changes color based on chargeLevel
  if (battery.chargeLevel >= 50 && battery.chargeLevel < 85) {
    batteryClasses.push('mid');
  } else if (battery.chargeLevel >= 25 && battery.chargeLevel < 50) {
    batteryClasses.push('low');
  } else if (battery.chargeLevel < 25) {
    batteryClasses.push('critical');
  }
  batteryGroup.class = batteryClasses.join(' ');
}

// draw on init
drawBattery();

// set function handler
battery.onchange = drawBattery;

// track what statIndex we are showing
let statIndex = 0;

// initialize drawing
draw(true);

function draw(newstatIndex: boolean = false) {
  // draw stat
  stats[statIndex].init(statElement, today, userPreferences);
  
  if (newstatIndex) {
    // set new icon
    // @ts-ignore : Element.href is valid for SVG image elements
    statIconElement.href = `icons/${stats[statIndex].icon}.png`;
  }

  // Shift icon according to length of data in stat element
  // @ts-ignore : Element.x is valid for SVG rect elements
  statIconElement.x = (statElement.text.length * -5.5) + -18;
}

// Click handling
svg.onclick = () => {
  setTimeout(() => {
    // increment statIndex, then redraw
    statIndex = (statIndex + 1) % stats.length;

    draw(true);
  }, 200)
};