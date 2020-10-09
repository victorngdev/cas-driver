import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function DrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection:'row', marginTop:15}}>
              <Avatar.Image
                source={{
                  uri: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/83012519_1497814183728497_1901903877645533184_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=l92aofIVAloAX99oBIy&_nc_ht=scontent.fdad3-1.fna&oh=ac2b60cb37775a47a9c2ccc98f38fd2d&oe=5FA585D7'
                }}
                size={50}
              />
              <View style={{flexDirection:'column',marginLeft:15}}>
                <Title style={styles.title}>Lê Quang Huy</Title>
                <Caption>@lehuy.fptu</Caption>
              </View>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Đăng xuất"
          onPress={() => { }}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  }
});