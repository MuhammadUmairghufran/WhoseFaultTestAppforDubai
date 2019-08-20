import React,  {Component} from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    Linking,

    FlatList,
    ImageBackground, WebView
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title} from 'native-base';
import Expo from "expo";


export default  class HotRedditPost extends Component{

    constructor(props){
        super(props);
        this.state = {
            posts: null,
        }

    }





    async componentWillMount() {

        fetch('http://www.reddit.com/r/pics/hot.json')
            .then(response => response.json())
            .then(jResponse => {

                this.setState({
                    posts: jResponse.data.children
                });


                // console.log(children[7].data.thumbnail);
                // console.log(children[7].data.title);
                // console.log(children[7].data.author_fullname);
                // console.log(children[7].data.ups);
                // console.log(children[7].data.score);
                // console.log(children[7].data.num_comments);




            })
            .catch(err => console.log(err))


    }


    option1 = () => {
        Linking.openURL('https://www.reddit.com/r/pics/comments/bk768u/april_transparency_report/');
    };



    option2 = (source) => {
        this.props.navigation.navigate(
            'Browser',
            {url: source}
        );
    };



    render() {

        return(
            <ImageBackground
            source={require('../../assets/Rectangle.png')}
            style={{
                height: '100%',
                width: '100%'
            }}>
                <Content>
                    {this.state.posts !== null ? <FlatList
                        style={styles.list}
                        data={this.state.posts}
                        keyExtractor= {(item) => {
                            return item.id;
                        }}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={styles.separator}/>
                            )
                        }}
                        renderItem={({ item }) => (

                            <TouchableOpacity onPress={()=> {this.option2(item.data.url)}}>
                                    <View style={styles.card}>

                                        <View style={styles.cardHeader}>
                                            <View>
                                                <Text style={styles.title}>{item.data.title}</Text>
                                                <Text style={styles.time}>{item.data.ups}</Text>
                                            </View>
                                        </View>

                                        <Image style={styles.cardImage} source={{uri:item.data.thumbnail}}/>

                                        <View style={styles.cardFooter}>
                                            <View style={styles.socialBarContainer}>
                                                <View style={styles.socialBarSection}>
                                                    <TouchableOpacity style={styles.socialBarButton}>
                                                        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/android/75/e74c3c/hearts.png'}}/>
                                                        <Text style={styles.socialBarLabel}>{item.data.score}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.socialBarSection}>
                                                    <TouchableOpacity style={styles.socialBarButton}>
                                                        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/ios-glyphs/75/2ecc71/comments.png'}}/>
                                                        <Text style={styles.socialBarLabel}>{item.data.num_comments}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.socialBarSection}>
                                                    <TouchableOpacity style={styles.socialBarButton}>
                                                        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/metro/75/3498db/administrator-male.png'}}/>
                                                        <Text rkType='primary4 hintColor' style={styles.socialBarLabel}>{item.data.author_fullname}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                            </TouchableOpacity>



                        )}

                    /> : <View></View>}




                </Content>
            </ImageBackground>

        );
    }


}


const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
    },
    list: {
        paddingHorizontal: 17,
        backgroundColor:"#0F59AA",
    },
    separator: {
        marginTop: 10,
    },
    /******** card **************/
    card:{
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor:"white"
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage:{
        flex: 1,
        height: 150,
        width: null,
    },
    /******** card components **************/
    title:{
        fontSize:18,
        flex:1,
    },
    time:{
        fontSize:13,
        color: "#808080",
        marginTop: 5
    },
    icon: {
        width:25,
        height:25,
    },
    /******** social bar ******************/
    socialBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    socialBarSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    socialBarlabel: {
        marginLeft: 8,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    socialBarButton:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});




