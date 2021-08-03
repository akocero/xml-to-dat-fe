import { ref } from "@vue/reactivity";

export default function useImage() {
   const image = ref(null);
   const selectedFile = ref(null)

   const onFileSelected = (e) => {
			selectedFile.value = e.target.files[0];
			image.value = URL.createObjectURL(selectedFile.value);
	};

   return { image, selectedFile, onFileSelected }
}