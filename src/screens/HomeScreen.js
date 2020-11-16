import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import { BLUE } from "../constants/Colors";
import { useStore } from "../store/Store";

const HomeScreen = ({ }) => {
    const navigation = useNavigation()
    const store = useStore()

    return (
        <View style={styles.container}>
            <Text
                style={{ fontSize: 20, color: BLUE }}
                onPress={() => navigation.navigate('Tabs')}>Tabs</Text>
            {
                store.selectedFeeling && <Text>Feeling {store.selectedFeeling.title}</Text>
            }
            {
                store.selectedActivity && <Text>{store.selectedActivity.parent.title} {store.selectedActivity.child.title}</Text>
            }
        </View>
    )
};
export default observer(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})