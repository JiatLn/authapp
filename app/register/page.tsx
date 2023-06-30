'use client'
import Layout from '@/components/Layout'
import Link from 'next/link'
import styles from './registerPage.module.css'
import userIcon from '@iconify/icons-bx/user';
import outlineAlternateEmail from '@iconify/icons-ic/outline-alternate-email';
import passwordIcon from '@iconify/icons-streamline/interface-id-thumb-mark-identification-password-touch-id-secure-fingerprint-finger-security';
import { useFormik } from 'formik'
import { RegisterForm } from '@/types/index.types'
import InputWithIcon from '@/components/InputWithIcon'
import { registerValidate } from '@/lib/validate';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import loadingIcon from '@iconify/icons-line-md/loading-twotone-loop';
import { Icon } from '@iconify/react';
import Toast from '@/components/Toast';

const RegisterPage = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(values: RegisterForm) {
    try {
      setLoading(true)
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      if (res.ok) {
        console.log('data', data)
        router.push('/')
      } else {
        setErrorMsg(data.message)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik<RegisterForm>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit,
    validate: registerValidate,
  })

  return (
    <Layout>
      <Toast type='error' message={errorMsg} setMessage={setErrorMsg} />
      <div className='mx-auto py-4 flex flex-col gap-2 lg:gap-4 lg:w-3/4 max-w-[460px]'>
        <h1 className='text-3xl text-center font-semibold'>Register</h1>
        <p className='text-sm text-center mb-4 lg:mb-0 text-[#6a6f79] lg:text-xl'>
          You are welcome! Please enter your details.
        </p>
        <form className='flex flex-col gap-5 px-2 min-w-[360px]' onSubmit={formik.handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label className={styles.label} htmlFor="username">Username</label>
            <InputWithIcon icon={userIcon} formik={formik} placeholder='Enter your name' isError={formik.errors.username && formik.touched.username} name='username' />
          </div>
          <div className='flex flex-col gap-2'>
            <label className={styles.label} htmlFor="email">Email</label>
            <InputWithIcon icon={outlineAlternateEmail} formik={formik} placeholder='Enter your email' isError={formik.errors.email && formik.touched.email} name='email' type='email' />
          </div>
          <div className='flex flex-col gap-2'>
            <label className={styles.label} htmlFor="password">Password</label>
            <InputWithIcon icon={passwordIcon} formik={formik} placeholder='Enter your password' isError={formik.errors.password && formik.touched.password} name='password' type='password' />
          </div>
          <div className='flex flex-col gap-2'>
            <label className={styles.label} htmlFor="cPassword">Comfirm Password</label>
            <InputWithIcon icon={passwordIcon} formik={formik} placeholder='Enter your password again' isError={formik.errors.confirmPassword && formik.touched.confirmPassword} name='confirmPassword' type='password' />
          </div>
          {/* buttons */}
          <div className='flex flex-col gap-4 lg:gap-6'>
            <button type='submit' className={`${styles.button} bg-[#8c67de] text-white ${loading ? 'cursor-wait' : ''}`}>
              {loading && <Icon icon={loadingIcon} className='mr-2' inline width={18} height={18} />}
              {loading ? 'Wait...' : 'Sign Up'}
            </button>
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
