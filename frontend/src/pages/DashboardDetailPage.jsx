import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import DashboardDetailShowcase from '../components/dashboards/DashboardDetailShowcase';

const validDashboards = ['admin', 'resident', 'security', 'accounting', 'committee'];

const DashboardDetailPage = () => {
  const { slug } = useParams();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle invalid routes
  if (!validDashboards.includes(slug)) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex-1 w-full flex flex-col pt-20">
      <DashboardDetailShowcase dashboardId={slug} />
    </main>
  );
};

export default DashboardDetailPage;
