import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export const StatusBar = ({ backgroundColor, barStyle }) => {
    return <ExpoStatusBar backgroundColor={backgroundColor} barStyle={barStyle} />;
};