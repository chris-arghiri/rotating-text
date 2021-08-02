import React, { useState, useEffect, useRef } from 'react';
import './App.module.scss';

import { gsap } from 'gsap';

function App() {
  const reactArray = 'reactdsaf.'.split('');
  const swiftArray = 'Swift'.split('');
  const [items, setItems] = useState(reactArray);
  const [count, setCount] = useState(0);
  const [play, setPlay] = useState(false);

  // setInterval(
  //   () => {
  //     setItems(reactArray);
  //     setCount(count + 1);
  //     if (count === 1) {
  //       setCount(0);
  //       setItems(swiftArray);
  //     }
  //   },
  //   play ? 6000 : null
  // );

  const ref = useRef([]);

  useEffect(() => {
    ref.current = ref.current.slice(0, reactArray.length);
    // const timer = setTimeout(() => {
    //   setItems(swiftArray);
    //   setPlay(true);
    // }, 4000);
    setInterval(() => {
      setItems(reactArray);
    }, 4000);
    // return () => clearTimeout(timer);
    // let timeline = gsap.timeline();
    // timeline
    //   .add(gsap.set(ref.current, { opacity: 1 }))
    //   .add(
    //     gsap.fromTo(
    //       ref.current,
    //       { opacity: 0, rotateX: '-90deg' },
    //       { opacity: 1, rotateX: '0deg', transition: '', duration: 4 }
    //     )
    //   );
    // .add(
    //   gsap.to(ref.current, {
    //     opacity: 1,
    //     rotateX: '0deg',
    //     transition: 'transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    //   })
    // );
  }, [reactArray, swiftArray]);

  return (
    <div className='.App'>
      {reactArray.map((item, index) => {
        return (
          <span key={`span-${index}`} ref={(el) => (ref.current[index] = el)}>
            {item}
          </span>
        );
      })}
    </div>
  );
}

export default App;
