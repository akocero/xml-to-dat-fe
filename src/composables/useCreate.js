import { ref } from 'vue'
import axios from '../axios/axios-instance'

const response = ref(null)
const error = ref(null)
const isPending = ref(false)

const create = (url, payload) => {
    isPending.value = true
    axios.post(url, payload)
        .then(res => {
            // handle success
            response.value = res.data;
            isPending.value = false
            error.value = null
            console.log(res.data);
        })
        .catch(err => {
            isPending.value = false
            // response.value = [];
            // handle error
            if(err.message.includes('422')) {
                error.value = err.response.data
                console.log(err.response.data)
            }else{
                error.value = error.message
            }
            
            
        });
}


const useCreate = () => {
    return { response, error, create, isPending }
}

export default useCreate