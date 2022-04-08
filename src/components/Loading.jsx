/* eslint-disable @next/next/no-img-element */
import Layout from './layouts/Layout'

export default function CompsLoading() {
  return (
    <Layout>
      <div id="comps-loading" className="text-center m-5">
        <img src="/assets/Gear-1.4s-118px.svg" alt="loader" />
      </div>
    </Layout>
  )
}
