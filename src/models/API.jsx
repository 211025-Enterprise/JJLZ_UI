import axios from 'axios'

const apiURL = 'localhost:8080/'
const baseHeader = {'Content-Type': "application/json"}

let backendQuery = axios.create({
    baseURL: apiURL,
    headers: baseHeader
});