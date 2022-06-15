import { FunctionComponent } from 'react';

// components
import SliderTutorial from '../components/hookComponents/SliderTutorial';
import { Text, TouchableOpacity, View } from 'react-native';

// style 
import styleTutorial from '../styles/styleSliderTutorial'

// utils
import { tutorialInfo } from '../utils/tutorialInfo';
import { setLocalStorageObj } from '../utils/localStorage'


import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';


interface TutorialProps {
    navigation: StackNavigationProp<ParamListBase>;
}
const Tutorial: FunctionComponent<TutorialProps> = (props): JSX.Element => {
    const okTutorial = () => {
        setLocalStorageObj('tutorial', true)()
        props.navigation.navigate('Start')
    }
    return (
        <>
            <View style={styleTutorial.containerTutorial}>
                <SliderTutorial sliderArray={tutorialInfo} />
                <View style={{ marginVertical: 20 }}>
                    <TouchableOpacity onPress={okTutorial}>
                        <Text style={styleTutorial.text}>I'm ready !</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )
}

export default Tutorial;