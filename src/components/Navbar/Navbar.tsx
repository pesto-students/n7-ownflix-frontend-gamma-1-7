import './Navbar.scss';
import Logo from '../../images/logo.png'
import useScroll from '../../hooks/useScroll';

const Navbar = () => {
    const isScrolled = useScroll(0);
    return (
        <div className={`Navbar ${isScrolled && "Navbar__fixed"}`}>
            <div className="left-navbar">
                <a href="/"><img src={Logo} alt="logo" className="logo" /></a>
                <h2 className="browse">Browse</h2>
            </div>
            <div className="right-navbar">
                <input />
                <h2 className="author">Icon</h2>

            </div>
        </div>
    )
}

export default Navbar;
