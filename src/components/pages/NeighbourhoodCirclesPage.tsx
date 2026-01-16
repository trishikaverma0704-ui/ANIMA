import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { NeighbourhoodCircles } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';

export default function NeighbourhoodCirclesPage() {
  const [circles, setCircles] = useState<NeighbourhoodCircles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadCircles();
  }, []);

  const loadCircles = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<NeighbourhoodCircles>('neighbourhoodcircles', {}, { limit: 12, skip });
      setCircles(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading circles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const result = await BaseCrudService.getAll<NeighbourhoodCircles>('neighbourhoodcircles', {}, { limit: 12, skip: skip + 12 });
      setCircles([...circles, ...result.items]);
      setHasNext(result.hasNext);
      setSkip(skip + 12);
    } catch (error) {
      console.error('Error loading more circles:', error);
    }
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="mb-12">
            <h1 className="font-heading text-5xl text-deep-grey mb-4">Neighbourhood Circles</h1>
            <p className="font-paragraph text-lg text-deep-grey/70">
              Connect with pet owners in your local area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
            {isLoading ? null : circles.length > 0 ? (
              circles.map((circle, index) => (
                <motion.div
                  key={circle._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/circle/${circle._id}`} className="block bg-white hover:bg-muted-beige/30 transition-colors duration-300 h-full overflow-hidden">
                    {circle.coverImage && (
                      <div className="overflow-hidden">
                        <Image 
                          src={circle.coverImage} 
                          alt={circle.circleName || 'Circle'}
                          width={400}
                          className="w-full h-56 object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-heading text-2xl text-deep-grey mb-3">{circle.circleName}</h3>
                      
                      {circle.neighbourhoodLocation && (
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="w-4 h-4 text-accent-gold" />
                          <span className="font-paragraph text-sm text-deep-grey/70">{circle.neighbourhoodLocation}</span>
                        </div>
                      )}
                      
                      <p className="font-paragraph text-base text-deep-grey/80 line-clamp-3 mb-4">
                        {circle.description}
                      </p>
                      
                      {circle.memberCount !== undefined && (
                        <div className="flex items-center gap-2 pt-4 border-t border-muted-beige/30">
                          <Users className="w-5 h-5 text-accent-gold" />
                          <span className="font-paragraph text-sm text-deep-grey/70">
                            {circle.memberCount} {circle.memberCount === 1 ? 'member' : 'members'}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <MapPin className="w-16 h-16 text-deep-grey/30 mx-auto mb-4" />
                <p className="font-paragraph text-deep-grey/60">No neighbourhood circles found</p>
              </div>
            )}
          </div>

          {hasNext && !isLoading && (
            <div className="text-center mt-12">
              <Button 
                onClick={loadMore}
                className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors"
              >
                Load More Circles
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
