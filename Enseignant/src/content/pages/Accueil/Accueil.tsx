import React from 'react'
import './css/flex-slider.css';
import './css/owl.css';
import './css/templatemo-finance-business.css';
import '../Clients/style.css';


function Accueil() {
  return (
    <div style={{ marginLeft: '20px' }}>
      <header className="">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand" href="index.html">
              <h2>
                {' '}
                Bienvenue M.{localStorage.getItem('prenom')}{' '}
                {localStorage.getItem('nom')}
              </h2>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto"></ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="main-banner header-text" id="top">
        <div className="Modern-Slider">
          <div className="item item-1">
            <div className="img-fill">
              <div className="text-content">
                {/* <h6>we are ready to help you</h6> */}
                <h6>Nous sommes prêts à vous aider</h6>

                {/* <h4>
                  Voici mon projet de
                  <br />
                  PFA */}
                  {/* &amp; Consulting */}
                {/* </h4> */}
                <p style ={{ marginTop:"50px"}}>
                  Voici mon projet de
                  PFA dont la quelle le <br />
                  sujet est la création 
                   d'un site web pour la gestion des
                  classes.{' '}
                  {/* <a href="one-page.html">One-page version</a> is available as
                  of 2021 February. */}
                </p>
                {/* <a href="contact.html" className="filled-button">
                  contact us
                </a> */}
              </div>
            </div>
          </div>

          {/* <div className="item item-2">
            <div className="img-fill">
                <div className="text-content">
                  <h6>we are here to support you</h6>
                  <h4>Accounting<br/>&amp; Management</h4>
                  <p>You are allowed to use this template for your company websites. You are NOT allowed to re-distribute this template ZIP file on any template download website. Please contact TemplateMo for more detail.</p>
                  <a href="services.html" className="filled-button">our services</a>
                </div>
            </div>
          </div> */}

          {/* <div className="item item-3">
            <div className="img-fill">
                <div className="text-content">
                  <h6>we have a solid background</h6>
                  <h4>Market Analysis<br/>&amp; Statistics</h4>
                  <p>You can download, edit and use this layout for your business website. Phasellus lacinia ac sapien vitae dapibus. Mauris ut dapibus velit cras interdum nisl ac urna tempor mollis.</p>
                  <a href="about.html" className="filled-button">learn more</a>
                </div>
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}

export default Accueil
