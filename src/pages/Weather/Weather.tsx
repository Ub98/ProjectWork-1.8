import ChartTab from '../../components/common/ChartTab'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'

export default function Weather() {
  return (
    <>
      <PageBreadcrumb pageTitle="Meteo" />
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6 mb-6">
        <ChartTab />
      </div>
    </>

  )
}
