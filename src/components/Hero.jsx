'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'

export default function HeroSection() {
  return (
    <section className="flex items-center justify-center h-screen bg-gradient-to-b from-[#007373] via-[#004D4D] to-[#1C1C1C] text-center">
      <div className="space-y-6 text-[#E0E0E0]">
        <h1 className="text-4xl md:text-5xl font-bold transition-transform duration-300 hover:scale-105">
          Welcome to StudySphere
        </h1>
        <p className="text-lg md:text-xl font-medium text-[#E0E0E0]">
          Discover and Connect with Study Rooms
        </p>
        <div className="space-x-4">
          <a
            href="#"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-[#008080] rounded-md shadow-lg transition-transform duration-300 hover:bg-[#006666] transform hover:scale-105"
          >
            Get Started
          </a>
          <a
            href="#"
            className="inline-block px-6 py-3 text-lg font-semibold text-[#008080] bg-[#E0E0E0] rounded-md shadow-lg transition-transform duration-300 hover:bg-[#004D4D] hover:text-[#E0E0E0] transform hover:scale-105"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
