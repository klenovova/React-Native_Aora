import { icons } from "@/constants"
import { useState } from "react"
import { Text, View, Image, Pressable } from "react-native"

interface Creator {
  username: string
  avatar: string
}

interface Video {
  video: {
    id: number
    title: string
    thumbnail: string
    video: string
    creator: Creator
  }
}

const VideoCart = ({ video: {title, thumbnail, video, creator: {username, avatar}} }: Video) => {
  const [pressed, setPressed] = useState(false)
  const [play, setPlay] = useState(false) 

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{uri: avatar}}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image
            source={icons.menu}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </View>
      </View>

      {play? (
        <Text>playing</Text>
      ) : (
        <Pressable
          className={`w-full h-60 rounded-xl mt-3 relative justify-center items-center ${pressed ? 'opacity-70': ''}`}
          onPressIn={() => {
            setPressed(true)
            setPlay(true)
          }}
          onPressOut={() => setPressed(false)}
        >
          <Image
            source={{uri: thumbnail}}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </Pressable>
      )}
    </View>
  )
}

export default VideoCart