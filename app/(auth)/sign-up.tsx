import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, Text, View, Image, LogBox } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'


const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(form);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  const submit = async () => {
    try {
      const rawResponse = await fetch(`https://172.25.208.1:3000/auth/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formRef.current.username,
          email: formRef.current.email,
          password: formRef.current.password,
          avatar: "teste"
        })
      });
      const user = await rawResponse.json();

      console.log(user);
      
    } catch (error) {
      console.log("error: " + error)
      throw error
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