import { useState, useEffect } from "react"
import axios from "axios"
import { Alert } from "react-native"

// Defina a interface para o tipo de dados
interface Creator {
  username: string
  avatar: string
}

interface DataItem {
  id: number
  title: string
  thumbnail: string
  video: string
  creator: Creator
}

const useFetchData = (url: string, context?: any) => {
  const [data, setData] = useState<DataItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchdata = async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + url, context)
      setData(response.data)
      // setData([])
      // setData([{
      //   id: 1,
      //   title: 'teste',
      //   thumbnail: 'https://messagetech.com/wp-content/themes/ml_mti/images/no-image.jpg',
      //   video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      //   creator: {
      //     username: 'Teste',
      //     avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5taINn-ULi-Gw1l5g7VkiDfkzm6btlLN_zpw-RyeFwsuiQBxrU45vQuc8ySnQes48TZ4&usqp=CAU'
      //   }
      // },
      // {
      //   id: 2,
      //   title: 'teste',
      //   thumbnail: 'https://messagetech.com/wp-content/themes/ml_mti/images/no-image.jpg',
      //   video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      //   creator: {
      //     username: 'Teste',
      //     avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5taINn-ULi-Gw1l5g7VkiDfkzm6btlLN_zpw-RyeFwsuiQBxrU45vQuc8ySnQes48TZ4&usqp=CAU'
      //   }
      // },
      // {
      //   id: 3,
      //   title: 'teste',
      //   thumbnail: 'https://messagetech.com/wp-content/themes/ml_mti/images/no-image.jpg',
      //   video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      //   creator: {
      //     username: 'Teste',
      //     avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5taINn-ULi-Gw1l5g7VkiDfkzm6btlLN_zpw-RyeFwsuiQBxrU45vQuc8ySnQes48TZ4&usqp=CAU'
      //   }
      // }])
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchdata()
  }, [])

  const refetch = () => fetchdata()

  
  return { data, isLoading, refetch }
}

export default useFetchData
