import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {ThemeModeProvider} from '../_metronic/partials'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
 
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <AuthInit>
               <ToastContainer 
                  position="bottom-left" 
                  draggable
                  autoClose={10000}
                />
              <Outlet />
              <MasterInit />
              <ToastContainer 
                  position="bottom-left" 
                  draggable
                  autoClose={10000}
                />
            </AuthInit>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
