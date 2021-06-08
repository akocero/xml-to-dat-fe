import { ref } from 'vue'
// import axios from 'axios'
import axios from '../axios/axios-instance'

const data = ref([])
const error = ref(null)
const isPending = ref(false)

const fetch = (url) => {
    isPending.value = true
    axios.get(url)
        .then(response => {
            // handle success
            data.value = response.data;
            isPending.value = false
            error.value = null
            console.log(response.data);
        })
        .catch(error => {
            // handle error
            isPending.value = false
            error.value = 'Data Fetching Error'
            console.log(error);
        });
}


const useFetch = () => {
    return { data, error, fetch, isPending }
}

export default useFetch