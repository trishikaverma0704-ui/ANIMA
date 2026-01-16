import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MapPin, Mail, Phone, ExternalLink, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { RescueandNGODirectory } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';

export default function RescueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [organization, setOrganization] = useState<RescueandNGODirectory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrganization();
  }, [id]);

  const loadOrganization = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<RescueandNGODirectory>('rescuengodirectory', id);
      setOrganization(data);
    } catch (error) {
      console.error('Error loading organization:', error);
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
            to="/rescue-directory" 
            className="inline-flex items-center gap-2 font-paragraph text-sm text-accent-gold hover:text-accent-gold/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>

          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : !organization ? (
              <div className="text-center py-20">
                <p className="font-paragraph text-deep-grey/60">Organization not found</p>
              </div>
            ) : (
              <div className="bg-white p-12">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-start gap-8 mb-8 pb-8 border-b border-muted-beige/30">
                    {organization.organizationLogo ? (
                      <div className="flex-shrink-0">
                        <Image 
                          src={organization.organizationLogo} 
                          alt={organization.organizationName || 'Organization'}
                          width={150}
                          className="w-32 h-32 object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-32 h-32 bg-muted-beige flex items-center justify-center">
                        <Heart className="w-16 h-16 text-accent-gold" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h1 className="font-heading text-5xl text-deep-grey mb-4">{organization.organizationName}</h1>
                      
                      {organization.locationAddress && (
                        <div className="flex items-start gap-2 mb-4">
                          <MapPin className="w-5 h-5 text-accent-gold mt-1" />
                          <span className="font-paragraph text-base text-deep-grey/70">{organization.locationAddress}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="font-heading text-2xl text-deep-grey mb-4">Mission</h2>
                    <p className="font-paragraph text-lg text-deep-grey leading-relaxed whitespace-pre-wrap">
                      {organization.missionDescription}
                    </p>
                  </div>
                  
                  <div className="bg-warm-cream p-8 mb-8">
                    <h3 className="font-heading text-xl text-deep-grey mb-6">Contact Information</h3>
                    <div className="space-y-4">
                      {organization.contactEmail && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-accent-gold" />
                          <div>
                            <p className="font-paragraph text-xs text-deep-grey/60 mb-1">Email</p>
                            <a href={`mailto:${organization.contactEmail}`} className="font-paragraph text-base text-deep-grey hover:text-accent-gold transition-colors">
                              {organization.contactEmail}
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {organization.contactPhone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-accent-gold" />
                          <div>
                            <p className="font-paragraph text-xs text-deep-grey/60 mb-1">Phone</p>
                            <a href={`tel:${organization.contactPhone}`} className="font-paragraph text-base text-deep-grey hover:text-accent-gold transition-colors">
                              {organization.contactPhone}
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {organization.websiteUrl && (
                        <div className="flex items-center gap-3">
                          <ExternalLink className="w-5 h-5 text-accent-gold" />
                          <div>
                            <p className="font-paragraph text-xs text-deep-grey/60 mb-1">Website</p>
                            <a 
                              href={organization.websiteUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-paragraph text-base text-accent-gold hover:text-accent-gold/80 transition-colors"
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors">
                      Contact Organization
                    </Button>
                    {organization.websiteUrl && (
                      <a href={organization.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-transparent text-deep-grey border border-muted-beige/30 font-paragraph text-sm px-8 py-3 hover:bg-muted-beige/30 transition-colors">
                          Visit Website
                        </Button>
                      </a>
                    )}
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
