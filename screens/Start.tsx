import React, { FunctionComponent } from "react";

// components 
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// style 
import styleStart from '../styles/styleStart'
interface StartProps {
    navigation: StackNavigationProp<ParamListBase>;
}

const Start: FunctionComponent<StartProps> = (props): JSX.Element => {
    const goTo = (path: string) => () => {
        props.navigation.navigate(path)
    }
    return (
        <ImageBackground
            style={styleStart.imgBg}
            source={require('../assets/background.png')}
            resizeMode="cover"
        >
            <View
                style={styleStart.container}
            >
                <TouchableOpacity style={styleStart.btn} onPress={goTo('Gallery')}>
                    <Text style={styleStart.textBtn}>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styleStart.btn, styleStart.centralBtn]} onPress={goTo('Home')}>
                    <Text style={styleStart.textBtn}>New File</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styleStart.btn} onPress={goTo('Tutorial')}>
                    <Text style={styleStart.textBtn}>Tutorial</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default Start