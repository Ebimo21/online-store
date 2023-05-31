import { Fragment } from "react"
import Header from "./Header"

const Layout = ({children}: Props) => {
  return (
    <Fragment>
        <Header />
        {children}
    </Fragment>
  )
}

export default Layout