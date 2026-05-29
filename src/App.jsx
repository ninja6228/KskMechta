import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getRouterBasename } from './utils/basename'
import { ModalProvider } from './context/ModalContext'
import Modal from './components/Modal'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Services from './components/Services'
import Programs from './components/Programs'
import Gallery from './components/Gallery'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import HorseshoeDivider from './components/HorseshoeDivider'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ProgramPage from './pages/ProgramPage'
import ServicePage from './pages/ServicePage'
import TeamPage from './pages/TeamPage'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HorseshoeDivider />
        <Features />
        <HorseshoeDivider flipped />
        <Services />
        <HorseshoeDivider />
        <Programs />
        <HorseshoeDivider flipped />
        <Gallery />
        <HorseshoeDivider />
        <Team />
        <HorseshoeDivider flipped />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={getRouterBasename()}>
      <ModalProvider>
        <Modal />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/program/:id" element={<ProgramPage />} />
          <Route path="/service/:id" element={<ServicePage />} />
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  )
}
