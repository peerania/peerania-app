import React from 'react';
import { Link } from 'react-router-dom';
import { LANDING_FONT } from 'style-constants';

import ChangeLocale from 'containers/ChangeLocale';

import logo from 'images/LogoBlack.svg';
import medium from 'images/medium.png';
import twitter from 'images/twitter.svg';
import linkedin from 'images/in.svg';
import github from 'images/github.svg';

import * as routes from 'routes-config';

import Gradient from './Gradient';

const Box = Gradient.extend`
  color: #282828;
  padding: 36px 0 26px 0;

  > div {
    .logo {
      img {
        width: 200px;
        margin-top: 5px;
      }

      .year {
        font-size: 16px;
        margin-bottom: 5px;
        text-align: center;
        letter-spacing: -0.6px;
        font-family: ${LANDING_FONT};
      }
    }

    .media-section {
      .locale {
        text-align: center;
      }

      .icons > * {
        flex: 1;
        text-align: center;
        cursor: pointer;
      }
    }
  }

  @media only screen and (max-width: 992px) {
    padding: 20px;
    .logo img {
      width: 160px !important;
    }

    .media-section {
      .locale {
        text-align: right !important;
      }

      .icons {
        display: none !important;
      }
    }
  }

  @media only screen and (max-width: 560px) {
    .logo img {
      width: 120px !important;
    }
  }
`;

const Year = new Date().getFullYear();

const Footer = () => (
  <Box position="bottom">
    <div className="container">
      <div className="row justify-content-between align-items-center">
        <div className="col-6 logo">
          <div className="row align-items-center">
            <Link to={routes.home()} href={routes.home()} className="col-5">
              <img src={logo} alt="logo" />
            </Link>
            <span className="col-lg-3 col-xl-2 d-none d-lg-inline year">
              © {Year}
            </span>
          </div>
        </div>
        <div className="col-6 col-lg-3 media-section">
          <div className="row align-items-center">
            <div className="col-12 col-lg-5 locale">
              <ChangeLocale />
            </div>
            <div className="col-7 d-none d-lg-flex align-items-center icons">
              <a href="https://twitter.com/peerania_com" target="_blank">
                <img src={twitter} alt="twitter" />
              </a>
              <a href="https://github.com/peerania" target="_blank">
                <img src={github} alt="github" />
              </a>
              <a
                href="https://www.linkedin.com/company/peeraniacom/about/"
                target="_blank"
              >
                <img src={linkedin} alt="linkedin" />
              </a>
              <a href="https://medium.com/peerania" target="_blank">
                <img src={medium} alt="medium" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Box>
);

export default Footer;
