import React, { useState } from 'react'
import { Text, TextInput, View, Image, Pressable } from 'react-native'

import { icons } from '@/constants';


interface FormFieldProps {
  title: string;
  value: any;
  placeholder?: string;
  handleChangeText: (e: any) => void;
  otherStyles?: string;
  keyboardType?: string;
}

const FormField: React.FC<FormFieldProps> = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)


  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <View className={`border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row`}>
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />

        {title === 'Password' && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className='w-6 h-6'
              resizeMode='contain'
            />

          </Pressable>
        )}
      </View>
    </View>
  )
}


export default FormField