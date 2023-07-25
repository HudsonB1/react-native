import  EventScreen  from './src/screens/EventScreen';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar 
      barStyle={'light-content'}
      translucent
      />
      <EventScreen />
    </>
  );
};