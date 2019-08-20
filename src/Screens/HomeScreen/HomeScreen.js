/**
 * Project name: Practical Test App
 * Author: Muhammad Umair
 * @format
 * @flow
 */


import React, {Component} from 'react';
import {View,Text,StyleSheet,Platform,ImageBackground,TouchableHighlight,Image} from 'react-native'
export default class HomeScreen extends Component {
    constructor(props){
        super();
    }


    render(){
        return(
            <ImageBackground
                source={{uri: 'https://i.redd.it/ihfnlpbze7o01.jpg'}}
                style={{
                    height: '100%',
                    width : '100%'
                }}
            >


                <View style={{
                    flex: 1,
                    marginHorizontal: 20,
                    paddingVertical: 20,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                        paddingVertical: 40,
                        alignSelf: 'center'
                    }}>
                        <Image source={require('../../assets/spe-logo-blue-2.png')}/>
                    </View>


                    <TouchableHighlight style={{
                        height: 50,
                        width: '100%',
                        justifyContent: 'flex-end',
                        backgroundColor: '#0F59AA',
                        borderRadius: 50/2,
                    }}
                       underlayColor={'black'}
                       onPress={()=> {this.props.navigation.navigate('Login')}}
                    >

                        <Text style={{
                            marginVertical: 15,
                            textAlign: 'center',
                            fontSize: 18,
                            color:'#FFF',
                        }}>Login</Text>

                    </TouchableHighlight>


                </View>




            </ImageBackground>

        );
    }


}



