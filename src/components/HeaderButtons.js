import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { BLUE } from "../constants/Colors";
import { useStore } from "../store/Store";
import { useNavigation } from "@react-navigation/native";

export const HeaderLeftButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.leftButtonContainer}>
            <Ionicons name="ios-close" size={40} color="black" />
        </TouchableOpacity>
    )
};

export const HeaderRightButton = ({ }) => {
    const store = useStore()
    const navigation = useNavigation()
    const condition = store.selectedFeeling || store.selectedActivity
    return (
        <View style={styles.rightButtonContainer}>
            <TouchableOpacity
                disabled={!condition}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={[styles.rightButton, { color: condition ? BLUE : 'grey' }]}>Done</Text>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    leftButtonContainer: {
        paddingHorizontal: 15
    },
    rightButtonContainer: {
        paddingHorizontal: 15
    },
    rightButton: {
        fontWeight: 'bold',
        fontSize: 16
    }
})