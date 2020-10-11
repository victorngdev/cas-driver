import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import BackgroundImage from '../../components/background-screen.component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function HistoryScreen(props) {
  return (
    <View style={styles.container}>
      <BackgroundImage>
        <View style={{
          flexDirection: 'row',
          marginTop: 40,
          alignItems: 'center',
          paddingHorizontal: 20
        }}>
          <Icon name='menu' size={30} color='#a2a2db' style={{ width: 20 }} onPress={() => props.navigation.openDrawer()} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#522289', marginLeft: 50 }}>Lịch sử</Text>
        </View>

        <View style={styles.listHistory}>

          <TouchableOpacity onPress={() => props.navigation.navigate("HistoryDetail")}>
            <View style={styles.history}>
              <View style={styles.logo}>
                <Image
                  source={require("../../../assets/icons/logo.png")}
                  style={styles.app_logo}
                />
              </View>
              <View stype={styles.destinationPlace}>
                <Text style={styles.textTitle}>Bệnh viện Quân Y </Text>
                <Text style={styles.textAdd}>365 Lê Văn Việt, quận 9, TPHCM</Text>
              </View>
              <View style={styles.status}>
                <Image
                  source={require("../../../assets/icons/success.png")}
                  style={styles.statusLogo}
                />
              </View>
              <View style={styles.date}>
                <Text style={styles.textDate}>11 Oct</Text>
              </View>
            </View>
          </TouchableOpacity>


          <View style={styles.history}>
            <View style={styles.logo}>
              <Image
                source={require("../../../assets/icons/logo.png")}
                style={styles.app_logo}
              />
            </View>
            <View stype={styles.destinationPlace}>
              <Text style={styles.textTitle}>Bệnh viện Quận 9 </Text>
              <Text style={styles.textAdd}>125 Lê Văn Việt, quận 9, TPHCM</Text>
            </View>
            <View style={styles.status}>
              <Image
                source={require("../../../assets/icons/success.png")}
                style={styles.statusLogo}
              />
            </View>
            <View style={styles.date}>
              <Text style={styles.textDate}>11 Jan</Text>
            </View>
          </View>

          <View style={styles.history}>
            <View style={styles.logo}>
              <Image
                source={require("../../../assets/icons/logo.png")}
                style={styles.app_logo}
              />
            </View>
            <View stype={styles.destinationPlace}>
              <Text style={styles.textTitle}>Bệnh viện Quận 12 </Text>
              <Text style={styles.textAdd}>365 Tân Chánh Hiệp, quận 12, TPHCM</Text>
            </View>
            <View style={styles.status}>
              <Image
                source={require("../../../assets/icons/fail.png")}
                style={styles.statusLogo}
              />
            </View>
            <View style={styles.date}>
              <Text style={styles.textDate}>18 Dec</Text>
            </View>
          </View>

          <View style={styles.history}>
            <View style={styles.logo}>
              <Image
                source={require("../../../assets/icons/logo.png")}
                style={styles.app_logo}
              />
            </View>
            <View stype={styles.destinationPlace}>
              <Text style={styles.textTitle}>Bệnh viện Thủ Đức </Text>
              <Text style={styles.textAdd}>365 Võ Văn Ngân, quận 9, TPHCM</Text>
            </View>
            <View style={styles.status}>
              <Image
                source={require("../../../assets/icons/success.png")}
                style={styles.statusLogo}
              />
            </View>
            <View style={styles.date}>
              <Text style={styles.textDate}>20 Aug</Text>
            </View>
          </View>


        </View>






      </BackgroundImage>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  listHistory: {
    marginTop: 10
  },
  history: {
    flexDirection: "row",
    height: 70,
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: '#bed3f3',
    margin: 10
  },
  logo: {

  },
  statusLogo: {
    width: 25,
    height: 25,
    marginTop: 10
    , marginLeft: 5
  },
  app_logo: {
    width: 50,
    height: 50,
    borderRadius: 18,
    marginVertical: 10,
    marginLeft: 10
  },
  textTitle: {
    width: 150,
    color: "#000",
    fontSize: 15,
    fontFamily: "Roboto_500Medium",
    marginVertical: 2,
    marginLeft: 15,
    marginTop: 8
  },
  textAdd: {
    width: 150,
    color: "#4d4d4d",
    fontSize: 12,
    fontFamily: "Roboto_500Medium",
    marginLeft: 15
  },
  textDate: {
    width: 50,
    color: "#4d4d4d",
    fontSize: 15,
    fontFamily: "Roboto_500Medium",
    marginVertical: 8,
    marginLeft: 30
  },
  date: {
    color: "#5c7682",
    fontSize: 17,
    fontFamily: "Roboto_500Medium",
  }
})

export default HistoryScreen;