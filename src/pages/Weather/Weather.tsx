import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import MeteoLineChart from '../../components/dashboard/MeteoLineChart'

export default function Weather() {
  return (
    <>
      <PageBreadcrumb pageTitle="Meteo" />
      <MeteoLineChart/>
    </>

  )
}
