'use client';

import React, { useState } from 'react';
import { HelpCircle, Info, Shield, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

interface FAQContentProps {
  locale: string;
  dict: any;
}

export default function FAQContent({ locale, dict }: FAQContentProps) {
  const [activeTab, setActiveTab] = useState<'faq' | 'info' | 'legal' | 'cgv'>('faq');

  const faqs = locale === 'en' ? [
    { q: "What equipment should I bring?", a: "A swimsuit, a towel, closed sports shoes (like sneakers), and a bottle of water." },
    { q: "Do I need to know how to swim?", a: "Yes, it is mandatory to know how to swim at least 25 meters and be able to submerge." },
    { q: "What are the cancellation conditions?", a: "Please consult our terms and conditions (CGV) tab for full details." },
  ] : [
    { q: "Quel équipement dois-je prévoir ?", a: "Maillot de bain, serviette, chaussures de sport fermées (type baskets) et une bouteille d'eau." },
    { q: "Faut-il savoir nager ?", a: "Oui, il est impératif de savoir nager au moins 25 mètres et d'être capable de s'immerger." },
    { q: "Quelles sont les conditions d'annulation ?", a: "Consultez notre onglet Conditions Générales de Vente (CGV) pour plus de détails." },
  ];

  const allContent = {
    fr: {
      tabs: {
        faq: "FAQ",
        info: "Fonctionnement",
        legal: "Assurances & Mentions",
        cgv: "Conditions (CGV)"
      },
      info: {
        title: "Fonctionnement",
        text: "Vous nous contactez par mail ou téléphone, nous vous renseignons sur l’activité qui vous intéresse, nous convenons d’une date et d’une heure de rendez-vous. Le rendez-vous se fait directement sur le lieu de l’activité. Nous vous envoyons les coordonnées GPS du rendez-vous. Le règlement peut se faire par carte bancaire, chèque vacances, virement bancaire ou en espèce le jour du rendez-vous."
      },
      insurance: {
        title: "Assurances",
        text: "Les professionnels disposent tous d’une Responsabilité Civile et professionnelle et d'une individuelle accident client.",
        list: [
          "Assurances L'Instant Verdon",
          "Assurances Emma Four",
          "Assurances Angèle Kanapa"
        ]
      },
      legal: {
        title: "Mentions Légales",
        siret: "Siret: 843 902 420 00010.",
        status: "L’instant Verdon est un bureau des moniteurs déclaré sous le statut de Syndicat Local.",
        desc: "L’Instant Verdon est un regroupement de travailleurs indépendants. Les moniteurs et monitrices assureront toutes les activités Canyons, Escalade, Parcours aventures et soirées insolites."
      },
      cgv: {
        title: "Conditions Générales de Vente (CGV)",
        sections: [
          {
            title: "Inscription et Réservation",
            items: [
              "Par téléphone au 06.89.85.53.81 ou par mail à linstantverdon@gmail.com.",
              "Toute inscription implique l’adhésion complète à nos conditions générales de vente.",
              "Obligation de savoir nager pour toute activité de canyoning.",
              "Ne pas présenter de contre-indication médicale à la pratique de l'activité choisie.",
              "Parfaite compréhension des recommandations de pratique. Merci de bien vous renseigner avant toute réservation."
            ]
          },
          {
            title: "Règlement & Acompte",
            items: [
              "Une réservation est dite confirmée à réception du règlement d’acompte (des arrhes de 50% du montant total pourront vous être demandés au moment de la réservation).",
              "Aucune réservation ne sera enregistrée sans règlement. Pour les réservations de dernière minute, le règlement total sera nécessaire.",
              "Modes de règlement acceptés : Carte Bancaire, Chèques vacances (ANCV), Espèces, Virement bancaire.",
              "Les clients recevront par mail ou téléphone toutes les informations nécessaires à la sortie."
            ]
          },
          {
            title: "Politique d'Annulation Client",
            items: [
              "Annulation signalée jusqu’à 6 jours avant la prestation : remboursement intégral des arrhes.",
              "Annulation signalée entre 5 jours et 48h avant le début de la prestation : encaissement des arrhes.",
              "Toute annulation devra être signalée au plus tard 48h avant le début de la prestation. Dans le cas contraire, le client devra régler 50% de la somme due.",
              "Annulation due à un cas de force majeure : remboursement des arrhes and non-paiement de la prestation sur présentation d'un justificatif (ex: certificat médical)."
            ]
          },
          {
            title: "Annulation et Interruption par le Moniteur",
            items: [
              "Le moniteur de L’instant Verdon peut décider d’annuler ou d’interrompre une sortie pour des raisons de sécurité (crues, météo, sécheresse, pollution...) ou si le niveau technique/physique des participants est insuffisant.",
              "Dans ce cas, aucun frais n'est imputé et aucun participant ne peut prétendre à une quelconque indemnité. Seul l’Instant Verdon est habilité à modifier le programme."
            ]
          },
          {
            title: "Prestations & Responsabilités",
            items: [
              "Les activités sont encadrées par un titulaire diplômé d'État, à jour de ses recyclages réglementaires.",
              "Chaque participant est conscient des risques inhérents aux activités de pleine nature et s’engage à ne pas faire porter la responsabilité de ces risques sur L’Instant Verdon.",
              "Il est obligatoire de se conformer aux consignes de sécurité données par le moniteur. L'Instant Verdon décline toute responsabilité en cas d'initiative imprudente.",
              "L’Instant Verdon se dégage de toute responsabilité concernant vos biens personnels (perte, bris, vols...) sur les sites d'activités ou dans les véhicules.",
              "Le souscripteur d’un groupe s’engage à faire connaître et approuver ces conditions à tous les participants inscrits.",
              "Pour les mineurs, la responsabilité incombe aux parents, tuteurs ou à l'organisation extérieure sous la tutelle de laquelle ils participent. Une autorisation parentale est requise pour tout mineur non accompagné."
            ]
          },
          {
            title: "Contre-indications Médicales",
            items: [
              "Il est obligatoire de signaler toute pathologie ou traumatisme antérieur (entorse, opération, fragilité articulaire...).",
              "Signalez obligatoirement les cas d'asthme, diabète, grossesse, otites chroniques ou tendinites.",
              "Nos activités sont déconseillées aux personnes sujettes à des difficultés respiratoires ou cardio-vasculaires, crises de tétanie ou épilepsie."
            ]
          },
          {
            title: "Tarifs",
            items: [
              "Le prix comprend l'encadrement par un moniteur diplômé d'État et le matériel conforme aux normes CE.",
              "Les tarifs présentés en euros TTC sont valables pour toute la saison en cours."
            ]
          }
        ]
      }
    },
    en: {
      tabs: {
        faq: "FAQ",
        info: "How it works",
        legal: "Insurance & Legal",
        cgv: "Terms of Sale (CGV)"
      },
      info: {
        title: "How It Works",
        text: "You contact us by email or phone, we inform you about the activity you are interested in, and we agree on a date and time. The meeting takes place directly at the activity location. We will send you the GPS coordinates of the meeting point. Payment can be made by credit card, holiday vouchers (chèques vacances), bank transfer, or cash on the day of the activity."
      },
      insurance: {
        title: "Insurance",
        text: "All instructors hold professional liability insurance and individual accident client insurance.",
        list: [
          "L'Instant Verdon Insurance",
          "Emma Four Insurance",
          "Angèle Kanapa Insurance"
        ]
      },
      legal: {
        title: "Legal Notices",
        siret: "Siret: 843 902 420 00010.",
        status: "L’instant Verdon is an instructors' office registered under the status of Local Union.",
        desc: "L’Instant Verdon is a grouping of independent workers. The instructors will supervise all canyoning, climbing, adventure courses, and unique evening activities."
      },
      cgv: {
        title: "Terms and Conditions of Sale (CGV)",
        sections: [
          {
            title: "Registration & Booking",
            items: [
              "By phone at +33 (0)6 89 85 53 81 or by email at linstantverdon@gmail.com.",
              "Any booking implies full acceptance of our terms and conditions of sale.",
              "You must know how to swim for all canyoning activities.",
              "No medical contraindications for the selected activity.",
              "Perfect understanding of the safety guidelines. Please inquire thoroughly before booking."
            ]
          },
          {
            title: "Payment & Deposit",
            items: [
              "A reservation is confirmed upon receipt of a deposit (a deposit of 50% of the total amount may be requested at the time of booking).",
              "No reservation will be recorded without payment. For last-minute bookings, full payment is required.",
              "Accepted methods of payment: Credit Card, Holiday Vouchers (ANCV), Cash, Bank Transfer.",
              "Customers will receive all necessary meeting details by email or phone."
            ]
          },
          {
            title: "Cancellation Policy (Client)",
            items: [
              "Cancellation notified up to 6 days before the activity: full refund of the deposit.",
              "Cancellation notified between 5 days and 48 hours before the start of the activity: deposit is kept.",
              "Any cancellation must be reported at least 48 hours before the start. Otherwise, the client will be billed 50% of the total price.",
              "Cancellation due to force majeure: full refund of deposit and cancellation of fees upon presentation of proof (e.g. medical certificate)."
            ]
          },
          {
            title: "Cancellation & Interruption by the Guide",
            items: [
              "The L'Instant Verdon guide may decide to cancel or interrupt an outing for safety reasons (floods, weather, drought, pollution...) or if the technical/physical level of participants is insufficient.",
              "In this case, no fees are charged and no compensation can be claimed. Only L'Instant Verdon is authorized to modify the program."
            ]
          },
          {
            title: "Services & Liabilities",
            items: [
              "Activities are supervised by a state-certified instructor with up-to-date certifications.",
              "Each participant is aware of the inherent risks of outdoor nature activities and agrees to take full responsibility, exempting L'Instant Verdon from liability.",
              "Compliance with all safety instructions given by the guide is mandatory. L'Instant Verdon declines liability in case of reckless personal initiatives.",
              "L’Instant Verdon is not responsible for personal belongings (loss, damage, theft...) at the activity sites or in vehicles.",
              "The group leader agrees to communicate and obtain approval of these terms from all registered participants.",
              "For minors, responsibility lies with parents, guardians, or the external supervising organization. Parental consent is required for unaccompanied minors."
            ]
          },
          {
            title: "Medical Contraindications",
            items: [
              "It is mandatory to report any prior trauma or medical condition (sprains, surgery, fragile joints...).",
              "Inform us of asthma, diabetes, pregnancy, chronic ear infections, or tendonitis.",
              "Generally, all activities are strongly discouraged for individuals with respiratory or cardiovascular issues, spasmophilia, or epilepsy."
            ]
          },
          {
            title: "Rates",
            items: [
              "The price includes supervision by a state-certified instructor and CE-certified gear.",
              "The rates in euros (including VAT) are valid for the current season."
            ]
          }
        ]
      }
    }
  };

  const content = allContent[locale as 'fr' | 'en'] || allContent.fr;

  const tabIcons = {
    faq: <HelpCircle size={16} />,
    info: <Info size={16} />,
    legal: <Shield size={16} />,
    cgv: <FileText size={16} />
  };

  return (
    <div className="w-full space-y-12">
      {/* Premium Horizontal Tabs */}
      <div className="flex flex-wrap gap-3 justify-center border-b border-slate-100 pb-8">
        {(Object.keys(content.tabs) as Array<'faq' | 'info' | 'legal' | 'cgv'>).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black uppercase text-xs tracking-wider transition-all duration-300 ${
              activeTab === tab
                ? 'bg-[#10a18b]/10 text-[#10a18b] border-[#10a18b]/40 shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100/70 text-slate-500 border border-slate-200/50'
            }`}
          >
            {tabIcons[tab]}
            <span>{content.tabs[tab]}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="transition-all duration-500">
        {activeTab === 'faq' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="card-promax p-10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#10a18b] opacity-30" />
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-black mb-4 text-[#0d758b] group-hover:text-[#10a18b] transition-colors flex items-start gap-4">
                    <span className="text-[#10a18b] text-3xl leading-none font-black">?</span>
                    <span className="leading-tight">{faq.q}</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium text-base md:text-lg border-l border-slate-100 pl-8 ml-3">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-10 animate-fadeIn max-w-4xl mx-auto">
            {/* Functioning Card */}
            <div className="card-promax p-10 md:p-12 space-y-6">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                <span className="w-8 h-1 rounded-full bg-[#10a18b]" />
                {content.info.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium text-base md:text-lg">
                {content.info.text}
              </p>
            </div>

            {/* Insurance Card */}
            <div className="card-promax p-10 md:p-12 space-y-6">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                <span className="w-8 h-1 rounded-full bg-[#10a18b]" />
                {content.insurance.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-semibold text-base md:text-lg">
                {content.insurance.text}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {content.insurance.list.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-xs uppercase tracking-tight text-slate-700">
                    <CheckCircle2 size={16} className="text-[#10a18b] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'legal' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="card-promax p-10 md:p-12 space-y-8">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                <span className="w-8 h-1 rounded-full bg-[#10a18b]" />
                {content.legal.title}
              </h3>
              
              <div className="space-y-6 text-slate-600 font-medium text-base md:text-lg leading-relaxed">
                <p className="border-l-4 border-[#10a18b] pl-6 font-bold text-slate-800">
                  {content.legal.status}
                </p>
                <p>
                  {content.legal.desc}
                </p>
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-8 text-sm font-bold text-slate-500 uppercase tracking-wider">
                  <span>{content.legal.siret}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cgv' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-8 text-center">
              {content.cgv.title}
            </h2>
            
            <div className="space-y-6">
              {content.cgv.sections.map((section, index) => (
                <div key={index} className="card-promax p-8 md:p-10 space-y-6">
                  <h3 className="text-lg md:text-xl font-black text-[#0d758b] uppercase tracking-tight flex items-center gap-3">
                    <ChevronRight size={18} className="text-[#10a18b]" />
                    {section.title}
                  </h3>
                  <ul className="space-y-4 ml-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600 font-medium text-sm md:text-base leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10a18b]/70 shrink-0 mt-2.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
