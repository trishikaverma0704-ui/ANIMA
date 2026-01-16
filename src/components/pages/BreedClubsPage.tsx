import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Calendar, Lock, Unlock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { SpeciesandBreedClubs } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function BreedClubsPage() {
  const [clubs, setClubs] = useState<SpeciesandBreedClubs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<SpeciesandBreedClubs>('speciesbreedclubs', {}, { limit: 12, skip });
      setClubs(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading clubs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const result = await BaseCrudService.getAll<SpeciesandBreedClubs>('speciesbreedclubs', {}, { limit: 12, skip: skip + 12 });
      setClubs([...clubs, ...result.items]);
      setHasNext(result.hasNext);
      setSkip(skip + 12);
    } catch (error) {
      console.error('Error loading more clubs:', error);
    }
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="mb-12">
            <h1 className="font-heading text-5xl text-deep-grey mb-4">Species & Breed Clubs</h1>
            <p className="font-paragraph text-lg text-deep-grey/70">
              Connect with owners of the same species or breed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
            {isLoading ? null : clubs.length > 0 ? (
              clubs.map((club, index) => (
                <motion.div
                  key={club._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/club/${club._id}`} className="block bg-white hover:bg-muted-beige/30 transition-colors duration-300 h-full overflow-hidden">
                    {club.clubImage && (
                      <div className="overflow-hidden">
                        <Image 
                          src={club.clubImage} 
                          alt={club.clubName || 'Club'}
                          width={400}
                          className="w-full h-56 object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-heading text-2xl text-deep-grey">{club.clubName}</h3>
                        {club.isPublic !== undefined && (
                          <div className="flex-shrink-0">
                            {club.isPublic ? (
                              <Unlock className="w-5 h-5 text-accent-gold" />
                            ) : (
                              <Lock className="w-5 h-5 text-deep-grey/40" />
                            )}
                          </div>
                        )}
                      </div>
                      
                      {club.targetSpeciesBreed && (
                        <div className="flex items-center gap-2 mb-4">
                          <Heart className="w-4 h-4 text-accent-gold" />
                          <span className="font-paragraph text-sm text-deep-grey/70">{club.targetSpeciesBreed}</span>
                        </div>
                      )}
                      
                      <p className="font-paragraph text-base text-deep-grey/80 line-clamp-3 mb-4">
                        {club.description}
                      </p>
                      
                      {club.creationDate && (
                        <div className="flex items-center gap-2 pt-4 border-t border-muted-beige/30">
                          <Calendar className="w-4 h-4 text-deep-grey/60" />
                          <span className="font-paragraph text-xs text-deep-grey/60">
                            Created {format(new Date(club.creationDate), 'MMM yyyy')}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <Heart className="w-16 h-16 text-deep-grey/30 mx-auto mb-4" />
                <p className="font-paragraph text-deep-grey/60">No breed clubs found</p>
              </div>
            )}
          </div>

          {hasNext && !isLoading && (
            <div className="text-center mt-12">
              <Button 
                onClick={loadMore}
                className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors"
              >
                Load More Clubs
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
