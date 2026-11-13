
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import {
  MenuIcon,
  XIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  CheckIcon,
  StarIcon,
  QuoteIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  MessageCircleIcon,
  CalendarIcon,
  SendIcon,
  InfoIcon,
  PenLineIcon,
  ArrowUpIcon,
  ZoomInIcon,
} from 'lucide-react'


const WHATSAPP_NUMBER = '233201893516'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`


const HERO_SLIDES = [
  '/images/1.jpeg',
  '/images/2.jpeg',
  '/images/3.jpeg',
  '/images/4.jpeg',
  '/images/5.jpeg',
  '/images/6.jpeg',
  '/images/7.jpeg',
  '/images/8.jpeg',
  '/images/9.jpeg',
]

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES_DATA = [
  { image: '/other/na.jpg', name: 'Soft & natural looks', description: 'A customized makeup look based on your skin tone and desired finish (soft, natural, subtle glam).', Details: '', serviceType: 'makeup service' },
  { image: '/images/2.jpeg', name: 'Full glam makeup', description: 'Bold, high-impact glam tailored for maximum definition and a polished finish.', Details: '', serviceType: 'makeup service' },
  { image: '/images/5.jpeg', name: 'Bridal makeup', description: 'Wedding-ready makeup with long-lasting wear, refined contouring and photo-friendly finishing.', Details: '', serviceType: 'makeup service' },
  { image: '/images/8.jpeg', name: 'Photoshoot & event makeup', description: 'Makeup designed for birthdays, dinners, parties, interviews and other special occasions.', Details: '', serviceType: 'makeup service' },
  { image: '/other/accrelyc.webp', name: 'Acrylic / gel application', description: 'Neat application with strength and a clean, polished finish.', Details: '', serviceType: 'nails' },
  { image: '/other/jejj.jpg', name: 'BIAB & Gel X', description: 'Premium enhancement options designed for durability and a refined look.', Details: '', serviceType: 'nails' },
  { image: '/other/pedicure.webp', name: 'Pedicures & manicures', description: 'Full nail care including shaping, cuticle care, and finishing.', Details: '', serviceType: 'nails' },
  { image: '/other/nail art.jpeg', name: 'Nail art', description: 'Designs ranging from simple elegant patterns to detailed artwork and themed sets.', Details: '', serviceType: 'nails' },
  { image: '/other/ccee.jpeg', name: 'Removal / overhaul', description: 'Safe removal and cleanup; can be followed by a fresh set.', Details: '', serviceType: 'nails' },
]

const GALLERY = [
  { image: '/images/8.jpeg', initials: 'A.M.', work: 'Bridal makeup', category: 'makeup', ratio: 'aspect-[3/4]' },
  { image: '/other/jejj.jpg', initials: 'K.O.', work: 'Nail art', category: 'nails', ratio: 'aspect-square' },
  { image: '/images/9.jpeg', initials: 'E.B.', work: 'Soft glam', category: 'makeup', ratio: 'aspect-[4/5]' },
  { image: '/other/acrelic_new.jpeg', initials: 'N.A.', work: 'BIAB set', category: 'nails', ratio: 'aspect-[4/3]' },
  { image: '/images/3.jpeg', initials: 'S.D.', work: 'Event makeup', category: 'makeup', ratio: 'aspect-square' },
  { image: '/other/longnails.jpeg', initials: 'P.T.', work: 'Gel X', category: 'nails', ratio: 'aspect-[3/4]' },
  { image: '/images/2.jpeg', initials: 'L.Y.', work: 'Full glam', category: 'makeup', ratio: 'aspect-[4/5]' },
  { image: '/other/nailswhite.jpeg', initials: 'R.K.', work: 'Manicure', category: 'nails', ratio: 'aspect-[4/3]' },
  { image: '/images/13.jpeg', initials: 'J.A.', work: 'Photoshoot makeup', category: 'makeup', ratio: 'aspect-[3/4]' },
]
const REVIEWS = [
  { name: 'Ama K.', service: 'Bridal makeup', rating: 5, text: 'My makeup lasted from the morning ceremony to the last dance. I felt like myself, only more radiant. Every photo came out beautifully.' },
  { name: 'Efua B.', service: 'Acrylic / gel application', rating: 5, text: 'The cleanest nail set I have ever had. Neat shaping, strong finish, and the studio is spotless. I will be back.' },
  { name: 'Nana A.', service: 'Full glam makeup', rating: 5, text: 'She listened to what I wanted and delivered exactly that. Booking on WhatsApp was quick and the reminders were helpful.' },
  { name: 'Kezia O.', service: 'Nail art', rating: 5, text: 'I brought a rough idea and left with a set that friends keep asking about. Very creative and very patient.' },
  { name: 'Sandra D.', service: 'Event makeup', rating: 4, text: 'Soft, natural and photo-ready. I got compliments all evening. Arrived on time and left with no waiting.' },
  { name: 'Priscilla T.', service: 'BIAB & Gel X', rating: 5, text: 'Three weeks in and my nails still look freshly done. Great value for the quality and detail.' },
].map((r, i) => ({ ...r, id: `seed-${i}` }))

const REVIEWS_STORAGE_KEY = 'shades-demure-reviews'

const FAQS = [
  { q: 'How do I book an appointment?', a: 'Use the booking form on this page, or tap the WhatsApp button and send us a message. We will confirm your slot after checking availability.' },
  { q: 'Do I need to pay a deposit?', a: 'A deposit of a non-refundable 100 cedis is required to secure any of our services except bridal and home services. For Bridals and Home services, a non-refundable deposit of 70% is required to secure your bookings.' },
  { q: 'How long does a session take?', a: 'Makeup usually takes 45 to 90 minutes. Bridal makeup and nail sets with detailed art can take longer. We will give you a time estimate when you book.' },
  { q: 'Can I reschedule or cancel?', a: 'Yes. Please let us know at least 24 hours ahead so we can offer the slot to someone else and find you a new time.' },
  { q: 'Do you offer removal of nails done elsewhere?', a: 'Yes. Our Removal / overhaul service safely takes off old sets and can be followed by a fresh set in the same visit.' },
  { q: 'How much do services cost?', a: 'Pricing depends on style, length and design complexity. Exact quotes are provided after a short consultation.' },
  { q: 'How do you keep the studio hygienic?', a: 'Tools are cleaned and sanitized between clients, and single-use items are never reused.' },
]

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

const FIELD_CLASS =
  'w-full rounded-xl border border-soft-blush-pink bg-white px-4 py-3 text-sm text-deep-wine-pink placeholder:text-deep-wine-pink/40 focus:border-hot-pink focus:outline-none focus:ring-2 focus:ring-bright-pink/30'
const LABEL_CLASS = 'mb-1.5 block text-sm font-semibold text-deep-wine-pink'

const SMOOTH = [0.32, 0.72, 0, 1]

function Reveal({ children, delay = 0, y = 20, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ label, title, light = false }) {
  return (
    <Reveal className="text-center">
      <h2 className={`text-sm font-semibold uppercase tracking-widest ${light ? 'text-soft-blush-pink' : 'text-hot-pink'}`}>
        {label}
      </h2>
      <p className={`mx-auto mt-3 max-w-2xl font-serif text-3xl font-bold md:text-4xl ${light ? 'text-white' : ''}`}>
        {title}
      </p>
    </Reveal>
  )
}

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5 text-bright-pink" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} size={16} fill={i < count ? 'currentColor' : 'none'} />
      ))}
    </div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [headerVisible, setHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.slice(1))
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 0.2, 0.5, 1],
      },
    )

    sections.forEach((section) => observer.observe(section))

    const onScroll = () => {
      const currentY = window.scrollY

      if (currentY <= 20) {
        setHeaderVisible(true)
      } else if (!menuOpen && currentY > lastScrollY.current + 2) {
        setHeaderVisible(false)
      } else if (currentY < lastScrollY.current) {
        setHeaderVisible(true)
      }

      if (window.innerHeight + currentY >= document.documentElement.scrollHeight - 8) {
        setActiveSection('contact')
        setHeaderVisible(true)
      }

      lastScrollY.current = currentY
    }

    lastScrollY.current = window.scrollY
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: headerVisible ? 0 : -110, opacity: headerVisible ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-40 w-full border-b border-hot-pink/10 bg-white/95 text-hot-pink shadow-lg shadow-deep-wine-pink/15 backdrop-blur-md select-none"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#home" aria-label="Shades Demure home" className="flex h-14 w-28 items-center">
            <img src="/logo 1/logo.png" alt="Shades Demure" className="h-full w-full object-contain" />
          </a>

          <nav className="hidden items-center gap-5 text-sm font-medium lg:flex" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1)

              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1.5 transition-colors ${
                    isActive ? 'font-semibold text-hot-pink' : 'text-deep-wine-pink hover:text-hot-pink'
                  } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-hot-pink after:transition-all after:duration-200 ${
                    isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#book"
              className="hidden rounded-full border-2 border-hot-pink bg-hot-pink/10 px-5 py-2 text-sm font-semibold text-hot-pink transition-colors hover:bg-soft-blush-pink sm:block"
            >
              Book now
            </motion.a>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="rounded-full p-2 text-hot-pink transition hover:bg-soft-blush-pink lg:hidden"
            >
              <MenuIcon size={26} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <MenuBarSmallMobile
            key="menu"
            close={() => setMenuOpen(false)}
            activeSection={activeSection}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export function MenuBarSmallMobile({ close, activeSection }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        onClick={close}
        className="absolute inset-0 bg-black/45 select-none"
      />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-2xl will-change-transform select-none"
      >
        <div className="flex items-center justify-between">
          <a href="#home" onClick={close} aria-label="Shades Demure home" className="flex h-14 w-28 items-center">
            <img src="/logo 1/logo.png" alt="Shades Demure" className="h-full w-full object-contain" />
          </a>

          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="rounded-full bg-soft-blush-pink p-2 text-hot-pink transition hover:bg-hot-pink hover:text-white"
          >
            <XIcon size={22} />
          </button>
        </div>

        <nav className="mt-8 flex flex-col" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1)

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={close}
                aria-current={isActive ? 'page' : undefined}
                className={`border-b py-3.5 text-lg transition-colors ${
                  isActive
                    ? 'border-hot-pink font-semibold text-hot-pink'
                    : 'border-soft-blush-pink font-medium text-deep-wine-pink hover:border-hot-pink hover:text-hot-pink'
                }`}
              >
                <span className={isActive ? 'underline decoration-hot-pink decoration-2 underline-offset-8' : ''}>
                  {link.label}
                </span>
              </a>
            )
          })}
        </nav>

        <a
          href="#book"
          onClick={close}
          className="mt-8 rounded-full bg-hot-pink py-3 text-center font-semibold text-white shadow-lg shadow-hot-pink/30 transition-colors hover:bg-deep-wine-pink"
        >
          Book now
        </a>
      </motion.div>
    </div>
  )
}

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-16 bg-deep-wine-pink text-soft-blush-pink select-none">
      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
          <div>
            <p className="font-serif text-3xl font-bold text-white">Shades Demure</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              A beauty studio for makeup and nail artistry. Whispered elegance in every hue.
            </p>
            <a
              href="#book"
              className="mt-6 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-hot-pink transition hover:bg-soft-blush-pink"
            >
              Book now
            </a>
          </div>

          <div>
            <p className="font-semibold text-white">Quick links</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white">Contact us</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPinIcon size={18} className="mt-0.5 shrink-0" />
                <span>SSNIT Flats, Takoradi, Ghana</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon size={18} className="mt-0.5 shrink-0" />
                <span>+233 20 189 3516 / +233 54 803 3764</span>
              </li>
              <li className="flex items-start gap-3">
                <MailIcon size={18} className="mt-0.5 shrink-0" />
                <span>Shadesdemure@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon size={18} className="mt-0.5 shrink-0" />
                <span>Mon – Sun, By appointment only</span>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-white/15 px-5 py-5 text-center text-xs">
        © {new Date().getFullYear()} Shades Demure. All rights reserved.
      </div>
    </footer>
  )
}

export default function Homepage() {
  const [selectedService, setSelectedService] = useState('')

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen overflow-x-hidden bg-white text-deep-wine-pink">
        <Header />
        <SectionOne />
        <About_US />
        <Services onBook={setSelectedService} />
        <Gallery />
        <Testimonials />
        <BookingSection service={selectedService} setService={setSelectedService} />
        <FAQ />
        <Footer />
        <WhatsAppFloat />
      </main>
    </MotionConfig>
  )
}

function WhatsAppFloat() {
  const [showTop, setShowTop] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  // Replace this with the number you want customers to call.
  // Use international format WITHOUT +, spaces, or dashes.
  const CALL_NUMBER = '233548033764'
  const CALL_LINK = `tel:+${CALL_NUMBER}`

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)

    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setContactOpen(false)
      }
    }

    if (contactOpen) {
      document.addEventListener('keydown', onKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [contactOpen])

  useEffect(() => {
    if (contactOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [contactOpen])

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3 select-none">

        {/* Back to top */}
        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              aria-label="Back to top"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.6,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 24,
                scale: 0.6,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 24,
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-hot-pink shadow-lg shadow-deep-wine-pink/30 ring-1 ring-hot-pink/20 transition-colors hover:bg-hot-pink hover:text-white"
            >
              <ArrowUpIcon size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating WhatsApp button */}
        <motion.button
          type="button"
          aria-label="Contact Shades Demure"
          aria-expanded={contactOpen}
          onClick={() => setContactOpen(true)}
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            delay: 1.2,
            type: 'spring',
            stiffness: 260,
            damping: 18,
          }}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl shadow-deep-wine-pink/40 ring-2 ring-bright-pink"
        >
          <img
            src="\other\getintouch.png"
            alt="icon"
            className="h-8 w-8 object-contain"
          />

          {/* Small notification dot */}
          {!contactOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 1.6,
                type: 'spring',
                stiffness: 300,
              }}
              className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-hot-pink"
            />
          )}
        </motion.button>
      </div>

      {/* Contact popup */}
      <AnimatePresence>
        {contactOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-label="Contact Shades Demure"
          >
            {/* Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setContactOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Popup */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 40,
                scale: 0.94,
              }}
              transition={{
                duration: 0.3,
                ease: SMOOTH,
              }}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="relative bg-hot-pink px-6 pb-7 pt-6 text-white">
                <button
                  type="button"
                  aria-label="Close contact popup"
                  onClick={() => setContactOpen(false)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                >
                  <XIcon size={19} />
                </button>

                <div className="flex items-center gap-4 pr-10">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-lg">
                    <img
                      src="/other/whatsappIcon.png"
                      alt=""
                      className="h-8 w-8 object-contain"
                    />
                  </div>

                  <div>
                    <p className="font-serif text-2xl font-bold">
                      Let's connect
                    </p>
                    <p className="mt-1 text-sm text-soft-blush-pink">
                      How would you like to contact us?
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact options */}
              <div className="space-y-3 p-5">

                {/* WhatsApp */}
                <motion.a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setContactOpen(false)}
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="flex items-center gap-4 rounded-2xl border border-soft-blush-pink bg-soft-blush-pink/50 p-4 transition-colors hover:border-hot-pink/30 hover:bg-soft-blush-pink"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <img
                      src="/other/whatsappIcon.png"
                      alt=""
                      className="h-7 w-7 object-contain"
                    />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-deep-wine-pink">
                      Send a WhatsApp message
                    </span>
                    <span className="mt-0.5 block text-xs text-deep-wine-pink/60">
                      Chat with Shades Demure
                    </span>
                  </span>

                  <ArrowRightIcon
                    size={19}
                    className="shrink-0 text-hot-pink"
                  />
                </motion.a>

                {/* Phone call */}
                <motion.a
                  href={CALL_LINK}
                  onClick={() => setContactOpen(false)}
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="flex items-center gap-4 rounded-2xl border border-soft-blush-pink bg-white p-4 shadow-sm transition-colors hover:border-hot-pink/30 hover:bg-soft-blush-pink"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hot-pink text-white shadow-md">
                    <PhoneIcon size={22} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-deep-wine-pink">
                      Call us
                    </span>
                    <span className="mt-0.5 block text-xs text-deep-wine-pink/60">
                      Speak directly with us
                    </span>
                  </span>

                  <ArrowRightIcon
                    size={19}
                    className="shrink-0 text-hot-pink"
                  />
                </motion.a>

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setContactOpen(false)}
                  className="mt-2 w-full rounded-full border border-soft-blush-pink py-3 text-sm font-semibold text-deep-wine-pink transition-colors hover:bg-soft-blush-pink"
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

const SectionOne = () => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % HERO_SLIDES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative flex min-h-[100svh] scroll-mt-16 items-center overflow-hidden pt-16 select-none">
      {HERO_SLIDES.map((src, i) => (
        <motion.img
          key={src + i}
          src={src}
          alt=""
          aria-hidden="true"
          animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ))}
      <div className="absolute inset-0 bg-deep-wine-pink/75" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-20 pt-12 md:grid-cols-2 md:px-8 md:py-14">
        <div className="text-center md:text-left">
          <motion.p
            {...fadeUp(0.1)}
            className="inline-block rounded-full bg-soft-blush-pink/20 px-4 py-1 text-sm text-soft-blush-pink backdrop-blur"
          >
            Makeup &amp; nail studio
          </motion.p>
          <motion.h1
            {...fadeUp(0.25)}
            className="mt-5 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Whispered elegance in every hue.
          </motion.h1>
          <motion.p
            {...fadeUp(0.4)}
            className="mx-auto mt-5 max-w-md text-base leading-relaxed text-soft-blush-pink md:mx-0 md:text-lg"
          >
            Shades Demure is your go-to beauty studio for makeup services and nail artistry.
          </motion.p>

          <motion.div
            {...fadeUp(0.55)}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start"
          >
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#book"
              className="rounded-full bg-bright-pink px-8 py-3 text-center font-semibold text-white shadow-lg shadow-black/30 transition-colors hover:bg-hot-pink"
            >
              Book an appointment
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#services"
              className="rounded-full border border-white/70 px-8 py-3 text-center font-semibold text-white transition-colors hover:bg-white hover:text-hot-pink"
            >
              View services
            </motion.a>
          </motion.div>
        </div>

        <div className="relative mx-auto flex h-72 w-full max-w-sm items-end justify-center gap-4 sm:h-96">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="h-3/4 w-1/2 overflow-hidden rounded-t-full border-4 border-white shadow-2xl"
          >
            <img src="\other\jejj.jpg" alt="Makeup showcase" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
            className="h-full w-1/2 overflow-hidden rounded-t-full border-4 border-white shadow-2xl"
          >
            <img src="/images/5.jpeg" alt="Nail art showcase" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </div>
      <div role="radiogroup" aria-label="Choose slide" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={i === active}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setActive(i)}
            className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white/80 transition hover:border-white"
          >
            <motion.span
              initial={false}
              animate={{ scale: i === active ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="h-2 w-2 rounded-full bg-white"
            />
          </button>
        ))}
      </div>
    </section>
  )
}

const About_US = () => {
  const reasons = [
    'Clean, hygienic, and professional services.',
    'Customized looks based on your preference and occasion.',
    'High-quality products and detailed finishing.',
    'Friendly support from consultation to final result.',
  ]

  const stats = [
    { value: '25', label: 'Happy clients' },
    { value: '1', label: 'Offices' },
    { value: '0', label: 'Awards' },
    { value: '16', label: 'Returning clients' },
  ]

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-16 md:px-8 md:py-24 select-none">
      <SectionHeading label="About us" title="Know more about Shades Demure" />
      <div className="mt-12 grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <Reveal>
          <div className="h-72 overflow-hidden rounded-3xl shadow-xl shadow-hot-pink/20 md:h-96">
            <img src="/other/nailMaking.jpg" alt="Nail technician at work" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="font-serif text-3xl font-bold text-hot-pink">Mission</h3>
          <p className="mt-4 leading-relaxed">
            To create timeless and premium beauty experiences by combining meticulous technique,
            hygiene-first standards and personalized services that empower individuals to feel
            confident, valued and beautifully represented in every hue.
          </p>
        </Reveal>
      </div>
      <div className="mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <Reveal className="md:order-2">
          <div className="h-72 overflow-hidden rounded-3xl shadow-xl shadow-hot-pink/20 md:h-96">
            <img src="/other/makeup_designs.jpg" alt="Makeup designs" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:order-1">
          <h3 className="font-serif text-3xl font-bold text-hot-pink">Vision</h3>
          <p className="mt-4 leading-relaxed">
            To be the most trusted, premium beauty brand and leading beauty destination known for
            refined, trend-aware craftsmanship and client-first experiences.{' '}
            <span className="font-bold text-hot-pink">
              Expanding through sustainable growth, partnership, and exceptional talent.
            </span>
          </p>
        </Reveal>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl bg-soft-blush-pink p-7">
            <h3 className="font-serif text-2xl font-bold text-hot-pink">Company history</h3>
            <p className="mt-4 leading-relaxed">
              Shades Demure was created to offer refined beauty services that blend artistry with
              comfort. We started small, and we&apos;ve grown by focusing on what clients love most:{' '}
              <span className="font-semibold">beautiful results, consistency, and a welcoming experience.</span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl bg-hot-pink p-7 text-white">
            <h3 className="font-serif text-2xl font-bold">Why customers choose Shades Demure</h3>
            <ul className="mt-4 space-y-3">
              {reasons.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-hot-pink">
                    <CheckIcon size={14} strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
      <Reveal className="mt-14">
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl bg-deep-wine-pink text-white md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-5 py-7 text-center ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} border-white/15 md:border-r md:last:border-r-0`}
            >
              <p className="font-serif text-3xl font-bold text-soft-blush-pink md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const tilts = [-2, 1.5, -1, 2, -1.5, 1]

const Services = ({ onBook }) => {
  const tabs = [
    { label: 'Makeup', value: 'makeup service' },
    { label: 'Nails', value: 'nails' },
  ]

  const [toggleServices, setToggleService] = useState('nails')
  const [previewIndex, setPreviewIndex] = useState(null)

  const filtered = SERVICES_DATA.filter((s) => s.serviceType === toggleServices)

  return (
    <section id="services" className="scroll-mt-16 bg-soft-blush-pink px-5 py-16 md:px-8 md:py-24 select-none">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Services" title="Services we provide" />
        <Reveal className="mt-10">
          <div
            role="tablist"
            aria-label="Service type"
            className="mx-auto flex w-fit items-center gap-3 sm:gap-6"
          >
            {tabs.map((tab, i) => {
              const isActive = toggleServices === tab.value

              return (
                <div key={tab.value} className="flex items-center gap-3 sm:gap-6">
                  {i > 0 && (
                    <span aria-hidden="true" className="font-serif text-3xl text-hot-pink/40 sm:text-4xl">
                      /
                    </span>
                  )}

                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setToggleService(tab.value)}
                    className={`relative px-3 py-2 font-serif text-3xl font-bold italic transition-colors sm:text-4xl ${
                      isActive ? 'text-hot-pink' : 'text-deep-wine-pink/50 hover:text-hot-pink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="service-marker"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        className="absolute inset-x-1 bottom-2 h-4 -rotate-1 bg-bright-pink/40"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                </div>
              )
            })}
          </div>
        </Reveal>
        <motion.div
          key={toggleServices}
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 px-2 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((data, i) => (
            <motion.article
              key={data.name}
              variants={cardVariants}
              style={{ rotate: tilts[i % tilts.length] }}
              whileHover={{ y: -8, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="group relative rounded-md bg-white p-3 pb-5 shadow-xl shadow-deep-wine-pink/20"
            >
              <span
                aria-hidden="true"
                className={`absolute -top-3 left-1/2 z-20 h-6 w-24 -translate-x-1/2 bg-bright-pink/40 shadow-sm ${
                  i % 2 === 0 ? '-rotate-3' : 'rotate-2'
                }`}
              />
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPreviewIndex(i)}
                  aria-label={`View full photo of ${data.name}`}
                  className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-soft-blush-pink"
                >
                  <img
                    src={data.image}
                    alt={data.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute -left-10 top-6 w-36 -rotate-45 bg-hot-pink py-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-md">
                    {data.serviceType === 'nails' ? 'Nails' : 'Makeup'}
                  </span>
                  <span className="absolute bottom-4 right-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-hot-pink shadow-md backdrop-blur transition group-hover:bg-hot-pink group-hover:text-white">
                    <ZoomInIcon size={14} />
                    View
                  </span>
                </button>
                <div className="absolute -bottom-4 -left-4 z-10 max-w-[85%] -rotate-3 bg-deep-wine-pink px-4 py-2 shadow-lg">
                  <h3 className="font-serif text-base font-bold italic leading-tight text-white sm:text-lg">
                    {data.name}
                  </h3>
                </div>
              </div>
              <div className="px-2 pt-9">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm leading-relaxed">{data.description}</p>
                  <span className="shrink-0 font-mono text-xs text-hot-pink/70">
                    No.{String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-dashed border-hot-pink/30 pt-4">
                  <button
                    type="button"
                    onClick={() => setPreviewIndex(i)}
                    className="text-sm font-semibold text-hot-pink underline decoration-hot-pink/30 underline-offset-4 transition hover:decoration-hot-pink"
                  >
                    See full photo
                  </button>
                  <a
                    href="#book"
                    onClick={() => onBook(data.name)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-hot-pink px-4 py-2 text-sm font-semibold text-white shadow-md shadow-hot-pink/30 transition-all hover:gap-2.5 hover:bg-deep-wine-pink"
                  >
                    Book this
                    <ArrowRightIcon size={15} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
        <Reveal className="mx-auto mt-14 max-w-2xl">
          <div className="flex items-start gap-4 rounded-2xl border border-hot-pink/20 bg-white p-5 shadow-sm">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft-blush-pink text-hot-pink">
              <InfoIcon size={20} />
            </span>
            <div>
              <p className="font-semibold text-hot-pink">Pricing depends on style, length and design complexity.</p>
              <p className="mt-1 text-sm">Exact quotes are provided after consultation.</p>
            </div>
          </div>
        </Reveal>
      </div>
      <AnimatePresence>
        {previewIndex !== null && (
          <ImageLightbox
            key="lightbox"
            items={filtered}
            index={previewIndex}
            setIndex={setPreviewIndex}
            onClose={() => setPreviewIndex(null)}
            onBook={onBook}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

const ImageLightbox = ({ items, index, setIndex, onClose, onBook }) => {
  const item = items[index]
  const go = (dir) => setIndex((index + dir + items.length) % items.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none"
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24, rotate: -1 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className="relative flex max-h-[92svh] w-full max-w-3xl flex-col rounded-md bg-white p-3 shadow-2xl"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute -right-2 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-hot-pink text-white shadow-lg transition hover:bg-deep-wine-pink"
        >
          <XIcon size={20} />
        </button>
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-soft-blush-pink">
          <motion.img
            key={item.name}
            src={item.image}
            alt={item.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="max-h-[62svh] w-auto max-w-full object-contain"
          />

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => go(-1)}
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-hot-pink shadow-md transition hover:bg-hot-pink hover:text-white"
              >
                <ChevronLeftIcon size={20} />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => go(1)}
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-hot-pink shadow-md transition hover:bg-hot-pink hover:text-white"
              >
                <ChevronRightIcon size={20} />
              </button>
            </>
          )}
        </div>
        <div className="flex flex-col gap-3 px-2 pb-2 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="font-serif text-xl font-bold italic text-hot-pink">{item.name}</p>
            <p className="mt-1 text-sm leading-relaxed">{item.description}</p>
            <p className="mt-1 font-mono text-xs text-hot-pink/70">
              {index + 1} / {items.length}
            </p>
          </div>

          <a
            href="#book"
            onClick={() => {
              onBook(item.name)
              onClose()
            }}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-hot-pink px-5 py-3 text-sm font-semibold text-white shadow-md shadow-hot-pink/30 transition-all hover:gap-3 hover:bg-deep-wine-pink"
          >
            Book this
            <ArrowRightIcon size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  )
}

const galleryGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const galleryItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const galleryTilts = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.2]

const galleryTabs = [
  { label: 'All', value: 'all' },
  { label: 'Makeup', value: 'makeup' },
  { label: 'Nails', value: 'nails' },
]

const Gallery = () => {
  const [filter, setFilter] = useState('all')
  const [previewIndex, setPreviewIndex] = useState(null)

  const filtered = filter === 'all' ? GALLERY : GALLERY.filter((g) => g.category === filter)

  return (
    <section id="gallery" className="relative scroll-mt-16 overflow-hidden bg-white px-5 py-16 md:px-8 md:py-24 select-none">
      <div aria-hidden="true" className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-soft-blush-pink" />
      <div aria-hidden="true" className="absolute -right-28 bottom-16 h-80 w-80 rounded-full bg-soft-blush-pink" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading label="Gallery" title="A collection of our work" />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm">
            Real sets and looks from our clients. Names are shortened to initials to respect privacy.
            Tap any photo to see it full size.
          </p>
        </Reveal>
        <Reveal className="mt-8">
          <div role="tablist" aria-label="Gallery filter" className="mx-auto flex w-fit items-center gap-2 sm:gap-4">
            {galleryTabs.map((tab) => {
              const isActive = filter === tab.value

              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(tab.value)}
                  className={`relative px-3 py-1.5 font-serif text-2xl font-bold italic transition-colors sm:text-3xl ${
                    isActive ? 'text-hot-pink' : 'text-deep-wine-pink/50 hover:text-hot-pink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-marker"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-x-1 bottom-1.5 h-3.5 -rotate-1 bg-bright-pink/40"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </Reveal>
        <motion.div
          key={filter}
          variants={galleryGrid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 columns-2 gap-x-4 px-1 sm:gap-x-8 md:columns-3"
        >
          {filtered.map((item, i) => (
            <motion.figure
              key={`${item.work}-${item.initials}`}
              variants={galleryItem}
              style={{ rotate: galleryTilts[i % galleryTilts.length] }}
              whileHover={{ y: -6, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="group relative mb-8 break-inside-avoid rounded-sm bg-white p-2 pb-3 shadow-xl shadow-deep-wine-pink/20 ring-1 ring-hot-pink/10 sm:mb-10 sm:p-2.5 sm:pb-4"
            >
              <span
                aria-hidden="true"
                className="absolute -top-2 left-1/2 z-20 h-4 w-4 -translate-x-1/2 rounded-full bg-hot-pink shadow-md ring-2 ring-white"
              />
              <button
                type="button"
                onClick={() => setPreviewIndex(i)}
                aria-label={`View ${item.work} for client ${item.initials} full size`}
                className={`relative block w-full cursor-zoom-in overflow-hidden bg-soft-blush-pink ${item.ratio}`}
              >
                <img
                  src={item.image}
                  alt={`${item.work} for client ${item.initials}`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-deep-wine-pink/0 transition group-hover:bg-deep-wine-pink/25" />
                <span className="absolute left-0 top-3 bg-hot-pink py-0.5 pl-2 pr-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-md">
                  {item.category === 'nails' ? 'Nails' : 'Makeup'}
                </span>
                <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-hot-pink shadow-md transition sm:opacity-0 sm:group-hover:opacity-100">
                  <ZoomInIcon size={16} />
                </span>
              </button>
              <figcaption className="flex items-center justify-between gap-2 px-1 pt-3">
                <span className="min-w-0 leading-tight">
                  <span className="block truncate font-serif text-base font-bold italic text-hot-pink sm:text-lg">
                    {item.work}
                  </span>
                  <span className="block font-mono text-[11px] text-deep-wine-pink/70">Client {item.initials}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 -rotate-12 items-center justify-center rounded-full border-2 border-dashed border-bright-pink text-xs font-bold text-hot-pink"
                >
                  {item.initials.replace(/\./g, '')}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
        <Reveal className="mt-6 text-center">
          <p className="text-sm">Like what you see?</p>
          <a
            href="#book"
            className="mt-3 inline-flex items-center gap-2 rounded-md bg-hot-pink px-6 py-3 text-sm font-semibold text-white shadow-md shadow-hot-pink/30 transition-all hover:gap-3 hover:bg-deep-wine-pink"
          >
            Book your look
            <ArrowRightIcon size={16} />
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {previewIndex !== null && (
          <GalleryLightbox
            key="gallery-lightbox"
            items={filtered}
            index={previewIndex}
            setIndex={setPreviewIndex}
            onClose={() => setPreviewIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

const GalleryLightbox = ({ items, index, setIndex, onClose }) => {
  const item = items[index]
  const go = (dir) => setIndex((index + dir + items.length) % items.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index])
  useEffect(() => {
    document
      .getElementById(`gallery-thumb-${index}`)
      ?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [index])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.work} for client ${item.initials}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24, rotate: 1 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className="relative flex max-h-[94svh] w-full max-w-4xl flex-col rounded-md bg-white p-3 shadow-2xl"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute -right-2 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-hot-pink text-white shadow-lg transition hover:bg-deep-wine-pink"
        >
          <XIcon size={20} />
        </button>
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-soft-blush-pink">
          <motion.img
            key={`${item.image}-${index}`}
            src={item.image}
            alt={`${item.work} for client ${item.initials}`}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1)
              else if (info.offset.x > 80) go(-1)
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="max-h-[60svh] w-auto max-w-full cursor-grab object-contain active:cursor-grabbing"
          />

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => go(-1)}
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-hot-pink shadow-md transition hover:bg-hot-pink hover:text-white"
              >
                <ChevronLeftIcon size={20} />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => go(1)}
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-hot-pink shadow-md transition hover:bg-hot-pink hover:text-white"
              >
                <ChevronRightIcon size={20} />
              </button>
            </>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 px-2 pt-4">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 -rotate-12 items-center justify-center rounded-full border-2 border-dashed border-bright-pink text-sm font-bold text-hot-pink"
            >
              {item.initials.replace(/\./g, '')}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate font-serif text-xl font-bold italic text-hot-pink">{item.work}</p>
              <p className="font-mono text-xs text-deep-wine-pink/70">
                Client {item.initials} · {item.category === 'nails' ? 'Nails' : 'Makeup'} · {index + 1} / {items.length}
              </p>
            </div>
          </div>

          <a
            href="#book"
            onClick={onClose}
            className="hidden shrink-0 items-center gap-2 rounded-md bg-hot-pink px-5 py-3 text-sm font-semibold text-white shadow-md shadow-hot-pink/30 transition-all hover:gap-3 hover:bg-deep-wine-pink sm:inline-flex"
          >
            Book a similar look
            <ArrowRightIcon size={16} />
          </a>
        </div>
        {items.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto px-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((thumb, i) => (
              <button
                key={`${thumb.work}-${i}`}
                id={`gallery-thumb-${i}`}
                type="button"
                aria-label={`Show ${thumb.work}`}
                onClick={() => setIndex(i)}
                className={`h-14 w-14 shrink-0 overflow-hidden rounded-sm transition ${
                  i === index ? 'ring-2 ring-hot-pink ring-offset-2' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img src={thumb.image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

const formatName = (full) => {
  const parts = full.trim().split(/\s+/)
  if (parts.length === 1) return parts[0]
  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`
}

const initialsOf = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()

const Testimonials = () => {
  const trackRef = useRef(null)
  const [userReviews, setUserReviews] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [thanks, setThanks] = useState(false)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '[]')
      if (Array.isArray(saved)) setUserReviews(saved)
    } catch {
      
    }
  }, [])

  useEffect(() => {
    if (!thanks) return
    const t = setTimeout(() => setThanks(false), 4500)
    return () => clearTimeout(t)
  }, [thanks])

  const reviews = [...userReviews, ...REVIEWS]
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  const scrollByPage = (direction) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  const addReview = (review) => {
    const next = [{ ...review, id: `user-${Date.now()}` }, ...userReviews]
    setUserReviews(next)
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(next))
    } catch {
      
    }
    setModalOpen(false)
    setThanks(true)
    trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
  }

  return (
    <section id="reviews" className="scroll-mt-16 bg-deep-wine-pink px-5 py-16 md:px-8 md:py-24 select-none">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-soft-blush-pink">Testimonials</h2>
            <p className="mt-3 max-w-xl font-serif text-3xl font-bold text-white md:text-4xl">
              What our customers say
            </p>
            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-soft-blush-pink md:justify-start">
              <StarIcon size={16} fill="currentColor" />
              {average.toFixed(1)} average from {reviews.length} reviews
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 rounded-full bg-bright-pink px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-hot-pink"
            >
              <PenLineIcon size={16} />
              Write a review
            </motion.button>
            <button
              type="button"
              aria-label="Previous reviews"
              onClick={() => scrollByPage(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-hot-pink"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              type="button"
              aria-label="Next reviews"
              onClick={() => scrollByPage(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-hot-pink transition hover:bg-soft-blush-pink"
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>
        </Reveal>

        <AnimatePresence>
          {thanks && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              role="status"
              className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-soft-blush-pink px-5 py-2 text-sm font-medium text-deep-wine-pink"
            >
              <CheckIcon size={16} className="text-hot-pink" />
              Thank you! Your review has been added.
            </motion.p>
          )}
        </AnimatePresence>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative flex w-[85%] shrink-0 snap-start flex-col rounded-3xl bg-white p-7 shadow-xl shadow-black/20 sm:w-[46%] lg:w-[31.5%]"
            >
              <QuoteIcon size={36} className="text-soft-blush-pink" fill="currentColor" />
              <div className="mt-4">
                <Stars count={review.rating} />
              </div>
              <p className="mt-4 flex-1 leading-relaxed">{review.text}</p>

              <div className="mt-6 flex items-center gap-3 border-t border-soft-blush-pink pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hot-pink text-sm font-bold text-white">
                  {initialsOf(review.name)}
                </span>
                <div className="leading-tight">
                  <p className="font-semibold text-hot-pink">{review.name}</p>
                  <p className="text-xs">{review.service}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <ReviewModal key="review-modal" onClose={() => setModalOpen(false)} onSubmit={addReview} />}
      </AnimatePresence>
    </section>
  )
}

const ReviewModal = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('')
  const [service, setService] = useState('')
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [text, setText] = useState('')

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      name: formatName(name),
      service: service || 'Shades Demure client',
      rating,
      text: text.trim(),
    })
  }

  const shown = hover || rating

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center select-none" role="dialog" aria-modal="true" aria-label="Write a review">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: SMOOTH }}
        className="relative max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-soft-blush-pink p-2 text-hot-pink transition hover:bg-hot-pink hover:text-white"
        >
          <XIcon size={18} />
        </button>

        <h3 className="pr-10 font-serif text-2xl font-bold text-hot-pink">Share your experience</h3>
        <p className="mt-1 text-sm">Your review helps other clients choose with confidence.</p>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="review-name" className={LABEL_CLASS}>Your name</label>
            <input
              id="review-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ama Mensah"
              className={FIELD_CLASS}
            />
            <p className="mt-1 text-xs text-deep-wine-pink/70">Shown as first name and last initial.</p>
          </div>

          <div>
            <label htmlFor="review-service" className={LABEL_CLASS}>Service you had</label>
            <select id="review-service" required value={service} onChange={(e) => setService(e.target.value)} className={FIELD_CLASS}>
              <option value="" disabled>Choose a service</option>
              {SERVICES_DATA.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <span className={LABEL_CLASS}>Your rating</span>
            <div className="flex gap-1 text-bright-pink" onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <motion.button
                  key={n}
                  type="button"
                  aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  aria-pressed={rating === n}
                  whileTap={{ scale: 0.85 }}
                  onMouseEnter={() => setHover(n)}
                  onClick={() => setRating(n)}
                  className="p-0.5"
                >
                  <StarIcon size={32} fill={n <= shown ? 'currentColor' : 'none'} />
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="review-text" className={LABEL_CLASS}>Your review</label>
            <textarea
              id="review-text"
              required
              minLength={10}
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tell us what you loved..."
              className={`${FIELD_CLASS} resize-none`}
            />
          </div>
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-hot-pink py-3.5 font-semibold text-white shadow-lg shadow-hot-pink/30 transition-colors hover:bg-deep-wine-pink"
        >
          <SendIcon size={18} />
          Submit review
        </motion.button>
      </motion.form>
    </div>
  )
}

const BookingSection = ({ service, setService }) => {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', notes: '' })
  const [sent, setSent] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const update = (field) => (e) => {
    setSent(false)
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const message = [
      '*SHADES DEMURE*',
      '*APPOINTMENT REQUEST*',
      '',
      '```',
      'CLIENT INFORMATION',
      '────────────────────────────────',
      `Name        | ${form.name}`,
      `Phone       | ${form.phone}`,
      '',
      'APPOINTMENT DETAILS',
      '────────────────────────────────',
      `Service     | ${service || 'Not sure yet'}`,
      `Date        | ${form.date}`,
      `Time        | ${form.time}`,
      '',
      'ADDITIONAL NOTES',
      '────────────────────────────────',
      form.notes || 'None',
      '```',
      '',
      'Hello Shades Demure! I would like to book this appointment. Please confirm availability and let me know the next steps.',
    ].join('\n')

    const whatsappUrl = `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`
    setSent(true)
    window.location.href = whatsappUrl
  }

  return (
    <section id="book" className="scroll-mt-16 bg-hot-pink px-5 py-16 md:px-8 md:py-24 ">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-5">
        <Reveal className="text-center text-white lg:col-span-2 lg:pt-6 lg:text-left">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-soft-blush-pink">Book with us</h2>
          <p className="mt-3 font-serif text-3xl font-bold leading-tight md:text-5xl">
            Ready for your next look?
          </p>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-soft-blush-pink lg:mx-0">
            Book an appointment in under a minute. Fill out the form and your request will open directly in WhatsApp with all your details ready to send.
          </p>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-3.5 font-semibold text-hot-pink shadow-xl shadow-deep-wine-pink/30 transition-colors hover:bg-soft-blush-pink"
          >
            <MessageCircleIcon size={20} />
            Book on WhatsApp
          </motion.a>

          <ul className="mx-auto mt-10 max-w-sm space-y-4 text-left text-sm lg:mx-0">
            {[
              'Tell us the service and your preferred date',
              'Your booking details are prepared automatically',
              'Send the request on WhatsApp for confirmation',
            ].map((step, i) => (
              <li key={step} className="flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-bold text-hot-pink">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-6 shadow-2xl shadow-deep-wine-pink/40 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-soft-blush-pink text-hot-pink">
                <CalendarIcon size={22} />
              </span>
              <div>
                <h3 className="font-serif text-2xl font-bold text-hot-pink">Book an appointment</h3>
                <p className="text-xs">Your booking details will be sent to WhatsApp.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={LABEL_CLASS}>Full name</label>
                <input id="name" required value={form.name} onChange={update('name')} placeholder="Your name" className={FIELD_CLASS} />
              </div>

              <div>
                <label htmlFor="phone" className={LABEL_CLASS}>Phone / WhatsApp</label>
                <input id="phone" type="tel" required value={form.phone} onChange={update('phone')} placeholder="Your number" className={FIELD_CLASS} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="service" className={LABEL_CLASS}>Service</label>
                <select
                  id="service"
                  required
                  value={service}
                  onChange={(e) => {
                    setSent(false)
                    setService(e.target.value)
                  }}
                  className={FIELD_CLASS}
                >
                  <option value="" disabled>Choose a service</option>
                  <optgroup label="Makeup">
                    {SERVICES_DATA.filter((s) => s.serviceType === 'makeup service').map((s) => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Nails">
                    {SERVICES_DATA.filter((s) => s.serviceType === 'nails').map((s) => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label htmlFor="date" className={LABEL_CLASS}>Preferred date</label>
                <input id="date" type="date" required min={today} value={form.date} onChange={update('date')} className={FIELD_CLASS} />
              </div>

              <div>
                <label htmlFor="time" className={LABEL_CLASS}>Preferred time</label>
                <select id="time" required value={form.time} onChange={update('time')} className={FIELD_CLASS}>
                  <option value="" disabled>Choose a time</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="notes" className={LABEL_CLASS}>Notes (optional)</label>
                <textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={update('notes')}
                  placeholder="Colors, inspiration, occasion, allergies..."
                  className={`${FIELD_CLASS} resize-none`}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-hot-pink py-3.5 font-semibold text-white shadow-lg shadow-hot-pink/30 transition-colors hover:bg-deep-wine-pink"
            >
              <MessageCircleIcon size={18} />
              Continue to WhatsApp
            </motion.button>

            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl bg-soft-blush-pink p-4 text-sm text-deep-wine-pink"
                  role="status"
                >
                  <p className="flex items-start gap-2">
                    <CheckIcon size={18} className="mt-0.5 shrink-0 text-hot-pink" />
                    <span>Your appointment details are ready. WhatsApp is opening now.</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="scroll-mt-16 bg-soft-blush-pink px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading label="FAQ" title="Frequently asked questions" />

        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => {
            const open = openIndex === i
            return (
              <Reveal key={item.q} delay={i * 0.05} y={14}>
                <div
                  className={`overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow ${
                    open ? 'ring-2 ring-hot-pink/40' : ''
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-deep-wine-pink"
                  >
                    <span>{item.q}</span>
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        open ? 'bg-hot-pink text-white' : 'bg-soft-blush-pink text-hot-pink'
                      }`}
                    >
                      <ChevronDownIcon size={18} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <p className="mt-8 text-center text-sm">
            Still have a question?{' '}
            <a href="#book" className="font-semibold text-hot-pink underline underline-offset-4">
              Send us a message
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}