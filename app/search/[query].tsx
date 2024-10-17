import React, { useEffect, useState } from 'react'
import { FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import useFetchData from '@/lib/FetchData'
import VideoCart from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams()
  const {data: posts, refetch, isLoading} = useFetchData('http://google.com')

  const [search, setSearch] = useState()
  
  useEffect(() => {
    refetch()
  }, [query])

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
            <View className='my-6 px-4'>
              <Text className='font-pmedium text-sm text-gray-100'>
                Search Results
              </Text>
              <Text className='text-2xl font-psemibold text-white'>
                {query}
              </Text>

              <View className='mt-6 mb-8'>
                <SearchInput initialQuery={query} />
              </View>              
            </View>
          )
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
       />
    </SafeAreaView>
  )
}


export default Search