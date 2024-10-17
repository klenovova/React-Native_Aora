import React, { useState } from 'react'
import { Text, TextInput, View, Image, Pressable, TouchableOpacity, Alert } from 'react-native'

import { icons } from '@/constants';
import { usePathname, useRouter } from 'expo-router';

const SearchInput = ({ initialQuery }: any) => {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery || '')
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()


  return (
      <View className={`border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row space-x-4`}>
        <TextInput
          className='text-base mt-0.5 text-white flex-1 font-pregular'
          value={query}
          placeholder={'Search for a video topic'}
          placeholderTextColor="#cdcde0"
          onChangeText={(e) => setQuery(e)}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />

        <TouchableOpacity
        onPress={() => {
          if(!query) {
            Alert.alert('Missing query', "Please input something to search results across database")
          }

          if(pathname.startsWith('/search')) router.setParams({ query })
          else router.push(`/search/${query}`)
        }}
        >
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