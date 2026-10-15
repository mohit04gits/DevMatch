import { Link } from "react-router-dom";
const Footer = () => <footer className="dm-footer dm-container"><span>© {new Date().getFullYear()} DevMatch</span><span>Made for the people behind the code.</span><Link to="/contact">Contact</Link></footer>;
export default Footer;
