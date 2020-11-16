import React from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { observer } from "mobx-react";
import { Ionicons } from '@expo/vector-icons';
import { BORDERCOLOR } from "../constants/Colors";
import { SCREEN_WIDTH } from "../constants/Layout";
import { useStore } from "../store/Store";
import { useNavigation } from "@react-navigation/native";

const ListItem = ({ item, activities }) => {
    const store = useStore()
    const navigation = useNavigation()
    const { imagePath, title } = item

    const onPressItem = () => {
        if (activities) {
            navigation.navigate('SelectActivity', { "parent": item })
        }
        else {
            store.setFeeling(item)
            navigation.navigate('Home')
        }
    }
    // image source should be changed when fetched from server
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={onPressItem}
        >
            <Image source={imagePath} style={styles.emoji} />
            <Text numberOfLines={1} style={[styles.title, { width: activities ? '50%' : '75%' }]}>{title}</Text>
            {
                activities && <Ionicons name="ios-arrow-forward" size={22} color="grey" />
            }
        </TouchableOpacity>
    )
};
export default observer(ListItem);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderColor: BORDERCOLOR,
        justifyContent: 'space-between',
        borderWidth: 0.5,
        width: SCREEN_WIDTH / 2,
        overflow: 'hidden'
    },
    emoji: {
        height: 40,
        width: 40,
        borderRadius: 0
    },
    title: {
        fontWeight: '600',
        color: 'grey',

    }
})