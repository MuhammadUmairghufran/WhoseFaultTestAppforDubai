/**
 * Project name: Practical Test App
 * Author: Muhammad Umair
 * @format
 * @flow
 */


import {createStackNavigator,createAppContainer} from "react-navigation";
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import DetailTaskScreen from "../Screens/DetailTaskScreen/DetailTaskScreen";
import SignupScreen from "../Screens/SignupScreen/SignupScreen";
import LoginScreen from "../Screens/LoginScreen/LoginScreen";
import AddNewTask from "../Screens/AddNewTask/AddNewTask";
import HotRedditPost from "../Screens/HotRedditPost/HotRedditPost";
import BrowserComponent from "../Screens/BrowserComponent/BrowserComponent";

const Root = createStackNavigator({
            Home: {
                screen:HomeScreen,
              navigationOptions :{
                    header: null
                }
            },
            Signup: {
              screen:  SignupScreen,
              navigationOptions: {
                  header: null
              }
            },
            Login: {
              screen: LoginScreen,
             navigationOptions:{
                 header: null,
             }
            },
            Redditscreen: {
                screen: HotRedditPost,
                navigationOptions: {
                    title: 'reddit hot stories',
                    headerStyle: {
                        backgroundColor: '#1d578f',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }
            },
            DetailTasks: {
                screen: DetailTaskScreen,
                navigationOptions: {
                    title: 'All Tasks',
                    headerStyle: {
                        backgroundColor: '#1d578f',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }
            },
            AddNewTask: {
                screen: AddNewTask,
                navigationOptions: {
                    title: 'Add New Task',
                    headerStyle: {
                        backgroundColor: '#1d578f',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }
            },
            Browser: {
                screen: BrowserComponent
            }
},
    {
        initialRouteName: 'Signup',
        defaultNavigationOptions: {
            gesturesEnabled: false,
        }
    }
);



export const TestAppContainer =  createAppContainer(Root);

