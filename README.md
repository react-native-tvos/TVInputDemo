# TVInputDemo

A demo project for [React Native for TV](https://github.com/react-native-tvos/react-native-tvos).

This project uses the Expo SDK, as described in the Expo guide ["Build Expo apps for TV"](https://docs.expo.dev/guides/building-for-tv/).

### RNTV demonstrations included

- Simple buttons
- Buttons that detect when they are focused (activated) by the TV focus engine
- Use of `Pressable`
- Use of `TextInput`
- TV-specific focus management components and APIs (`TVFocusGuideView`, `nextFocus()`, `hasTVPreferredFocus()`)
- Apple TV menu key enablement with `TVEventControl`
- Handling remote control events explicitly with `useTVEventHandler()`
- Dark/light theming with `useColorScheme()` and React context

### Other demonstrations included

- Navigation with [React Navigation](https://reactnavigation.org/)
- Animation with [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- Material design components from [React Native Paper](https://callstack.github.io/react-native-paper/)
- Video demo using the [Video component](https://docs.expo.dev/versions/latest/sdk/video/) from the `expo-av` package

### Getting started

- Clone this repo
- In the `TVInputDemo` directory, execute

```bash
yarn
export EXPO_TV=1
npx expo prebuild --clean
yarn ios # for Apple TV
yarn android # for Android TV, a TV emulator should already be running
```

### Enabling Fabric

- In `app.json`, set `newArchEnabled` to `true` in the `expo-build-properties` plugin
- Then redo the above steps:

```bash
export EXPO_TV=1
npx expo prebuild --clean
yarn ios # for Apple TV
yarn android # for Android TV, a TV emulator should already be running
```

### Known issues

- Apple TV simulator issues (these will not occur when building for real devices, and seem to be actual bugs in the simulator):
  - You will need a tvOS 15.x simulator to test video (tvos 16 and 17 simulators won't play the video)
  - Video will pause after a few seconds if full screen video is selected in the video example

### Apple TV screenshots (light theme)

![Simulator Screenshot - Apple TV 15 - 2024-02-29 at 20 15 46](https://github.com/react-native-tvos/TVInputDemo/assets/6577821/08d08668-b3f6-4016-abc0-e734f27b3d84)
![Simulator Screenshot - Apple TV 15 - 2024-02-29 at 20 16 34](https://github.com/react-native-tvos/TVInputDemo/assets/6577821/221b4a70-3362-4d31-ae7e-9f59766f2b18)

### Android TV screenshots (dark theme)

![Screenshot_1709266637](https://github.com/react-native-tvos/TVInputDemo/assets/6577821/4ce26c3a-1a7e-4c80-90ef-fbb31eef2756)
![Screenshot_1709266677](https://github.com/react-native-tvos/TVInputDemo/assets/6577821/7b9096e5-b22b-4da0-8e0a-a57b6dd697e9)
