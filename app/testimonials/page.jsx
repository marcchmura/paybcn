'use client'
import { useEffect, useRef } from 'react';
const people = [
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl: "/testimonial1.mp4",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lindsay Walon",
    role: "Front-end Developer",
    imageUrl: "/testimonial1.mp4",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lindsay Won",
    role: "Front-end Developer",
    imageUrl: "/testimonial1.mp4",
    xUrl: "#",
    linkedinUrl: "#",
  },
  // More people...
];


export default function Example() {
  const videoRefs = useRef([]);

  useEffect(() => {
    const handlePlay = (index) => {
      videoRefs.current.forEach((video, i) => {
        if (i !== index && video && !video.paused) {
          video.pause();
        }
      });
    };

    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.addEventListener('play', () => handlePlay(index));
      }
    });

    // Cleanup event listeners on unmount
    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.removeEventListener('play', handlePlay);
        }
      });
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex items-start space-y-6 flex-col w-full sm:w-[800px]">
      <h3 className="text-xl font-medium">Trusted by thousands of shoppers worldwide</h3>
      <p className="text-sm/6">
        Paybcn is a cutting-edge platform designed to enable seamless cryptocurrency payments for e-commerce transactions.
      </p>
      <div>
        <ul role="list" className="mx-auto py-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {people.map((person, index) => (
            <li key={person.name} className="flex flex-col items-center p-4 rounded-2xl">
              <div className="relative w-full rounded-xl overflow-hidden">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={person.imageUrl}
                  controls
                  muted
                  {...(index === 0 && { autoPlay: true, loop: true })}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h3 className="mt-4">{person.name}</h3>
              <p className="text-base text-muted-foreground">{person.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
