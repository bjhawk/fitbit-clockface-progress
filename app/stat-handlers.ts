import { StatHandler } from './types/stat-handler';
import { Today } from 'user-activity';
import { UserPreferences } from './types/user-preferences';

import { numberFormat, distanceFormat } from './formatters';

const stepsHandler: StatHandler = {
  name: 'steps',
  icon: 'Steps',
  init: (statElement: Element, today: Today, userPreferences: UserPreferences) => {
    statElement.text = numberFormat(today.adjusted.steps || 0, userPreferences.locale.language);
  },
};

const caloriesHandler: StatHandler = {
  name: 'calories',
  icon: 'Calories',
  init: (statElement: Element, today: Today, userPreferences: UserPreferences) => {
    statElement.text = numberFormat(today.adjusted.calories || 0, userPreferences.locale.language);
  },
};

const distanceHandler: StatHandler = {
  name: 'distance',
  icon: 'Distance',
  init: (statElement: Element, today: Today, userPreferences: UserPreferences) => {
    statElement.text = distanceFormat(
      today.adjusted.distance || 0,
      userPreferences.locale.language,
      userPreferences.units.distance
    );
  },
};

const activeMinutesHandler: StatHandler = {
  name: 'activeMinutes',
  icon: 'ActiveMinutes',
  init: (statElement: Element, today: Today, userPreferences: UserPreferences) => {
    statElement.text = numberFormat(today.adjusted.activeZoneMinutes.total || 0, userPreferences.locale.language);
    
  },
};

const elevationHandler: StatHandler = {
  name: 'elevationGain',
  icon: 'ElevationGain',
  init: (statElement: Element, today: Today, userPreferences: UserPreferences) => {
    statElement.text = `+${numberFormat(today.adjusted.elevationGain || 0, userPreferences.locale.language)}`;
  },
};

export default [
  stepsHandler,
  caloriesHandler,
  distanceHandler,
  activeMinutesHandler,
  elevationHandler,
];

export {
  stepsHandler,
  caloriesHandler,
  distanceHandler,
  activeMinutesHandler,
  elevationHandler,
};