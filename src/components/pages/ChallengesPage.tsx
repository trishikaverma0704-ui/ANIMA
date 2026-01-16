import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Hash } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ChallengesandTrends } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<ChallengesandTrends[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<ChallengesandTrends>('challengestrends', {}, { limit: 12, skip });
      setChallenges(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const result = await BaseCrudService.getAll<ChallengesandTrends>('challengestrends', {}, { limit: 12, skip: skip + 12 });
      setChallenges([...challenges, ...result.items]);
      setHasNext(result.hasNext);
      setSkip(skip + 12);
    } catch (error) {
      console.error('Error loading more challenges:', error);
    }
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="mb-12">
            <h1 className="font-heading text-5xl text-deep-grey mb-4">Challenges & Trends</h1>
            <p className="font-paragraph text-lg text-deep-grey/70">
              Join community challenges and discover trending topics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
            {isLoading ? null : challenges.length > 0 ? (
              challenges.map((challenge, index) => (
                <motion.div
                  key={challenge._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/challenge/${challenge._id}`} className="block bg-white hover:bg-muted-beige/30 transition-colors duration-300 h-full overflow-hidden">
                    {challenge.promotionalImage && (
                      <div className="overflow-hidden">
                        <Image 
                          src={challenge.promotionalImage} 
                          alt={challenge.challengeTitle || 'Challenge'}
                          width={400}
                          className="w-full h-56 object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-heading text-2xl text-deep-grey mb-4 line-clamp-2">{challenge.challengeTitle}</h3>
                      
                      {challenge.hashtag && (
                        <div className="flex items-center gap-2 mb-4">
                          <Hash className="w-4 h-4 text-accent-gold" />
                          <span className="font-paragraph text-sm text-accent-gold font-medium">{challenge.hashtag}</span>
                        </div>
                      )}
                      
                      <p className="font-paragraph text-base text-deep-grey/80 line-clamp-3 mb-4">
                        {challenge.description}
                      </p>
                      
                      {challenge.rules && (
                        <div className="pt-4 border-t border-muted-beige/30">
                          <p className="font-paragraph text-xs text-deep-grey/60 line-clamp-2">
                            Rules: {challenge.rules}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <TrendingUp className="w-16 h-16 text-deep-grey/30 mx-auto mb-4" />
                <p className="font-paragraph text-deep-grey/60">No challenges available</p>
              </div>
            )}
          </div>

          {hasNext && !isLoading && (
            <div className="text-center mt-12">
              <Button 
                onClick={loadMore}
                className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors"
              >
                Load More Challenges
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
