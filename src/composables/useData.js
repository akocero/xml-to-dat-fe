import { ref } from 'vue'
import axios from '../axios/axios-instance'

const response = ref(null)
const error = ref(null)
const isPending = ref(false)

const create = async (url, payload) => {
    isPending.value = true
    try {
        const res = await axios.post(url, payload);
        error.value = null
        response.value = res.data
        isPending.value = false
        return res.data
    } catch (err) {
        isPending.value = false
        response.value = null
      //   console.log(err.response.data)
        if(err.response.status === 422){
            error.value = err.response.data
        }else{
            error.value = err.message
        }
    } 
    
}

const update = async (url, payload) => {
    isPending.value = true

    try {
        const res = await axios.patch(url, payload);
        error.value = null
        response.value = res.data
        isPending.value = false
        return res.data
    } catch (err) {
        isPending.value = false
        response.value = null

        if (err.response.status === 422) {
            error.value = err.response.data
        } else {
            error.value = err.message
        }
    }

}

const useData = () => {
    return { response, error, create, update, isPending }
}

export default useData