import { FunctionComponent } from 'react';

// components
import { Text, View } from 'react-native';
import SliderTutorial from '../components/hookComponents/SliderTutorial';

// utils
import { tutorialInfo } from '../utils/tutorialInfo';

const Tutorial: FunctionComponent = (): JSX.Element => {
   return (
      <>
         <View style={{ backgroundColor: 'black', flex: 1 }}>
            <Text>Screen Tutorial</Text>
            <SliderTutorial sliderArray={tutorialInfo} />
         </View>
      </>
   )
}

export default Tutorial;