import { icons } from "@/constants"
import { Video, ResizeMode } from "expo-av"
import React, { useState } from "react"
import { FlatList, ImageBackground, Pressable, Text, Image, ViewStyle } from "react-native"
import * as Animatable from "react-native-animatable"

interface TrendingProps {
  posts: any
}

interface TrendingItemProps {
  activeItem: any,
  item: any
}

const zoomIn: Animatable.CustomAnimation = {
  0: {
    scaleX: 0.9,
    scaleY: 0.9
  },
  1: {
    scaleX: 1,
    scaleY: 1
  }
}

const zoomOut: Animatable.CustomAnimation = {
  0: {
    scaleX: 1,
    scaleY: 1
  },
  1: {
    scaleX: 0.9,
    scaleY: 0.9
  }
}

const videoStyle: ViewStyle = {
  width: 208,
  height: 288,
  borderRadius: 35,
  marginTop: 12,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  overflow: "hidden",
};

const TrendingItem = ({ activeItem, item}: TrendingItemProps) => {
  const [play, setPlay] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <Animatable.View
      className="mt-5"
      animation={activeItem === item.id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={videoStyle}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false)
            }
          }}
        />
      ) : (
        <Pressable
          className={`relative justify-center items-center ${pressed ? 'opacity-70': ''}`}
          onPress={() => setPlay(true)}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail
            }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </Pressable>
      )}
    </Animatable.View>
  )
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1])

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if(viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrendingItem
          activeItem={activeItem}
          item={item}
        />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 110, y: 0 }}
      horizontal
    />
  )
}

export default Trending