import { ref } from 'vue'
import axios from 'axios'

const getData = () => {

    const data = ref([])
    const error = ref(null)

    const load = () => {
        axios.get('https://payroll-ent-cloud.herokuapp.com/api/payrolluser')
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

    return { data, error, load }
}

export default getData