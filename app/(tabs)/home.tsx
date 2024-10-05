import React from 'react'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'


const Home = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Link href="index">Go to home</Link>
    </View>
  )
}


export default Home