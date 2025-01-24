import axios from 'axios'
import { apiUrl } from './config'

export const createSchedulesApi = async (data) => {
    try {
        const response = await axios.post(`${apiUrl}/createSchedules`, data)
        return response
    } catch (error) {
        throw error
    }
}
