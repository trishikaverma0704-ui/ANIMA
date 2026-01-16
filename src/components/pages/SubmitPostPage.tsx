import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { CommunityPosts } from '@/entities';
import { Button } from '@/components/ui/button';
import { useMember } from '@/integrations';

export default function SubmitPostPage() {
  const navigate = useNavigate();
  const { member } = useMember();
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const newPost: CommunityPosts = {
        _id: crypto.randomUUID(),
        authorUsername: member?.profile?.nickname || member?.contact?.firstName || 'Anonymous',
        locationTag: location,
        postContent: content,
        postImage: 'https://static.wixstatic.com/media/9c23d6_02872478ef724f67a6bcf3664d1b3445~mv2.png?originWidth=576&originHeight=384',
        postDateTime: new Date().toISOString(),
      };

      await BaseCrudService.create('communityposts', newPost);
      navigate('/community-feed');
    } catch (error) {
      console.error('Error creating post:', error);
      setIsSubmitting(false);
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

          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-5xl text-deep-grey mb-4">Share with Community</h1>
            <p className="font-paragraph text-lg text-deep-grey/70 mb-12">
              Share updates, ask questions, or connect with other pet owners
            </p>

            <form onSubmit={handleSubmit} className="bg-white p-8">
              <div className="mb-6">
                <label className="font-paragraph text-sm text-deep-grey mb-2 block">
                  Location Tag (Optional)
                </label>
                <input 
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Downtown, West End, etc."
                  className="w-full font-paragraph text-base px-4 py-3 border border-muted-beige/30 focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div className="mb-6">
                <label className="font-paragraph text-sm text-deep-grey mb-2 block">
                  Your Message *
                </label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts, questions, or updates..."
                  rows={8}
                  required
                  className="w-full font-paragraph text-base px-4 py-3 border border-muted-beige/30 focus:outline-none focus:border-accent-gold resize-none"
                />
              </div>

              <div className="mb-8">
                <div className="bg-warm-cream p-6 flex items-center gap-4">
                  <ImageIcon className="w-6 h-6 text-accent-gold" />
                  <div>
                    <p className="font-paragraph text-sm text-deep-grey/70">
                      Image upload feature coming soon
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  type="submit"
                  disabled={isSubmitting || !content.trim()}
                  className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Posting...' : 'Post to Community'}
                </Button>
                <Link to="/community-feed">
                  <Button 
                    type="button"
                    className="bg-transparent text-deep-grey border border-muted-beige/30 font-paragraph text-sm px-8 py-3 hover:bg-muted-beige/30 transition-colors"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
