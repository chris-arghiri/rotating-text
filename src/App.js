import React, { useState, useEffect, useRef } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import './App.module.scss';

import { gsap } from 'gsap';

function App() {
  let words = ['reactdsaf.', 'somet4124124hing', '123'];
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(words[count]);
  const refs = useRef([]);

  useEffect(() => {
    let timeline = gsap.timeline({ repeat: 1 });
    refs.current = refs.current.slice(0, items.split('').length);
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
      2,
      () => {
        if (count < words.length - 1) {
          setCount(count + 1);
          console.log(count);
          setItems(words[count]);
        } else {
          setCount(0);
          setItems(words[count]);
        }
        // console.log(count);
        // console.log(words[count]);
        timeline.play();
      }
    ]);
    // timeline.clear(true);
  }, [refs, items, words, count]);

  return (
    <div className='.App'>
      {items.split('').map((item, index) => {
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
