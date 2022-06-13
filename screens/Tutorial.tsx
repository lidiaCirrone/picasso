import { FunctionComponent } from 'react';

// components
import SliderTutorial from '../components/hookComponents/SliderTutorial';

// utils
import { tutorialInfo } from '../utils/tutorialInfo';

import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Text, View } from 'react-native';

interface TutorialProps {
    route: RouteProp<ParamListBase>;
}
const Tutorial: FunctionComponent<TutorialProps> = (): JSX.Element => {
    return (
        <>
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <Text>Screen Tutorial</Text>
                <SliderTutorial sliderArray={tutorialInfo} />

            </View>
        </>
    )
}

export default Tutorial;