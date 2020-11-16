import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { observer } from "mobx-react";
import { useStore } from "../store/Store";
import { Ionicons } from '@expo/vector-icons';
import { BORDERCOLOR } from "../constants/Colors";

const SelectedItem = ({ }) => {
    const store = useStore()
    const onClear = () => {
        store.clearSelectedItems() //to show search bar
    }

    return (
        <View style={styles.container}>
            {
                store.selectedFeeling && (
                    <View style={styles.row}>
                        <Text numberOfLines={1} style={styles.lightText}>Feeling... </Text>
                        <Image source={store.selectedFeeling.imagePath} style={styles.emoji} />
                        <Text numberOfLines={1} style={styles.title}>{store.selectedFeeling.title}</Text>
                    </View>
                )// image source should be changed to uri
            }
            {
                store.selectedActivity && (
                    <View style={styles.row}>
                        <Text numberOfLines={1} style={styles.lightText}>{store.selectedActivity.parent.title}... </Text>
                        <Image source={store.selectedActivity.child.imagePath} style={styles.emoji} />
                        <Text numberOfLines={1} style={styles.title}> {store.selectedActivity.child.title}</Text>
                    </View>
                )// image source should be changed to uri
            }
            <TouchableOpacity
                style={styles.clearButtonContainer}
                onPress={onClear}
            >
                <Ionicons name="ios-close" size={40} color="grey" />
            </TouchableOpacity>

        </View>
    )
};
export default observer(SelectedItem);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderColor: BORDERCOLOR,
        overflow: 'hidden'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emoji: {
        height: 20,
        width: 20,
        borderRadius: 0
    },
    title: {
        fontWeight: '600',
        maxWidth: '80%',
    },
    lightText: {
        color: 'grey',
        fontWeight: '600',
        maxWidth: '50%'
    },
    clearButtonContainer: {
        paddingHorizontal: 10
    }
})