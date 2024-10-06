import React from 'react'
import { Text, View, Pressable } from 'react-native'

interface CustomButtonProps {
  title: string;
  handlePress: any;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({  title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <Pressable
      onPressIn={handlePress}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''} active:opacity-70`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </Pressable>
  )
}


export default CustomButton