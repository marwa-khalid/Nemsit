
import {useEffect} from 'react'
import {Outlet, Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid'>
      {/* begin::Body */}
      
      <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'>
        {/* begin::Form */}
        <div className='d-flex flex-center flex-column '>
          {/* begin::Wrapper */}
          <div className='w-lg-500px px-10'>
            
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}

        {/* begin::Footer */}
        {/* <div className='d-flex flex-center flex-wrap px-5'>
         
          <div className='d-flex fw-semibold text-primary fs-base'>
            <a href='#' className='px-5' target='_blank'>
              Terms
            </a>

            <a href='#' className='px-5' target='_blank'>
              Plans
            </a>

            <a href='#' className='px-5' target='_blank'>
              Contact Us
            </a>
          </div>
        </div> */}
        {/* end::Footer */}
      </div>
      {/* end::Body */}

      {/* begin::Aside */}
      <div
        className=' d-none d-lg-flex flex-lg-row-fluid bgi-size-cover bgi-no-repeat order-1 order-lg-2 '
        style={{backgroundImage: `url(${toAbsoluteUrl('media/auth/bg11.png')})`,width:'50%'}}
      >
        {/* begin::Content */}
        {/* <div className='d-flex flex-column flex-center py-15 px-5 px-md-15 w-100'>
    
          <Link to='/' className='mb-12'>
            <img alt='Logo' src={toAbsoluteUrl('media/logos/custom-1.png')} className='h-75px' />
          </Link>
          <img
            className='mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20'
            src={toAbsoluteUrl('media/misc/auth-screens.png')}
            alt=''
          />
          <h1 className='text-white fs-2qx fw-bolder text-center mb-7'>
            Fast, Efficient and Productive
          </h1>
          <div className='text-white fs-base text-center'>
            In this kind of post,{' '}
            <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
              the blogger
            </a>
            introduces a person they’ve interviewed <br /> and provides some background information
            about
            <a href='#' className='opacity-75-hover text-warning fw-bold me-1'>
              the interviewee
            </a>
            and their <br /> work following this is a transcript of the interview.
          </div>
          
        </div> */}
      </div>
      {/* end::Aside */}
    </div>
  )
}

export {AuthLayout}
