import { Fragment } from "react"
import Header from "./Header"

const DashboardLayout = ({children}: Props) => {
  return (
    <Fragment>
        <Header />
        {children}
    </Fragment>
  )
}

export default DashboardLayout