import { FunctionComponent } from 'react';

// components
import SliderTutorial from '../components/hookComponents/SliderTutorial';

// utils
import { tutorialInfo } from '../utils/tutorialInfo';

import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';

import { setLocalStorageObj } from '../utils/localStorage'
interface TutorialProps {
    route: RouteProp<ParamListBase>;
}
const Tutorial: FunctionComponent<TutorialProps> = (): JSX.Element => {
    const okTutorial = () => {
        setLocalStorageObj('tutorial', true)()
    }
    return (
        <>
            <View style={{ backgroundColor: '#007AFF', flex: 1 }}>
                <SliderTutorial sliderArray={tutorialInfo} />
                <View style={{ marginVertical: 20 }}>
                    <TouchableOpacity onPress={okTutorial}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>I'm ready !</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )
}

export default Tutorial;