import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Calendar, Lock, Unlock, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { SpeciesandBreedClubs } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function ClubDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [club, setClub] = useState<SpeciesandBreedClubs | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadClub();
  }, [id]);

  const loadClub = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<SpeciesandBreedClubs>('speciesbreedclubs', id);
      setClub(data);
    } catch (error) {
      console.error('Error loading club:', error);
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
            to="/breed-clubs" 
            className="inline-flex items-center gap-2 font-paragraph text-sm text-accent-gold hover:text-accent-gold/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Breed Clubs
          </Link>

          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : !club ? (
              <div className="text-center py-20">
                <p className="font-paragraph text-deep-grey/60">Club not found</p>
              </div>
            ) : (
              <div className="bg-white overflow-hidden">
                {club.clubImage && (
                  <div className="w-full h-96 overflow-hidden">
                    <Image 
                      src={club.clubImage} 
                      alt={club.clubName || 'Club'}
                      width={1200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-12">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-start justify-between mb-6">
                      <h1 className="font-heading text-5xl text-deep-grey">{club.clubName}</h1>
                      {club.isPublic !== undefined && (
                        <div className="flex items-center gap-2 bg-warm-cream px-4 py-2">
                          {club.isPublic ? (
                            <>
                              <Unlock className="w-5 h-5 text-accent-gold" />
                              <span className="font-paragraph text-sm text-deep-grey/70">Public</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-5 h-5 text-deep-grey/60" />
                              <span className="font-paragraph text-sm text-deep-grey/70">Private</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-6 mb-8 pb-6 border-b border-muted-beige/30">
                      {club.targetSpeciesBreed && (
                        <div className="flex items-center gap-2">
                          <Paw className="w-5 h-5 text-accent-gold" />
                          <span className="font-paragraph text-base text-deep-grey/70">{club.targetSpeciesBreed}</span>
                        </div>
                      )}
                      
                      {club.creationDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-accent-gold" />
                          <span className="font-paragraph text-base text-deep-grey/70">
                            Created {format(new Date(club.creationDate), 'MMMM yyyy')}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-8">
                      <p className="font-paragraph text-lg text-deep-grey leading-relaxed whitespace-pre-wrap">
                        {club.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors">
                        {club.isPublic ? 'Join Club' : 'Request to Join'}
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
