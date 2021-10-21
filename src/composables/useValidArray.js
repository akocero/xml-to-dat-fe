const useValidArray = () => {
	const convertToValidArray = (data) => {
		return data.map((item) => {
			return {
				value: item.id,
				label: item.value,
			};
		});
	};
	return { convertToValidArray };
};

export default useValidArray;