import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-deep-grey text-white py-16">
      <div className="max-w-[100rem] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-heading text-2xl mb-6">ANIMA</h3>
            <p className="font-paragraph text-sm text-white/70 leading-relaxed">
              A warm, community-first platform for urban pet owners. Connect with your neighbourhood, access reliable information, and keep your pets safe.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-xl mb-6">Quick Links</h4>
            <nav className="space-y-3">
              <Link to="/community-feed" className="block font-paragraph text-sm text-white/70 hover:text-accent-gold transition-colors">
                Community Feed
              </Link>
              <Link to="/neighbourhood-circles" className="block font-paragraph text-sm text-white/70 hover:text-accent-gold transition-colors">
                Neighbourhood Circles
              </Link>
              <Link to="/pet-wiki" className="block font-paragraph text-sm text-white/70 hover:text-accent-gold transition-colors">
                Pet Wiki
              </Link>
              <Link to="/events" className="block font-paragraph text-sm text-white/70 hover:text-accent-gold transition-colors">
                Events & Meetups
              </Link>
              <Link to="/emergency-alert" className="block font-paragraph text-sm text-emergency-red hover:text-emergency-red/80 transition-colors">
                Emergency Alerts
              </Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-heading text-xl mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent-gold mt-1" />
                <div>
                  <p className="font-paragraph text-sm text-white/70">support@anima.community</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent-gold mt-1" />
                <div>
                  <p className="font-paragraph text-sm text-white/70">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-gold mt-1" />
                <div>
                  <p className="font-paragraph text-sm text-white/70">Urban Pet Community Hub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-paragraph text-xs text-white/50">
            © 2026 ANIMA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="font-paragraph text-xs text-white/50 hover:text-accent-gold transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="font-paragraph text-xs text-white/50 hover:text-accent-gold transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
