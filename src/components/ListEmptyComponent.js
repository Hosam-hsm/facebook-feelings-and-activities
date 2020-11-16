import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

const ListEmptyComponent = ({ selectedTab }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sorry, there are no {selectedTab == "Feelings" ? 'feelings' : 'activities'} matching your query.</Text>
        </View>
    )
};
export default ListEmptyComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
    },
    text: {
        textAlign: 'center',
        color: 'grey'
    }
})