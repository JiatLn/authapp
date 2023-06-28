import LoginForm from '@/app/login/LoginForm'
import styles from './loginPage.module.css'

const LoginPage = () => {
  return (
    <div className='grid lg:grid-cols-2 h-screen w-full'>
      <div className='m-auto lg:m-0 flex-1 bg-white lg:p-8 flex flex-col lg:justify-between'>
        <h1 className={`${styles.logo} hidden lg:flex relative text-[#0f1826] text-xl font-bold`}>
          Untitled UI
        </h1>
        <div className='lg:hidden flex mx-auto w-[200px] h-[140px] items-center justify-center overflow-hidden'>
          <div className={`${styles.gradation} ${styles.gradationSm} w-[60px] h-[60px]`}></div>
        </div>
        <LoginForm />
        <div className='text-[#6a6f79] hidden lg:flex'>
          &copy; Untitled UI 2077
        </div>
      </div>
      <div className='hidden lg:flex flex-1 bg-[#f3f4f8] items-center justify-center overflow-hidden'>
        <div className={`${styles.gradation} w-[220px] h-[220px]`}></div>
      </div>
    </div>
  )
}

export default LoginPage
