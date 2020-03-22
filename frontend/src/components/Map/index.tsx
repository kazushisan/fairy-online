import React from 'react'

const style = {
	border: 0,
	display: 'block',
	fontSize: 0,
	filter: 'grayscale(100%)',
}

export function Map(): React.ReactElement<{}> {
	return (
		<iframe
			src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d402.9517247871878!2d140.1049699035429!3d36.10290134063429!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60220bff99f57b0b%3A0xfdbd0d6cb2844aba!2z562R5rOi5aSn5a2mIOS9k-iCsuOCu-ODs-OCv-ODvA!5e0!3m2!1sja!2sjp!4v1549829721490"
			width="100%"
			height="400"
			style={style}
		/>
	)
}
