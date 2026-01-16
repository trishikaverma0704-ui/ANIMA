import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Events } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Events | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<Events>('events', id);
      setEvent(data);
    } catch (error) {
      console.error('Error loading event:', error);
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
            to="/events" 
            className="inline-flex items-center gap-2 font-paragraph text-sm text-accent-gold hover:text-accent-gold/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>

          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : !event ? (
              <div className="text-center py-20">
                <p className="font-paragraph text-deep-grey/60">Event not found</p>
              </div>
            ) : (
              <div className="bg-white overflow-hidden">
                {event.eventImage && (
                  <div className="w-full h-96 overflow-hidden">
                    <Image 
                      src={event.eventImage} 
                      alt={event.eventTitle || 'Event'}
                      width={1200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-12">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="font-heading text-5xl text-deep-grey mb-8">{event.eventTitle}</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-muted-beige/30">
                      {event.eventDateTime && (
                        <div className="flex items-center gap-3">
                          <Calendar className="w-6 h-6 text-accent-gold" />
                          <div>
                            <p className="font-paragraph text-xs text-deep-grey/60 mb-1">Date</p>
                            <p className="font-paragraph text-base text-deep-grey">
                              {format(new Date(event.eventDateTime), 'MMMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {event.eventDateTime && (
                        <div className="flex items-center gap-3">
                          <Clock className="w-6 h-6 text-accent-gold" />
                          <div>
                            <p className="font-paragraph text-xs text-deep-grey/60 mb-1">Time</p>
                            <p className="font-paragraph text-base text-deep-grey">
                              {format(new Date(event.eventDateTime), 'h:mm a')}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {event.location && (
                        <div className="flex items-center gap-3">
                          <MapPin className="w-6 h-6 text-accent-gold" />
                          <div>
                            <p className="font-paragraph text-xs text-deep-grey/60 mb-1">Location</p>
                            <p className="font-paragraph text-base text-deep-grey">{event.location}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-8">
                      <h2 className="font-heading text-2xl text-deep-grey mb-4">About This Event</h2>
                      <p className="font-paragraph text-lg text-deep-grey leading-relaxed whitespace-pre-wrap">
                        {event.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors">
                        Register for Event
                      </Button>
                      <Button className="bg-transparent text-deep-grey border border-muted-beige/30 font-paragraph text-sm px-8 py-3 hover:bg-muted-beige/30 transition-colors">
                        Share Event
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
