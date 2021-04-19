import flags from '../common/flags';
import icons from '../common/icons';
import colors from '../common/colors';
// TODO: once this is published, i _could_ make image refs with icons using hardlinks to my github project for it... oi.

function makeIconValue(iconValue: string) {
  const iconIndex = icons.findIndex((icon) => {
    return icon.value === iconValue;
  })

  return { selected: [iconIndex], values: [icons[iconIndex]] };
};

registerSettingsPage(({ settings, settingsStorage }) => (
  <Page>
    <Section
      title={
        <Text bold align='center'>
          App Settings
        </Text>
      }
    >
      <Select
        label='Choose a Flag'
        settingsKey='flag'
        options={flags}
        onSelection={(newFlag) => {
          settingsStorage.setItem('flag', JSON.stringify(newFlag));
          settingsStorage.setItem('icon', JSON.stringify(makeIconValue(newFlag.values[0].defaultIcon)));
        }}
      />

      <Select
        label='Choose an optional Icon'
        settingsKey='icon'
        options={icons}
      />

      <Slider
        label={`Time BG Transparency - ${settings.timeBGTransparency}%`}
        settingsKey='timeBGTransparency'
        min='0'
        max='100'
      />

      <Text>Time Font Color</Text>
      <ColorSelect
        settingsKey='timeColor'
        colors={colors}
      />
    </Section>
  </Page>
));
