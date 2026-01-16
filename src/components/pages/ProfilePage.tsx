import { useMember } from '@/integrations';
import { User, Mail, Calendar, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { member } = useMember();

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <section className="w-full py-20">
        <div className="max-w-[100rem] mx-auto px-8">
          <h1 className="font-heading text-5xl text-deep-grey mb-12">Your Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8">
                <div className="flex flex-col items-center text-center mb-8">
                  {member?.profile?.photo?.url ? (
                    <Image 
                      src={member.profile.photo.url} 
                      alt={member.profile.nickname || 'Profile'}
                      width={120}
                      className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-muted-beige flex items-center justify-center mb-4">
                      <User className="w-16 h-16 text-accent-gold" />
                    </div>
                  )}
                  <h2 className="font-heading text-2xl text-deep-grey mb-2">
                    {member?.profile?.nickname || member?.contact?.firstName || 'Pet Owner'}
                  </h2>
                  {member?.profile?.title && (
                    <p className="font-paragraph text-sm text-deep-grey/60">{member.profile.title}</p>
                  )}
                </div>
                
                <div className="space-y-4 border-t border-muted-beige/30 pt-6">
                  {member?.loginEmail && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-accent-gold" />
                      <div>
                        <p className="font-paragraph text-xs text-deep-grey/60">Email</p>
                        <p className="font-paragraph text-sm text-deep-grey">{member.loginEmail}</p>
                      </div>
                    </div>
                  )}
                  
                  {member?._createdDate && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-accent-gold" />
                      <div>
                        <p className="font-paragraph text-xs text-deep-grey/60">Member Since</p>
                        <p className="font-paragraph text-sm text-deep-grey">
                          {format(new Date(member._createdDate), 'MMMM yyyy')}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {member?.status && (
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-accent-gold" />
                      <div>
                        <p className="font-paragraph text-xs text-deep-grey/60">Status</p>
                        <p className="font-paragraph text-sm text-deep-grey capitalize">{member.status.toLowerCase()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Account Information */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 mb-8">
                <h3 className="font-heading text-2xl text-deep-grey mb-6">Account Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-paragraph text-sm text-deep-grey/60 mb-2 block">First Name</label>
                    <p className="font-paragraph text-base text-deep-grey">
                      {member?.contact?.firstName || 'Not provided'}
                    </p>
                  </div>
                  
                  <div>
                    <label className="font-paragraph text-sm text-deep-grey/60 mb-2 block">Last Name</label>
                    <p className="font-paragraph text-base text-deep-grey">
                      {member?.contact?.lastName || 'Not provided'}
                    </p>
                  </div>
                  
                  <div>
                    <label className="font-paragraph text-sm text-deep-grey/60 mb-2 block">Username</label>
                    <p className="font-paragraph text-base text-deep-grey">
                      {member?.profile?.nickname || 'Not set'}
                    </p>
                  </div>
                  
                  <div>
                    <label className="font-paragraph text-sm text-deep-grey/60 mb-2 block">Email Verified</label>
                    <p className="font-paragraph text-base text-deep-grey">
                      {member?.loginEmailVerified ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Pet Profiles Section */}
              <div className="bg-white p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-2xl text-deep-grey">Pet Profiles</h3>
                  <Heart className="w-6 h-6 text-accent-gold" />
                </div>
                
                <div className="bg-warm-cream p-6 text-center">
                  <Heart className="w-12 h-12 text-deep-grey/30 mx-auto mb-4" />
                  <p className="font-paragraph text-sm text-deep-grey/60 mb-4">
                    Add your pet's information to connect with other pet owners in your area.
                  </p>
                  <button className="bg-accent-gold text-white font-paragraph text-sm px-6 py-3 hover:bg-accent-gold/90 transition-colors">
                    Add Pet Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
