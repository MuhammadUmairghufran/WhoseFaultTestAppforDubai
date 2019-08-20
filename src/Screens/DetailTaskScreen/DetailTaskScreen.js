/**
 * Project name: Practical Test App
 * Author: Muhammad Umair
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View,Text,StyleSheet,Platform} from 'react-native'
import {SQLite} from "expo-sqlite";
export default class DetailTaskScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            task_name: '',
            task_description: '',
            errormessage: true

        }

    }



    componentDidMount() {

        const db = SQLite.openDatabase("whosefaultTest.db", "1.0", "SQLite React Offline Database", "200000");

        db.exec([{ sql: 'SELECT * FROM Users_tasks',
                args: [] }],
                false,
                (results) =>
                    console.warn(results.rows.length)
        );


    }


    render(){
        return(
            <View style={{
                 flex: 1,
                paddingVertical: 20,
                alignItems: 'center'
            }}>

                {this.state.errormessage ?
                    <Text>No Task available</Text> : null
                }





            </View>

        );
    }


}



