import axios from 'axios'
import { apiUrl } from './config'

export const getOrdersApi = async (productLineCode, begin_date, endDate, customerCode=null, orderNumber=null, planBeginDate=null, planEndDate=null) => {
    try {
        const params = {
            product_line_code: productLineCode,
            begin_date: begin_date,
            end_date: endDate,
            customer_code: customerCode,
            order_number: orderNumber,
            plan_begin_date: planBeginDate,
            plan_end_date: planEndDate
        }

        const response = await axios.get(`${apiUrl}/getOrders`, { params })
        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}
