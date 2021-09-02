import { computed } from "vue";
import store from "@/store";
const userAbilities = computed(() =>
	JSON.parse(store.getters.getUser.role.abilities)
);
export default function useAbility() {
	const userCan = (ability) => {
		if (userAbilities.value.includes(ability)) return true;
		else return false;
	};

	return { userCan };
}
