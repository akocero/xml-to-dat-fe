export default function useViewMode() {
	const disableThisFields = (tags) => {
		setTimeout(() => {
			// const tags = ["input", "select", "textarea"];
			tags.forEach((tagName) => {
				var inputs = document.getElementsByTagName(tagName);
				for (var i = 0; i < inputs.length; i++) {
					inputs[i].disabled = true;
					inputs[i].classList.add("disabled");
				}
			});
		}, 200);
	};

	return { disableThisFields };
}
