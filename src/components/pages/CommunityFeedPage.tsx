import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, MessageCircle, Plus, Filter, ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { CommunityPosts } from '@/entities';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

export default function CommunityFeedPage() {
  const [posts, setPosts] = useState<CommunityPosts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<CommunityPosts>('communityposts', {}, { limit: 12, skip });
      setPosts(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const result = await BaseCrudService.getAll<CommunityPosts>('communityposts', {}, { limit: 12, skip: skip + 12 });
      setPosts([...posts, ...result.items]);
      setHasNext(result.hasNext);
      setSkip(skip + 12);
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
  };

  const filteredPosts = filterLocation 
    ? posts.filter(post => post.locationTag?.toLowerCase().includes(filterLocation.toLowerCase()))
    : posts;

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="font-heading text-5xl text-deep-grey mb-4">Community Feed</h1>
              <p className="font-paragraph text-lg text-deep-grey/70">Connect with pet owners in your neighbourhood</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
                className="bg-white text-deep-grey font-paragraph text-sm px-6 py-3 hover:bg-muted-beige/30 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                AI Assistant
              </button>
              <Link to="/submit-post">
                <Button className="bg-accent-gold text-white font-paragraph text-sm px-6 py-3 hover:bg-accent-gold/90 transition-colors flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  New Post
                </Button>
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 mb-8">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-accent-gold" />
              <input 
                type="text"
                placeholder="Filter by location..."
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="flex-1 font-paragraph text-sm px-4 py-2 border border-muted-beige/30 focus:outline-none focus:border-accent-gold"
              />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
            {isLoading ? null : filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/post/${post._id}`} className="block bg-white p-6 hover:bg-muted-beige/30 transition-colors duration-300 h-full">
                    {post.postImage && (
                      <div className="mb-4 overflow-hidden">
                        <Image 
                          src={post.postImage} 
                          alt={`Post by ${post.authorUsername}`}
                          width={400}
                          className="w-full h-56 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <User className="w-5 h-5 text-accent-gold" />
                      <span className="font-paragraph text-sm font-medium text-deep-grey">{post.authorUsername}</span>
                    </div>
                    {post.locationTag && (
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-4 h-4 text-deep-grey/60" />
                        <span className="font-paragraph text-xs text-deep-grey/60">{post.locationTag}</span>
                      </div>
                    )}
                    <p className="font-paragraph text-base text-deep-grey/80 line-clamp-4 mb-4">{post.postContent}</p>
                    {post.postDateTime && (
                      <p className="font-paragraph text-xs text-deep-grey/50">
                        {format(new Date(post.postDateTime), 'MMM d, yyyy h:mm a')}
                      </p>
                    )}
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <MessageCircle className="w-16 h-16 text-deep-grey/30 mx-auto mb-4" />
                <p className="font-paragraph text-deep-grey/60 mb-6">No posts found. Be the first to share!</p>
                <Link to="/submit-post">
                  <Button className="bg-accent-gold text-white font-paragraph text-sm px-6 py-3">
                    Create First Post
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Load More */}
          {hasNext && !isLoading && (
            <div className="text-center mt-12">
              <Button 
                onClick={loadMore}
                className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors"
              >
                Load More Posts
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* AI Assistant Sidebar */}
      {isAIAssistantOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-50 p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-2xl text-deep-grey">AI Pet Assistant</h3>
            <button 
              onClick={() => setIsAIAssistantOpen(false)}
              className="text-deep-grey/60 hover:text-deep-grey"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-4">
            <p className="font-paragraph text-sm text-deep-grey/70">
              Ask me anything about pet care, training, health, or nutrition. I'm here to help!
            </p>
            <div className="bg-warm-cream p-4">
              <p className="font-paragraph text-xs text-deep-grey/60 italic">
                AI Assistant feature coming soon. This will provide instant answers to your pet care questions.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
