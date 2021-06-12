import { ref } from 'vue'
import axios from '../axios/axios-instance'

const getItem = (id) => {

    const item = ref(null)
    const error = ref(null)
    const load = async () => {
        try {
           const res = await axios.get(`/payrolluser/${id}`);
            console.log(res.data)
            item.value = res.data
           return res.data
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return { item, error, load }
}

export default getItem