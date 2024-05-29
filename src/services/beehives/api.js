import axios from 'axios'

const beehiveApiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const resource = 'beehives'

export const getBeehives = (page = 1) => beehiveApiClient.get(`/${resource}?page=${page}`)

export const createBeehive = (beehive) => beehiveApiClient.post(`/${resource}`, beehive)

export const getBeehive = (id) => beehiveApiClient.get(`/${resource}/${id}`)
