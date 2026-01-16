import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

import HomePage from '@/components/pages/HomePage';
import ProfilePage from '@/components/pages/ProfilePage';
import CommunityFeedPage from '@/components/pages/CommunityFeedPage';
import PostDetailPage from '@/components/pages/PostDetailPage';
import SubmitPostPage from '@/components/pages/SubmitPostPage';
import NeighbourhoodCirclesPage from '@/components/pages/NeighbourhoodCirclesPage';
import CircleDetailPage from '@/components/pages/CircleDetailPage';
import BreedClubsPage from '@/components/pages/BreedClubsPage';
import ClubDetailPage from '@/components/pages/ClubDetailPage';
import PetWikiPage from '@/components/pages/PetWikiPage';
import ArticleDetailPage from '@/components/pages/ArticleDetailPage';
import SubmitArticlePage from '@/components/pages/SubmitArticlePage';
import RescueDirectoryPage from '@/components/pages/RescueDirectoryPage';
import RescueDetailPage from '@/components/pages/RescueDetailPage';
import EventsPage from '@/components/pages/EventsPage';
import EventDetailPage from '@/components/pages/EventDetailPage';
import ChallengesPage from '@/components/pages/ChallengesPage';
import ChallengeDetailPage from '@/components/pages/ChallengeDetailPage';
import EmergencyAlertPage from '@/components/pages/EmergencyAlertPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view your profile">
            <ProfilePage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "community-feed",
        element: <CommunityFeedPage />,
      },
      {
        path: "post/:id",
        element: <PostDetailPage />,
      },
      {
        path: "submit-post",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to share with the community">
            <SubmitPostPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "neighbourhood-circles",
        element: <NeighbourhoodCirclesPage />,
      },
      {
        path: "circle/:id",
        element: <CircleDetailPage />,
      },
      {
        path: "breed-clubs",
        element: <BreedClubsPage />,
      },
      {
        path: "club/:id",
        element: <ClubDetailPage />,
      },
      {
        path: "pet-wiki",
        element: <PetWikiPage />,
      },
      {
        path: "article/:id",
        element: <ArticleDetailPage />,
      },
      {
        path: "submit-article",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to contribute to the Pet Wiki">
            <SubmitArticlePage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "rescue-directory",
        element: <RescueDirectoryPage />,
      },
      {
        path: "rescue/:id",
        element: <RescueDetailPage />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
      {
        path: "event/:id",
        element: <EventDetailPage />,
      },
      {
        path: "challenges",
        element: <ChallengesPage />,
      },
      {
        path: "challenge/:id",
        element: <ChallengeDetailPage />,
      },
      {
        path: "emergency-alert",
        element: <EmergencyAlertPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
