/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */

import * as React from "react";
import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { WATERMELON, DARKTHREE } from "../utils/Colors";
import { Text, View, useColorScheme } from "react-native";
import { VideoItemList } from "../component/VideoItem";
import { Dimensions, Image, StyleSheet } from "react-native";

import { URL_CHANGE } from "../utils/Constant";

const Tab = createBottomTabNavigator();

var backgroundColor: string;
var componentColor: string;

export function MainScreen() {
  const isDarkMode = useColorScheme() === "dark";

  if (isDarkMode) {
    backgroundColor = DARKTHREE;
    componentColor = "white";
  } else {
    backgroundColor = "white";
    componentColor = DARKTHREE;
  }

  const styles = StyleSheet.create({
    iconStyle: {
      width: 20,
      height: 20,
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontWeight: "400",
          fontSize: 16,
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: backgroundColor,
          height: 55,
        },
        tabBarActiveTintColor: WATERMELON,
      }}
      initialRouteName="LiveFragment"
    >
      <Tab.Screen
        name="LiveFragment"
        component={LiveFragment}
        options={{
          tabBarLabel: "Live",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  source={require("../assets/live_icon_focused.png")}
                  style={styles.iconStyle}
                />
              ) : (
                <Image
                  source={require("../assets/live_icon.png")}
                  style={styles.iconStyle}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AccountFragment"
        component={AccountFragment}
        options={{
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  source={require("../assets/account_icon_focused.png")}
                  style={styles.iconStyle}
                />
              ) : (
                <Image
                  source={require("../assets/account_icon.png")}
                  style={styles.iconStyle}
                />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function LiveFragment() {
  const [videoList, setVideoList] = useState(null);

  const getVideoList = async () => {
    try {
      const response = await fetch(
        URL_CHANGE +
          "/marketing/campaign/search?page=1&limit=6&status=LIVE_FINISH"
      );
      const json = await response.json();
      var apiVideoList = json.data.results;
      apiVideoList[5].linkVideo = "";

      setVideoList(apiVideoList);
      console.log("Video list fetched");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideoList();
  }, []);

  return (
    <View>
      {videoList == null ? (
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height - 55,
            alignItems: "center",
            backgroundColor: backgroundColor,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: componentColor, fontSize: 18 }}>
            Loading...
          </Text>
        </View>
      ) : (
        <VideoItemList mVideoList={videoList} mSetVideoList={setVideoList} />
      )}
    </View>
  );
}

function AccountFragment() {
  return (
    <View
      style={{ justifyContent: "center", backgroundColor: "green", flex: 1 }}
    >
      <Text style={{ color: componentColor }}>hello world</Text>
    </View>
  );
}
