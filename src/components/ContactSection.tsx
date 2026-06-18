'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection({ dict, locale }: { dict: any; locale: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Info sliding from left
      gsap.fromTo(infoRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // Form sliding from right
      gsap.fromTo(formContainerRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactDict = {
    title: locale === 'fr' ? "Une question ? Contactez-nous." : "A question? Contact us.",
    description: locale === 'fr' 
      ? "Notre équipe est à votre écoute pour organiser votre sortie idéale dans le Verdon. Nous répondons généralement en moins de 24h."
      : "Our team is at your service to organize your ideal outing in the Verdon. We generally reply in less than 24 hours.",
    phoneLabel: locale === 'fr' ? "Téléphone" : "Phone",
    emailLabel: locale === 'fr' ? "Email" : "Email",
    addressLabel: locale === 'fr' ? "Adresse" : "Address",
    namePlaceholder: locale === 'fr' ? "Votre nom" : "Your name",
    emailPlaceholder: locale === 'fr' ? "votre@email.com" : "your@email.com",
    phonePlaceholder: locale === 'fr' ? "Votre numéro de téléphone" : "Your phone number",
    messagePlaceholder: locale === 'fr' ? "Dites-nous tout sur votre projet d'aventure..." : "Tell us all about your adventure project...",
    submitLabel: locale === 'fr' ? "ENVOYER VOTRE MESSAGE" : "SEND YOUR MESSAGE",
    submittingLabel: locale === 'fr' ? "ENVOI EN COURS..." : "SENDING...",
    fullNameLabel: locale === 'fr' ? "Nom complet" : "Full name",
    messageLabel: locale === 'fr' ? "Message" : "Message",
    successMsg: locale === 'fr' ? "Merci ! Votre message a bien été envoyé." : "Thank you! Your message has been sent successfully.",
    errorMsg: locale === 'fr' ? "Une erreur est survenue lors de l'envoi. Veuillez réessayer." : "An error occurred while sending. Please try again."
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_linstant_verdon';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_contact_form';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        setStatus('success');
        setFormData({
          user_name: '',
          user_email: '',
          user_phone: '',
          message: '',
        });
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setStatus('error');
      });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-white overflow-hidden relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-start">
        
        {/* Left Column: Contact details */}
        <div ref={infoRef} className="space-y-12">
          <div className="space-y-6">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs flex items-center gap-3">
              <span className="w-8 h-px bg-primary" /> {locale === 'fr' ? 'À VOTRE ÉCOUTE' : 'AT YOUR SERVICE'}
            </span>
            <h2 className="text-4xl md:text-5.5xl font-black uppercase tracking-tighter text-[#109ea5] leading-none">
              {contactDict.title}
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
              {contactDict.description}
            </p>
          </div>

          <div className="space-y-10 pt-4">
            {/* Phone */}
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-lg">
                <Phone size={24} className="md:hidden" />
                <Phone size={32} className="hidden md:block" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">{contactDict.phoneLabel}</p>
                <a href="tel:+33689855381" className="text-xl md:text-3xl font-black tracking-tight text-slate-900 hover:text-primary transition-colors">+33 (0)6 89 85 53 81</a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-lg">
                <Mail size={24} className="md:hidden" />
                <Mail size={32} className="hidden md:block" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">{contactDict.emailLabel}</p>
                <a href="mailto:contact@linstantverdon.com" className="text-xl md:text-3.5xl font-black tracking-tight text-slate-900 hover:text-primary transition-colors lowercase">contact@linstantverdon.com</a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-lg">
                <MapPin size={24} className="md:hidden" />
                <MapPin size={32} className="hidden md:block" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">{contactDict.addressLabel}</p>
                <p className="text-xl md:text-3xl font-black tracking-tight leading-tight text-slate-900">395 Chem. de Haut Bourras, 04120 La Palud-sur-Verdon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Panel */}
        <div ref={formContainerRef} className="bg-slate-50 p-8 md:p-16 rounded-[3.5rem] border border-slate-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <form ref={formRef} onSubmit={sendEmail} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{contactDict.fullNameLabel}</label>
                <input 
                  type="text" 
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  required
                  className="bg-white border border-slate-200 rounded-2xl p-5 text-slate-900 focus:border-primary outline-none transition-all placeholder:text-slate-400 shadow-sm" 
                  placeholder={contactDict.namePlaceholder} 
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{contactDict.emailLabel}</label>
                <input 
                  type="email" 
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  required
                  className="bg-white border border-slate-200 rounded-2xl p-5 text-slate-900 focus:border-primary outline-none transition-all placeholder:text-slate-400 shadow-sm" 
                  placeholder={contactDict.emailPlaceholder} 
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{contactDict.phoneLabel}</label>
              <input 
                type="tel" 
                name="user_phone"
                value={formData.user_phone}
                onChange={handleInputChange}
                className="bg-white border border-slate-200 rounded-2xl p-5 text-slate-900 focus:border-primary outline-none transition-all placeholder:text-slate-400 shadow-sm" 
                placeholder={contactDict.phonePlaceholder} 
              />
            </div>
            
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{contactDict.messageLabel}</label>
              <textarea 
                rows={5} 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="bg-white border border-slate-200 rounded-2xl p-5 text-slate-900 focus:border-primary outline-none transition-all placeholder:text-slate-400 shadow-sm" 
                placeholder={contactDict.messagePlaceholder}
              ></textarea>
            </div>

            {status === 'success' && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-medium">
                {contactDict.successMsg}
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-sm font-medium">
                {contactDict.errorMsg}
              </div>
            )}
            
            <button 
              type="submit"
              disabled={status === 'sending'}
              className="button-glow w-full py-5.5 text-xs font-black uppercase tracking-widest shadow-xl hover:scale-[1.01] transition-transform disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {status === 'sending' && <Loader2 className="animate-spin" size={16} />}
              {status === 'sending' ? contactDict.submittingLabel : contactDict.submitLabel}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
