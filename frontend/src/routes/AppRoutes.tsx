import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/HomePage';
import { VehiclesPage } from '../pages/VehiclesPage';
import { VehicleDetailsPage } from '../pages/VehicleDetailsPage';
import { ConfiguratorPage } from '../pages/ConfiguratorPage';
import { ComparePage } from '../pages/ComparePage';
import { OffersPage } from '../pages/OffersPage';
import { AboutPage } from '../pages/AboutPage';
import { ShowroomsPage } from '../pages/ShowroomsPage';
import { TestDrivePage } from '../pages/TestDrivePage';
import { EnquiryPage } from '../pages/EnquiryPage';
import { ContactPage } from '../pages/ContactPage';
import { TechnologyPage } from '../pages/TechnologyPage';
import { FaqPage } from '../pages/FaqPage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage';
import { TermsPage } from '../pages/TermsPage';
import { CookiePolicyPage } from '../pages/CookiePolicyPage';
import { DisclaimerPage } from '../pages/DisclaimerPage';
import { AuthPage } from '../pages/AuthPage';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="vehicles/:slug" element={<VehicleDetailsPage />} />
        <Route path="configurator" element={<ConfiguratorPage />} />
        <Route path="compare" element={<ComparePage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="showrooms" element={<ShowroomsPage />} />
        <Route path="test-drive" element={<TestDrivePage />} />
        <Route path="enquiry" element={<EnquiryPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="technology" element={<TechnologyPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="cookie-policy" element={<CookiePolicyPage />} />
        <Route path="disclaimer" element={<DisclaimerPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="admin/login" element={<AuthPage />} />
        <Route path="admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
