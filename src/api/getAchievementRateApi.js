import axios from 'axios'
import { apiUrl } from './config'

export const getAchievementRateApi = async (date, machineName) => {
  try {
    const params = {
      date: date,
      machine_name: machineName
    }

    const response = await axios.get(`${apiUrl}/getAchievementRate`, { params })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
