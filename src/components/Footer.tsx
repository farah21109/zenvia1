import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-healthcare-navy text-card py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-healthcare-turquoise rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">Z</span>
            </div>
            <div>
              <div className="text-xl font-bold">Zenvia</div>
              <div className="text-sm text-muted-foreground">
                © 2024 Zenvia Healthcare. All rights reserved.
              </div>
            </div>
          </div>

          {/* Contact Links */}
          <div className="flex items-center space-x-6 text-sm">
            <Link 
              to="/privacy" 
              className="text-muted-foreground hover:text-card transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-muted-foreground hover:text-card transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/contact" 
              className="text-muted-foreground hover:text-card transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;