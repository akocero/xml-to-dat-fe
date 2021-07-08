import { ref } from 'vue'
import axios from '../axios/axios-instance'

const useUpdate = () => {

    const response = ref(null)
    const error = ref(null)
    const loading = ref(false)
    const unknownError = ref(null)
    
    const update = async (url, data) => {
      loading.value = true
      error.value = null
      try {
         const res = await axios.patch(url, data);
         response.value = res.data;
         console.log(data.value.data);
         error.value = null;
         unknownError.value = null;
         loading.value = false;
		} catch (err) {
         loading.value = false;

         if (err.message.includes("422")) {
            error.value = err.response.data;

            console.log(err.response.data);
            unknownError.value = null;
         } else {
            unknownError.value =
               "Please check your internet connection";
            error.value = null;
            response.value = null;
         }
		}
    
   }
   return { response, error, update, loading, unknownError }
}

export default useUpdate
