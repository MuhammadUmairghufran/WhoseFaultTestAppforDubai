import React, {Component} from 'react';
import {WebView} from 'react-native';

import {
    View
} from 'react-native'
import {
    Header,
    Body,
    Title,
} from 'native-base'


 export default class BrowserComponent extends Component{

     render() {

         return(
             <View style={{flex: 1}}>
                 <WebView
                    source={{uri: this.props.navigation.state.params.url}}
                    style={{flex: 1}}
                />
             </View>
         );
     }
 }


