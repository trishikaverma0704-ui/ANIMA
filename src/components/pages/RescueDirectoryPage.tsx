import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { RescueandNGODirectory } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';

export default function RescueDirectoryPage() {
  const [organizations, setOrganizations] = useState<RescueandNGODirectory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<RescueandNGODirectory>('rescuengodirectory', {}, { limit: 12, skip });
      setOrganizations(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading organizations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const result = await BaseCrudService.getAll<RescueandNGODirectory>('rescuengodirectory', {}, { limit: 12, skip: skip + 12 });
      setOrganizations([...organizations, ...result.items]);
      setHasNext(result.hasNext);
      setSkip(skip + 12);
    } catch (error) {
      console.error('Error loading more organizations:', error);
    }
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="mb-12">
            <h1 className="font-heading text-5xl text-deep-grey mb-4">Rescue & NGO Directory</h1>
            <p className="font-paragraph text-lg text-deep-grey/70">
              Connect with rescue organizations and NGOs in your area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px]">
            {isLoading ? null : organizations.length > 0 ? (
              organizations.map((org, index) => (
                <motion.div
                  key={org._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/rescue/${org._id}`} className="block bg-white p-8 hover:bg-muted-beige/30 transition-colors duration-300 h-full">
                    <div className="flex items-start gap-6">
                      {org.organizationLogo ? (
                        <div className="flex-shrink-0">
                          <Image 
                            src={org.organizationLogo} 
                            alt={org.organizationName || 'Organization'}
                            width={100}
                            className="w-24 h-24 object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-24 h-24 bg-muted-beige flex items-center justify-center">
                          <Heart className="w-12 h-12 text-accent-gold" />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl text-deep-grey mb-3">{org.organizationName}</h3>
                        
                        {org.locationAddress && (
                          <div className="flex items-start gap-2 mb-3">
                            <MapPin className="w-4 h-4 text-accent-gold mt-1 flex-shrink-0" />
                            <span className="font-paragraph text-sm text-deep-grey/70">{org.locationAddress}</span>
                          </div>
                        )}
                        
                        <p className="font-paragraph text-base text-deep-grey/80 line-clamp-3 mb-4">
                          {org.missionDescription}
                        </p>
                        
                        <div className="space-y-2 pt-4 border-t border-muted-beige/30">
                          {org.contactEmail && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-accent-gold" />
                              <span className="font-paragraph text-sm text-deep-grey/70">{org.contactEmail}</span>
                            </div>
                          )}
                          {org.contactPhone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-accent-gold" />
                              <span className="font-paragraph text-sm text-deep-grey/70">{org.contactPhone}</span>
                            </div>
                          )}
                          {org.websiteUrl && (
                            <div className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4 text-accent-gold" />
                              <span className="font-paragraph text-sm text-accent-gold hover:text-accent-gold/80">Visit Website</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <Heart className="w-16 h-16 text-deep-grey/30 mx-auto mb-4" />
                <p className="font-paragraph text-deep-grey/60">No rescue organizations found</p>
              </div>
            )}
          </div>

          {hasNext && !isLoading && (
            <div className="text-center mt-12">
              <Button 
                onClick={loadMore}
                className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors"
              >
                Load More Organizations
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
