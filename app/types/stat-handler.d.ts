import { Today } from 'user-activity';
import { UserPreferences } from './user-preferences';

interface StatHandler {
  name: string,
  icon: string,
  init: (statElement: Element, today: Today, userPreferences: UserPreferences) => void,
}

