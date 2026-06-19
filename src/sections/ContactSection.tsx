import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, AlertCircle, Loader2,
  Mail, Phone, MapPin, ChevronDown,
} from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import { submitContactForm } from '@/services/contactService'
import type { ContactFormData, FormStatus, ServiceType } from '@/types'

const SERVICE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: 'AI Development',    label: 'AI Development'    },
  { value: 'Web Development',   label: 'Web Development'   },
  { value: 'SaaS Development',  label: 'SaaS Development'  },
  { value: 'Automation Systems',label: 'Automation Systems' },
]

const blank: ContactFormData = {
  name: '', email: '', company: '', service: '', project_details: '',
}

const ContactSection: React.FC = () => {
  const [form,        setForm]        = useState<ContactFormData>(blank)
  const [status,      setStatus]      = useState<FormStatus>('idle')
  const [errorMsg,    setErrorMsg]    = useState('')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [selectFocus, setSelectFocus] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const validate = () => {
    const e: Partial<Record<keyof ContactFormData, string>> = {}
    if (!form.name.trim())            e.name = 'Name is required'
    if (!form.email.trim())           e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.service)                e.service = 'Please select a service'
    if (!form.project_details.trim()) e.project_details = 'Please describe your project'
    setFieldErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (fieldErrors[name as keyof ContactFormData])
      setFieldErrors(p => ({ ...p, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading'); setErrorMsg('')
    const res = await submitContactForm(form)
    if (res.success) { setStatus('success'); setForm(blank); setFieldErrors({}) }
    else             { setStatus('error');   setErrorMsg(res.error || 'Something went wrong.') }
  }

  /* ── shared styles ── */
  const inputS = (field: keyof ContactFormData): React.CSSProperties => ({
    width: '100%',
    background: '#000000',
    border: `1px solid ${fieldErrors[field] ? 'rgba(220,60,60,.5)' : 'rgba(62,143,168,.13)'}`,
    borderRadius: '8px',
    padding: '13px 16px',
    color: '#F0EAE4',
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color .2s, box-shadow .2s',
  })

  const labelS: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Inter, sans-serif',
    fontSize: '10px', fontWeight: 600,
    letterSpacing: '.12em', textTransform: 'uppercase',
    color: '#5a5a5a', marginBottom: '8px',
  }

  const errS: React.CSSProperties = {
    marginTop: 6, color: '#e05555',
    fontSize: '11px', fontFamily: 'Inter, sans-serif',
  }

  return (
    <section
      id="contact"
      style={{ position: 'relative', background: '#07111F', padding: '88px 0', overflow: 'hidden' }}
      aria-labelledby="contact-h2"
    >
      {/* divider */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(62,143,168,.14),transparent)',
      }} aria-hidden="true" />

      {/* bg glows */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse at 8% 30%, rgba(62,143,168,.045) 0%, transparent 55%),' +
          'radial-gradient(ellipse at 92% 70%, rgba(62,143,168,.035) 0%, transparent 50%)',
      }} aria-hidden="true" />

      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 clamp(16px, 5vw, 56px)', position: 'relative' }}>

        {/* Header */}
        <div style={{ marginBottom: '60px', maxWidth: 580 }}>
          <ScrollReveal animation="fadeUp">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <span style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, #3E8FA8, rgba(62,143,168,0.3))', flexShrink: 0 }} />
              <span className="label" style={{ marginBottom: 0 }}>
                Get In Touch
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={.07}>
            <h2 id="contact-h2" style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
              fontWeight: 700, color: '#F0EAE4', lineHeight: 1.1, marginBottom: '14px',
            }}>
              Let's Build Something{' '}
              <span style={{
                background: 'linear-gradient(135deg,#3E8FA8 0%,#5BB8D4 50%,#3E8FA8 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Extraordinary
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={.1}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#555', lineHeight: 1.75 }}>
              Tell us about your project. We'll get back to you within one business day.
            </p>
          </ScrollReveal>
        </div>

        {/* Responsive layout: stacks on mobile/tablet, 5-column grid on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* ── LEFT — info ── */}
          <ScrollReveal animation="fadeUp" delay={.07} className="lg:col-span-2">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '20px', fontWeight: 700, color: '#F0EAE4', marginBottom: '10px',
                }}>
                  Get in Touch
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#AECCD9', lineHeight: 1.75 }}>
                  Whether you have a clear vision or just an idea — we'd love to hear from you.
                </p>
              </div>

              {/* Contact details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { Icon: Mail,   label: 'Email',           val: 'saimokshith2006@gmail.com', href: 'mailto:saimokshith2006@gmail.com' },
                  { Icon: Phone,  label: 'Schedule a Call', val: '+91 9347804324',  href: 'tel:+919347804324' },
                  { Icon: MapPin, label: 'Location',        val: 'Badvel, Andhra Pradesh', href: null },
                ].map(({ Icon, label, val, href }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div className="icon-box" style={{ flexShrink: 0 }} aria-hidden="true">
                      <Icon size={15} style={{ color: '#3E8FA8' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '3px' }}>
                        {label}
                      </p>
                      {href
                        ? <a href={href} style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#F0EAE4', textDecoration: 'none' }}>{val}</a>
                        : <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#F0EAE4' }}>{val}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>

              {/* Expect box */}
              <div style={{
                background: '#0f0f0f',
                border: '1px solid rgba(62,143,168,.1)',
                borderRadius: '12px', padding: '22px 20px',
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
                  letterSpacing: '.12em', textTransform: 'uppercase', color: '#F0EAE4', marginBottom: '16px',
                }}>
                  What to Expect:
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Response within 1 business day',
                    'Free discovery consultation',
                    'Transparent project scoping',
                    'No pushy sales tactics',
                  ].map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#AECCD9' }}>
                      <CheckCircle size={11} style={{ color: '#3E8FA8', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* ── RIGHT — Form ── */}
          <ScrollReveal animation="fadeUp" delay={.12} className="lg:col-span-3 w-full">
            <div style={{
              background: '#0f0f0f',
              border: '1px solid rgba(62,143,168,.1)',
              borderRadius: '16px',
              padding: 'clamp(20px, 5vw, 36px) clamp(16px, 4vw, 30px)',
              boxShadow: '0 0 60px rgba(62,143,168,.04)',
            }}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: .4, ease: 'easeOut' }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '60px 0', minHeight: '480px', justifyContent: 'center' }}
                    role="status" aria-live="polite"
                  >
                    <div style={{
                      width: 64, height: 64, borderRadius: '50%',
                      background: 'rgba(62,143,168,.1)', border: '1px solid rgba(62,143,168,.3)',
                      boxShadow: '0 0 30px rgba(62,143,168,.18)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
                    }}>
                      <CheckCircle size={28} style={{ color: '#3E8FA8' }} />
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', color: '#F0EAE4', marginBottom: '10px' }}>
                      Message Sent!
                    </h3>
                     <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#AECCD9', lineHeight: 1.7, maxWidth: '280px', marginBottom: '28px' }}>
                      Thank you for reaching out. We'll review your project and be in touch within one business day.
                    </p>
                    <button onClick={() => setStatus('idle')} style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#3E8FA8', background: 'none', border: 'none', cursor: 'pointer' }}>
                      Send another message →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} noValidate aria-label="Contact form"
                  >
                    {/* ── Name + Email row ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 mb-3.5">
                      <div>
                        <label htmlFor="cn" style={labelS}>
                          Name <span style={{ color: '#3E8FA8' }}>*</span>
                        </label>
                        <input
                          id="cn" type="text" name="name" value={form.name}
                          onChange={handleChange} placeholder="Your full name"
                          style={inputS('name')} disabled={status === 'loading'}
                          aria-required="true" aria-invalid={!!fieldErrors.name}
                        />
                        {fieldErrors.name && <p role="alert" style={errS}>{fieldErrors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="ce" style={labelS}>
                          Email <span style={{ color: '#3E8FA8' }}>*</span>
                        </label>
                        <input
                          id="ce" type="email" name="email" value={form.email}
                          onChange={handleChange} placeholder="you@company.com"
                          style={inputS('email')} disabled={status === 'loading'}
                          aria-required="true" aria-invalid={!!fieldErrors.email}
                        />
                        {fieldErrors.email && <p role="alert" style={errS}>{fieldErrors.email}</p>}
                      </div>
                    </div>

                    {/* ── Company ── */}
                    <div style={{ marginBottom: '14px' }}>
                      <label htmlFor="cc" style={labelS}>
                        Company{' '}
                        <span style={{ fontSize: '9px', color: '#3a3a3a', fontWeight: 400, letterSpacing: 0, textTransform: 'none' }}>
                          Optional
                        </span>
                      </label>
                      <input
                        id="cc" type="text" name="company" value={form.company}
                        onChange={handleChange} placeholder="Your company name"
                        style={inputS('company')} disabled={status === 'loading'}
                      />
                    </div>

                    {/* ── Service dropdown ── */}
                    <div style={{ marginBottom: '14px' }}>
                      <label htmlFor="cs" style={labelS}>
                        I Want to Build <span style={{ color: '#3E8FA8' }}>*</span>
                      </label>

                      {/* Custom select wrapper */}
                      <div ref={dropdownRef} style={{ position: 'relative' }}>
                        <input
                          id="cs"
                          type="text"
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          placeholder="Select a service or type your own..."
                          disabled={status === 'loading'}
                          onFocus={() => {
                            setSelectFocus(true)
                            setDropdownOpen(true)
                          }}
                          onBlur={() => setSelectFocus(false)}
                          aria-required="true"
                          aria-invalid={!!fieldErrors.service}
                          autoComplete="off"
                          style={{
                            width: '100%',
                            background: '#000000',
                            border: `1px solid ${
                              fieldErrors.service
                                ? 'rgba(220,60,60,.5)'
                                : selectFocus || dropdownOpen
                                  ? 'rgba(62,143,168,.45)'
                                  : 'rgba(62,143,168,.13)'
                            }`,
                            borderRadius: '8px',
                            padding: '13px 44px 13px 16px',
                            color: '#F0EAE4',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            outline: 'none',
                            transition: 'border-color .2s, box-shadow .2s',
                            boxShadow: selectFocus || dropdownOpen ? '0 0 0 3px rgba(62,143,168,.07)' : 'none',
                          }}
                        />

                        {/* Arrow button */}
                        <button
                          type="button"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          disabled={status === 'loading'}
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '44px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#3E8FA8',
                            outline: 'none',
                          }}
                          aria-label="Toggle services options"
                        >
                          <ChevronDown
                            size={15}
                            style={{
                              transform: `rotate(${dropdownOpen ? '180deg' : '0deg'})`,
                              transition: 'transform .2s ease',
                            }}
                          />
                        </button>

                        {/* Custom Dropdown Options */}
                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              style={{
                                position: 'absolute',
                                top: '105%',
                                left: 0,
                                right: 0,
                                zIndex: 10,
                                background: '#000000',
                                border: '1px solid rgba(62,143,168,.2)',
                                borderRadius: '8px',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
                                overflow: 'hidden',
                              }}
                            >
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {SERVICE_OPTIONS.map(o => (
                                  <li key={o.value}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setForm(p => ({ ...p, service: o.value }))
                                        if (fieldErrors.service) {
                                          setFieldErrors(p => ({ ...p, service: undefined }))
                                        }
                                        setDropdownOpen(false)
                                      }}
                                      style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        background: 'none',
                                        border: 'none',
                                        padding: '12px 16px',
                                        color: '#F0EAE4',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        transition: 'background .2s, color .2s',
                                        outline: 'none',
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(62,143,168,.08)'
                                        e.currentTarget.style.color = '#3E8FA8'
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'none'
                                        e.currentTarget.style.color = '#F0EAE4'
                                      }}
                                    >
                                      {o.label}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {fieldErrors.service && (
                        <p role="alert" style={errS}>{fieldErrors.service}</p>
                      )}
                    </div>

                    {/* ── Project details ── */}
                    <div style={{ marginBottom: '24px' }}>
                      <label htmlFor="cpd" style={labelS}>
                        Project Details <span style={{ color: '#3E8FA8' }}>*</span>
                      </label>
                      <textarea
                        id="cpd" name="project_details" value={form.project_details}
                        onChange={handleChange} rows={4}
                        placeholder="Tell us about your project, timeline, and budget..."
                        style={{ ...inputS('project_details'), resize: 'none' }}
                        disabled={status === 'loading'}
                        aria-required="true" aria-invalid={!!fieldErrors.project_details}
                      />
                      {fieldErrors.project_details && (
                        <p role="alert" style={errS}>{fieldErrors.project_details}</p>
                      )}
                    </div>

                    {/* ── Error banner ── */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '12px 14px', borderRadius: '8px',
                          background: 'rgba(220,60,60,.08)', border: '1px solid rgba(220,60,60,.2)',
                          marginBottom: '18px',
                        }}
                        role="alert" aria-live="assertive"
                      >
                        <AlertCircle size={14} style={{ color: '#e05555', flexShrink: 0 }} />
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#e05555' }}>{errorMsg}</p>
                      </motion.div>
                    )}

                    {/* ── Submit ── */}
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary"
                      style={{
                        width: '100%', justifyContent: 'center',
                        fontSize: '12px', padding: '15px 24px',
                        opacity: status === 'loading' ? .7 : 1,
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      }}
                      whileHover={{ scale: status === 'loading' ? 1 : 1.01 }}
                      whileTap={{ scale: status === 'loading' ? 1 : .98 }}
                      id="contact-submit"
                    >
                      {status === 'loading'
                        ? <><Loader2 size={14} className="animate-spin" aria-hidden="true" /> Sending...</>
                        : <>Send Message <ArrowRight size={13} /></>
                      }
                    </motion.button>

                    <p style={{
                      marginTop: '12px', textAlign: 'center',
                      fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#333',
                    }}>
                      Your information is secure and will never be shared.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
