import React, { FunctionComponent } from 'react';

// components
import Gallery from './screens/Gallery';
import Home from './screens/Home';
import Tutorial from './screens/Tutorial';
import Start from './screens/Start'
// modules
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const EntryApp: FunctionComponent = () => {

   const Stack = createStackNavigator();

   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName='Start' // storage.firstAccess ? 'Tutorial' : 'Home'
         >
            <Stack.Screen
               name='Start'
               component={Start}
            />
            <Stack.Screen
               name='Home'
               component={Home}
            />
            <Stack.Screen
               name='Tutorial'
               component={Tutorial}
            />
            <Stack.Screen
               name='Gallery'
               component={Gallery}
            />
         </Stack.Navigator>
      </NavigationContainer>
   )
}

export default EntryApp;