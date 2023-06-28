'use client'
import React from 'react'
import styles from './layout.module.css'
import Link from 'next/link'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid lg:grid-cols-2 h-screen w-full'>
      {/* left */}
      <div className='m-auto lg:m-0 flex-1 bg-white lg:p-8 flex flex-col lg:justify-between'>
        <Link href={'/'} className={`${styles.logo} hidden lg:flex relative text-[#0f1826] text-xl font-bold`}>
          Untitled UI
        </Link>
        <div className='lg:hidden flex mx-auto w-[200px] h-[140px] items-center justify-center overflow-hidden'>
          <div className={`${styles.gradation} ${styles.gradationSm} w-[60px] h-[60px]`}></div>
        </div>
        {children}
        <a href='https://github.com/jiatln/authapp' target='_blank' className='text-[#6a6f79] hidden lg:flex w-fit'>
          &copy; Untitled UI 2077
        </a>
      </div>
      {/* right */}
      <div className='hidden lg:flex flex-1 bg-[#f3f4f8] items-center justify-center overflow-hidden'>
        <div className={`${styles.gradation} w-[220px] h-[220px]`}></div>
      </div>
    </div>
  )
}

export default Layout
