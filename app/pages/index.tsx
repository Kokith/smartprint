import { BlitzPage, Routes } from "blitz"
import { Fragment } from "react"

const IndexPage: BlitzPage = () => {
  return <Fragment></Fragment>
}

IndexPage.authenticate = true
IndexPage.redirectAuthenticatedTo = Routes.DashboardPage()

export default IndexPage
