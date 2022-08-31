import { Link } from "react-router-dom";
import { Timer, getDate } from "../Utils/TimeDate";
import { Svg, Img, Icon } from "../res/svg/Svg";

import {
  helpIntro,
  feedbackIntro,
  settingsIntro,
  appsIntro,
  accountDetailsIntro,
} from "../meet/meet";

import LeftArrowButton from "./Intro/LeftArrowButton";
import RightArrowButton from "./Intro/RightArrowButton";
import BodyLeftIntro from "./BodyLeftIntro";

export function Intro() {
  return (
    <div className="Intro">
      {HeaderIntro()}

      <div className="body-box">
        <div className="body-flex">
          <BodyLeftIntro />
          {BodyRightIntro()}
        </div>
      </div>
    </div>
  );

  function BodyRightIntro() {
    return (
      <div className="body-right-flex">
        <div>
          <div className="body-right-margin">
            <div>
              <div>
                <div className="body-right-box">
                  <div className="body-right-top-flex">
                    <LeftArrowButton />
                    <div className="body-right-info">
                      <div className="body-right-info-box">
                        {Img.MeetDemo}
                        <div>
                          <div className="right-info-big">
                            Get a link you can share
                          </div>
                          <div className="right-info-normal">
                            Click&nbsp;
                            <strong>New meeting</strong>&nbsp; to get a link you
                            can send to people you want to meet with
                          </div>
                        </div>
                      </div>
                    </div>
                    <RightArrowButton />
                  </div>
                  <div className="body-right-bottom-box">
                    <div className="body-right-bottom-image-status"></div>
                    <div className="body-right-bottom-image-status"></div>
                    <div className="body-right-bottom-image-status"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function HeaderIntro() {
    return (
      <div className="div-of-header">
        <header className="header">
          <div className="div-header-flex">
            {BrandLogoName()}
            <div className="header-info-settings">
              <div className="header-info">
                {InfoBoxTime()}
                {InfoBoxSettings()}
              </div>
              {/* <div className="header-settings"></div> */}
            </div>
            <div className="header-accounts-flex">
              <div className="header-accounts-box">
                {InfoAccountApps()}
                {InfoAccountDetails()}
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }

  function BrandLogoName() {
    return (
      <div className="header-brand">
        <div className="header-brand-flex">
          <div className="header-brand-box">
            <Link to="/">
              <div className="header-brand-box-link">
                {Img.BrandLogo}
                &nbsp;
                <span className="header-brand-text bold">Gogole</span>
                &nbsp;
                <span className="header-brand-text">Meet</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function InfoAccountDetails() {
    const handleClick = (e) => {
      e.preventDefault();
      accountDetailsIntro();
    };
    return (
      <div className="header-accounts-details">
        <div className="header-accounts-box">
          <button className="account-button" onClick={handleClick}>
            {/* <div className="icon-box"> */}
            {Img.ProfileDp}
            {/* </div> */}
          </button>
        </div>
      </div>
    );
  }

  function InfoAccountApps() {
    const handleClick = (e) => {
      e.preventDefault();
      appsIntro();
    };
    return (
      <div className="header-accounts-apps">
        <div className="apps-box">
          <div className="apps-area">
            <button className="icon-button" onClick={handleClick}>
              {Svg.Apps}
            </button>
          </div>
        </div>
      </div>
    );
  }

  function InfoBoxSettings() {
    return (
      <div className="info-settings">
        <div className="info-settings-flex">
          {/* {HelpButton()} */}
          {/* {FeedbackButton()} */}
          {InfoButton({ handleClick: helpIntro, icon: Icon.Help })}
          {InfoButton({ handleClick: feedbackIntro, icon: Icon.Feedback })}
          {InfoButton({ handleClick: settingsIntro, icon: Icon.Settings })}
        </div>
      </div>
    );

    function InfoButton(props) {
      const handleClick = (e) => {
        e.preventDefault();
        props.handleClick();
      };

      return (
        <div>
          <div className="settings-icon">
            <div>
              <span>
                <button className="settings-icon-button" onClick={handleClick}>
                  <div className="icon-box"></div>
                  {props.icon}
                </button>
              </span>
            </div>
          </div>
        </div>
      );
    }
  }

  function InfoBoxTime() {
    var date = getDate();

    return (
      <div className="info-box">
        <span className="info-time">
          <Timer delay={1000} />
        </span>
        <span className="info-gap"> • </span>
        <span className="info-date">{date}</span>
      </div>
    );
  }
}
