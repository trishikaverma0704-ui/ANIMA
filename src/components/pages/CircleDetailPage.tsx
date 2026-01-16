import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { NeighbourhoodCircles } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';

export default function CircleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [circle, setCircle] = useState<NeighbourhoodCircles | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCircle();
  }, [id]);

  const loadCircle = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<NeighbourhoodCircles>('neighbourhoodcircles', id);
      setCircle(data);
    } catch (error) {
      console.error('Error loading circle:', error);
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
            to="/neighbourhood-circles" 
            className="inline-flex items-center gap-2 font-paragraph text-sm text-accent-gold hover:text-accent-gold/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Neighbourhood Circles
          </Link>

          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : !circle ? (
              <div className="text-center py-20">
                <p className="font-paragraph text-deep-grey/60">Circle not found</p>
              </div>
            ) : (
              <div className="bg-white overflow-hidden">
                {circle.coverImage && (
                  <div className="w-full h-96 overflow-hidden">
                    <Image 
                      src={circle.coverImage} 
                      alt={circle.circleName || 'Circle'}
                      width={1200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-12">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="font-heading text-5xl text-deep-grey mb-6">{circle.circleName}</h1>
                    
                    <div className="flex items-center gap-6 mb-8 pb-6 border-b border-muted-beige/30">
                      {circle.neighbourhoodLocation && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-accent-gold" />
                          <span className="font-paragraph text-base text-deep-grey/70">{circle.neighbourhoodLocation}</span>
                        </div>
                      )}
                      
                      {circle.memberCount !== undefined && (
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-accent-gold" />
                          <span className="font-paragraph text-base text-deep-grey/70">
                            {circle.memberCount} {circle.memberCount === 1 ? 'member' : 'members'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-8">
                      <p className="font-paragraph text-lg text-deep-grey leading-relaxed whitespace-pre-wrap">
                        {circle.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors">
                        Join Circle
                      </Button>
                      <Button className="bg-transparent text-deep-grey border border-muted-beige/30 font-paragraph text-sm px-8 py-3 hover:bg-muted-beige/30 transition-colors">
                        View Members
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
