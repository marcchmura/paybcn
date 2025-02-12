'use client'
import { useEffect, useRef } from 'react';
const people = [
  {
    name: "Lindsay Walton",
    role: "Front-end Deloper",
    imageUrl: "/testimonial1.mp4",
    xUrl: "#",
    linkedinUrl: "#",
  },
  // More people...
];

const testimonials = [
  {
    body: 'I’ve been looking for a way to spend my crypto without having to convert it into fiat, and Paybcn made it so easy. I just pasted a product link, chose my preferred crypto, and it was done. The process was smooth, and my order went through without any problems. Definitely going to use this again!',
    author: {
      name: 'Leslie Alexnder',
      handle: 'lesliealexander',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    body: 'As someone who prefers using crypto, Paybcn is a game changer. It allows me to shop online without worrying about conversion rates or extra fees. I’ve used it a couple of times now, and both purchases went smoothly. It’s a convenient and secure option for anyone looking to spend their crypto.',
    author: {
      name: 'Leslie Alander',
      handle: 'leslilexder',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    body: 'I was skeptical at first, but Paybcn really works. It’s a straightforward process—just paste the link of the item you want, pick your crypto, and pay. No fuss, no complications. I bought something with Ethereum, and it went through instantly. Super easy!',
    author: {
      name: 'Leslie Andr',
      handle: 'leslexander',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    body: 'I’m new to using crypto for purchases, and Paybcn made the whole process seamless. I was able to pay for a product using Bitcoin without any hassle. No need to convert to fiat, and everything went through quickly. Highly recommend for anyone who wants to use crypto for everyday shopping.',
    author: {
      name: 'slie Alexandr',
      handle: 'leslder',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    body: 'I don’t like using cards for online shopping, so I tried Paybcn to pay with Ethereum. The setup was super easy—just copy and paste the product link and pick your crypto. I was surprised by how fast the transaction went through. No extra fees or complicated steps. I’ll definitely be using it again.',
    author: {
      name: 'Leie Alexandr',
      handle: 'leslender',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    body: 'I’ve used Paybcn a few times now, and it’s always been reliable. I’ve bought products using Litecoin, and each time the process was fast and secure. It’s refreshing to see a crypto payment platform that actually works without hidden fees or delays. Great experience overall!',
    author: {
      name: 'Leslie Aldr',
      handle: 'lender',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More testimonials...
]

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
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex items-center space-y-4 flex-col w-full sm:w-[800px]">
      <h3 className="text-xl font-medium text-center">Don’t just take our word for it, listen to what our users have to say.</h3>
      <div>
        <ul role="list" className="mx-auto py-4 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:hidden">
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
            </li>
          ))}
        </ul>
      </div>

      <div className="sm:columns-2 sm:text-[0] lg:columns-2">
            {testimonials.map((testimonial) => (
              
              <div key={testimonial.author.handle} className="pt-8 sm:inline-block sm:w-full sm:px-4">

                <figure className="rounded-xl bg-muted p-8 text-sm/6 space-y-2">
                <div className="flex fill-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4">
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip={"evenodd"}
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4">
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip={"evenodd"}
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4">
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip={"evenodd"}
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4">
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip={"evenodd"}
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4">
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip={"evenodd"}
                />
              </svg>

      </div>
                  <blockquote className="">
                    <p>{`“${testimonial.body}”`}</p>
                  </blockquote>
                  
                </figure>
              </div>
            ))}
          </div>


    </div>
  );
}
