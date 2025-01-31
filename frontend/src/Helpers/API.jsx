import axios from "axios";

const BASE_URL = "http://localhost:3000/";

export const GET= async () => {};

export const POST = async (endpoint, body) => {
    try {
        const res = await axios.post(BASE_URL+endpoint, body, {
            headers:{"Content-Type":"application/json"}
        })
        if (res.status == 201 || res.status == 200){
            return res.data;
        } else{
            throw new Error(JSON.stringify(res.data));
        }
    } catch (error) {
        if(error.response){
            throw new Error(error.response.data.message)
        } else{
            throw new Error("Server unreachable")
        }
    }
}