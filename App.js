import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator,createAppContainer } from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import ProfileScreen from './screens/ProfileScreen';
import memoDetailScreen from './screens/memoDetailScreen';

const AddS=createStackNavigator({
  add:{screen:AddScreen},
  memo:{screen:memoDetailScreen}
},{
  initialRouteName:"add"
});

const MainTab = createBottomTabNavigator({
  homeStack: { screen: HomeScreen },
  addStack: { screen: AddS },
  profileStack: { screen: ProfileScreen }
});
/*
const NavigatorTab = createStackNavigator({
  welcome: { screen: WelcomeScreen },
  main: { screen: MainTab }
},
{
  initialRouteName: 'welcome'
});

const AppContainer = createAppContainer(NavigatorTab);
*/
const AppContainer = createAppContainer(MainTab);
export default class App extends React.Component {
  render(){
    return (
      <AppContainer 
      ref={nav => {
        this.navigator = nav;
      }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // ↓この文消さないと`react-navigation`が上手く動かず、画面真っ白になっちゃう
    //alignItems: 'center',
    justifyContent: 'center',
  },
});