import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TextInput
} from "react-native";
import { observer } from "mobx-react";
import { BORDERCOLOR } from "../constants/Colors";
import { SCREEN_WIDTH } from "../constants/Layout";

const Search = ({ handleSearchText }) => {
    const [searchText, setSearchText] = useState(null)

    const onChange = (text) => {
        setSearchText(text)
        handleSearchText(text)
    }

    return (
        <View style={styles.container}>
            <TextInput
                clearButtonMode={'while-editing'}
                style={[styles.placeholder]}
                value={searchText}
                placeholder={'Search'}
                onChangeText={onChange}
            />
        </View>
    )
};
export default observer(Search);

const styles = StyleSheet.create({
    container: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: BORDERCOLOR
    },
    placeholder: {
        padding: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: BORDERCOLOR,
        width: SCREEN_WIDTH - 20,
        borderRadius: 8,
        backgroundColor: '#ebecf0'
    }
})