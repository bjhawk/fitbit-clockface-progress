import { gettext } from 'i18n';

function numberFormat(input: number, locale: string = 'en-US') {
  return input.toLocaleString(locale);
}

function timeFormat(dateObject: Date, hour24: boolean = false) {
  let hours = dateObject.getHours();
  if (!hour24 && hours > 12) {
    hours = hours - 12;
  }

  let minutes = dateObject.getMinutes();

  return `${padStart(hours, 2, '0')}:${padStart(minutes, 2, '0')}`;
}

function dateFormat(dateObject: Date) {
  const day = gettext(`shortday${dateObject.getDay()}`);
  const date = dateObject.getDate();
  const month = gettext(`month${dateObject.getMonth()}`);

  return `${day} ${padStart(date, 2, '0')} ${month}`;
}

function distanceFormat(distance: number, locale: string = 'en-US', units: "metric" | "us" = "metric", precision: number = 2) {
  if (units === 'metric') {
    distance = distance / 1000;
  } else {
    distance = distance / 1609.34;
  }

  return distance.toFixed(2) + gettext(`distance-${units}`);
}

// Shim for es2017 function
function padStart (value, targetLength, padString) {
  value = String(value);
  targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
  padString = String(typeof padString !== 'undefined' ? padString : ' ');
  if (value.length > targetLength) {
    return String(value);
  } else {
    targetLength = targetLength - value.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + String(value);
  }
}

export {
  numberFormat,
  timeFormat,
  dateFormat,
  distanceFormat,
  padStart,
}