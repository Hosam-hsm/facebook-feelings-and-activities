import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Feelings from './components/Feelings';
import Activities from './components/Activities';
import { BLUE } from './constants/Colors';
import { HeaderLeftButton, HeaderRightButton } from './components/HeaderButtons';
import HomeScreen from './screens/HomeScreen';
import TabBar from './components/TabBar';
import SelectActivity from './components/SelectActivity';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            swipeEnabled={false}
            tabBar={props => <TabBar {...props} />}
            tabBarOptions={{
                labelStyle: {
                    textTransform: 'none',
                    fontSize: 15,
                    fontWeight: '600'
                },
                activeTintColor: BLUE,
                inactiveTintColor: 'grey'
            }}
            initialRouteName="Feelings"
        >
            <Tab.Screen name="Feelings" component={Feelings} />
            <Tab.Screen name="Activities" component={Activities} />
        </Tab.Navigator>
    );
}

const MainNavigator = ({ }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Tabs"
                    options={{
                        headerLeft: (props) => <HeaderLeftButton {...props} />,
                        headerRight: () => <HeaderRightButton />
                    }}
                    component={Tabs} />
                <Stack.Screen name="SelectActivity" options={({ route }) => ({ title: route.params.parent.title })} component={SelectActivity} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};
export default MainNavigator;

