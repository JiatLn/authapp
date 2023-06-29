'use client'
import Layout from '@/components/Layout'
import Link from 'next/link'
import styles from './registerPage.module.css'
import React, { useState } from 'react'
import userIcon from '@iconify/icons-bx/user';
import outlineAlternateEmail from '@iconify/icons-ic/outline-alternate-email';
import interfaceIdThumbMarkIdentificationPasswordTouchIdSecureFingerprintFingerSecurity from '@iconify/icons-streamline/interface-id-thumb-mark-identification-password-touch-id-secure-fingerprint-finger-security';
import { Icon } from '@iconify/react'

const RegisterPage = () => {
  const [showPsw, setShowPsw] = useState({
    psw: false,
    cPsw: false
  })

  return (
    <Layout>
      <div className='mx-auto py-4 flex flex-col gap-2 lg:gap-6 lg:w-3/4 max-w-[460px]'>
        <h1 className='text-3xl text-center lg:text-4xl font-semibold'>Sign up</h1>
        <p className='text-sm text-center mb-4 lg:mb-0 text-[#6a6f79] lg:text-xl'>
          You are welcome! Please enter your details.
        </p>
        <form className='flex flex-col gap-6 px-2 lg:gap-8 min-w-[360px]'>
          <div className='flex flex-col gap-2'>
            <label className={styles.label} htmlFor="username">Username</label>
            <div className='relative'>
              <input className={styles.input} type="text" placeholder='Enter your name' />
              <Icon icon={userIcon} className='absolute right-4 top-[50%] translate-y-[-50%] text-[#d7d8db]' inline width={24} height={24} />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className={styles.label} htmlFor="email">Email</label>
            <div className='relative'>
              <input className={styles.input} type="email" placeholder='Enter your email' />
              <Icon icon={outlineAlternateEmail} className='absolute right-4 top-[50%] translate-y-[-50%] text-[#d7d8db]' inline width={24} height={24} />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className={styles.label} htmlFor="password">Password</label>
            <div className='relative'>
              <input className={`${styles.input}`} type={`${showPsw.psw ? 'text' : 'password'}`} placeholder='Enter your password' />
              <Icon onClick={() => setShowPsw({
                ...showPsw,
                psw: !showPsw.psw
              })} icon={interfaceIdThumbMarkIdentificationPasswordTouchIdSecureFingerprintFingerSecurity} className='absolute right-4 top-[50%] translate-y-[-50%] text-[#d7d8db] hover:text-[#8c67de] cursor-pointer' inline width={24} height={24} />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className={styles.label} htmlFor="cPassword">Comfirm Password</label>
            <div className='relative'>
              <input className={`${styles.input}`} type={`${showPsw.cPsw ? 'text' : 'password'}`} placeholder='Enter your password again' />
              <Icon onClick={() => setShowPsw({
                ...showPsw,
                cPsw: !showPsw.cPsw
              })} icon={interfaceIdThumbMarkIdentificationPasswordTouchIdSecureFingerprintFingerSecurity} className='absolute right-4 top-[50%] translate-y-[-50%] text-[#d7d8db] hover:text-[#8c67de] cursor-pointer' inline width={24} height={24} />
            </div>
          </div>
          {/* buttons */}
          <div className='flex flex-col gap-4 lg:gap-6'>
            <button type='submit' className='bg-[#8c67de] w-full h-[48px] lg:h-[56px] rounded-lg shadow text-white text-lg hover:opacity-80'>Sign up</button>
          </div>
          {/* footer */}
          <p className='text-center flex items-center gap-2 self-center'>
            <span className='text-[#616673] text-sm lg:text-base'>Have an account?</span>
            <Link href={'/login'} className='text-[#8c67de] lg:text-lg font-semibold'>Sign In</Link></p>
        </form>
      </div>
    </Layout>
  )
}

export default RegisterPage
