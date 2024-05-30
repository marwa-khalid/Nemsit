import { useFormik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export function SuccessPage() {
    const [loading, setLoading] = useState(false);
    interface LocationState {
        textInfo: string;
    }
    const location = useLocation();
    const state = location.state as LocationState; // Type assertion
    const resetTextInfo = state?.textInfo;
    
    return (
        <div className="d-flex flex-column justify-content-center vh-100 p-4">
            {resetTextInfo && <div className="my-10">
                <h1 className="my-10">Success!</h1>
                <p className='fs-5'>
                {/* Open the email we sent to set your new password. If you don't receive the email within a few minutes of requesting, you may have entered an incorrect email
                address, or the email may have ended up in your spam folder. */}
                {resetTextInfo}
                </p>
            </div>}
            <div className='d-flex justify-content-between align-items-center mb-5'>
                 <Link to='/' className='link-primary'>
                    <button
                        type='submit'
                        id='kt_sign_in_submit'
                        className='btn btn-primary'
                    >
                        <span className='indicator-label'>Login <i className="fa-solid fa-chevron-right"></i></span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

