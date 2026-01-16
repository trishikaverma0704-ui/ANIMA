import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Calendar, BookOpen, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { PetWikiArticles } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { format } from 'date-fns';

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<PetWikiArticles | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<PetWikiArticles>('petwikiarticles', id);
      setArticle(data);
    } catch (error) {
      console.error('Error loading article:', error);
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
            to="/pet-wiki" 
            className="inline-flex items-center gap-2 font-paragraph text-sm text-accent-gold hover:text-accent-gold/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pet Wiki
          </Link>

          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : !article ? (
              <div className="text-center py-20">
                <p className="font-paragraph text-deep-grey/60">Article not found</p>
              </div>
            ) : (
              <div className="bg-white">
                {article.featuredImage && (
                  <div className="w-full h-96 overflow-hidden">
                    <Image 
                      src={article.featuredImage} 
                      alt={article.articleTitle || 'Article'}
                      width={1200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-12">
                  <div className="max-w-4xl mx-auto">
                    {article.category && (
                      <div className="inline-block bg-accent-gold/10 px-4 py-2 mb-6">
                        <span className="font-paragraph text-sm text-accent-gold font-medium">{article.category}</span>
                      </div>
                    )}
                    
                    <h1 className="font-heading text-5xl text-deep-grey mb-6">{article.articleTitle}</h1>
                    
                    <div className="flex items-center gap-6 mb-8 pb-6 border-b border-muted-beige/30">
                      {article.author && (
                        <div className="flex items-center gap-2">
                          <User className="w-5 h-5 text-accent-gold" />
                          <span className="font-paragraph text-base text-deep-grey/70">{article.author}</span>
                        </div>
                      )}
                      
                      {article.publicationDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-accent-gold" />
                          <span className="font-paragraph text-base text-deep-grey/70">
                            {format(new Date(article.publicationDate), 'MMMM d, yyyy')}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <p className="font-paragraph text-lg text-deep-grey leading-relaxed whitespace-pre-wrap">
                        {article.articleContent}
                      </p>
                    </div>
                  </div>
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
