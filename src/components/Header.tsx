import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { User, LogOut } from 'lucide-react';

export default function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember();

  return (
    <header className="w-full bg-white border-b border-muted-beige/30">
      <div className="max-w-[100rem] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-heading text-3xl text-deep-grey hover:text-accent-gold transition-colors">
            ANIMA
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-paragraph text-base text-deep-grey hover:text-accent-gold transition-colors">
              Home
            </Link>
            <Link to="/community-feed" className="font-paragraph text-base text-deep-grey hover:text-accent-gold transition-colors">
              Community
            </Link>
            <Link to="/pet-wiki" className="font-paragraph text-base text-deep-grey hover:text-accent-gold transition-colors">
              Support
            </Link>
            <Link to="/events" className="font-paragraph text-base text-deep-grey hover:text-accent-gold transition-colors">
              Activity
            </Link>
            <Link to="/emergency-alert" className="font-paragraph text-base text-emergency-red hover:text-emergency-red/80 transition-colors font-medium">
              Safety
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="w-8 h-8 border-2 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin"></div>
            ) : isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 font-paragraph text-sm text-deep-grey hover:text-accent-gold transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{member?.profile?.nickname || 'Profile'}</span>
                </Link>
                <button 
                  onClick={actions.logout}
                  className="flex items-center gap-2 font-paragraph text-sm text-deep-grey/60 hover:text-deep-grey transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button 
                onClick={actions.login}
                className="bg-accent-gold text-white font-paragraph text-sm px-6 py-3 hover:bg-accent-gold/90 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
