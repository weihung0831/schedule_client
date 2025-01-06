import axios from 'axios'
import { apiUrl } from './config'

export const getProductLinesApi = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getProductLines`)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
