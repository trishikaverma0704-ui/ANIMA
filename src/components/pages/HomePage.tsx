// HPI 1.7-G
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  User, Users, MapPin, MessageCircle, BookOpen, Heart, 
  Calendar, TrendingUp, AlertTriangle, ChevronRight, ChevronLeft, 
  Shield, Search, ArrowRight, Activity
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { CommunityPosts } from '@/entities';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';

// --- Types ---
interface StickySectionProps {
  title: string;
  icon: React.ElementType;
  description: string;
  children: React.ReactNode;
  index: number;
}

// --- Components ---

const StickySection = ({ title, icon: Icon, description, children, index }: StickySectionProps) => {
  return (
    <div className="relative flex flex-col md:flex-row border-t border-deep-grey/10 group">
      {/* Left Column - Sticky Header */}
      <div className="md:w-1/3 md:sticky md:top-24 h-fit py-12 px-6 md:px-12 lg:px-16 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white rounded-full border border-deep-grey/5 shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Icon className="w-6 h-6 text-accent-gold" />
            </div>
            <span className="font-paragraph text-xs tracking-widest uppercase text-deep-grey/40">0{index}</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-deep-grey mb-4">{title}</h2>
          <p className="font-paragraph text-deep-grey/60 text-sm md:text-base max-w-xs leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Decorative Line for Flowchart feel */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-deep-grey/10" />
      </div>

      {/* Right Column - Scrollable Content */}
      <div className="md:w-2/3 py-12 px-6 md:px-12 lg:px-16 bg-white/50 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

const FeatureCard = ({ title, subtitle, to, onClick, delay = 0 }: { title: string, subtitle: string, to?: string, onClick?: () => void, delay?: number }) => {
  const Wrapper = to ? Link : 'button';
  const props = to ? { to } : { onClick };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="w-full"
    >
      {/* @ts-ignore - Dynamic component props */}
      <Wrapper 
        {...props}
        className="group block w-full text-left bg-white p-8 border border-deep-grey/5 hover:border-accent-gold/30 hover:shadow-lg hover:shadow-accent-gold/5 transition-all duration-500 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-accent-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-heading text-xl text-deep-grey mb-2 group-hover:text-accent-gold transition-colors">{title}</h3>
            <p className="font-paragraph text-sm text-deep-grey/60">{subtitle}</p>
          </div>
          <div className="p-2 bg-warm-cream rounded-full opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            <ArrowRight className="w-4 h-4 text-deep-grey" />
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
};

export default function HomePage() {
  // --- Data Fidelity Protocol: Preserved State & Logic ---
  const [posts, setPosts] = useState<CommunityPosts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<CommunityPosts>('communityposts', {}, { limit: 50 });
      setPosts(result.items);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  };
  // --- End Data Fidelity Protocol ---

  // --- Animation Hooks ---
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-warm-cream font-paragraph text-deep-grey selection:bg-accent-gold/20 overflow-x-clip">
      <Header />
      
      {/* --- Hero Section: Immersive & Parallax --- */}
      <section ref={heroRef} className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
        {/* Background Image with Parallax */}
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <div className="absolute inset-0 bg-deep-grey/20 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-warm-cream z-20" />
          <Image 
            src="https://static.wixstatic.com/media/9c23d6_b3b4668adb22465f929d24fc948da381~mv2.png?originWidth=1408&originHeight=768"
            alt="Peaceful urban pet sanctuary"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-30 text-center max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 border border-white/30 rounded-full bg-white/10 backdrop-blur-md text-white text-xs tracking-[0.2em] uppercase mb-6">
              Est. 2024 • Urban Sanctuary
            </span>
            <h1 className="font-heading text-6xl md:text-8xl text-white mb-8 leading-tight drop-shadow-sm">
              Welcome to <br/>
              <span className="italic text-accent-gold">ANIMA</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-12">
              A warm, community-first platform for urban pet owners. Connect with your neighbourhood, access reliable information, and keep your pets safe.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-xs tracking-widest uppercase">Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
        </motion.div>
      </section>

      {/* --- Philosophy Section --- */}
      <section className="py-32 px-6 bg-warm-cream relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-8 h-8 text-accent-gold mx-auto mb-8 opacity-50" />
            <h2 className="font-heading text-4xl md:text-5xl text-deep-grey mb-8 leading-tight">
              Elegant Serenity for <br/> the Modern Pet Parent
            </h2>
            <p className="font-paragraph text-lg text-deep-grey/70 leading-relaxed">
              We believe in the quiet confidence of a connected community. ANIMA is designed to be your digital sanctuary—a place of trust, clarity, and emotional safety amidst the urban bustle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- The Flowchart / Navigation Hub (Sticky Layout) --- */}
      <section className="w-full max-w-[120rem] mx-auto bg-warm-cream relative z-10 pb-20">
        
        {/* 01 CORE */}
        <StickySection 
          index={1}
          title="CORE" 
          icon={User} 
          description="The foundation of your ANIMA experience. Manage your personal identity and your pet's digital presence."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard 
              title="User Profile" 
              subtitle="Manage your account settings and preferences."
              to="/profile"
              delay={0.1}
            />
            <FeatureCard 
              title="Pet Profiles" 
              subtitle="Update your companion's medical and social details."
              to="/profile"
              delay={0.2}
            />
          </div>
        </StickySection>

        {/* 02 COMMUNITY */}
        <StickySection 
          index={2}
          title="COMMUNITY" 
          icon={Users} 
          description="Connect with the heartbeat of your neighbourhood. Join circles, find clubs, and share moments."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard 
              title="Community Feed" 
              subtitle="See what's happening around you right now."
              to="/community-feed"
              delay={0.1}
            />
            <FeatureCard 
              title="Neighbourhood Circles" 
              subtitle="Join local groups for walks and playdates."
              to="/neighbourhood-circles"
              delay={0.2}
            />
            <FeatureCard 
              title="Species & Breed Clubs" 
              subtitle="Connect with owners of similar pets."
              to="/breed-clubs"
              delay={0.3}
            />
          </div>
        </StickySection>

        {/* 03 SUPPORT */}
        <StickySection 
          index={3}
          title="SUPPORT" 
          icon={Heart} 
          description="Reliable, practical assistance when you need it most. From AI guidance to professional directories."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard 
              title="AI Pet Assistant" 
              subtitle="Instant answers for training and health questions."
              onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
              delay={0.1}
            />
            <FeatureCard 
              title="Pet Wiki" 
              subtitle="Community-curated articles and guides."
              to="/pet-wiki"
              delay={0.2}
            />
            <FeatureCard 
              title="Rescue & NGO Connect" 
              subtitle="Directory of trusted local organizations."
              to="/rescue-directory"
              delay={0.3}
            />
          </div>
        </StickySection>

        {/* 04 ACTIVITY */}
        <StickySection 
          index={4}
          title="ACTIVITY" 
          icon={Activity} 
          description="Engage with the vibrant life of the city. Discover events, challenges, and new trends."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard 
              title="Events & Meetups" 
              subtitle="Calendar of local gatherings and workshops."
              to="/events"
              delay={0.1}
            />
            <FeatureCard 
              title="Challenges & Trends" 
              subtitle="Participate in fun community activities."
              to="/challenges"
              delay={0.2}
            />
          </div>
        </StickySection>

        {/* 05 SAFETY (Distinct Style) */}
        <div className="relative w-full bg-emergency-red text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
          <div className="max-w-[120rem] mx-auto px-6 md:px-16 py-20 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <span className="font-heading text-2xl">SAFETY FIRST</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl mb-6">Emergency Broadcast Mode</h2>
              <p className="font-paragraph text-white/80 text-lg mb-8 max-w-xl">
                In times of crisis, every second counts. Activate our community-wide alert system to mobilize your neighbourhood instantly for lost pets or urgent situations.
              </p>
              <Link 
                to="/emergency-alert" 
                className="inline-flex items-center gap-3 bg-white text-emergency-red px-8 py-4 rounded-sm font-heading text-lg hover:bg-white/90 transition-colors shadow-lg"
              >
                Activate Alert System <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Shield className="w-64 h-64 text-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* --- Community Feed Preview (Magazine Style) --- */}
      <section className="py-32 bg-white relative z-10">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-deep-grey/10 pb-8">
            <div>
              <span className="font-paragraph text-accent-gold text-sm tracking-widest uppercase mb-2 block">Live Updates</span>
              <h2 className="font-heading text-4xl md:text-5xl text-deep-grey">The Community Pulse</h2>
            </div>
            <Link 
              to="/community-feed" 
              className="group flex items-center gap-2 font-paragraph text-deep-grey hover:text-accent-gold transition-colors mt-6 md:mt-0"
            >
              View Full Feed <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-96 bg-deep-grey/5 animate-pulse rounded-sm" />
              ))
            ) : posts.length > 0 ? (
              posts.slice(0, 6).map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group flex flex-col h-full"
                >
                  <Link to={`/post/${post._id}`} className="block h-full">
                    <div className="relative overflow-hidden aspect-[4/3] mb-6 bg-warm-cream">
                      {post.postImage ? (
                        <Image 
                          src={post.postImage} 
                          alt={`Post by ${post.authorUsername}`}
                          width={600}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-deep-grey/5">
                          <Heart className="w-12 h-12 text-deep-grey/10" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-deep-grey">
                        {post.locationTag || 'Neighbourhood'}
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="font-paragraph text-sm font-medium text-deep-grey">{post.authorUsername}</span>
                        <span className="text-deep-grey/30 text-xs">•</span>
                        <span className="font-paragraph text-xs text-deep-grey/50">
                          {post.postDateTime ? format(new Date(post.postDateTime), 'MMM d') : 'Just now'}
                        </span>
                      </div>
                      <p className="font-paragraph text-deep-grey/80 leading-relaxed line-clamp-3 group-hover:text-deep-grey transition-colors">
                        {post.postContent}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-warm-cream/50 rounded-lg border border-dashed border-deep-grey/10">
                <MessageCircle className="w-12 h-12 text-deep-grey/20 mx-auto mb-4" />
                <p className="font-paragraph text-deep-grey/50">The neighbourhood is quiet today.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- AI Assistant Sidebar (Preserved Logic) --- */}
      {isAIAssistantOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAIAssistantOpen(false)}
            className="fixed inset-0 bg-deep-grey/20 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-white shadow-2xl z-50 flex flex-col border-l border-deep-grey/10"
          >
            <div className="p-6 border-b border-deep-grey/10 flex items-center justify-between bg-warm-cream">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-gold/10 rounded-full">
                  <Heart className="w-5 h-5 text-accent-gold" />
                </div>
                <h3 className="font-heading text-xl text-deep-grey">AI Companion</h3>
              </div>
              <button 
                onClick={() => setIsAIAssistantOpen(false)}
                className="p-2 hover:bg-deep-grey/5 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-deep-grey/60" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-warm-cream p-6 rounded-lg border border-deep-grey/5">
                <p className="font-paragraph text-sm text-deep-grey/70 leading-relaxed">
                  Hello! I'm your ANIMA assistant. I can help you with:
                </p>
                <ul className="mt-4 space-y-2 text-sm text-deep-grey/60 list-disc list-inside">
                  <li>Pet nutrition advice</li>
                  <li>Training tips</li>
                  <li>Finding local vets</li>
                  <li>Understanding pet behavior</li>
                </ul>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-deep-grey/5 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-deep-grey/40" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 text-sm text-deep-grey/80">
                  How do I introduce my new puppy to my cat?
                </div>
              </div>

              <div className="flex items-start gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-accent-gold" />
                </div>
                <div className="bg-accent-gold/10 rounded-2xl rounded-tr-none p-4 text-sm text-deep-grey/80">
                  <p className="italic text-xs text-deep-grey/40 mb-2">AI Feature Preview</p>
                  Slow introductions are key! Start by keeping them in separate rooms and swapping scents...
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-deep-grey/10 bg-white">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask a question..." 
                  className="w-full bg-warm-cream border border-deep-grey/10 rounded-full py-3 px-5 pr-12 text-sm focus:outline-none focus:border-accent-gold/50 transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-accent-gold text-white rounded-full hover:bg-accent-gold/90 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}

      <Footer />
    </div>
  );
}