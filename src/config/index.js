export const config = {
  development: {
    API_BASE_URL: 'http://schedule_laravel.test/api'
  },
  production: {
    API_BASE_URL: 'https://production-api.com/api'
  }
}

export const API_BASE_URL = config[process.env.NODE_ENV].API_BASE_URL 
