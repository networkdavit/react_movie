import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <h1 className="footer-title">My Footer</h1>
      <p className="footer-copyright">Copyright &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;
