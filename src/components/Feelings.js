import React, { useCallback, useEffect, useState } from "react";
import {
    StyleSheet,
    FlatList,
} from "react-native";
import { useStore } from "../store/Store";
import { observer } from "mobx-react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ListItem from "./ListItem";
import ListEmptyComponent from "./ListEmptyComponent";

const Feelings = ({ }) => {
    const store = useStore()
    const navigation = useNavigation()

    const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
    const [offset, setOffset] = useState(1);
    const [data, setData] = useState([])

    useFocusEffect(
        useCallback(() => {
            const stackNavigator = navigation.dangerouslyGetParent();
            if (stackNavigator) {
                stackNavigator.setOptions({
                    title: "How are you feeling?"
                });
            }
        }, [navigation])
    );

    // const handleLoadMore = () => {
    //     setOffset(offset + 1)
    //     store.getFeelings(offset).then((response) => {
    //         if (response.length == 0) {
    //             setHasMoreToLoad(false)
    //         }
    //         setData([...data, ...response]);
    //     })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // } //for fetching more feelings

    useEffect(() => {
        // store.getFeelings(offset).then((response) => {
        //     setData([...data, ...response]);
        // })
        //     .catch((error) => {
        //        console.log(error)
        //     });
    }, []) // fetch feelings from backend

    return (
        <FlatList
            numColumns={2}
            style={styles.container}
            keyboardShouldPersistTaps={'always'}
            keyboardDismissMode={'on-drag'}
            // onEndReached={hasMoreToLoad ? handleLoadMore : null}
            // onEndReachedThreshold={0.5}
            data={store.feelings.slice()} //should be state data
            ListEmptyComponent={<ListEmptyComponent selectedTab={'Feelings'} />}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ListItem
                    item={item}
                    key={item.id} />
            )}
        />
    )
};
export default observer(Feelings);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    }
})