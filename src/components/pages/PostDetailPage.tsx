import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { CommunityPosts } from '@/entities';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<CommunityPosts | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<CommunityPosts>('communityposts', id);
      setPost(data);
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <Link 
            to="/community-feed" 
            className="inline-flex items-center gap-2 font-paragraph text-sm text-accent-gold hover:text-accent-gold/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Community Feed
          </Link>

          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : !post ? (
              <div className="text-center py-20">
                <p className="font-paragraph text-deep-grey/60">Post not found</p>
              </div>
            ) : (
              <div className="bg-white p-12">
                <div className="max-w-4xl mx-auto">
                  {/* Author Info */}
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-muted-beige/30">
                    <div className="w-12 h-12 rounded-full bg-muted-beige flex items-center justify-center">
                      <User className="w-6 h-6 text-accent-gold" />
                    </div>
                    <div>
                      <h3 className="font-paragraph text-lg font-medium text-deep-grey">{post.authorUsername}</h3>
                      {post.locationTag && (
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4 text-deep-grey/60" />
                          <span className="font-paragraph text-sm text-deep-grey/60">{post.locationTag}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Post Image */}
                  {post.postImage && (
                    <div className="mb-8">
                      <Image 
                        src={post.postImage} 
                        alt={`Post by ${post.authorUsername}`}
                        width={800}
                        className="w-full max-h-[600px] object-cover"
                      />
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="mb-8">
                    <p className="font-paragraph text-lg text-deep-grey leading-relaxed whitespace-pre-wrap">
                      {post.postContent}
                    </p>
                  </div>

                  {/* Post Meta */}
                  {post.postDateTime && (
                    <div className="flex items-center gap-2 text-deep-grey/50 pt-6 border-t border-muted-beige/30">
                      <Calendar className="w-4 h-4" />
                      <span className="font-paragraph text-sm">
                        Posted on {format(new Date(post.postDateTime), 'MMMM d, yyyy')} at {format(new Date(post.postDateTime), 'h:mm a')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
