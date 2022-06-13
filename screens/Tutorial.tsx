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
         {/* <View style={{ backgroundColor: 'white', flex: 1}}>
            <Text>Screen Tutorial</Text>
            <SliderTutorial sliderArray={tutorialInfo} />
           
         </View> */}
          <Image
               style={{flex:1}}
               width={Dimensions.get('screen').width}
               height={Dimensions.get('screen').height}
               source={{ uri: props?.route?.params?.url }}

            />
      </>
   )
}

export default Tutorial;