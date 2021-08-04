import { ref } from "@vue/reactivity";
import axios from "@/axios/axios-instance";

export default function useImage() {
   const image = ref(null);
   const selectedFile = ref(null)

   const onFileSelected = (e) => {
			selectedFile.value = e.target.files[0];
			image.value = URL.createObjectURL(selectedFile.value);
	};

   const deleteImage = async (url) => {
      try {
         const res = await axios.delete(url);
         return res
      } catch (err) {
         console.log(err.message);
      }
	};

   return { image, selectedFile, onFileSelected, deleteImage }
}