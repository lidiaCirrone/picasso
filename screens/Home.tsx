import { FunctionComponent } from 'react';

// components
import { View } from 'react-native';
import Canvas from '../components/hookComponents/Canvas';

const Home: FunctionComponent = (): JSX.Element => {
   const testing = () => {
      console.log('ooooooo')
   }
   return (


      <Canvas text="ciao" onOK={testing} />


   )
}

export default Home;