import React, { useCallback, useEffect, useState } from "react";
import {
    StyleSheet,
    FlatList,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import { useStore } from "../store/Store";
import ListItem from "./ListItem";
import ListEmptyComponent from "./ListEmptyComponent";

const Activities = ({ }) => {
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
                    title: "What are you doing?"
                });
            }
        }, [navigation])
    ); // setting title like this because it is nested navigation

    // const handleLoadMore = () => {
    //     setOffset(offset + 1)
    //     store.getActivities(offset).then((response) => {
    //         if (response.length == 0) {
    //             setHasMoreToLoad(false)
    //         }
    //         setData([...data, ...response]);
    //     })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // } //for fetching more activities

    useEffect(() => {
        // store.getActivities(offset).then((response) => {
        //     setData([...data, ...response]);
        // })
        //     .catch((error) => {
        //        console.log(error)
        //     });
    }, []) // fetch activities from backend

    return (
        <FlatList
            numColumns={2}
            style={styles.container}
            keyboardShouldPersistTaps={'always'}
            keyboardDismissMode={'on-drag'}
            // onEndReached={hasMoreToLoad ? handleLoadMore : null}
            // onEndReachedThreshold={0.5}
            data={store.activities.slice()} //should be state data
            ListEmptyComponent={<ListEmptyComponent selectedTab={'Activities'} />}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ListItem
                    activities
                    item={item}
                    key={item.id}
                />
            )}
        />
    )
};
export default observer(Activities);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    }
})