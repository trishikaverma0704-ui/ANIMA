import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Events } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function EventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Events>('events', {}, { limit: 12, skip });
      setEvents(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const result = await BaseCrudService.getAll<Events>('events', {}, { limit: 12, skip: skip + 12 });
      setEvents([...events, ...result.items]);
      setHasNext(result.hasNext);
      setSkip(skip + 12);
    } catch (error) {
      console.error('Error loading more events:', error);
    }
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="mb-12">
            <h1 className="font-heading text-5xl text-deep-grey mb-4">Events & Meetups</h1>
            <p className="font-paragraph text-lg text-deep-grey/70">
              Join upcoming pet-related events and meetups in your area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
            {isLoading ? null : events.length > 0 ? (
              events.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/event/${event._id}`} className="block bg-white hover:bg-muted-beige/30 transition-colors duration-300 h-full overflow-hidden">
                    {event.eventImage && (
                      <div className="overflow-hidden">
                        <Image 
                          src={event.eventImage} 
                          alt={event.eventTitle || 'Event'}
                          width={400}
                          className="w-full h-56 object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-heading text-2xl text-deep-grey mb-4 line-clamp-2">{event.eventTitle}</h3>
                      
                      {event.eventDateTime && (
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-4 h-4 text-accent-gold" />
                          <span className="font-paragraph text-sm text-deep-grey/70">
                            {format(new Date(event.eventDateTime), 'MMM d, yyyy')}
                          </span>
                        </div>
                      )}
                      
                      {event.eventDateTime && (
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4 text-accent-gold" />
                          <span className="font-paragraph text-sm text-deep-grey/70">
                            {format(new Date(event.eventDateTime), 'h:mm a')}
                          </span>
                        </div>
                      )}
                      
                      {event.location && (
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="w-4 h-4 text-accent-gold" />
                          <span className="font-paragraph text-sm text-deep-grey/70">{event.location}</span>
                        </div>
                      )}
                      
                      <p className="font-paragraph text-base text-deep-grey/80 line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <Calendar className="w-16 h-16 text-deep-grey/30 mx-auto mb-4" />
                <p className="font-paragraph text-deep-grey/60">No upcoming events</p>
              </div>
            )}
          </div>

          {hasNext && !isLoading && (
            <div className="text-center mt-12">
              <Button 
                onClick={loadMore}
                className="bg-accent-gold text-white font-paragraph text-sm px-8 py-3 hover:bg-accent-gold/90 transition-colors"
              >
                Load More Events
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
