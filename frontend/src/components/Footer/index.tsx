import React from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'

const Container = styled.footer`
	position: relative;
	background-color: #fafafa;
	padding: 48px 16px;

	@media screen and (min-width: 800px) {
		display: flex;
	}
`

const CopyrightNotice = styled.div`
	flex: 1 0 0;
`

const Links = styled.div`
	flex: 0 0 auto;
`

const year = new Date().getFullYear()

export function Footer(): React.ReactElement<{}> {
	return (
		<Container>
			<CopyrightNotice>
				<p>&copy; {year} 筑波大学体育会フェアリースキークラブ</p>
			</CopyrightNotice>
			<Links>
				<a href="https://www.tsukuba.ac.jp/">筑波大学トップページ</a>
				<Divider type="vertical" />
				<a href="https://www.stb.tsukuba.ac.jp/~taiikukai/">
					筑波大学体育会
				</a>
			</Links>
		</Container>
	)
}
