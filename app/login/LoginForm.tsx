'use client'
import React, { useState } from 'react'
import styles from './loginPage.module.css'
import Link from 'next/link'
import { Icon } from '@iconify/react';
import googleIcon from '@iconify/icons-flat-color-icons/google';
import outlineAlternateEmail from '@iconify/icons-ic/outline-alternate-email';
import interfaceIdThumbMarkIdentificationPasswordTouchIdSecureFingerprintFingerSecurity from '@iconify/icons-streamline/interface-id-thumb-mark-identification-password-touch-id-secure-fingerprint-finger-security';

const LoginForm = () => {

  const [showPsw, setShowPsw] = useState(false)

  return (
    <div className='mx-auto flex flex-col gap-2 lg:gap-6 lg:w-3/4 max-w-[460px]'>
      <h1 className='text-3xl text-center lg:text-left lg:text-5xl font-semibold'>Welcome back</h1>
      <p className='text-sm text-center mb-6 lg:mb-0 lg:text-left text-[#6a6f79] lg:text-xl'>
        Welcome back! Please enter your details.
      </p>
      <form className='flex flex-col gap-6 lg:gap-8 min-w-[360px]'>
        <div className='flex flex-col gap-2 lg:gap-3'>
          <label className={styles.label} htmlFor="email">Email</label>
          <div className='relative'>
            <input className={styles.input} autoComplete={'new-password'} type="email" placeholder='Enter your email' />
            <Icon icon={outlineAlternateEmail} className='absolute right-4 top-[50%] translate-y-[-50%] text-[#d7d8db]' inline width={24} height={24} />
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <label className={styles.label} htmlFor="password">Password</label>
          <div className='relative'>
            <input className={`${styles.input}`} autoComplete={'new-password'} type={`${showPsw ? 'text' : 'password'}`} placeholder='Enter your password' />
            <Icon onClick={() => setShowPsw(!showPsw)} icon={interfaceIdThumbMarkIdentificationPasswordTouchIdSecureFingerprintFingerSecurity} className='absolute right-4 top-[50%] translate-y-[-50%] text-[#d7d8db] hover:text-[#8c67de] cursor-pointer' inline width={24} height={24} />
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-1 lg:gap-2'>
            <input className='lg:w-[18px] lg:h-[18px] cursor-pointer' type="checkbox" name="remember" id="remember" />
            <label className='text-[#616673] text-sm lg:text-lg cursor-pointer' htmlFor="remember">Remember for 30 days</label>
          </div>
          <Link href={'/forgot'} className='text-[#8c67de] lg:text-lg font-semibold'>Forgot password</Link>
        </div>
        {/* buttons */}
        <div className='flex flex-col gap-4 lg:gap-6'>
          <button type='submit' className='bg-[#8c67de] w-full h-[48px] lg:h-[56px] rounded-lg shadow text-white text-lg hover:opacity-80'>Sign in</button>
          <button className='w-full h-[48px] lg:h-[56px] rounded-lg shadow text-[#616673] border border-[#d7d8db] text-lg flex items-center gap-2 justify-center hover:opacity-80'>
            <Icon icon={googleIcon} inline width={28} height={28} />
            <span>Sign in with Google</span>
          </button>
        </div>
        {/* footer */}
        <p className='text-center flex items-center gap-2 self-center'>
          <span className='text-[#616673] text-sm lg:text-base'>Don&#39;t have an account?</span>
          <Link href={'/register'} className='text-[#8c67de] lg:text-lg font-semibold'>Sign up</Link></p>
      </form>
    </div>
  )
}

export default LoginForm
