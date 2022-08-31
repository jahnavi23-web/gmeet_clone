export const Svg = {
  RightArrow: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
      className="side-arrow-svg"
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path>
    </svg>
  ),
  LeftArrow: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
      className="side-arrow-svg"
    >
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"></path>
    </svg>
  ),
  Apps: (
    <svg className="apps-svg" focusable="false" viewBox="0 0 24 24">
      <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
    </svg>
  ),
  CameraMute: (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="#000000"
      className="svg-mic"
    >
      <path d="M18 10.48V6c0-1.1-.9-2-2-2H6.83l2 2H16v7.17l2 2v-1.65l4 3.98v-11l-4 3.98zM16 16L6 6 4 4 2.81 2.81 1.39 4.22l.85.85C2.09 5.35 2 5.66 2 6v12c0 1.1.9 2 2 2h12c.34 0 .65-.09.93-.24l2.85 2.85 1.41-1.41L18 18l-2-2zM4 18V6.83L15.17 18H4z"></path>
    </svg>
  ),
  Camera: (
    <svg
      focusable="false"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="svg-mic"
    >
      <path d="M18 10.48V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.48l4 3.98v-11l-4 3.98zm-2-.79V18H4V6h12v3.69z"></path>
    </svg>
  ),
  MicMute: (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="#000000"
      className="svg-mic"
    >
      <path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"></path>
      <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"></path>
    </svg>
  ),
  Mic: (
    <svg
      focusable="false"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="svg-mic"
    >
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
    </svg>
  ),
  Speaker: (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="#000000"
      className="svg-mic"
    >
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
      <path d="M0 0h24v24H0z" fill="none"></path>
    </svg>
  ),
  SpeakerMute: (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="#000000"
      className="svg-mic"
    >
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
      <path d="M0 0h24v24H0z" fill="none"></path>
    </svg>
  ),
  Laptop: (
    <svg
      className="options-item-icon-svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
    >
      <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2M4 6h16v10H4V6zm.67 13H1v2h22v-2h-3.67"></path>
    </svg>
  ),
  Window: (
    <svg
      className="options-item-icon-svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      focusable="false"
    >
      <path d="M21 1H8c-1.1 0-2 .9-2 2v6H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2v-6h3c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-5 20H3v-8h13v8zm5-8h-3v-2c0-1.1-.9-2-2-2H8V5h13v8z"></path>
      <path d="M0 0h24v24H0z" fill="none"></path>
    </svg>
  ),
  Tab: (
    <svg
      className="options-item-icon-svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
    >
      <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z"></path>
    </svg>
  ),
};

export const Img = {
  MeetDemo: (
    <img
      src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
      alt=""
      className="right-info-img"
    ></img>
  ),
  BrandLogo: (
    <img className="header-brand-img" src="gmeet_logo48.png" alt=""></img>
  ),
  ProfileDp: <img src="dit32.jpg" className="header-accounts-img" alt=""></img>,
  SecurityShield: (
    <img
      className="security-sheild-icon"
      src="https://www.gstatic.com/meet/security_shield_with_background_2f8144e462c57b3e56354926e0cda615.svg"
      alt="Your meeting is safe"
      data-iml="7118.4000000003725"
    />
  ),
};

export const Icon = {
  Settings: <i className="material-icons custom">settings</i>,
  Feedback: <i className="material-icons custom">feedback</i>,
  Help: <i className="material-icons custom">help_outline</i>,
  VideoCall: <i className="material-icons material-video-icon">video_call</i>,
  Keyboard: <i className="material-icons-extended keyboard-icon">keyboard</i>,
  LockPerson: <i className="material-icons">lock_person</i>,
  Activities: <i className="material-icons-extended">themes</i>,
  Chat: <i className="material-icons">chat</i>,
  Members: <i className="material-icons">people</i>,
  Details: <i className="material-icons">info</i>,
  CallEnd: <i className="material-icons">call_end</i>,
  More: <i className="material-icons">more_vert</i>,
  Present: <i className="material-icons">present_to_all</i>,
  CC_On: <i className="material-icons">closed_caption</i>,
  CC_Off: <i className="material-icons">closed_caption_off</i>,
  Close: <i className="material-icons close-icon">close</i>,
  Send: <i className="material-icons close-icon">send</i>,
  AddPerson: <i className="material-icons  add-person-icon">person_add</i>,
  CopyText: <i className="material-icons copy-text-icon">content_copy</i>,
  Whiteboard: <i className="material-icons-extended ">whiteboard</i>,
  Dashboard_Layout: <i className="material-icons ">dashboard</i>,
  Fullscreen: <i className="material-icons ">fullscreen</i>,
  Auto_Awesome: <i className="material-icons ">auto_awesome</i>,
  Report: <i className="material-icons ">report</i>,
  Troubleshoot: <i className="material-icons ">troubleshoot</i>,
  Dropdown: <i className="material-icons-extended ">dropdown</i>,
  Link: <i className="material-icons-extended ">link</i>,
  Add: <i className="material-icons-extended ">add</i>,
  Calendar: <i className="material-icons-extended ">calendar_today</i>,
};
