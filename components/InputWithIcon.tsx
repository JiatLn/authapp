import { Icon, IconifyIcon } from '@iconify/react'
import React, { useState } from 'react'
import styles from './inputWithIcon.module.css'
import { FormikProps } from 'formik'

type Props<T extends Record<string, any>> = {
  icon: IconifyIcon | string
  isError?: boolean | ''
  formik: FormikProps<T>
  placeholder?: string
  type?: 'text' | 'password' | 'email'
  name: string
}

const InputWithIcon = <T extends Record<string, any>>(
  { icon, isError, formik, placeholder, type = 'text', name }: Props<T>
) => {

  const [showPsw, setShowPsw] = useState(false)

  function handleClickIcon() {
    if (type === 'password') {
      setShowPsw(!showPsw)
    }
  }

  return (
    <div className='relative'>
      <input
        className={`${styles.input} ${isError ? '!border-rose-600 !border-2' : ''}`} autoComplete={'new-password'} type={
          type === 'password' ? `${showPsw ? 'text' : 'password'}` : type
        } placeholder={placeholder}
        {...formik.getFieldProps(name)}
      />
      <Icon onClick={handleClickIcon} icon={icon} className={`absolute right-4 top-[50%] translate-y-[-50%] text-[#d7d8db] ${type === 'password' ? 'hover:text-[#8c67de] cursor-pointer' : ''}`} inline width={24} height={24} />
    </div>
  )
}

export default InputWithIcon
