import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import { BORDERCOLOR } from "../constants/Colors";
import { useStore } from "../store/Store";
import Search from "./Search";

const ItemSeperator = () => {
    return (
        <View style={styles.itemSeperator} />
    )
}

const ActivityChild = ({ child, parent }) => {
    const store = useStore()
    const navigation = useNavigation()
    const { title, imagePath } = child

    const onPress = () => {
        let activity = {
            parent: {
                title: parent.title,
            },
            child: {
                title: child.title,
                imagePath: child.imagePath
            }
        }
        store.setActivity(activity)
        navigation.navigate('Home')
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.activityChild}>
            <Image source={imagePath} style={styles.emoji} />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const SelectActivity = ({ route }) => {
    const store = useStore()
    const { parent } = route.params

    const [searchText, setSearchText] = useState(null)
    const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
    const [offset, setOffset] = useState(1);
    const [data, setData] = useState([])

    // const handleLoadMore = () => {
    //     setOffset(offset + 1)
    //     store.getActivityChildren(parent.id, searchText, offset).then((response) => {
    //         if (response.length == 0) {
    //             setHasMoreToLoad(false)
    //         }
    //         setData([...data, ...response]);
    //     })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // } //for fetching more children 


    const handleSearchText = (text) => {
        setSearchText(text)
        setOffset(1)
        store.getActivityChildren(parent.id, text, offset)
    }

    useEffect(() => {
        // store.getActivityChildren(parent.id, searchText, offset).then((response) => {
        //     setData([...data, ...response]);
        // })
        //     .catch((error) => {
        //        console.log(error)
        //     });
        store.getActivityChildren(parent.id, null, offset)
    }, [parent]) // fetch activity children from backend

    return (
        <View style={styles.container}>
            <Search
                handleSearchText={handleSearchText}
                filter={'Activity'} />
            <FlatList
                keyboardShouldPersistTaps={'always'}
                keyboardDismissMode={'on-drag'}
                data={store.activityChildren} //should be data from state
                // onEndReached={hasMoreToLoad ? handleLoadMore : null}
                // onEndReachedThreshold={0.5}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={ItemSeperator}
                renderItem={({ item }) => (
                    <ActivityChild
                        key={item.id}
                        child={item}
                        parent={parent} />)
                }
            />
        </View>
    )
};
export default observer(SelectActivity);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    activityChild: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    emoji: {
        height: 35,
        width: 35
    },
    title: {
        fontWeight: '600',
        marginLeft: 15
    },
    itemSeperator: {
        height: 0.5,
        backgroundColor: BORDERCOLOR,
        marginHorizontal: 15
    }
})