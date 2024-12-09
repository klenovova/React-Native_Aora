import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import axios from 'axios'
import { useGlobalContext } from '@/context/GlobalProvider'

const Create = () => {
  const { user } = useGlobalContext();

  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  } as any)
  const formRef = useRef(form);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  const openPicker = async (selectType: any) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === 'image' 
        ? ['image/png', 'image/jpg', 'image/jpeg']
        : ['video/mp4', 'video/gif']
    })

    if(!result.canceled) {
      
      if(selectType === 'image') {
        setForm({...form, thumbnail: result.assets[0]})
        }

      if(selectType === 'video') {
        setForm({...form, video: result.assets[0]})
      }
    }
  }

  const submit = async () => {
    if(!formRef.current.prompt || !formRef.current.title || !formRef.current.video || !formRef.current.thumbnail) {
      return Alert.alert('Please fill in all the fields')
    }
    setUploading(true)


    try {
      const formData = new FormData()

      const imageData = {
        name: formRef.current.thumbnail.name,
        uri: formRef.current.thumbnail.uri,
        type: formRef.current.thumbnail.mimeType,
        size: formRef.current.thumbnail.size
      }
      formData.append('image', imageData as any)

      const videoData = {
        name: formRef.current.video.name,
        uri: formRef.current.video.uri,
        type: formRef.current.video.mimeType,
        size: formRef.current.video.size
      }
      formData.append('video', videoData as any)
      formData.append('title', formRef.current.title)
      formData.append('prompt', formRef.current.prompt)
      formData.append('creatorId', user.id)

      console.log(formData)

      const { data } = await axios.post(`http://192.168.100.106:3333/videos/new`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${user.token}`
          }
        }
      )

      Alert.alert("Success", "Post uploaded successfully")
      router.push('/home')
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setForm({
        title: '',
        video: '',
        thumbnail: '',
        prompt: ''
      })

      setUploading(false)
    }
  }
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#161622'}}>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>
          Upload Video
        </Text>

        <FormField
          title='Video Title'
          value={form.title}
          placeholder='Give your video a catch title'
          handleChangeText={(e: any) => setForm({...form, title: e})}
          otherStyles='mt-10'
        />

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload video
          </Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form?.video ? (
              <Video 
                source={{uri: form.video.uri}}
                style={{
                  width: '100%',
                  height: 256,
                  borderRadius: 16
                }}
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='w-1/2 h-1/2'
                  />
                </View>
              </View>
            ) }
          </TouchableOpacity>
        </View>

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker('image')}>
            {form?.thumbnail ? (
              <Image
                source={{uri: form.thumbnail.uri}}
                resizeMode='cover'
                className='w-full h-64 rounded-2xl'
              />
            ) : (
              <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2 gap-1'>
                <Image
                  source={icons.upload}
                  resizeMode='contain'
                  className='w-5 h-5'
                />
                <Text className='text-sm text-gray-100 font-pmedium'>
                  Choose a file
                </Text>
              </View>
            ) }
          </TouchableOpacity>
        </View>

        <FormField
          title='AI Prompt'
          value={form.prompt}
          placeholder='The prompt you used to create this video'
          handleChangeText={(e: any) => setForm({...form, prompt: e})}
          otherStyles='mt-7'
        />

        <CustomButton
          title='Submit & Publish'
          handlePress={submit}
          containerStyles='mt-7'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView >
  )
}


export default Create