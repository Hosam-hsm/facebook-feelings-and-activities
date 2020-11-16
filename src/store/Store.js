import React from "react";
import { makeAutoObservable } from "mobx"
import { ACTIVITIES, ACTIVITY, FEELINGS } from "../../Test";

export default class Store {
    secondsPassed = 0
    selectedFeeling = null
    selectedActivity = null
    activities = ACTIVITIES //should be fetched from api
    activityChildren = ACTIVITY  //should be fetched from api
    feelings = FEELINGS //should be fetched from api

    constructor() {
        makeAutoObservable(this)
    }

    getFeelings(offset) {
        //fetch feelings from backend
    }

    getFilteredFeelings(searchText) {
        //fetch filtered feelings from backend and set state
        let filteredData = FEELINGS.filter(feeling => feeling.title.toLowerCase().includes(searchText.toLowerCase()))
        this.feelings = filteredData //demo of filtering only. filtered data is fetched from backend
    }

    getActivities(offset) {
        //fetch activities from backend
    }

    getFilteredActivities(searchText) {
        //fetch filtered activities from backend and set state
        let filteredData = ACTIVITIES.filter(activity => activity.title.toLowerCase().includes(searchText.toLowerCase()))
        this.activities = filteredData //demo of filtering only.
    }

    getActivityChildren(parentId, searchText, offset) {
        if (searchText == null) {
            this.activityChildren = ACTIVITY[parentId] //get child activities from backend with parent id
        }
        else {
            let filteredData = ACTIVITY[parentId].filter(activity => activity.title.toLowerCase().includes(searchText.toLowerCase()))
            this.activityChildren = filteredData
        }

        //fetch from backend
    }

    setFeeling(feeling) {
        this.selectedActivity = null
        this.selectedFeeling = feeling
    }

    setActivity(activity) {
        this.selectedFeeling = null
        this.selectedActivity = activity
    }

    clearSelectedItems() {
        this.selectedFeeling = null
        this.selectedActivity = null
    }


}


const StoreContext = React.createContext();

export const StoreProvider = ({ children, store }) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

/* Hook to use store in any functional component */
export const useStore = () => React.useContext(StoreContext);
