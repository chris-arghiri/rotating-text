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

  const refs = useRef([]);

  useEffect(() => {
    let timeline = gsap.timeline({ repeat: -1 });
    refs.current = refs.current.slice(0, reactArray.length);
    refs.current.map((ref) => {
      return timeline.add(
        gsap.fromTo(
          ref,
          {
            opacity: 0,
            rotateX: '-90deg',
            translateZ: '25px',
            transformOrigin: '50% 50% 25px'
          },
          {
            opacity: 1,
            rotateX: '0deg',
            transition:
              'transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            duration: 0.1
          }
        )
      );
    });
    timeline.addPause(refs.current.lastItem, gsap.delayedCall, [
      2.5,
      () => timeline.play()
    ]);
    refs.current.map((ref) => {
      return timeline.add(
        gsap.fromTo(
          ref,
          {
            opacity: 1,
            rotateX: '0deg',
            transition:
              'transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          },
          {
            rotateX: '90deg',
            transition:
              'transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
            duration: 0.1
          }
        )
      );
    });
    timeline.addPause(refs.current.lastItem, gsap.delayedCall, [
      1.5,
      () => timeline.play()
    ]);
    // const timer = setTimeout(() => {
    //   setItems(swiftArray);
    //   setPlay(true);
    // }, 4000);
    // setInterval(() => {
    //   setItems(reactArray);
    // }, 4000);
    // return () => clearTimeout(timer);
  }, [reactArray, swiftArray, refs]);

  return (
    <div className='.App'>
      {reactArray.map((item, index) => {
        return (
          <span key={`span-${index}`} ref={(el) => (refs.current[index] = el)}>
            {item}
          </span>
        );
      })}
    </div>
  );
}

export default App;
