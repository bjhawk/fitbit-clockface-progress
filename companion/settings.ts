import * as commonSettings from 'simple-fitbit-settings/common';
import flags from '../common/flags';
import icons from '../common/icons';
import colors from '../common/colors';

export class Settings {
  public flag: commonSettings.Selection = { selected: [0], values: [flags[0]] };
  public icon: commonSettings.Selection = { selected: [0], values: [icons[0]] };
  public timeColor: string = colors[0].value;
  public timeBGTransparency: number = 25;
}