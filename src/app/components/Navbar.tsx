import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className=''>
    <div className='flex justify-between px-10 text-sm py-5 bg-neutral-100'>
        <div  className='flex gap-5 items-center'>
        <Link href="/">02</Link>
        <Link href='/'>Roamer</Link>
        </div>
        <div className='flex gap-5 items-center'>
            <Link href='/'>About</Link>
            <Link href='/contact'>Contact</Link>
        </div>
    </div>
    </div>
  )
}
