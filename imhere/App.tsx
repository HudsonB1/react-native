import { Home } from './src/screens/Home';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <Home />
      <StatusBar backgroundColor="#696969" translucent={true} />
    </>
  );
};