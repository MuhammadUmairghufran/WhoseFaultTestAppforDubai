/**
 * Project name: Practical Test App
 * Author: Muhammad Umair
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, ScrollView, Image, TextInput, TouchableHighlight, ActivityIndicator,Alert} from 'react-native'
import {SQLite} from "expo-sqlite";
import {base_url} from '../../utlis/helps'
import CheckBox from 'react-native-check-box'
import {AsyncStorage} from "react-native-web";

const initState = {
    username: '',
    password: '',
    confirm_password: '',
    isPurchaser: false,
    isUplaoder: false,
    isAdmin: false,
    emailError: false,
    PasswordError: false,
    notMatchError: false,
    AccountTypeError: false,
    errorMessage: false,
    AccountType: '',
    loadingAcitivityIndictor: false
};


export default class SignupScreen extends Component {
    constructor(props){
        super(props);
        this.state = initState;




    }


    _activityIndictor = () => {this.setState({loadingAcitivityIndictor: !this.state.loadingAcitivityIndictor})}


    _reset(){
        this.setState(initState);
    }


    _SignupUser = () => {  // signup user  //
        var purchaser, uploader, admin, active;
        const {username, password, confirm_password, isPurchaser, isUplaoder, AccountType} = this.state;

        // if(username && password && confirm_password && AccountType === '') {
        //       this.setState({
        //           errorMessage: true
        //       })
        // }else if(username === '') {
        //         this.setState({
        //             emailError: true
        //         }, ()=> {
        //             console.log('error of invalid email');
        //         })
        // }else if(password === '') {
        //         this.setState({
        //             PasswordError: true
        //         },()=> {
        //             console.log('password required');
        //         })
        // }else if(password !== confirm_password) {
        //             this.setState({
        //                 notMatchError: true
        //             },()=> {
        //                 console.log('password not match');
        //             })
        // }else if(AccountType === '') {
        //     this.setState({
        //         AccountTypeError: true
        //     }, () => {
        //         console.log('AccountType not selected')
        //     })
        // }


        if (username && password && confirm_password !== '' && password === confirm_password) {
                if(isUplaoder === true){
                    uploader = '1';
                    purchaser = '0'
                }else if(isPurchaser === true){
                    uploader = '0';
                    purchaser = '1';
                }
            alert(isPurchaser + "" + isUplaoder);
            console.warn(purchaser + "" + uploader);
            this._activityIndictor();
            fetch(base_url + 'api/v1/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username,
                    password: password,
                    c_password: confirm_password,
                    isUploader: uploader,
                    isCustomer: purchaser
                }),
            }).then(responseJSon => responseJSon.json())
                .then((res) => {
                    this._activityIndictor();
                    if (res.success) {
                        this._activityIndictor();
                        const token = res.success.token;
                        AsyncStorage.setItem('token', token);
                        alert(res.success.message + " " + "success");
                        this.props.navigation.navigate('Login');
                    } else if (res.error) {
                        // this._activityIndictor();
                        alert(res.error.email[0]);
                    } else {
                        this._activityIndictor();
                        console.log('something went wrong');
                    }

                })

                .catch(err => alert(err));

        }else {
            this.setState({
                errorMessage: true
            })
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

                    <Text style={{
                        color: '#FFF',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: 16
                    }}>Create your own Account! Just in sec</Text>

                    <View style={{
                        paddingVertical: 100,
                    }}>


                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#FFF"
                            autoCapitalize = 'none'
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
                        {this.state.errorMessage ?
                            <Text style={styles.errormessageText}>email is required</Text>: null
                        }

                        {this.state.emailError ? <Text style={styles.errormessageText}>email is required</Text>: null }

                        <TextInput
                            placeholder="Password"
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
                            secureTextEntry={true}
                            underlineColorAndroid = "transparent"
                            onChangeText = { ( text ) => { this.setState({ password: text })} }
                        />
                        {this.state.errorMessage ?
                            <Text style={styles.errormessageText}>Password is required</Text>: null
                        }


                        <TextInput
                            placeholder="Confirm Password"
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
                            secureTextEntry={true}
                            underlineColorAndroid = "transparent"
                            onChangeText = { ( text ) => { this.setState({ confirm_password: text })} }
                        />
                        {this.state.errorMessage ?
                            <Text style={styles.errormessageText}>Comfirm password invalid</Text>: null
                        }

                        {this.state.notMatchError ?
                        <Text style={styles.errormessageText}>Password does not match</Text>: null}

                        <Text style={{
                            paddingVertical: 5,
                            color: '#FFF',
                            fontWeight: 'bold'
                        }}>Account Type: </Text>


                        {this.state.AccountType ? <Text style={styles.errormessageText}>Account type is required</Text>: null}



                         <CheckBox
                                checkBoxColor="#FFF"
                                style={{paddingVertical: 5}}
                                onClick={()=>{
                                    this.setState({
                                        isPurchaser: !this.state.isPurchaser,
                                    })
                                }}
                                isChecked={this.state.isPurchaser}
                                leftText={"As Purchaser"}
                                leftTextStyle={{color: '#FFF'}}
                            />








                        <CheckBox
                                checkBoxColor="#FFF"
                                style={{paddingVertical: 5}}
                                leftTextStyle={{color: '#FFF'}}
                                onClick={()=>{
                                    this.setState({
                                        isUplaoder: !this.state.isUplaoder,
                                    })
                                }}
                                isChecked={this.state.isUplaoder}
                                leftText={"As Uploader"}
                            />



                        {this.state.errorMessage ?
                        <Text style={styles.errormessageText}>check box is required</Text>: null}













          <TouchableHighlight onPress={()=> {this.props.navigation.navigate('Login')}}>
            <View style={{
               paddingVertical: 5
            }}>
                  <Text style={{
                      color: '#FFF'
                  }}>Already register</Text>
            </View>
          </TouchableHighlight>




                        {this.state.loadingAcitivityIndictor ?
                            <ActivityIndicator size="large" color="#FFF" />
                        :null }


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
                                               this._SignupUser();
                                            }}
                        >

                            <Text style={{
                                marginVertical: 15,
                                textAlign: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color:'#0F59AA',
                            }}>Signup</Text>

                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        );
    }


}


const styles = StyleSheet.create({
   errormessageText: {
       color: 'red'
   }
});



