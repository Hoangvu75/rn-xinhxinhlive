/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */

import { useRef, useCallback, useState } from "react";
import Video from "react-native-video";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { URL_CHANGE } from "../utils/Constant";
import { SLATEGREY, DARKTHREE, WATERMELON } from "../utils/Colors";
import LinearGradient from "react-native-linear-gradient";
import { FormatDate } from "../utils/Format";
import Modal from "react-native-modal";

var backgroundColor: string;
var componentColor: string;

export function VideoItem({ video }: any) {
  const isDarkMode = useColorScheme() === "dark";

  if (isDarkMode) {
    backgroundColor = DARKTHREE;
    componentColor = "white";
  } else {
    backgroundColor = "white";
    componentColor = DARKTHREE;
  }

  const [isOpenCommentList, setOpenCommentList] = useState(false);

  return (
    <View>
      {video.linkVideo === "" ? (
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
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height - 55,
          }}
        >
          <Video
            source={{ uri: video.linkVideo }}
            style={{
              position: "absolute",
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height - 55,
              alignSelf: "center",
              backgroundColor: "black",
            }}
            repeat={true}
            resizeMode="cover"
            poster={video.thumbnail}
          />
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => setOpenCommentList(true)}
            >
              <Image
                source={require("../assets/comment_icon.png")}
                style={{
                  alignSelf: "flex-end",
                  width: 45,
                  height: 45,
                  backgroundColor: WATERMELON,
                  borderRadius: 100,
                  marginRight: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <LinearGradient colors={["transparent", "black"]}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: Dimensions.get("window").width / 3,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: SLATEGREY,
                    alignSelf: "center",
                    borderRadius: 60 / 2,
                  }}
                  source={{
                    uri: video.avatarOwner,
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    marginLeft: 10,
                    fontWeight: "bold",
                  }}
                >
                  {video.shopName}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                  marginTop: 10,
                }}
                numberOfLines={2}
              >
                {video.description}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: SLATEGREY,
                  marginVertical: 20,
                  fontStyle: "italic",
                }}
                numberOfLines={2}
              >
                {FormatDate(video.createdAt)}
              </Text>
            </View>
          </LinearGradient>
          <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible={isOpenCommentList}
            onBackButtonPress={() => setOpenCommentList(false)}
            onSwipeCancel={() => setOpenCommentList(false)}
            style={{ margin: 0, justifyContent: 'flex-end' }}>
            <View
              style={{
                backgroundColor: backgroundColor,
                height: Dimensions.get('window').height * 2 / 3,
                width: Dimensions.get('window').width,
              }}>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
}

var currentPage = 2;
export function VideoItemList({ mVideoList, mSetVideoList }: any) {
  const getMoreVideoList = async () => {
    try {
      mSetVideoList(null);
      const response = await fetch(
        URL_CHANGE +
        "/marketing/campaign/search?page=" +
        currentPage +
        "&limit=6&status=LIVE_FINISH"
      );
      const json = await response.json();
      var apiVideoList = json.data.results;
      apiVideoList[5].linkVideo = "";
      apiVideoList[5].thumbnail = "";

      mSetVideoList(apiVideoList);
      currentPage++;
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Video list fetched: " + mVideoList.length);
    }
  };

  const renderVideo = ({ item }: any) => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height - 55,
          alignSelf: "center",
          backgroundColor: "black",
        }}
      >
        <VideoItem video={item} />
      </View>
    );
  };

  const onViewCallBack = useCallback(
    ({ viewableItems, changed, item }: any) => {
      console.log(item);
      getMoreVideoList();
    },
    []
  );
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View>
      <FlatList
        data={mVideoList}
        pagingEnabled
        keyExtractor={(item) => item}
        renderItem={renderVideo}
        onViewableItemsChanged={onViewCallBack}
        viewabilityConfig={viewConfigRef.current}
      />
    </View>
  );
}
