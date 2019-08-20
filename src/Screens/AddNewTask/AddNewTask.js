/**
 * Project name: Practical Test App
 * Author: Muhammad Umair
 * @format
 * @flow
 */


import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, Image, TextInput, TouchableHighlight} from 'react-native'
import {SQLite} from "expo-sqlite";
const initalState = {
    video_name: '',
    video_description: '',
    errormessage: false
};
export default class AddNewTask extends Component {
    constructor(props){
        super(props);
        this.state = initalState;




    }





    _addnewVideo = () => {


      const {video_name,video_description } = this.state;
        console.warn(video_name+" "+video_description);

    };



   render(){
        return(
            <View style={{
                flex:1,
                backgroundColor: '#0F59AA'
            }}>

                <ScrollView contentContainerStyle={{
                    flex: 1,
                    marginHorizontal: 20,
                }}>

                    <View style={{
                        paddingVertical: 40,
                    }}>

                        <TextInput
                            ref={input => { this.videoname = input }}
                            placeholder="Video Name"
                            placeholderTextColor="#FFF"
                            style={{
                                fontSize: 20,
                                paddingVertical: 20,
                                marginHorizontal:2,
                                borderColor: '#FFF',
                                borderBottomWidth: 2,
                                color: '#FFF'
                            }}

                            underlineColorAndroid = "transparent"
                            onChangeText = { ( text ) => { this.setState({ video_name: text })} }
                        />
                        {this.state.errormessage ?
                            <Text>Video Name is required</Text>: null
                        }

                        <TextInput
                            ref={input => { this.videodescription = input }}
                            placeholder="Video Description"
                            style={{
                                fontSize: 20,
                                paddingVertical: 20,
                                marginHorizontal:2,
                                borderColor: '#FFF',
                                borderBottomWidth: 2,
                                color: '#FFF'

                            }}
                            placeholderTextColor="#FFF"
                            underlineColorAndroid = "transparent"
                            onChangeText = { ( text ) => { this.setState({ video_description: text })} }
                        />
                        {this.state.errormessage ?
                            <Text>Video Description is required</Text>: null
                        }


                    </View>


                    <View style={{
                        flex: 0.9,
                        justifyContent: 'flex-end'
                    }}>

                        <TouchableHighlight style={{
                            height: 50,
                            width: '100%',
                            justifyContent: 'flex-end',
                            backgroundColor: '#fafafa',
                            borderRadius: 50/2,
                        }}
                                            underlayColor={'black'}
                                            onPress={()=> {
                                                this._addnewVideo();
                                            }}
                        >

                            <Text style={{
                                marginVertical: 15,
                                textAlign: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color:'#0F59AA',
                            }}>Add New Video</Text>

                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>

        );
   }


}



