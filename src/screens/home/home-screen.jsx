import React, { useState } from 'react';
import { View, Image, Alert } from 'react-native';
import { Avatar, Title, Text, TouchableRipple, Switch } from 'react-native-paper';
import BackgroundImage from '../../components/background-screen.component';
import styles from './home-style';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from "react-native-maps";


const HomeStack = createStackNavigator();

function HomeScreen(props) {

  const [isAction, setIsAction] = React.useState(false);
  const [text, setText] = useState('Chưa sẵn sàng');


  const toggleAction = () => {
    if (isAction) {
      setIsAction(!isAction);
      setText('Chưa sẵn sàng');
    }
    if (!isAction) {
      setIsAction(!isAction);
      setText('Sẵn sàng');

      Alert.alert("Hệ thống sẽ thông báo cho bạn khi có yêu cầu từ bệnh nhân");
      
     
    }
  }

  return (

    <View style={styles.container}>
      <BackgroundImage>

        <View style={styles.header}>
          <Icon name='menu' size={30} color='#a2a2db' style={{
            width: 20, marginLeft: 10, marginTop: 20
          }} onPress={() => props.navigation.openDrawer()} />
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Avatar.Image
                source={{
                  uri: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/83012519_1497814183728497_1901903877645533184_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=l92aofIVAloAX99oBIy&_nc_ht=scontent.fdad3-1.fna&oh=ac2b60cb37775a47a9c2ccc98f38fd2d&oe=5FA585D7'
                }}
                size={50}
              />
              <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                <Title style={styles.title}>Lê Quang Huy</Title>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.iconNotification} >
            <Image style={styles.iconNoti}
              source={require("../../../assets/icons/notifi.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.signout}>
            <Image style={styles.iconSignout}
              source={require("../../../assets/icons/signout.png")} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewMap}>
          <MapView style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0,
              longitudeDelta: 0.0,
            }}
          >

            <MapView.Marker
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324
              }}
              title={"Vị trí của bạn"}
              description={"123 Lê Văn Việt, quận 9, TPHCM"}
            />
          </MapView>
        </View>
        <View style={styles.rate}>
          <Text style={styles.text}> Đánh giá</Text>
          <View style={styles.starList}>
            <Image style={styles.iconStar}
              source={require("../../../assets/icons/goldStar.png")} />
            <Image style={styles.iconStar}
              source={require("../../../assets/icons/goldStar.png")} />
            <Image style={styles.iconStar}
              source={require("../../../assets/icons/goldStar.png")} />
            <Image style={styles.iconStar}
              source={require("../../../assets/icons/goldStar.png")} />
            <Image style={styles.iconStar}
              source={require("../../../assets/icons/emptyStar.png")} />
          </View>
        </View>

        <View style={styles.status}>
          <TouchableRipple onPress={() => { toggleAction() }}>
            <View style={styles.preference}>
              <View pointerEvents="none">
                <Switch value={isAction} />
              </View>
            </View>
          </TouchableRipple>
        </View>
        <Text style={styles.statusText}>{text}</Text>
      </BackgroundImage>
    </View>
  )
}


export default HomeScreen;

