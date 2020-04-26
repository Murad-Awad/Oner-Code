import React from 'react';

export default class Header extends React.Component {
	render() {
		return (
	<div>
 	<div data-collapse="medium" data-animation="default" data-duration={400} className="navbar w-nav">
        <div className="w-container">
          <a href="#" className="brand w-nav-brand">
            <div className="text-block">oner</div>
          </a>
          <nav role="navigation" className="w-nav-menu"><a href="#" className="nav-link w-nav-link">Home</a><a href="#" className="nav-link-2 w-nav-link">Settings</a><a href="#" className="nav-link-3 w-nav-link">Help</a></nav>
          <div className="w-nav-button">
            <div className="w-icon-nav-menu" />
          </div>
        </div>
      </div>
   <div className="section"><img src="../../../static/images/Group-91.png" width={75} height={75} alt="" className="image-5" />
        <div className="w-layout-grid grid">
          <div id="w-node-859e0021fe8b-a910f699" className="div-block">
            <div className="w-layout-grid grid-11">
              <div className="text-block-4">Welcome back, <br />Amari</div>
              <div className="text-block-5">$3468</div>
              <div className="text-block-6">Your estimated closet worth</div>
            </div>
          </div>
          <div className="div-block-2" />
          <div className="div-block-3" />
        </div>
      </div>
    </div>
		);
	}
}