export function BottomBox() {
  return (
    <div className="chat-bottom-flex">
    
      <div className="bottom-info-flex">
        <span className="info-time-flex">
          <div className="info-time-area-flex">
            <span className="info-time-HM">3:25</span>
            <span className="info-time-AMPM">PM</span>
          </div>
          <div role="separator" className="separator "></div>
        </span>
        <div className="id-box">
          <div className="id-area">
            <div className="id-flex">
              <span className="id-span">
                <div className="id-text">ptp-mkbx-dig</div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-controls-flex">
        <div className="controls-grid">
          <div className="controls-mic">
            <div className="mic-box">
              <div className="mic-area">
                <span>
                  <button className="button-red mic-button-flex ">
                    <div className="mic-button-area"></div>
                    <div className="mic-button-icon">
                      <div className="">
                        <div className=""></div>
                        <span
                          className="mic-open-icon-span"
                          aria-hidden="true"
                        >
                          <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="#000000"
                            className="svg-mic"
                          >
                            <path
                              d="M0 0h24v24H0zm0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"></path>
                          </svg>
                        </span>
                        <span
                          className="mic-mute-icon-span"
                          aria-hidden="true"
                        >
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
                        </span>
                      </div>
                      <div className="speaker-icon-box">
                        <span
                          className="mic-open-icon-span"
                          aria-hidden="true"
                        >
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
                        </span>
                        <span
                          className="mic-open-icon-span"
                          aria-hidden="true"
                        >
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
                        </span>
                      </div>
                    </div>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="controls-camera">
            <div className="mic-box">
              <div className="mic-area">
                <span>
                  <button className="mic-button-flex ">
                    <div className="mic-button-area"></div>
                    <div className="mic-button-icon">
                      <div className="">
                        <div className=""></div>
                        <span
                          className="mic-open-icon-span"
                          aria-hidden="true"
                        >
                          <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="#000000"
                            className="svg-mic"
                          >
                            <path d="M18 10.48V6c0-1.1-.9-2-2-2H6.83l2 2H16v7.17l2 2v-1.65l4 3.98v-11l-4 3.98zM16 16L6 6 4 4 2.81 2.81 1.39 4.22l.85.85C2.09 5.35 2 5.66 2 6v12c0 1.1.9 2 2 2h12c.34 0 .65-.09.93-.24l2.85 2.85 1.41-1.41L18 18l-2-2zM4 18V6.83L15.17 18H4z"></path>
                          </svg>
                        </span>
                        <span
                          className="mic-mute-icon-span"
                          aria-hidden="true"
                        >
                          <svg
                            focusable="false"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="svg-mic"
                          >
                            <path d="M18 10.48V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.48l4 3.98v-11l-4 3.98zm-2-.79V18H4V6h12v3.69z"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="controls-cc">
            <div className="mic-box">
              <div className="mic-area">
                <span>
                  <button className="mic-button-flex button-grey">
                    <div className="mic-button-area"></div>
                    <div className="mic-button-icon">
                      <div className="">
                        <div className=""></div>
                        <span className="font-grey mic-open-icon-span material-icons-extended VfPpkd-Bz112c-kBDsod-OWXEXe-IT5dJd VfPpkd-Bz112c-kBDsod">
                          closed_caption
                        </span>
                        <span
                          aria-hidden="true"
                          className="dnd mic-open-icon-span material-icons-extended VfPpkd-Bz112c-kBDsod"
                        >
                          closed_caption_off
                        </span>
                      </div>
                    </div>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="controls-present">
            <div className="mic-box">
              <div className="mic-area">
                <span>
                  <button className="mic-button-flex ">
                    <div className="mic-button-area"></div>
                    <div className="mic-button-icon">
                      <div className="">
                        <div className=""></div>
                        <span className="mic-open-icon-span">
                          <i
                            className="google-material-icons"
                            aria-hidden="true"
                          >
                            present_to_all
                          </i>
                        </span>
                      </div>
                    </div>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="controls-options">
            <div className="mic-box">
              <div className="mic-area">
                <span>
                  <button className="mic-button-flex ">
                    <div className="mic-button-area"></div>
                    <div className="mic-button-icon">
                      <div className="">
                        <div className=""></div>
                        <span className="mic-open-icon-span">
                          <i
                            className="google-material-icons"
                            aria-hidden="true"
                          >
                            more_vert
                          </i>
                        </span>
                      </div>
                    </div>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="controls-end-call">
            <div className="mic-box">
              <div className="mic-area">
                <span>
                  <button className="button-stretch mic-button-flex button-red ">
                    <div className="mic-button-area"></div>
                    <div className="mic-button-icon">
                      <div className="">
                        <div className=""></div>
                        <span className="mic-open-icon-span">
                          <i
                            className="google-material-icons"
                            aria-hidden="true"
                          >
                            call_end
                          </i>
                        </span>
                      </div>
                    </div>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-settings-flex">
        <div className="settings-flex">
          <div className="settings-area-flex">
            <div className="setting-grid-flex">
              <div className="settings-details">
                <div className="mic-box">
                  <div className="mic-area">
                    <span>
                      <button className="bg-clear-mic-button-flex">
                        <div className="mic-button-area"></div>
                        <div className="mic-button-icon">
                          <div className="">
                            <div className=""></div>
                            <span className="mic-open-icon-span">
                              <i
                                className="google-material-icons"
                                aria-hidden="true"
                              >
                                info
                              </i>
                            </span>
                          </div>
                        </div>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="settings-members">
                <div className="mic-box">
                  <div className="mic-area">
                    <span>
                      <button className="bg-clear-mic-button-flex ">
                        <div className="mic-button-area"></div>
                        <div className="mic-button-icon">
                          <div className="">
                            <div className=""></div>
                            <span className="mic-open-icon-span">
                              <i
                                className="google-material-icons"
                                aria-hidden="true"
                              >
                                people
                              </i>
                            </span>
                          </div>
                        </div>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="settings-chat">
                <div className="mic-box">
                  <div className="mic-area">
                    <span>
                      <button className="bg-clear-mic-button-flex">
                        <div className="mic-button-area"></div>
                        <div className="mic-button-icon">
                          <div className="">
                            <div className=""></div>
                            <span className="mic-open-icon-span">
                              <i
                                className="google-material-icons"
                                aria-hidden="true"
                              >
                                chat
                              </i>
                            </span>
                          </div>
                        </div>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="settings-activities">
                <div className="mic-box">
                  <div className="mic-area">
                    <span>
                      <button className="bg-clear-mic-button-flex ">
                        <div className="mic-button-area"></div>
                        <div className="mic-button-icon">
                          <div className="">
                            <div className=""></div>
                            <span className="mic-open-icon-span">
                              <i
                                className="google-material-icons"
                                aria-hidden="true"
                              >
                                themes
                              </i>
                            </span>
                          </div>
                        </div>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="settings-admin">
                <div className="mic-box">
                  <div className="mic-area">
                    <span>
                      <button className="bg-clear-mic-button-flex ">
                        <div className="mic-button-area"></div>
                        <div className="mic-button-icon">
                          <div className="">
                            <div className=""></div>
                            <span className="mic-open-icon-span">
                              <i
                                className="google-material-icons"
                                aria-hidden="true"
                              >
                                lock_person
                              </i>
                            </span>
                          </div>
                        </div>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
