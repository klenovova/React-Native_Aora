import { createContext, useContext, useState, useEffect, Children} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem("currentUser")
      .then((res) => {
        if(res) {
          setIsLoggedIn(true)
          setUser(res)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider