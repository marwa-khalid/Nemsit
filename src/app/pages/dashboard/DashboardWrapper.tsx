import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import { useLayout } from '../../../_metronic/layout/core'
import clsx from 'clsx'
import { FooterWrapper } from '../../../_metronic/layout/components/footer'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget9,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
} from '../../../_metronic/partials/widgets'
import { ToolbarWrapper } from '../../../_metronic/layout/components/toolbar'
import { Content } from '../../../_metronic/layout/components/content'

const DashboardPage: FC = () => (
  < >
    {/* <ToolbarWrapper /> */}
      <Content>

    {/* begin::Row */}
    <div className='row g-4 g-xl-10  mb-xl-10 rounded ' >
      {/* begin::Col */}
      <div className='col-md-6 col-lg-6 col-xl-6  mb-md-5 mb-xl-10'>
        <CardsWidget20
          className='h-md-50 mb-5 mb-xl-10'
          description='Active Projects'
        />
        <CardsWidget7
          className='h-md-50 mb-5 mb-xl-10'
          description='Professionals'
          icon={false}
          stats={357}
          labelColor='dark'
          textColor='gray-300'
        />
      </div>
      {/* end::Col */}

      {/* begin::Col */}
      <div className='col-md-6 col-lg-6 col-xl-6  mb-lg-5 mb-xl-10'>
        <CardsWidget17 className='h-md-50 mb-5 mb-xl-10' />
        <ListsWidget26 className='h-lg-50' />
      </div>
      {/* end::Col */}
      <div></div>

    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row gx-5 gx-xl-10'>
      {/* begin::Col */}
      <div className='col-xxl-6 mb-5 mb-xl-10'>
        {/* <app-new-charts-widget8 cssclassName="h-xl-100" chartHeight="275px" [chartHeightNumber]="275"></app-new-charts-widget8> */}
      </div>
      {/* end::Col */}

      {/* begin::Col */}
      <div className='col-xxl-6 mb-5 mb-xl-10'>
        {/* <app-cards-widget18 cssclassName="h-xl-100" image="./assetsmedia/stock/600x600/img-65.jpg"></app-cards-widget18> */}
      </div>
      {/* end::Col */}
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row gy-5 gx-xl-8'>
      <div className='col-xxl-12'>
        <ListsWidget3 className='card-xxl-stretch mb-xl-3' />
      </div>
      </div>
      <div className='row gy-5 gx-xl-8'>
     
      <div className='col-xl-12'>
        <TablesWidget9 className='card-xxl-stretch mb-5 mb-xl-8' />
      </div>
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row gy-5 g-xl-8'>
      <div className='col-xl-4'>
        <ListsWidget2 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget6 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
        {/* partials/widgets/lists/_widget-4', 'class' => 'card-xl-stretch mb-5 mb-xl-8', 'items' => '5' */}
      </div>
    </div>
    {/* end::Row */}

    <div className='row g-5 gx-xxl-8'>
      <div className='col-xxl-4'>
        <MixedWidget8
          className='card-xxl-stretch mb-xl-3'
          chartColor='success'
          chartHeight='150px'
        />
      </div>
      <div className='col-xxl-8'>
        <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div>
    </Content>
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  const {config} = useLayout()
  
  return (
  <div  className={clsx('main rounded', config.app?.sidebar?.default?.class, {
             
        'bg-white': config.layoutType === 'light-sidebar',
        'bg-dark': config.layoutType === 'dark-sidebar',
      })}  
          // style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto'}}
          >
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage />
      <FooterWrapper />
    </div>
  )
}

export {DashboardWrapper}
