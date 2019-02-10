import { Divider } from 'antd'
import * as React from 'react'
import { Link } from 'react-router-dom'

export class Home extends React.Component {
	public render() {
		const year = new Date().getFullYear()
		return (
			<div id="home">
				<div className="sub-area" />
				<div className="main-area">
					<header className="global-header">
						<div>
							<h3>筑波大学体育会</h3>
							<h1>フェアリースキークラブ</h1>
							<h5>Fairy Ski Club, University of Tsukuba</h5>
						</div>
					</header>
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
										またはfairy.info[at]gmail.comまで。
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
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d402.9517247871878!2d140.1049699035429!3d36.10290134063429!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60220bff99f57b0b%3A0xfdbd0d6cb2844aba!2z562R5rOi5aSn5a2mIOS9k-iCsuOCu-ODs-OCv-ODvA!5e0!3m2!1sja!2sjp!4v1549829721490"
						width="100%"
						height="450"
						style={{ border: 0, display: 'block', fontSize: 0 }}
					/>
					<footer className="global-footer">
						<div className="footer-contents">
							<div>
								<p>
									&copy; {year}{' '}
									筑波大学体育会フェアリースキークラブ
								</p>
								<p>
									<a href="https://www.tsukuba.ac.jp/">
										筑波大学トップページ
									</a>{' '}
									<Divider type="vertical" />
									<a href="https://www.stb.tsukuba.ac.jp/~taiikukai/">
										筑波大学体育会
									</a>
									<Divider type="vertical" />
									<Link to="/login">
										FOM: Fairy Online Manager
									</Link>
								</p>
							</div>
						</div>
					</footer>
				</div>
			</div>
		)
	}
}
