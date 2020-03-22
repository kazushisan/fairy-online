import React from 'react'
import styled from 'styled-components'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Map } from '../components/Map'

import coverImage from '../assets/cover.jpg'

const Content = styled.div`
	padding: 64px 16px;
	max-width: 800px;
	margin: 0 auto;
`

const Cover = styled.div`
	background-image: url(${coverImage});
	background-size: cover;
	background-position: center;
	height: 400px;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const CoverTitle = styled.h1`
	font-weight: bold;
	color: #fff;
`

export function Home(): React.ReactElement<{}> {
	return (
		<>
			<Header title="筑波大学体育会フェアリースキークラブ" />
			<Cover>
				<CoverTitle>
					筑波大学体育会
					<br />
					フェアリースキークラブ
				</CoverTitle>
			</Cover>
			<Content>
				<p>
					筑波大学体育会に所属する基礎スキーサークルです。基礎スキーとは、スピードではなく滑りの美しさを競うスポーツです。学群生から院生まで、総勢30名近い規模です。
					普段の活動の平均参加人数は10～20名程度でしょうか...活動は基本週2です。スキーシーズン中は合宿があります。すべての合宿を合わせて1シーズン15日ほどです。
				</p>

				<h2>活動内容</h2>

				<p>
					夏季: インラインスケート（火曜、金曜）
					<br />
					冬季: スキー合宿（土日、長期休暇中）
					<br />
					ほかにも、夏旅行など楽しく活動しています！
				</p>

				<h2>連絡先</h2>

				<p>一年間を通して部員を募集しています！</p>
				<p>
					連絡は
					<a href="http://twitter.com/fairyskiclub">Twitter</a>
					またはfairy.event[at]gmail.comまで。
				</p>
				<p>部室は体育系サークル館2Fにあります。</p>

				<h2>お知らせ</h2>

				<p>
					新歓情報を含めて
					<a href="http://twitter.com/fairyskiclub">Twitter</a>
					でアップデートしています！
				</p>
			</Content>
			<Map />
			<Footer />
		</>
	)
}
