import axios from 'axios'
import { apiUrl } from './config'

export const getMachinesApi = async (productLineId) => {
  try {
    const params = {
      product_line_id: productLineId
    }

    const response = await axios.get(`${apiUrl}/getMachines`, { params })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
