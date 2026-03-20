import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './components/Home';
import About from './components/About';
import Courses from './components/Courses';
import AdmissionDetail from './components/AdmissionDetail';
import FeeInfo from './components/FeeInfo';
import HostelFacilities from './components/HostelFacilities';
import Facilities from './components/Facilities';
import Scholarships from './components/Scholarships';
import Curriculum from './components/Curriculum';
import PlacementStats from './components/PlacementStats';
import FAQPage from './components/FAQPage';
import AlumniPage from './components/AlumniPage';
import Contact from './components/Contact';  
import ChatbotWidget from './components/Chatbot';  

function App() {
  return (
    <>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admissions" element={<AdmissionDetail />} />
        <Route path="/fees" element={<FeeInfo />} />
        <Route path="/hostel-facilities" element={<HostelFacilities />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/placements" element={<PlacementStats />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/alumni" element={<AlumniPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <ChatbotWidget mode="floating" /> 
    </>
  );
}

export default App;
