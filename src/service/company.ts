import axios from "axios"
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllCompany = async () => {
    try {
        const result =  await axios.get(
            `${baseUrl}/api/company/`,
            {
                withCredentials: true
            }
        )
        return result.data.data
    } catch (error) {
        throw error
    }
}