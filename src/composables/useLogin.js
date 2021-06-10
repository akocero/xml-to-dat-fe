import { ref } from 'vue'
import axios from '../axios/axios-instance'
// import { useRoute } from 'vue-router'

const response = ref(null)
const error = ref(null)
const isPending = ref(false)
// const route = useRoute()

const login = async (url, payload) => {
    isPending.value = true
    // console.log(route)
    try {
        const res = await axios.post(url, payload);
        if(res.data === ''){
            error.value = 'Invalid Inputs'
        }else{
            error.value = null
            response.value = res.data
        }

        return res.data
    } catch (err) {
        console.log('error', err.message)
    }
    
        
}


const useLogin = () => {
    return { response, error, login, isPending }
}

export default useLogin