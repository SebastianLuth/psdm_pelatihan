import axios from "axios"

export const getAllCompany = async () => {
    try {
        const result =  await axios.get(
            `http://localhost:5000/api/company/`,
            {
                withCredentials: true
            }
        )
        return result.data.data
    } catch (error) {
        throw error
    }
}