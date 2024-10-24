import { Link } from "react-router-dom"

const Index = () => {
  return (
    <div>
      <Link to={"/recognize"}>Test recognize faces in system</Link>
      <Link to={"/recognize-booking"}>Test recognize face in booking</Link>
    </div>
  )
}

export default Index