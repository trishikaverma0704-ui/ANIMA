/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: challengestrends
 * Interface for ChallengesandTrends
 */
export interface ChallengesandTrends {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  challengeTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  rules?: string;
  /** @wixFieldType text */
  hashtag?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  promotionalImage?: string;
}


/**
 * Collection ID: communityposts
 * Interface for CommunityPosts
 */
export interface CommunityPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  authorUsername?: string;
  /** @wixFieldType text */
  locationTag?: string;
  /** @wixFieldType text */
  postContent?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  postImage?: string;
  /** @wixFieldType datetime */
  postDateTime?: Date | string;
}


/**
 * Collection ID: emergencyalerts
 * Interface for EmergencyAlerts
 */
export interface EmergencyAlerts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  petName?: string;
  /** @wixFieldType text */
  lastSeenLocation?: string;
  /** @wixFieldType text */
  emergencyDescription?: string;
  /** @wixFieldType text */
  contactInformation?: string;
  /** @wixFieldType text */
  urgencyStatus?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  petPhoto?: string;
}


/**
 * Collection ID: events
 * Interface for Events
 */
export interface Events {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventTitle?: string;
  /** @wixFieldType datetime */
  eventDateTime?: Date | string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventImage?: string;
}


/**
 * Collection ID: neighbourhoodcircles
 * Interface for NeighbourhoodCircles
 */
export interface NeighbourhoodCircles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  circleName?: string;
  /** @wixFieldType text */
  neighbourhoodLocation?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
  /** @wixFieldType number */
  memberCount?: number;
}


/**
 * Collection ID: petwikiarticles
 * Interface for PetWikiArticles
 */
export interface PetWikiArticles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  articleTitle?: string;
  /** @wixFieldType text */
  articleContent?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  featuredImage?: string;
  /** @wixFieldType datetime */
  publicationDate?: Date | string;
}


/**
 * Collection ID: rescuengodirectory
 * Interface for RescueandNGODirectory
 */
export interface RescueandNGODirectory {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  organizationName?: string;
  /** @wixFieldType text */
  locationAddress?: string;
  /** @wixFieldType text */
  contactEmail?: string;
  /** @wixFieldType text */
  contactPhone?: string;
  /** @wixFieldType url */
  websiteUrl?: string;
  /** @wixFieldType text */
  missionDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  organizationLogo?: string;
}


/**
 * Collection ID: speciesbreedclubs
 * Interface for SpeciesandBreedClubs
 */
export interface SpeciesandBreedClubs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clubName?: string;
  /** @wixFieldType text */
  targetSpeciesBreed?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  clubImage?: string;
  /** @wixFieldType boolean */
  isPublic?: boolean;
  /** @wixFieldType datetime */
  creationDate?: Date | string;
}


/**
 * Collection ID: userprofiles
 * Interface for UserProfiles
 */
export interface UserProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  username?: string;
  /** @wixFieldType text */
  userBio?: string;
  /** @wixFieldType text */
  petName?: string;
  /** @wixFieldType text */
  petBreedSpecies?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  petPhoto?: string;
}
