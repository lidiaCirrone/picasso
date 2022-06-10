import React, { FunctionComponent } from 'react';

// components
import Home from '../../screens/Home';
import Tutorial from '../../screens/Tutorial';

// modules
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const EntryApp: FunctionComponent = () => {

   const Stack = createStackNavigator();

   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName='Tutorial' // storage.firstAccess ? 'Tutorial' : 'Home'
         >
            <Stack.Screen
               name='Home'
               component={Home}
            />
            <Stack.Screen
               name='Tutorial'
               component={Tutorial}
            />
         </Stack.Navigator>
      </NavigationContainer>
   )
}

export default EntryApp;