import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth Pages
import LearnerRegistration from "./Pages/Auth/LearnerRegistration";

// Layout and Context
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./Pages/HomePage";
import LearnerLogin from "./Pages/Auth/LearnerLogin";
import TutorLogin from "./Pages/Auth/TutorLogin";
import TutorRegistration from "./Pages/Auth/TutorRegistration";
import ExploreMentors from "./Pages/ExploreMentors";
import Layout from "./Pages/Layout";
import InternshipPage from "./Components/InternShip";
import DashboardLayout from "./Components/Learner_Dashboard/DashboardLayout";
import Profile from "./Components/Learner_Dashboard/Profile";
import MenteeSessions from "./Components/Learner_Dashboard/Session";
import Payment from "./Components/Learner_Dashboard/Payment";
import PaymentForm from "./PaymentForm";
import ChatInterface from "./Components/AI_Tutor";
import DashboardHome from "./Components/Mentor_Dashboard.tsx/DashboardHome";
import DashboardLayout1 from "./Components/Mentor_Dashboard.tsx/DashboardLayout";
import MentorSessions from "./Components/Mentor_Dashboard.tsx/Session";
import AvailabilityPage from "./Components/Mentor_Dashboard.tsx/Availability";
import ResourcesPage from "./Components/Mentor_Dashboard.tsx/Reasources";
import ReviewsPage from "./Components/Mentor_Dashboard.tsx/Review";
import EarningsPage from "./Components/Mentor_Dashboard.tsx/EarnPage";
import SettingsPage from "./Components/Mentor_Dashboard.tsx/Setings";
import MentorDetailPage from "./Pages/ExploreMentors/MentorDetail";
import Pricing from "./Components/Pricing";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/pay" element={<PaymentForm />} />
              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                {/* All your routes go here */}
                <Route index element={<HomePage />} />
                <Route path="/explore-mentors" element={<ExploreMentors />} />
                <Route path="/login/mentee" element={<LearnerLogin />} />
                <Route path="/login/mentor" element={<TutorLogin />} />
                <Route path="/internships" element={<InternshipPage />} />
                <Route path="/ai-mentor" element={<ChatInterface />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route
                  path="/explore-mentors/mentor_details"
                  element={<MentorDetailPage />}
                />
                <Route
                  path="/register/mentee"
                  element={<LearnerRegistration />}
                />
                <Route
                  path="/register/mentor"
                  element={<TutorRegistration />}
                />
                {/* Add other routes as needed */}

                {/* Dashboard Routes */}
                <Route path="/mentee_dashboard" element={<DashboardLayout />}>
                  <Route index path="profile" element={<Profile />} />
                  <Route path="mentee_sessions" element={<MenteeSessions />} />
                  <Route path="payment" element={<Payment />} />
                </Route>
                <Route path="/mentor_dashboard" element={<DashboardLayout1 />}>
                  <Route index path="home" element={<DashboardHome />} />
                  <Route path="sessions" element={<MentorSessions />} />
                  <Route path="availability" element={<AvailabilityPage />} />
                  <Route path="resources" element={<ResourcesPage />} />
                  <Route path="reviews" element={<ReviewsPage />} />
                  <Route path="earnings" element={<EarningsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Route>

              {/* Protected Routes */}
              {/* <Route path="/" element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="payment" element={<PaymentForm />} />
            </Route> */}
            </Routes>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </AuthProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
