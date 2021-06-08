import { ref } from 'vue'
import axios from 'axios'

const data = ref([])
const error = ref(null)

const fetch = (url, payload) => {

    axios.post(url, payload)
        .then(function (response) {
            // handle success
            data.value = response.data.data;
            console.log(response.data.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}


const useCreate = () => {
    return { data, error, fetch }
}

export default useCreate