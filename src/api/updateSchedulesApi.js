import axios from 'axios'
import { apiUrl } from './config'

export const updateSchedulesApi = async (data) => {
    try {
        const response = await axios.put(`${apiUrl}/updateSchedules`, data)
        return response
    } catch (error) {
        throw error
    }
}
