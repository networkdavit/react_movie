import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p className="footer-copyright">Copyright &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;
