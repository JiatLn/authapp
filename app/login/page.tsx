'use client'
import Layout from '@/components/Layout'
import styles from './loginPage.module.css'
import Link from 'next/link'
import { Icon } from '@iconify/react';
import googleIcon from '@iconify/icons-flat-color-icons/google';
import outlineAlternateEmail from '@iconify/icons-ic/outline-alternate-email';
import passwordIcon from '@iconify/icons-streamline/interface-id-thumb-mark-identification-password-touch-id-secure-fingerprint-finger-security';
import loadingIcon from '@iconify/icons-line-md/loading-twotone-loop';
import githubIcon from '@iconify/icons-uil/github';
import { signIn } from 'next-auth/react'
import { useFormik } from 'formik'
import { LoginForm } from '@/types/index.types'
import { loginValidate } from '@/lib/validate'
import InputWithIcon from '@/components/InputWithIcon'
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import Toast from '@/components/Toast';


const LoginPage = () => {

  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignInThird(provider: string) {
    let res = await signIn(provider, {
      callbackUrl: 'http://localhost:3000',
      redirect: false
    })
    console.log('res', res)
  }

  async function onSubmit(values: LoginForm) {
    try {
      setLoading(true)
      const res = await signIn('credentials', {
        callbackUrl: '/',
        email: values.email,
        password: values.password,
        redirect: false
      })
      if (res?.ok && res.url) {
        router.push(res.url)
        setErrorMsg('')
      } else {
        setErrorMsg(res?.error || 'Something error')
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik<LoginForm>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit,
    validate: loginValidate,
  })

  return (
    <Layout>
      <Toast type='error' message={errorMsg} setMessage={setErrorMsg} />
      <div className='mx-auto flex flex-col gap-2 lg:gap-4 lg:w-3/4 max-w-[460px]'>
        <h1 className='text-3xl text-center lg:text-left lg:text-4xl font-semibold'>Welcome back</h1>
        <p className='text-sm text-center mb-4 lg:mb-0 lg:text-left text-[#6a6f79] lg:text-xl'>
          Welcome back! Please enter your details.
        </p>
        <form
          className='flex flex-col gap-4 px-2 min-w-[360px]'
          onSubmit={formik.handleSubmit}
        >
          <div className='flex flex-col gap-2 lg:gap-3'>
            <label className={styles.label} htmlFor="email">Email</label>
            <InputWithIcon icon={outlineAlternateEmail} formik={formik} name='email' isError={formik.errors.email && formik.touched.email} placeholder='Enter your email' />
          </div>
          <div className='flex flex-col gap-3'>
            <label className={styles.label} htmlFor="password">Password</label>
            <InputWithIcon icon={passwordIcon} formik={formik} name='password' type='password' isError={formik.errors.password && formik.touched.password} placeholder='Enter your password' />
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
            <button type='submit' disabled={loading} className={`${styles.button} bg-[#8c67de] text-white ${loading ? 'cursor-wait' : ''}`}>
              {loading && <Icon icon={loadingIcon} className='mr-2' inline width={18} height={18} />}
              {loading ? 'Wait...' : 'Sign in'}
            </button>
            <button type='button' onClick={() => handleSignInThird('google')} className={`${styles.button} text-[#616673] border border-[#d7d8db]`}>
              <Icon icon={googleIcon} inline width={28} height={28} />
              <span>Sign in with Google</span>
            </button>
            <button type='button' onClick={() => handleSignInThird('github')} className={`${styles.button} text-[#616673] border border-[#d7d8db]`}>
              <Icon icon={githubIcon} inline width={28} height={28} />
              <span>Sign in with Github</span>
            </button>
          </div>
          {/* footer */}
          <p className='text-center flex items-center gap-2 self-center'>
            <span className='text-[#616673] text-sm lg:text-base'>Don&#39;t have an account?</span>
            <Link href={'/register'} className='text-[#8c67de] lg:text-lg font-semibold'>Sign up</Link></p>
        </form>
      </div>
    </Layout>
  )
}

export default LoginPage
