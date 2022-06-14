import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface StartProps {
    navigation: StackNavigationProp<ParamListBase>;
}

const Start: FunctionComponent<StartProps> = (props): JSX.Element => {
    const goTo = (path: string) => () => {
        props.navigation.navigate(path)
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#007AFF' }}>
            <TouchableOpacity style={{ marginVertical: 20, paddingVertical: 10, minWidth: 100, backgroundColor: '#fff', borderRadius: 10 }} onPress={goTo('Gallery')}>
                <Text style={{ color: '#007AFF', fontWeight: 'bold', textAlign: 'center' }}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginVertical: 20, paddingVertical: 10, minWidth: 100, backgroundColor: '#fff', borderRadius: 10 }} onPress={goTo('Home')}>
                <Text style={{ color: '#007AFF', fontWeight: 'bold', textAlign: 'center' }}>New File</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginVertical: 20, paddingVertical: 10, minWidth: 100, backgroundColor: '#fff', borderRadius: 10 }} onPress={goTo('Tutorial')}>
                <Text style={{ color: '#007AFF', fontWeight: 'bold', textAlign: 'center' }}>Tutorial</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Start