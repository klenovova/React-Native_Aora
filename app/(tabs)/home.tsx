import React, { useState } from 'react'
import { FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import useFetchData from '@/lib/FetchData'
import VideoCart from '@/components/VideoCard'

const Home = () => {
  const {data: posts, refetch, isLoading} = useFetchData('http://google.com')

  const [search, setSearch] = useState()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#161622'}}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <VideoCart video={item} />
        )}
        ListHeaderComponent={() => {
          return (
            <View className='my-6 px-4 space-y-6'>
              <View className='justify-between items-start flex-row mb-6'>
                <View>
                  <Text className='font-pmedium text-sm text-gray-100'>
                    Welcome Back
                  </Text>
                  <Text className='text-2xl font-psemibold text-white'>
                    Emanuel
                  </Text>
                </View>

                <View className='mt-1.5'>
                  <Image
                    source={images.logoSmall}
                    className='w-9 h-10'
                    resizeMode='contain'
                  />
                </View>
              </View>

              <SearchInput
                value={search}
                placeholder='Search for a video topic'
                handleChangeText={(e: any) => setSearch(e)}
              />

              <View className='w-full flex-1 pt-5 pb-8'>
                <Text className='text-gray-100 text-lg font-pregular mb-3'>
                  Latest Videos
                </Text>
                
                <Trending
                  posts={[{ id: 1}, { id: 2}, { id: 3}]}
                />
              </View>
            </View>
          )
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
       />
    </SafeAreaView>
  )
}


export default Home