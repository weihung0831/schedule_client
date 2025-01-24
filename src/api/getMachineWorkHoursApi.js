import axios from 'axios'
import { apiUrl } from './config'

export const getMachineWorkHoursApi = async (beginDate, endDate, machineName) => {
  try {
    const params = {
      begin_date: beginDate,
      end_date: endDate,
      machine_name: machineName
    }

    const response = await axios.get(`${apiUrl}/getMachineWorkHours`, { params })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
