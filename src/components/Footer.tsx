import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/254705186502";

const Footer = () => {
  return (
    <footer className="gradient-hero text-primary-foreground">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                <span className="text-accent-foreground font-display font-bold text-lg">M</span>
              </div>
              <span className="font-display font-bold text-xl">Mackdish Solutions</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Your trusted technology partner for innovative software solutions, digital marketing, and business automation.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:macknonvulimu@gmail.com"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:+254705186502"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/software" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Software Solutions
                </Link>
              </li>
              <li>
                <Link to="/web-design" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Web Design
                </Link>
              </li>
              <li>
                <Link to="/digital-marketing" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="/ai-automation" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  AI Automation
                </Link>
              </li>
              <li>
                <Link to="/cyber-security" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Cyber Security
                </Link>
              </li>
              <li>
                <Link to="/graphic-design" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Graphic Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Book Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-brand-teal" />
                <div>
                  <p className="text-sm font-medium">Phone / WhatsApp</p>
                  <a href="tel:+254705186502" className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors">
                    +254 705 186 502
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-brand-teal" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a href="mailto:macknonvulimu@gmail.com" className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors">
                    macknonvulimu@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-brand-teal" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-primary-foreground/70 text-sm">
                    Nairobi, Kenya
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} Mackdish Solutions. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm">
              Founded by Macknon Vulimu
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
