import React from 'react'
import Image from 'next/image'
import roamer from '../../images/roamer.png'
import Link from 'next/link'

export default function HomepageCard() {
  return (
    <div>
        <div className='justify-center p-10'> 
        <Image src={roamer} width={300} height={300} alt="roamer" className='rounded-lg object-cover'/>
        <div className='flex justify-center p-5'>
        <Link href='/'>About Roamer</Link>
        </div>

        </div>
    </div>
  )
}
