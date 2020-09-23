import React from 'react'
import {View,TextInput,StyleSheet,Image,Pressable,Text,ScrollView} from 'react-native';
import Icon from '../components/Icon';
import Feather from 'react-native-vector-icons/Feather';
import FeatherIcon from 'react-native-vector-icons/Feather';

const BottomLike=()=>{
    return(
      <View style={styles.bottomLike}>
        <Image style={styles.imageLike} source={{uri:'https://images.pexels.com/photos/5203869/pexels-photo-5203869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}}/>
        <TextInput style={styles.likeInput} placeholder='Add comment' multiline/>
        <Pressable  >
        <Text style={styles.pressableButton}>Post</Text>
        </Pressable>
    </View>
    );
}
const MessageeLike=()=>{
    return(
      <>
      <ScrollView>
         <View style={styles.messageLike}>
         <Image style={styles.messageImageLike} source={{uri:'https://images.pexels.com/photos/5203869/pexels-photo-5203869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}}/>
         <Text>Nabaraj</Text>
         <Text>Love it</Text>
        </View>
        <View style={styles.messageLike}>
         <Image style={styles.messageImageLike} source={{uri:'https://images.pexels.com/photos/5203869/pexels-photo-5203869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}}/>
         <Text>Nabaraj</Text>
         <Text>Love it</Text>
        </View>
        <View style={styles.messageLike}>
         <Image style={styles.messageImageLike} source={{uri:'https://images.pexels.com/photos/5203869/pexels-photo-5203869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}}/>
         <Text>Nabaraj</Text>
         <Text>Love it</Text>
        </View>
        <View style={styles.messageLike}>
         <Image style={styles.messageImageLike} source={{uri:'https://images.pexels.com/photos/5203869/pexels-photo-5203869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}}/>
         <Text>Nabaraj</Text>
         <Text>Love it</Text>
        </View>
        <View style={styles.messageLike}>
         <Image style={styles.messageImageLike} source={{uri:'https://images.pexels.com/photos/5203869/pexels-photo-5203869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}}/>
         <Text>Nabaraj</Text>
         <Text>Love it</Text>
        </View>
        <View style={styles.messageLike}>
         <Image style={styles.messageImageLike} source={{uri:'https://images.pexels.com/photos/5203869/pexels-photo-5203869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}}/>
         <Text>Nabaraj</Text>
         <Text>Love it</Text>
        </View>
        <View style={styles.messageLike}>
         <Image style={styles.messageImageLike} source={{uri:'https://images.pexels.com/photos/5203869/pexels-photo-5203869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}}/>
         <Text>Nabaraj</Text>
         <Text>Love it</Text>
        </View>
        </ScrollView>
      </>
    );
}
const Likes = () => {
    return (
     <View>
         <View style={styles.likes}>
            <View style={styles.iconLike}>
            <Icon name="arrow-left" component={Feather} />
            <Text style={styles.text}>Comments</Text>
            </View>
            <Icon name="send" component={FeatherIcon} />
         </View>
         <MessageeLike/>
         <BottomLike/>
     </View>
    )
}
const styles=StyleSheet.create({
    imageLike:{
        height:60,
        width:60,
        borderRadius:40,
        borderColor:'white',
        borderWidth:2,
        marginLeft:6,
    },
    bottomLike:{
        display:'flex',
        flexDirection:'row',
        padding:8,
        borderTopWidth:1,
        borderTopColor:'grey',

    },
    likeInput:{
        width:'70%',
        marginLeft:7,
    },
     pressableButton:{
        color:'#2196F3',
        marginTop:20,
     },
     messageLike:{
         display:'flex',
         flexDirection:'row',
         alignItems:'center',
         padding:10,
         marginLeft:6,
     },
     messageImageLike:{
        height:60,
        width:60,
        borderRadius:40,
        borderColor:'orange',
        borderWidth:2,
        marginRight:6,
     },
     likes:{
         display:'flex',
         flexDirection:'row',
         justifyContent:'space-between',
         alignItems:'center',
         padding:10,
         borderBottomWidth:2,
         borderBottomColor:'grey',
     },
     iconLike:{
         flexDirection:'row',
         alignSelf:'center',
     },
     text:{
         fontSize:19,
        marginLeft:10,
     }

})
export default Likes
