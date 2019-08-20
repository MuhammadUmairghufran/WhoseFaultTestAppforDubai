/**
 * Project name: Practical Test App
 * Author: Muhammad Umair
 * @format
 * @flow
 */


import React, {Component} from 'react'
import {View, Text,TextInput, TouchableHighlight, Image,ScrollView,ActivityIndicator} from 'react-native'

import { AsyncStorage } from 'react-native';
import {base_url} from "../../utlis/helps";


const initalState = {
    username: '',
    password: '',
    user_id: '',
    loadingAcitivityIndictor: false,
    errormessage: false,
    invalidEmailError: false
};
export default class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = initalState;


    }




    _activityIndictor = () => {this.setState({loadingAcitivityIndictor: !this.state.loadingAcitivityIndictor})}


    _reset(){
        this.setState(initalState);
    }






     validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };



    _LoginUser = () => {
        this._activityIndictor();
        const {username,password} = this.state;
        if(username && password  !== ''){ // basic validation rules
            if(this.validateEmail(username)){
                //console.warn(username);

               const token =  AsyncStorage.getItem('token',token);

                const bearer = 'Bearer ' + token;

                fetch(base_url+'api/v1/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': bearer,
                    },
                    body: JSON.stringify({
                        email: username,
                        password: password,
                    }),
                }).then(responseJson => responseJson.json())
                    .then(response => {
                        if (response.success) {
                           this._activityIndictor();
                            // const token = response.success.token;
                            // AsyncStorage.setItem('token', token);
                            if(response.success.user_isActive){
                                this._activityIndictor();
                                if (response.success.user_isActive && response.success.user_isUploader ){
                                    this._activityIndictor();
                                    console.warn('user is uploader');
                                    this.props.navigation.replace('Redditscreen');
                                } else if (response.success.user_isActive && response.success.user_isCustomer) {
                                    this._activityIndictor();
                                    console.warn('user is customer');
                                    this.props.navigation.navigate('AddNewTask');
                                }else if (response.success.user_isActive && response.success.user_isAdmin) {
                                    this._activityIndictor();
                                    console.warn('user is admin');
                                }
                            }else{
                                alert('your account is not activate');
                            }

                        } else {
                            this._activityIndictor();
                            alert(response.error);
                        }

                    })
                    .catch(err => alert(err));
            }else{
                this.setState({
                    invalidEmailError: true
                })
            }

        }else{


            this.setState({
                errormessage: true
            },() => {
                console.log('form validation error');
            });


        }


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
                        alignSelf: 'center'
                    }}>
                        <Image source={require('../../assets/spe-logo-blue-2.png')}/>
                    </View>

                <View style={{
                    paddingVertical: 100,
                }}>

                    <TextInput
                        placeholder="Email"
                        autoCapitalize = 'none'
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
                        onChangeText = { ( text ) => { this.setState({ username: text })} }
                    />
                    {this.state.errormessage ?
                        <Text>email is required</Text>: null
                    }

                    {this.state.invalidEmailError?
                    <Text>email is invalid</Text>: null
                    }

                        <TextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            autoCapitalize = 'none'
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
                            onChangeText = { ( text ) => { this.setState({ password: text })} }
                        />
                    {this.state.errormessage ?
                    <Text>Password is required</Text>: null
                    }

                    {this.state.PasswordError ?   <Text>Password is required</Text>: null}


                </View>




                        {this.state.loadingAcitivityIndictor ?
                            <ActivityIndicator size="large" color="#FFF" />
                        : null}



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
                           this._LoginUser();
                       }}
                    >

                        <Text style={{
                            marginVertical: 15,
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            color:'#0F59AA',
                        }}>Login</Text>

                    </TouchableHighlight>
                </View>
                </ScrollView>
            </View>

        );
    }


}



