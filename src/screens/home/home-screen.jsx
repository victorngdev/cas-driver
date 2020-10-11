import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import BackgroundImage from '../../components/background-screen.component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableRipple, Switch } from 'react-native-paper';
import MapView from 'react-native-maps';

function HomeScreen(props) {

  const [isAction, setIsAction] = React.useState(false);

  const toggleAction = () => {
    setIsAction(!isAction);
  }

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <View style={{
          flexDirection: 'column',
          backgroundColor: 'yellow'
        }}>
          <View style={{
            flexDirection: 'row',
            backgroundColor: 'red',
            marginTop: 40,
            alignItems: 'center',
            paddingHorizontal: 20
          }}>

            <Icon name='menu' size={30} color='#a2a2db' style={{
              width: 20
            }} onPress={() => props.navigation.openDrawer()} />

            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#522289',
              marginLeft: 50
            }}>Trang chủ</Text>

            <TouchableRipple onPress={() => { toggleAction() }}>
              <View style={styles.preference}>
                <View pointerEvents="none">
                  <Switch value={isAction} />
                </View>
              </View>
            </TouchableRipple>
          </View>
          <Button
            title='Request Info'
            onPress={() => props.navigation.navigate('RequestInfo')}
          />
          <View style={styles.containerMapView}>
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
                title={"title"}
                description={"description"}
              />
            </MapView>
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
  preference: {
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  containerMapView: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

export default HomeScreen;

