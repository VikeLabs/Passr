export const handleErrors = (response: Response) => {
	if (!response.ok) {
		throw Error('fetch unsuccessful');
	}
	return response;
};
