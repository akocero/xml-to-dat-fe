import { ref } from 'vue'
import axios from 'axios'

const data = ref([])
const error = ref(null)

const fetch = (url) => {

    axios.get(url)
        .then(function (response) {
            // handle success
            data.value = response.data;
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}


const useFetch = () => {
    return { data, error, fetch }
}

export default useFetch