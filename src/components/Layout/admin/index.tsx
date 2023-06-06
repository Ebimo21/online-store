import { Fragment } from "react"
import Header from "./Header"

const AdminLayout = ({children}: Props) => {
  return (
    <Fragment>
        <Header />
        {children}
    </Fragment>
  )
}

export default AdminLayout