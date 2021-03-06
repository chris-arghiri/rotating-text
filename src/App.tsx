import { useState, useEffect, useRef } from 'react';
import './App.css';

import { gsap } from 'gsap';

type ReferenceSpanArray = HTMLSpanElement[] | any;

const App = ({
  words = ['react.', 'something.', 'notworking.', 'howdidido?']
}) => {
  const [count, setCount] = useState<number>(0);
  const [items, setItems] = useState<string | null>(
    words[count + words.length - 1]
  );
  let refs = useRef<ReferenceSpanArray>([]);

  useEffect(() => {
    let timeline = gsap.timeline();
    timeline.add(
      gsap.fromTo(
        refs.current,
        {
          opacity: 0,
          rotateX: '-90deg',
          translateZ: '25px',
          transformOrigin: '50% 50% 25px'
        },
        {
          opacity: 1,
          rotateX: '0deg',
          transition: 'transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          stagger: 0.1,
          duration: 0.2
        }
      )
    );
    timeline.addPause(refs.current.lastItem, gsap.delayedCall as any, [
      3,
      () => {
        timeline.play();
      }
    ]);
    timeline.add(
      gsap.fromTo(
        refs.current,
        {
          rotateX: '0deg',
          transition: 'transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        },
        {
          rotateX: '90deg',
          transition: 'transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
          stagger: 0.1,
          duration: 0.2
        }
      )
    );
    timeline.addPause(refs.current.lastItem, gsap.delayedCall as any, [
      0.5,
      () => {
        count < words.length - 1 ? setCount(count + 1) : setCount(0);
        setItems(words[count]);
        timeline.play();
      }
    ]);
    return () => {
      timeline.clear();
    };
  }, [refs, words, count]);

  return (
    <div className='.App'>
      {items?.split('').map((item, index) => {
        return (
          <span key={`span-${index}`} ref={(el) => (refs.current[index] = el)}>
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default App;
