import { ref } from 'vue'
// import axios from 'axios'
import axios from '../axios/axios-instance'

const data = ref([])
const error = ref(null)
const isPending = ref(false)

const fetch = async (url) => {
    isPending.value = true

    try {
        const res = await axios.get(url);
        data.value = res.data
        isPending.value = false
        error.value = null
        return res.data
    } catch (err) {
        isPending.value = false
        error.value = 'Data Fetching Error'
        console.log(err);
    }

    // axios.get(url)
    //     .then(response => {
    //         // handle success
    //         data.value = response.data;
    //         isPending.value = false
    //         error.value = null
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         // handle error
    //         isPending.value = false
    //         error.value = 'Data Fetching Error'
    //         console.log(error);
    //     });
}


const useFetch = () => {
    return { data, error, fetch, isPending }
}

export default useFetch