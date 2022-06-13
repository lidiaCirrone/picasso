import { FunctionComponent } from 'react';

// components
import { Dimensions, Image, Text, View } from 'react-native';
import SliderTutorial from '../components/hookComponents/SliderTutorial';

// utils
import { tutorialInfo } from '../utils/tutorialInfo';

import { ParamListBase, RouteProp } from '@react-navigation/native';

interface TutorialProps {
   route: RouteProp<ParamListBase>;
}
const Tutorial: FunctionComponent<TutorialProps> = (props): JSX.Element => {
   console.log(props?.route?.params?.url)
   return (
      <>
         <Image
            // resizeMode="contain"
            style={{ width:200,height:300}}
            source={{ uri: props?.route?.params?.url }}

         />

      </>
   )
}

export default Tutorial;