import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, User, Plus } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { PetWikiArticles } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function PetWikiPage() {
  const [articles, setArticles] = useState<PetWikiArticles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<PetWikiArticles>('petwikiarticles', {}, { limit: 12, skip });
      setArticles(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const result = await BaseCrudService.getAll<PetWikiArticles>('petwikiarticles', {}, { limit: 12, skip: skip + 12 });
      setArticles([...articles, ...result.items]);
      setHasNext(result.hasNext);
      setSkip(skip + 12);
    } catch (error) {
      console.error('Error loading more articles:', error);
    }
  };

  const filteredArticles = filterCategory 
    ? articles.filter(article => article.category?.toLowerCase().includes(filterCategory.toLowerCase()))
    : articles;

  const categories = Array.from(new Set(articles.map(a => a.category).filter(Boolean)));

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="font-heading text-5xl text-deep-grey mb-4">Pet Wiki</h1>
              <p className="font-paragraph text-lg text-deep-grey/70">
                Community-written articles about pet care and information
              </p>
            </div>
            <Link to="/submit-article">
              <Button className="bg-accent-gold text-white font-paragraph text-sm px-6 py-3 hover:bg-accent-gold/90 transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Write Article
              </Button>
            </Link>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="bg-white p-6 mb-8">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-paragraph text-sm text-deep-grey/70">Categories:</span>
                <button 
                  onClick={() => setFilterCategory('')}
                  className={`font-paragraph text-sm px-4 py-2 transition-colors ${
                    filterCategory === '' 
                      ? 'bg-accent-gold text-white' 
                      : 'bg-warm-cream text-deep-grey hover:bg-muted-beige/30'
                  }`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button 
                    key={category}
                    onClick={() => setFilterCategory(category || '')}
                    className={`font-paragraph text-sm px-4 py-2 transition-colors ${
                      filterCategory === category 
                        ? 'bg-accent-gold text-white' 
                        : 'bg-warm-cream text-deep-grey hover:bg-muted-beige/30'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
            {isLoading ? null : filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/article/${article._id}`} className="block bg-white hover:bg-muted-beige/30 transition-colors duration-300 h-full overflow-hidden">
                    {article.featuredImage && (
                      <div className="overflow-hidden">
                        <Image 
                          src={article.featuredImage} 
                          alt={article.articleTitle || 'Article'}
                          width={400}
                          className="w-full h-56 object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {article.category && (
                        <div className="inline-block bg-accent-gold/10 px-3 py-1 mb-3">
                          <span className="font-paragraph text-xs text-accent-gold font-medium">{article.category}</span>
                        </div>
                      )}
                      
                      <h3 className="font-heading text-2xl text-deep-grey mb-3 line-clamp-2">{article.articleTitle}</h3>
                      
                      <p className="font-paragraph text-base text-deep-grey/80 line-clamp-3 mb-4">
                        {article.articleContent}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-muted-beige/30">
                        {article.author && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-deep-grey/60" />
                            <span className="font-paragraph text-xs text-deep-grey/60">{article.author}</span>
                          </div>
                        )}
                        {article.publicationDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-deep-grey/60" />
                            <span className="font-paragraph text-xs text-deep-grey/60">
                              {format(new Date(article.publicationDate), 'MMM d, yyyy')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <BookOpen className="w-16 h-16 text-deep-grey/30 mx-auto mb-4" />
                <p className="font-paragraph text-deep-grey/60 mb-6">No articles found. Be the first to contribute!</p>
                <Link to="/submit-article">
                  <Button className="bg-accent-gold text-white font-paragraph text-sm px-6 py-3">
                    Write First Article
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {hasNext && !isLoading && (
            <div className="text-center mt-12">
              <Button 
                onClick={loadMore}
                className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors"
              >
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
