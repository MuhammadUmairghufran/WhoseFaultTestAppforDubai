/**
 * Project name: Practical Test App
 * Author: Muhammad Umair
 * @format
 * @flow
 */


import {AsyncStorage} from "react-native";

export const onLogout = (navigation) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.removeItem('token');

            navigation.dispatch({
                type: 'Navigation/RESET',
                index: 0,
                actions: [{ type: 'Navigate', routeName: 'Login' }]
            });

            return dispatch({ type: LOGOUT })
        } catch (errors) {
            // pass the user through with no error
            // this restores INITIAL_STATE (see login_reducer.js)
            return dispatch({ type: LOGOUT })
        }
    }
};


export const base_url = 'https://test.whosefault.ca/';
