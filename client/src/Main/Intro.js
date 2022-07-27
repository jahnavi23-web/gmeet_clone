export function Intro() {
  return (
    <div className="Intro">
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

      <div className="body-box">
        <div className="body-flex">
          <div className="body-left-flex">
            <div className="left-heading">
              Premium video meetings. Now free for everyone.
            </div>
            <div className="left-text">
              We re-engineered the service we built for secure business
              meetings, Google Meet, to make it free and available for all.
            </div>
            <div className="left-meeting-box">
              <div className="left-meeting-box-flex">
                {NewMeetingButton()}
                {JoinMeetingInput()}
                {JoinButton()}
              </div>
            </div>
            <div className="left-gap-line"></div>
            <div className="left-bottom-more">
              <span
                className="left-bottom-more-span"
                jscontroller="flbTs"
                jsaction="click:ndJ4N"
                data-url="https://meet.google.com/about/redirect/landing-learn-more/?hl=en"
                data-impression="6565"
              >
                <a
                  href="https://meet.google.com/about/redirect/landing-learn-more/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="left-bottom-link"
                >
                  Learn more
                </a>{" "}
                about Google Meet
              </span>
            </div>
          </div>
          <div className="body-right-flex">
            <div>
              <div className="body-right-margin">
                <div>
                  <div>
                    <div className="body-right-box">
                      <div className="body-right-top-flex">
                        {LeftArrowButton()}
                        <div className="body-right-info">
                          <div className="body-right-info-box">
                            <img
                              src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
                              alt=""
                              className="right-info-img"
                            ></img>
                            <div>
                              <div className="right-info-big">
                                Get a link you can share
                              </div>
                              <div className="right-info-normal">
                                Click&nbsp;
                                <strong>New meeting</strong>&nbsp; to get a link
                                you can send to people you want to meet with
                              </div>
                            </div>
                          </div>
                        </div>
                        {RightArrowButton()}
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
        </div>
      </div>
    </div>
  );

  function JoinMeetingInput() {
    return (
      <div className="join-meeting-flex">
        <div className="join-meeting-box-flex">
          <label className="join-meeting-label-flex">
            <span className="join-meeting-label-span-flex">
              <span className="label-span-first-margin"></span>
              <span className="label-span-second-margin"></span>
            </span>
            <i className="material-icons-extended keyboard-icon">keyboard</i>
            <input
              type="text"
              className="join-input-text-flex"
              placeholder="Enter a code or link"
            ></input>
          </label>
          <div className="join-meeting-padding-bottom">
            <p className="join-meeting-padding-bottom-dummy"></p>
          </div>
        </div>
      </div>
    );
  }

  function BrandLogoName() {
    return (
      <div className="header-brand">
        <div className="header-brand-flex">
          <div className="header-brand-box">
            <a className="header-brand-box-link" href="index.html">
              <img
                className="header-brand-img"
                src="gmeet_logo48.png"
                alt=""
              ></img>
              &nbsp;
              <span className="header-brand-text bold">Gogole</span>
              &nbsp;
              <span className="header-brand-text">Meet</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  function InfoAccountDetails() {
    const handleClick = (e) => {
      e.preventDefault();
      console.log("Right Arrow - button clicked");
    };
    return (
      <div className="header-accounts-details">
        <div className="header-accounts-box">
          <button className="icon-button" onClick={handleClick}>
            <img src="dit32.jpg" className="header-accounts-img" alt=""></img>
          </button>
        </div>
      </div>
    );
  }

  function InfoAccountApps() {
    const svgApps = (
      <svg className="apps-svg" focusable="false" viewBox="0 0 24 24">
        <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
      </svg>
    );

    const handleClick = (e) => {
      e.preventDefault();
      console.log("Right Arrow - button clicked");
    };
    return (
      <div className="header-accounts-apps">
        <div className="apps-box">
          <div className="apps-area">
            <button className="icon-button" onClick={handleClick}>
              {svgApps}
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
          {HelpButton()}
          {FeedbackButton()}
          {SettingsButton()}
        </div>
      </div>
    );

    function SettingsButton() {
      const handleClick = (e) => {
        e.preventDefault();
        console.log("Settings - button clicked");
      };

      return (
        <div>
          <div className="settings-icon">
            <div>
              <span>
                <button className="settings-icon-button" onClick={handleClick}>
                  <div className="icon-box"></div>
                  <i className="material-icons custom">settings</i>
                </button>
              </span>
            </div>
          </div>
        </div>
      );
    }

    function FeedbackButton() {
      const handleClick = (e) => {
        e.preventDefault();
        console.log("Feedback - button clicked");
      };

      return (
        <div>
          <div className="settings-icon">
            <div>
              <span>
                <button className="settings-icon-button" onClick={handleClick}>
                  <div className="icon-box"></div>
                  <i className="material-icons custom">feedback</i>
                </button>
              </span>
            </div>
          </div>
        </div>
      );
    }

    function HelpButton() {
      const handleClick = (e) => {
        e.preventDefault();
        console.log("Help ? - button clicked");
      };

      return (
        <div>
          <div className="settings-icon">
            <div>
              <span>
                <button className="settings-icon-button" onClick={handleClick}>
                  <div className="icon-box"></div>
                  <i className="material-icons custom">help_outline</i>
                </button>
              </span>
            </div>
          </div>
        </div>
      );
    }
  }

  function InfoBoxTime() {
    return (
      <div className="info-box">
        <span className="info-time">10:57 PM</span>
        <span className="info-gap"> • </span>
        <span className="info-date">Sun, Jul 24</span>
      </div>
    );
  }

  function RightArrowButton() {
    const handleClick = (e) => {
      e.preventDefault();
      console.log("Right Arrow - button clicked");
    };

    const svgRightArrow = (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        focusable="false"
        className="side-arrow-svg"
      >
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path>
      </svg>
    );
    return (
      <button className="side-button" onClick={handleClick}>
        <div className="side-button-overlay"></div>
        {svgRightArrow}
      </button>
    );
  }

  function LeftArrowButton() {
    const handleClick = (e) => {
      e.preventDefault();
      console.log("Left Arrow - button clicked");
    };

    const svgLeftArrow = (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        focusable="false"
        className="side-arrow-svg"
      >
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"></path>
      </svg>
    );
    return (
      <button className="side-button" onClick={handleClick}>
        <div className="side-button-overlay"></div>
        {svgLeftArrow}
      </button>
    );
  }

  function JoinButton() {
    const handleClick = (e) => {
      e.preventDefault();
      console.log("Join - button clicked");
    };

    return (
      <div className="join-button-area">
        <button className="join-button-flex" onClick={handleClick}>
          <div className="join-button-overlay"></div>
          <div className="join-button-cover"></div>
          <span className="join-button-text">Join</span>
        </button>
      </div>
    );
  }

  function NewMeetingButton() {
    const handleClick = (e) => {
      e.preventDefault();
      console.log("New meeting - button clicked");
    };

    return (
      <div className="new-meeting-box">
        <div className="new-meeting-container">
          <div className="new-meeting-area">
            <button className="new-meeting-button-flex" onClick={handleClick}>
              <div className="meeting-button-box"></div>
              <div className="meeting-button-overlay"></div>
              <i className="material-icons material-video-icon">video_call</i>
              &nbsp;
              <span className="video-button-text">New meeting</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
