export const generateHeader = (jwt: string) => {
	return {
		headers: { Authorization: `Bearer ${jwt}` },
	}
}
