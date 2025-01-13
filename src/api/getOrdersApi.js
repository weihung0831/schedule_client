import axios from 'axios'
import { apiUrl } from './config'

export const getOrdersApi = async (productLineCode, begin_date, endDate, customerCode=null, orderNumber=null, page=0, limit=25) => {
    try {
        const params = {
            product_line_code: productLineCode,
            begin_date: begin_date,
            end_date: endDate,
            page: page,
            limit: limit,
            customer_code: customerCode,
            order_number: orderNumber
        }

        const response = await axios.get(`${apiUrl}/getOrders`, { params })

        // TODO: 因DB還沒見這個欄位，因此先給預設值
        response.data.data.map((item, index) => {
            item.manual_work_hours = 0
        })

        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}
