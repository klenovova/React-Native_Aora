import React, { useState } from 'react'
import { Text, TextInput, View, Image, Pressable, TouchableOpacity } from 'react-native'

import { icons } from '@/constants';


interface SearchInputProps {
  value: any;
  placeholder?: string;
  handleChangeText: any;
  otherStyles?: string;
  keyboardType?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, placeholder, handleChangeText, otherStyles, keyboardType}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)


  return (
      <View className={`border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row space-x-4`}>
        <TextInput
          className='text-base mt-0.5 text-white flex-1 font-pregular'
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />

        <TouchableOpacity>
          <Image
            source={icons.search}
            className='w-5 h-5'
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
  )
}


export default SearchInput