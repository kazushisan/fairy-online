import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Map } from '../components/Map'

export function Home(): React.ReactElement<{}> {
	return (
		<div id="home">
			<Header title="筑波大学体育会フェアリースキークラブ" />
			<div className="main-area">
				<div className="main">
					<section id="about">
						<div>
							<header>
								<h2>フェアリースキークラブについて</h2>
							</header>
							<div className="content">
								<p>
									筑波大学体育会に所属する基礎スキーサークルです。基礎スキーとは、スピードではなく滑りの美しさを競うスポーツです。学群生から院生まで、総勢30名近い規模です。
									普段の活動の平均参加人数は10～20名程度でしょうか...活動は基本週2です。スキーシーズン中は合宿があります。すべての合宿を合わせて1シーズン15日ほどです。
								</p>
							</div>
						</div>
					</section>
					<section id="activity">
						<div>
							<header>
								<h2>活動内容</h2>
							</header>
							<div className="content">
								<p>
									夏季: インラインスケート（火曜、金曜）
									<br />
									冬季: スキー合宿（土日、長期休暇中）
									<br />
									ほかにも、夏旅行など楽しく活動しています！
								</p>
							</div>
						</div>
					</section>
					<section id="contact">
						<div>
							<header>
								<h2>連絡先</h2>
							</header>
							<div className="content">
								<p>一年間を通して部員を募集しています！</p>
								<p>
									連絡は
									<a href="http://twitter.com/fairyskiclub">
										Twitter
									</a>
									またはfairy.event[at]gmail.comまで。
								</p>
								<p>部室は体育系サークル館2Fにあります。</p>
							</div>
						</div>
					</section>
					<section id="contact">
						<div>
							<header>
								<h2>お知らせ</h2>
							</header>
							<div className="content">
								<p>
									新歓情報を含めて
									<a href="http://twitter.com/fairyskiclub">
										Twitter
									</a>
									でアップデートしています！
								</p>
							</div>
						</div>
					</section>
				</div>
				<Map />
				<Footer />
			</div>
		</div>
	)
}
