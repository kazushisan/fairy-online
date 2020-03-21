export const generateId = (): number => {
	const len = 20
	// 生成する文字列に含める文字セット
	const char = '01234567889'

	const id = Array(len)
		.fill(null)
		.map(() => char[Math.floor(Math.random() * char.length)])
		.join('')
	return parseInt(id, 10)
}
