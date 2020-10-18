import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import BackgroundImage from '../../components/background-screen.component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function HistoryScreen(props) {
  return (
    <View style={styles.container}>

      <BackgroundImage>
        <View style={styles.header}>
          <Icon name='menu' size={30} color='#a2a2db' style={{ width: 20 }} onPress={() => props.navigation.openDrawer()} />
          <Text style={styles.titleHeader}>Lịch sử</Text>
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
              <View style={styles.destinationPlace}>
                <View style={styles.titleAdd}>
                  <Text style={styles.textTitle}>Bệnh viện Thủ Đức </Text>
                </View>
                <View style={styles.detailAdd}>
                  <Text style={styles.textAdd}>365 Võ Văn Ngân, quận 9, TPHCM</Text>
                </View>
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
            <View style={styles.destinationPlace}>
              <View style={styles.titleAdd}>
                <Text style={styles.textTitle}>Bệnh viện 175 </Text>
              </View>
              <View style={styles.detailAdd}>
                <Text style={styles.textAdd}>365 /12, quận Gò Vấp, TPHCM</Text>
              </View>
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
            <View style={styles.destinationPlace}>
              <View style={styles.titleAdd}>
                <Text style={styles.textTitle}>Bệnh viện Hoà Hảo</Text>
              </View>
              <View style={styles.detailAdd}>
                <Text style={styles.textAdd}>1/69 TCH 10, quận 12, TPHCM</Text>
              </View>
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

            <View style={styles.destinationPlace}>
              <View style={styles.titleAdd}>
                <Text style={styles.textTitle}>Bệnh viện quận 12 </Text>
              </View>
              <View style={styles.detailAdd}>
                <Text style={styles.textAdd}>1/25/D TCH Nguyễn Trường Tộ , quận 10, TPHCM</Text>
              </View>
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
  header: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#522289',
    marginLeft: 50
  },
  listHistory: {
    flex: 9,
    flexDirection: 'column'
  },
  history: {
    flexDirection: "row",
    height: 70,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#bed3f3',
    margin: 10,

  },
  logo: {
    flex: 1.25,
  },

  status: {
    flex: 1,
  },
  statusLogo: {
    width: 25,
    height: 25,
    marginTop: 15
  },
  app_logo: {
    width: 50,
    height: 50,
    borderRadius: 18,
    marginVertical: 10,
    marginHorizontal: 5
  },
  destinationPlace: {
    flex:5,
    flexDirection: 'column',
    marginLeft: 10
   
  },
  titleAdd: {
    marginTop: 10,
    flex:0.25,
  },
  detailAdd: {
    flex: 0.25,
    marginHorizontal: 5
    ,marginVertical: 5
  },
  textTitle: {
    color: "#000",
    fontSize: 15,
    fontFamily: "Roboto_500Medium",

  },
  textAdd: {
    color: "#4d4d4d",
    fontSize: 12,
    fontFamily: "Roboto_500Medium",

  },
  textDate: {
    marginTop: 10,
    color: "#4d4d4d",
    fontSize: 15,
    fontFamily: "Roboto_500Medium",
  },
  date: {
    flex: 1,
  }
})

export default HistoryScreen;