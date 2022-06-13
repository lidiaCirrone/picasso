import { FunctionComponent } from 'react';

import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface HomeProps {
   navigation: StackNavigationProp<ParamListBase>;
}

// components
import Canvas from '../components/hookComponents/Canvas';

const Home: FunctionComponent<HomeProps> = (props): JSX.Element => {
   const goTo = (signature: string) => () => {
      props.navigation.navigate('Tutorial', {url: signature })
   }
   return (
      <Canvas
         callback={goTo}
      />
   )
}

export default Home;