import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { getProfileInfo, login } from '../core/_requests';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';
import { useAuth } from '../core/Auth';
import { toast, ToastContainer, ToastOptions, Id } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { TraceInfoType } from '../core/_models';
import { useNavigate } from 'react-router-dom';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

function getToastOptions(messageType: number): { type: string; color: string } {
  switch (messageType) {
    case TraceInfoType.Debug:
      return { type: 'info', color: 'grey' };
    case TraceInfoType.Success:
      return { type: 'success', color: 'green' };
    case TraceInfoType.Information:
      return { type: 'info', color: 'blue' };
    case TraceInfoType.Warning:
      return { type: 'warning', color: 'orange' };
    case TraceInfoType.Error:
      return { type: 'error', color: 'red' };
    case TraceInfoType.Critical:
      return { type: 'error', color: 'red' };
    case TraceInfoType.Fatal:
      return { type: 'error', color: 'red' };
    case TraceInfoType.UpgradeError:
      return { type: 'error', color: 'red' };
    case TraceInfoType.Upgrade:
      return { type: 'info', color: 'blue' };
    default:
      return { type: 'error', color: 'black' }; // Default to error and black color
  }
}


export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const { data: auth } = await login(values.email, values.password);
        
        if(auth.isValid === true){ 
          saveAuth(auth);
          const { data: user } = await getProfileInfo(auth.result.token);
          if(user){
            setCurrentUser(user); 
          }   
        }

        else{
          
          let errorMessage = auth.messages[0].message
          let messageType = auth.messages[0].type;
         
          const { type, color } = getToastOptions(messageType);
          const toastFunction = toast[type as keyof typeof toast] as (errorMessage: string, options?: ToastOptions) => Id;

         toastFunction(errorMessage);
          setSubmitting(false);
          setLoading(false);
        }
          
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus('The login details are incorrect');
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <div>

      <div className='text-end mb-5'>
         <span className="text-gray-500 fw-bold fs-5 me-2" data-kt-translate="sign-in-head-desc">Not a Member yet?</span>
        <Link to='/registration' className='link-primary fw-bold fs-5'>
          Sign up
        </Link>
        
      </div>

      <form
        className='form w-100 py-20'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
        >
      

        {/* Large text: Sign In */}
        <div className='text-start mb-5'>
          <h1 className='text-gray-900 mb-3 fs-3x'>Sign In</h1>
          <div className='text-gray-500 fw-semibold fs-6 mb-10'>Get unlimited access & earn money</div>
        </div>

        {/* Email and Password inputs */}
        <div className=' rounded mb-5'>
          <div className='fv-row mb-3'>
            <input
              placeholder='Email'
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control bg-light border-0 mb-8',
                {'is-invalid': formik.touched.email && formik.errors.email},
                {'is-valid': formik.touched.email && !formik.errors.email},
                
              )}
              type='email'
              name='email'
              autoComplete='off'
            />
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                <span role='alert'>{formik.errors.email}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-3'>
            <input
              type='password'
              placeholder='Password'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control form-control-solid bg-light border-0 mb-8',
                {'is-invalid': formik.touched.password && formik.errors.password},
                {'is-valid': formik.touched.password && !formik.errors.password}
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>

          {/* Forgot Password link */}
          <div className='text-end'>
            <Link to='/forgot-password' className='link-primary'>
              Forgot password?
            </Link>
          </div>
        </div>
        

        {/* Sign in options: Sign in with Google, Facebook, Apple */}
        <div className='d-flex justify-content-between align-items-center mb-5'>
        
            <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-primary'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Sign In</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          
        </div>
       
        <ToastContainer 
          position="bottom-left" 
          draggable
          />
      </form>
      
    </div>

  );
}

