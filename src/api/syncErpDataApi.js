import axios from 'axios'
import { apiUrl } from './config'

export const syncErpDataApi = async () => {
  try {
    const response = await axios.get(`${apiUrl}/syncErpData`)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
