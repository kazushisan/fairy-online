export const generateId = (): string => {
	const len = 20
	// 生成する文字列に含める文字セット
	const char = 'abcdefghijklmnopqrstuvwxyz0123456789'

	return new Array(len)
		.fill(null)
		.map(() => char[Math.floor(Math.random() * char.length)])
		.join('')
}
