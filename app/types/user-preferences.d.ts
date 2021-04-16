import { LocaleSettings, Preferences, UnitsSettings } from 'user-settings';

interface UserPreferences {
  preferences: Preferences,
  locale: LocaleSettings,
  units: UnitsSettings
}