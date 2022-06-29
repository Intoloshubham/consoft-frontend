import AsyncStorage from '@react-native-async-storage/async-storage';

//company
const setCompanyId = async (id) => {
    try {
        await AsyncStorage.setItem('company_id', id)
    } catch (error) {
        console.log(error)
    }
}

const getCompanyId = async () => {
    try {
      const company_id = await AsyncStorage.getItem('company_id')
      if (company_id !== null) {
        return company_id
      }
    } catch (error) {
      console.log(error)
    }
}

const removeCompanyId = async (id) => {
  try {
    await AsyncStorage.removeItem(id)
  } catch (error) {
    console.log(error)
  }
}


//token
const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('token', token)
    } catch (error) {
        console.log(error)
    }
}

const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token !== null) {
        return token
      }
    } catch (error) {
      console.log(error)
    }
}
const removeToken = async (value) => {
  try {
    await AsyncStorage.removeItem(value)
  } catch (error) {
    console.log(error)
  }
}
  
  export { setCompanyId, getCompanyId, removeCompanyId, storeToken, getToken, removeToken }