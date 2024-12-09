import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, Text, View, Image, LogBox, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGlobalContext } from '@/context/GlobalProvider'


const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(form);

  const {setUser, setIsLoggedIn} = useGlobalContext()

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  const submit = async () => {
    if(!formRef.current.username || !formRef.current.email || !formRef.current.password) {
      Alert.alert("Error", "Please fill in al the fields")
    }

    setIsSubmitting(true)

    try {
      const { data } = await axios.post(`http://192.168.100.106:3333/auth/signup`,
        {
          name: formRef.current.username,
          email: formRef.current.email,
          password: formRef.current.password,
          avatar: "https://res.cloudinary.com/duheudj5m/image/upload/v1733785827/twp9qcahnicfykuaizo7.png"
        }
      )
      
      await AsyncStorage.setItem("currentUser", JSON.stringify(data))
      setUser(data)
      setIsLoggedIn(true)

      router.replace('/home')
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#161622', height: '100%'}}>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] h-full px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />

          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign up to Aora</Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: any) => setForm(prev => ({ ...prev, username: e }))}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm(prev => ({ ...prev, email: e }))}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm(prev => ({ ...prev, password: e }))}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Have an account already?
            </Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}


export default SignUp