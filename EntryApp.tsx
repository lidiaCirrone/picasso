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
import { ActivityIndicator, View } from 'react-native';

interface State {
   tutorialWatched: null | string
}

const initialState: State = {
   tutorialWatched: null
}
let optionsStyle =
{
   title: 'Picasso',
   headerStyle: {
      backgroundColor: '#000',
   },
   headerTintColor: '#007AFF',
   headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
   }
}

const EntryApp: FunctionComponent = () => {
   const Stack = createStackNavigator();
   const [state, setState] = useState<State>(initialState)
   useEffect(() => {
      isTutorialWatched()
   }, [])

   // function to set initial route 
   const isTutorialWatched = async (): Promise<void> => {
      let tutorial = await getObjFromLocalStorage('tutorial')()
      let copyState = Object.assign({}, state)
      if (tutorial === true) {
         copyState.tutorialWatched = 'Start'
      } else {
         copyState.tutorialWatched = 'Tutorial'
      }
      setState(copyState)
   }
   return (
      <>
         {
            state.tutorialWatched === null ?
               <View style={{ flex: 1, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator></ActivityIndicator>
               </View> :
               <NavigationContainer>
                  <Stack.Navigator
                     initialRouteName={state.tutorialWatched} // storage.firstAccess ? 'Tutorial' : 'Home'
                  >
                     <Stack.Screen
                        name='Start'
                        component={Start}
                        options={
                           {
                              title: 'Picasso',
                              headerStyle: {
                                 backgroundColor: '#000',
                              },
                              headerTintColor: '#007AFF',
                              headerTitleStyle: {
                                 fontWeight: 'bold',
                                 fontSize: 24,
                              }
                           }
                        }
                     />
                     <Stack.Screen
                        name='Home'
                        component={Home}
                        options={
                           {
                              title: 'My Artwork',
                              headerStyle: {
                                 backgroundColor: '#000',
                              },
                              headerTintColor: '#007AFF',
                              headerTitleStyle: {
                                 fontWeight: 'bold',
                                 fontSize: 24,
                              }
                           }
                        }
                     />
                     <Stack.Screen
                        name='Tutorial'
                        component={Tutorial}
                        options={
                           {
                              title: 'Tutorial',
                              headerStyle: {
                                 backgroundColor: '#000',
                              },
                              headerTintColor: '#007AFF',
                              headerTitleStyle: {
                                 fontWeight: 'bold',
                                 fontSize: 24,
                              }
                           }
                        }
                     />
                     <Stack.Screen
                        name='Gallery'
                        component={Gallery}
                        options={
                           {
                              title: 'Gallery',
                              headerStyle: {
                                 backgroundColor: '#000',
                              },
                              headerTintColor: '#007AFF',
                              headerTitleStyle: {
                                 fontWeight: 'bold',
                                 fontSize: 24,
                              }
                           }
                        }
                     />
                  </Stack.Navigator>
               </NavigationContainer>
         }
      </>

   )



}

export default EntryApp;