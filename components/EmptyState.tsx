import React from "react"
import { FlatList, Image, Text, View } from "react-native"

import { images } from "@/constants"
import CustomButton from "./CustomButton"
import { useRouter } from "expo-router"

interface EmptyStateProps {
  title: string,
  subtitle: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  const router = useRouter()

  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className='text-xl text-center font-psemibold text-white'>
        {title}
      </Text>
      <Text className='font-pmedium text-sm text-gray-100 mt-2'>
        {subtitle}
      </Text>

      <CustomButton
        title="Create video"
        handlePress={() => router.push('/create')}
        containerStyles="w-full my-5"
      />
    </View>
  )
}

export default EmptyState