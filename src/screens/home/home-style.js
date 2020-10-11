import { StyleSheet } from "react-native";
import rem from "../../components/constant.unit";
import { Dimensions } from 'react-native';
import { absoluteFill } from "react-native-extended-stylesheet";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  header: {
    flexDirection: 'row',
    marginTop: 30
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  iconNotification: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    marginTop: 18,
    marginLeft: 26
  },
  signout: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    marginTop: 18,
    marginLeft: 20
  },
  iconNoti: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: 40,
    height: 40,
  },
  iconSignout: {
    // borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: 27,
    height: 27,
    marginTop: 6,
    marginLeft: 8
  },
  map: {
    marginTop: 9,
    position: 'absolute',
    marginHorizontal: 10,
    width: 320,
    height: 380,
    borderRadius: 30

  },
  viewMap: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 40,
    marginHorizontal: 10,
    width: 340,
    height: 400,
    borderRadius: 10,
    backgroundColor: '#c4def6'
  }
  ,
  rate: {
    position: 'absolute',
    marginTop: 540,
    marginLeft: 20
  },
  starList:{
    flexDirection: 'row',
    width: 200,
    height:40
  },
  iconStar:{
    marginHorizontal : 5,
    width: 30,
    height:30
  },
  text: {
    color: "#000",
    fontSize: 17,
    fontFamily: "Roboto_500Medium",
  },
  status: {
    position: 'absolute',
    marginTop: 605,
    marginLeft: 20

  },
  statusText:{
    alignSelf:'center',
    marginTop: 100,
    marginVertical: 5,
    color: "#000",
    fontSize: 17,
    fontFamily: "Roboto_500Medium",
  },
  preference: {
    marginLeft:150
   
  }
});

export default styles;