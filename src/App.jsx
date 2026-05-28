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
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ProgramPage from './pages/ProgramPage'
import ServicePage from './pages/ServicePage'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <Programs />
        <Gallery />
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
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  )
}
