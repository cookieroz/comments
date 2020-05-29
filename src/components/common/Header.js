import React, { Component } from 'react';
import logo from '../../images/logo.png';
import './Header.sass';

export class Header extends Component {
	render() {
		const navLinks = [
			{href: 'https://www.instastalker2.com/media/B_FA67RpOnj', title:'Close Up'},
			{href: 'https://instagram.fmia1-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/94976187_1039868146407837_2384658889210092301_n.jpg?_nc_ht=instagram.fmia1-2.fna.fbcdn.net&_nc_cat=109&_nc_ohc=kZUmuPhsV-AAX_sDK_0&oh=cdee0430c607aa649189e3537ad49934&oe=5EF5441E', title:'Office'},
			{href: 'https://www.instagram.com/bombomgordo/', title:'Gram'}
		];
		return (
			<header className="header">
				<div className="header__logo">
					<img src={logo} alt="persian cat cartoon logo" />
				</div>
				<nav className="header__nav">
					<ul className="header__ul">
						{navLinks.map(({ href, title}, index) => (
							<li key={index} className="header__li">
								<a className="header__link" href={href} title={title}>{title}</a>
							</li>
						))}
					</ul>
				</nav>
			</header>
		);
	}
}

export default Header;