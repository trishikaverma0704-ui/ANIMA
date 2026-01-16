import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { PetWikiArticles } from '@/entities';
import { Button } from '@/components/ui/button';
import { useMember } from '@/integrations';

export default function SubmitArticlePage() {
  const navigate = useNavigate();
  const { member } = useMember();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const newArticle: PetWikiArticles = {
        _id: crypto.randomUUID(),
        articleTitle: title,
        articleContent: content,
        author: member?.profile?.nickname || member?.contact?.firstName || 'Anonymous',
        category: category || 'General',
        featuredImage: 'https://static.wixstatic.com/media/9c23d6_341546b1e664431aa8bca44e614725e8~mv2.png?originWidth=576&originHeight=384',
        publicationDate: new Date().toISOString(),
      };

      await BaseCrudService.create('petwikiarticles', newArticle);
      navigate('/pet-wiki');
    } catch (error) {
      console.error('Error creating article:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <Link 
            to="/pet-wiki" 
            className="inline-flex items-center gap-2 font-paragraph text-sm text-accent-gold hover:text-accent-gold/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pet Wiki
          </Link>

          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-5xl text-deep-grey mb-4">Write an Article</h1>
            <p className="font-paragraph text-lg text-deep-grey/70 mb-12">
              Share your knowledge and help other pet owners
            </p>

            <form onSubmit={handleSubmit} className="bg-white p-8">
              <div className="mb-6">
                <label className="font-paragraph text-sm text-deep-grey mb-2 block">
                  Article Title *
                </label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., How to Train Your Puppy"
                  required
                  className="w-full font-paragraph text-base px-4 py-3 border border-muted-beige/30 focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div className="mb-6">
                <label className="font-paragraph text-sm text-deep-grey mb-2 block">
                  Category
                </label>
                <input 
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Training, Health, Nutrition"
                  className="w-full font-paragraph text-base px-4 py-3 border border-muted-beige/30 focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div className="mb-6">
                <label className="font-paragraph text-sm text-deep-grey mb-2 block">
                  Article Content *
                </label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article content here..."
                  rows={12}
                  required
                  className="w-full font-paragraph text-base px-4 py-3 border border-muted-beige/30 focus:outline-none focus:border-accent-gold resize-none"
                />
              </div>

              <div className="mb-8">
                <div className="bg-warm-cream p-6 flex items-center gap-4">
                  <ImageIcon className="w-6 h-6 text-accent-gold" />
                  <div>
                    <p className="font-paragraph text-sm text-deep-grey/70">
                      Featured image upload coming soon
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Article'}
                </Button>
                <Link to="/pet-wiki">
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
