import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { observer } from "mobx-react";
import { BLUE } from '../constants/Colors';
import { useStore } from '../store/Store';
import Search from './Search';
import SelectedItem from './SelectedItem';

const TabBar = ({ state, descriptors, navigation, position }) => {
    const store = useStore()
    const [selectedTab, setSelectedTab] = useState('Feelings') //for filtering flatlist data

    const handleSearchFeelings = (text) => {
        store.getFilteredFeelings(text)
    }

    const handleSearchActivities = (text) => {
        store.getFilteredActivities(text)
    }

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                        setSelectedTab(route.name)
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1 }}
                        >
                            <View style={[styles.tab, { borderBottomWidth: isFocused ? 2 : 0, borderBottomColor: BLUE }]}>
                                <Animated.Text
                                    style={[styles.tabLabel, { color: isFocused ? BLUE : 'grey', }]}
                                >
                                    {label}
                                </Animated.Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
            {
                (store.selectedFeeling || store.selectedActivity) ?
                    <SelectedItem />
                    :
                    <Search
                        filter={selectedTab == 'Feelings' ? 'Feelings' : 'Activities'}
                        handleSearchText={selectedTab == 'Feelings' ? handleSearchFeelings : handleSearchActivities}
                    />
            }

        </>
    );
}

export default observer(TabBar);

const styles = StyleSheet.create({
    tab: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    tabLabel: {
        fontWeight: '600'
    }
})