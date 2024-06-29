import axios from 'axios'
import { LANGUAGE_VERSIONS } from './constants'

const API = axios.create({
    baseURL: "https://emkc.org/api/v2"
})

export const executeCode = async (language, souceCode) => {
    const response = await API.post("/piston/execute", {
        "language": language,
        "version": LANGUAGE_VERSIONS[language],
        "files": [
            {
                "content": souceCode,
            },
        ],
    })

    return response.data
}