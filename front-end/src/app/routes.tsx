// routes.tsx
import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/sign-in';
import NotFound from '../pages/not-found';
import Dashboard from '../pages/dashboard';
import DashboardLayout from '../layout/DashboardLayout';
// import Projects from '@/pages/dashboard/projects';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
       <Route path="/" element={<SignIn />} />
      
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="projects" element={<Projects />} /> */}
      </Route>

      <Route path="*" element={<NotFound/>} /> 
    </Routes>
  );
}
