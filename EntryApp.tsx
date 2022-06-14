import React, { FunctionComponent, useEffect, useState } from 'react';

// components
import Gallery from './screens/Gallery';
import Home from './screens/Home';
import Tutorial from './screens/Tutorial';
import Start from './screens/Start'
// modules
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// utils 
import { getObjFromLocalStorage } from './utils/localStorage';


import AsyncStorage from '@react-native-async-storage/async-storage';


const EntryApp: FunctionComponent = () => {
   const Stack = createStackNavigator();
   // const [state, setState] = useState({
   //    tutorialWatched: 'Tutorial'
   // })
   // useEffect(() => {
   //    isTutorialWatched()
   // }, [state.tutorialWatched])
   // const isTutorialWatched = async (): Promise<void> => {
   //    let tutorial = await getObjFromLocalStorage('tutorial')()
   //    console.log(tutorial)
   //    if (tutorial)
   //       setState({
   //          ...state,
   //          tutorialWatched: 'Start'
   //       })
   // }
   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName={'Start'} // storage.firstAccess ? 'Tutorial' : 'Home'
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