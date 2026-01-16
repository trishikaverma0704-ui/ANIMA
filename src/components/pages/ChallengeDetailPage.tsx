import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Hash, TrendingUp, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ChallengesandTrends } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';

export default function ChallengeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<ChallengesandTrends | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadChallenge();
  }, [id]);

  const loadChallenge = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<ChallengesandTrends>('challengestrends', id);
      setChallenge(data);
    } catch (error) {
      console.error('Error loading challenge:', error);
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
            to="/challenges" 
            className="inline-flex items-center gap-2 font-paragraph text-sm text-accent-gold hover:text-accent-gold/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Challenges
          </Link>

          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : !challenge ? (
              <div className="text-center py-20">
                <p className="font-paragraph text-deep-grey/60">Challenge not found</p>
              </div>
            ) : (
              <div className="bg-white overflow-hidden">
                {challenge.promotionalImage && (
                  <div className="w-full h-96 overflow-hidden">
                    <Image 
                      src={challenge.promotionalImage} 
                      alt={challenge.challengeTitle || 'Challenge'}
                      width={1200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-12">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="font-heading text-5xl text-deep-grey mb-6">{challenge.challengeTitle}</h1>
                    
                    {challenge.hashtag && (
                      <div className="flex items-center gap-3 mb-8 pb-8 border-b border-muted-beige/30">
                        <Hash className="w-6 h-6 text-accent-gold" />
                        <span className="font-paragraph text-xl text-accent-gold font-medium">{challenge.hashtag}</span>
                      </div>
                    )}
                    
                    <div className="mb-8">
                      <h2 className="font-heading text-2xl text-deep-grey mb-4">About This Challenge</h2>
                      <p className="font-paragraph text-lg text-deep-grey leading-relaxed whitespace-pre-wrap">
                        {challenge.description}
                      </p>
                    </div>
                    
                    {challenge.rules && (
                      <div className="bg-warm-cream p-8 mb-8">
                        <h3 className="font-heading text-xl text-deep-grey mb-4">Challenge Rules</h3>
                        <p className="font-paragraph text-base text-deep-grey leading-relaxed whitespace-pre-wrap">
                          {challenge.rules}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <Button className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors">
                        Join Challenge
                      </Button>
                      <Button className="bg-transparent text-deep-grey border border-muted-beige/30 font-paragraph text-sm px-8 py-3 hover:bg-muted-beige/30 transition-colors">
                        Share Challenge
                      </Button>
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
