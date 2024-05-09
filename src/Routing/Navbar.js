import { Link } from "react-router-dom"
function Navbar(){
    return(
        <div>
            <Link to="/" ></Link><br/>
            <Link to="/login"></Link><br/>
            <Link to="/register"></Link><br></br>
            <Link to="/about"></Link><br/>
            <Link to="/contact"></Link><br/>
            <Link to="/dasboard"></Link><br/>
            <Link to="/page"></Link>
        </div>
    )
}
export default Navbar