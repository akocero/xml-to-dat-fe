import { ref } from 'vue'

export default function useAlert() {
   const alert = ref(null)
   
   const displayAlert = (status, message) => {
			const alertDelay = 5000;

			alert.value = {
				status,
				message,
			};
			window.scrollTo(0, 0);
			setTimeout(() => {
				alert.value = null;
			}, alertDelay);
		};

   return { alert, displayAlert }
}