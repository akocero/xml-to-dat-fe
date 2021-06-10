import { ref } from 'vue'
import axios from '../axios/axios-instance'

const getItem = (id) => {

    const post = ref(null)
    const error = ref(null)
    const load = async () => {
        try {
           const res = await axios.get(`/payrolluser/${id}`);
            console.log(res.data)
            post.value = res.data
           return res.data
        }
        catch (err) {
            
        }
    }

    return { post, error, load }
}

export default getItem