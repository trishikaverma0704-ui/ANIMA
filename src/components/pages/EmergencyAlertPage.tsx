import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Phone, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { EmergencyAlerts } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { useMember } from '@/integrations';

export default function EmergencyAlertPage() {
  const navigate = useNavigate();
  const { member } = useMember();
  const [alerts, setAlerts] = useState<EmergencyAlerts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [petName, setPetName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [urgency, setUrgency] = useState('HIGH');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<EmergencyAlerts>('emergencyalerts', {}, { limit: 20 });
      setAlerts(result.items);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName.trim() || !location.trim() || !description.trim() || !contact.trim()) return;

    setIsSubmitting(true);
    try {
      const newAlert: EmergencyAlerts = {
        _id: crypto.randomUUID(),
        petName,
        lastSeenLocation: location,
        emergencyDescription: description,
        contactInformation: contact,
        urgencyStatus: urgency,
        petPhoto: 'https://static.wixstatic.com/media/9c23d6_8eb0272e86d94f4da85b0d2bc2d0f4ec~mv2.png?originWidth=384&originHeight=192',
      };

      await BaseCrudService.create('emergencyalerts', newAlert);
      await loadAlerts();
      setShowForm(false);
      setPetName('');
      setLocation('');
      setDescription('');
      setContact('');
      setUrgency('HIGH');
    } catch (error) {
      console.error('Error creating alert:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-emergency-red">
      <Header />
      
      {/* Emergency Banner */}
      <section className="w-full bg-emergency-red py-12">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <AlertTriangle className="w-12 h-12 text-white" />
            <h1 className="font-heading text-5xl text-white">Emergency Broadcast</h1>
          </div>
          <p className="font-paragraph text-lg text-white/90 text-center max-w-3xl mx-auto">
            Report lost pets or urgent situations. The community will be alerted immediately.
          </p>
        </div>
      </section>

      {/* Alert Form / List Toggle */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button 
              onClick={() => setShowForm(false)}
              className={`font-paragraph text-sm px-6 py-3 transition-colors ${
                !showForm 
                  ? 'bg-emergency-red text-white' 
                  : 'bg-warm-cream text-deep-grey hover:bg-muted-beige/30'
              }`}
            >
              View Active Alerts
            </Button>
            <Button 
              onClick={() => setShowForm(true)}
              className={`font-paragraph text-sm px-6 py-3 transition-colors ${
                showForm 
                  ? 'bg-emergency-red text-white' 
                  : 'bg-warm-cream text-deep-grey hover:bg-muted-beige/30'
              }`}
            >
              Post Emergency Alert
            </Button>
          </div>

          {showForm ? (
            <div className="max-w-3xl mx-auto">
              <div className="bg-emergency-red/10 border-l-4 border-emergency-red p-6 mb-8">
                <p className="font-paragraph text-sm text-deep-grey">
                  <strong>Important:</strong> This is for emergency situations only. Your alert will be broadcast to the entire community immediately.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-warm-cream p-8">
                <div className="mb-6">
                  <label className="font-paragraph text-sm text-deep-grey mb-2 block">
                    Pet Name *
                  </label>
                  <input 
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Enter pet's name"
                    required
                    className="w-full font-paragraph text-base px-4 py-3 border border-muted-beige/30 focus:outline-none focus:border-emergency-red bg-white"
                  />
                </div>

                <div className="mb-6">
                  <label className="font-paragraph text-sm text-deep-grey mb-2 block">
                    Last Seen Location *
                  </label>
                  <input 
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Where was your pet last seen?"
                    required
                    className="w-full font-paragraph text-base px-4 py-3 border border-muted-beige/30 focus:outline-none focus:border-emergency-red bg-white"
                  />
                </div>

                <div className="mb-6">
                  <label className="font-paragraph text-sm text-deep-grey mb-2 block">
                    Emergency Description *
                  </label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the situation, pet's appearance, and any other important details..."
                    rows={6}
                    required
                    className="w-full font-paragraph text-base px-4 py-3 border border-muted-beige/30 focus:outline-none focus:border-emergency-red resize-none bg-white"
                  />
                </div>

                <div className="mb-6">
                  <label className="font-paragraph text-sm text-deep-grey mb-2 block">
                    Contact Information *
                  </label>
                  <input 
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Phone number or email"
                    required
                    className="w-full font-paragraph text-base px-4 py-3 border border-muted-beige/30 focus:outline-none focus:border-emergency-red bg-white"
                  />
                </div>

                <div className="mb-8">
                  <label className="font-paragraph text-sm text-deep-grey mb-2 block">
                    Urgency Level
                  </label>
                  <select 
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full font-paragraph text-base px-4 py-3 border border-muted-beige/30 focus:outline-none focus:border-emergency-red bg-white"
                  >
                    <option value="HIGH">High - Immediate attention needed</option>
                    <option value="MEDIUM">Medium - Urgent but stable</option>
                    <option value="LOW">Low - Monitoring situation</option>
                  </select>
                </div>

                <div className="mb-8">
                  <div className="bg-white p-6 flex items-center gap-4">
                    <ImageIcon className="w-6 h-6 text-emergency-red" />
                    <div>
                      <p className="font-paragraph text-sm text-deep-grey/70">
                        Pet photo upload feature coming soon
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button 
                    type="submit"
                    disabled={isSubmitting || !petName.trim() || !location.trim() || !description.trim() || !contact.trim()}
                    className="bg-emergency-red text-white font-paragraph text-sm px-8 py-3 hover:bg-emergency-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Broadcasting...' : 'Broadcast Emergency Alert'}
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-transparent text-deep-grey border border-muted-beige/30 font-paragraph text-sm px-8 py-3 hover:bg-muted-beige/30 transition-colors"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
              {isLoading ? null : alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <motion.div
                    key={alert._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <div className="bg-warm-cream p-6 border-l-4 border-emergency-red">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-heading text-2xl text-deep-grey">{alert.petName}</h3>
                        {alert.urgencyStatus && (
                          <span className={`font-paragraph text-xs px-3 py-1 ${
                            alert.urgencyStatus === 'HIGH' 
                              ? 'bg-emergency-red text-white' 
                              : alert.urgencyStatus === 'MEDIUM'
                              ? 'bg-accent-gold text-white'
                              : 'bg-muted-beige text-deep-grey'
                          }`}>
                            {alert.urgencyStatus}
                          </span>
                        )}
                      </div>

                      {alert.petPhoto && (
                        <div className="mb-4">
                          <Image 
                            src={alert.petPhoto} 
                            alt={alert.petName || 'Pet'}
                            width={400}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}

                      {alert.lastSeenLocation && (
                        <div className="flex items-start gap-2 mb-3">
                          <MapPin className="w-4 h-4 text-emergency-red mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-paragraph text-xs text-deep-grey/60">Last Seen</p>
                            <p className="font-paragraph text-sm text-deep-grey">{alert.lastSeenLocation}</p>
                          </div>
                        </div>
                      )}

                      <p className="font-paragraph text-base text-deep-grey/80 mb-4 line-clamp-3">
                        {alert.emergencyDescription}
                      </p>

                      {alert.contactInformation && (
                        <div className="flex items-center gap-2 pt-4 border-t border-muted-beige/30">
                          <Phone className="w-4 h-4 text-emergency-red" />
                          <a href={`tel:${alert.contactInformation}`} className="font-paragraph text-sm text-emergency-red hover:text-emergency-red/80">
                            {alert.contactInformation}
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <AlertTriangle className="w-16 h-16 text-deep-grey/30 mx-auto mb-4" />
                  <p className="font-paragraph text-deep-grey/60">No active emergency alerts</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
