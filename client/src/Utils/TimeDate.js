import { useEffect, useState, useRef } from "react";

export function getTime () {
  var event = new Date();
  var time = event.toLocaleString('en-US',{hour: 'numeric', minute: 'numeric', hour12: true});

  return time;
}

export function getDate () {
  var event = new Date();
  var date = '';
  date += event.toLocaleString('en-US',{weekday: 'short'}) + ', ';
  date += event.toLocaleString('en-US',{month: 'short', day: "numeric"});

  return date;
}

export function Timer(props) {
  var [time, setTime] = useState(getTime());
  const intervalIdRef = useRef(null);

  function setTimer() {
    var intervalId = setInterval(() => {
      time = getTime();
      setTime(time);
      // console.log(time);
    }, props.delay || 60000);
    return intervalId;
  }
  useEffect(() => {
    intervalIdRef.current = setTimer();
    return ()=>clearInterval(intervalIdRef.current);
  },[]);

  return time;
}