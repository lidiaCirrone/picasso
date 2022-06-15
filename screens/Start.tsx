import React, { FunctionComponent } from "react";

// components 
import { Text, TouchableOpacity, View } from "react-native";
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
        <View style={styleStart.container}>
            <TouchableOpacity style={styleStart.btn} onPress={goTo('Gallery')}>
                <Text style={styleStart.textBtn}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styleStart.btn} onPress={goTo('Home')}>
                <Text style={styleStart.textBtn}>New File</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styleStart.btn} onPress={goTo('Tutorial')}>
                <Text style={styleStart.textBtn}>Tutorial</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Start