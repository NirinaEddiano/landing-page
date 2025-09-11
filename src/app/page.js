"use client";
import { useState, useEffect,useRef } from 'react';
import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';

const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const ChevronDownIcons = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1L4 4L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 13L7 7L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const StarIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>;
const ArrowUpRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>;
const PaperIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const RocketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.11.63-1.4 1.84-2.34 3.45-3.45-1.11 1.61-2.05 2.82-3.1 3.45-.81.65-2.27.66-3.11.05z"></path><path d="m12 15-3-3a9 9 0 0 1 3-12 9 9 0 0 1 12 3l-3 3"></path><path d="m7.5 12.5 6 6"></path><path d="m21.5 8.5-6-6"></path></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const FranceFlagIcon = () => <svg width="20" height="15" viewBox="0 0 3 2" className="rounded-sm"><path fill="#002654" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#ED2939" d="M2 0h1v2H2z"/></svg>;
const BelgiumFlagIcon = () => <svg width="20" height="15" viewBox="0 0 3 2" className="rounded-sm"><path fill="#000" d="M0 0h1v2H0z"/><path fill="#FFD90C" d="M1 0h1v2H1z"/><path fill="#F31830" d="M2 0h1v2H2z"/></svg>;
const NetherlandsFlagIcon = () => <svg width="20" height="15" viewBox="0 0 9 6" className="rounded-sm"><path fill="#AE1C28" d="M0 0h3v1H0z"/><rect fill="#AE1C28" width="9" height="2" />
<rect fill="#FFFFFF" y="2" width="9" height="2" />
<rect fill="#21468B" y="4" width="9" height="2" />
</svg>;

const LogoCarousel = () => {
  const logos = [
    { src: '/logos/logo1.svg', alt: 'Logo 1', width: 56, height: 56 },
    { src: '/logos/logo2.svg', alt: 'Logo 2', width: 56, height: 56 },
    { src: '/logos/logo3.svg', alt: 'Logo 3', width: 56, height: 56 },
    { src: '/logos/logo4.svg', alt: 'Logo 4', width: 66, height: 26 },
    { src: '/logos/logo5.svg', alt: 'Logo 5', width: 56, height: 56 },
    { src: '/logos/logo6.svg', alt: 'Logo 6', width: 77.75, height: 18.45 },
    { src: '/logos/logo7.svg', alt: 'Logo 7', width: 34, height: 34 },
    { src: '/logos/logo8.svg', alt: 'Logo 8', width: 60, height: 20 },
    { src: '/logos/logo9.svg', alt: 'Logo 9', width: 56, height: 56 },
    { src: '/logos/logo10.svg', alt: 'Logo 10', width: 65, height: 20 },
  ];
  return (
    <div className="bg-white w-full py-12">
      <div className="relative w-full max-w-5xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <div className="flex w-max animate-scroll">
          {[...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex-none flex items-center justify-center mx-[22.5px]" style={{ width: `${logo.width}px`}}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const servicesData = [
  {
    title: "💻 Création de sites internet.",
    imageSrc: "/service-sites.jpg",
    features: [
      "Design moderne et professionnel.",
      "Navigation fluide et intuitive.",
      "100% responsive (ordinateur, tablette, mobile).",
      "Optimisé SEO & conversions pour attirer plus de clients."
    ]
  },
  {
    title: "⚙️ Automatisations & agents IA.",
    imageSrc: "/service-ia.jpg",
    features: [
      "Automatisations sur mesure pour PME & indépendants.",
      "Intégration de vos outils (CRM, ERP, facturation, e-commerce).",
      "Assistants IA (SAV, prospection, onboarding, data).",
      "Gain de temps et réduction des coûts opérationnels."
    ]
  },
  {
    title: "📱 Applications mobile sur mesure.",
    imageSrc: "/service-apps.jpg",
    features: [
      "Développement iOS & Android adaptés à vos besoins.",
      "Interfaces modernes et intuitives.",
      "Connexion avec vos outils (CRM, e-commerce, automatisations).",
      "Solutions scalables pour accompagner votre croissance."
    ]
  },
  {
    title: "📞 Closing & prospection déléguée.",
    imageSrc: "/service-closing.jpg",
    features: [
      "Setters pour qualifier vos prospects et remplir votre agenda.",
      "Closers experts pour transformer vos leads en clients.",
      "Process commerciaux optimisés pour booster votre taux de conversion.",
      "Suivi clair et reporting des performances."
    ]
  }
];

const testimonialsRow1 = [
  {
    stars: 5,
    text: "Nous avons longtemps cherché pour la conception de notre site internet, Mey Conception a su nous accompagner tout au long de la conception avec des conseils et de la bienveillance. Équipe très professionnelle et à l’écoute merci à eux pour notre beau nouveau site.",
    avatar: "/avatars/avatar1.jpg",
    name: "Trait d'Union Immobilier",
    role: "Agence Immobilière"
  },
  {
    stars: 5,
    text: "Dans un domaine aussi exigeant que la chirurgie esthétique, où chaque détail compte, Mey Conception a su relever ce défi avec brio : le site reflète parfaitement l’image que je souhaite transmettre à mes patients – sérieux, précision, confiance et élégance.",
    avatar: "/avatars/avatar2.jpg",
    name: "Docteur Nicolas Abboud",
    role: "Chirurgie esthétique et réparatrice"
  },
  {
    stars: 5,
    text: "Je tiens à remercier la société Mey Conception pour son efficacité, sa réactivité et son professionnalisme tout au long du processus de création de mon site internet. L’équipe a su être à l’écoute de mes besoins et force de proposition.",
    avatar: "/avatars/avatar3.jpg",
    name: "Le Rucher de René",
    role: "Apiculteur"
  },
  {
    stars: 5,
    text: "Nous avons fait appel aux services de Mey conception pour plusieurs de nos sociétés. Mehdi et sa femme sont deux personnes très à l’écoute et toujours disponible ce qui rend vraiment l’échange agréable et productif. Un grand merci !",
    avatar: "/avatars/avatar4.jpg",
    name: "Ubud Suite and Spa",
    role: "Centre de bien-être"
  },

  // Fake data
  { stars: 5, text: "Une transformation digitale réussie grâce à une équipe créative et compétente. Notre nouveau site a boosté nos ventes en ligne de manière significative.", avatar: "/avatars/avatar5.jpg", name: "Épicerie Fictive", role: "Commerce de proximité" },
  { stars: 5, text: "Leur approche sur-mesure et leurs conseils avisés ont été cruciaux. Ils ont parfaitement compris notre vision et l'ont traduite en un site web magnifique.", avatar: "/avatars/avatar6.jpg", name: "Artisan Créateur", role: "Bijouterie en ligne" },
  { stars: 5, text: "Efficaces, rapides et toujours de bonne humeur. Un plaisir de travailler avec eux. Le résultat final a dépassé toutes nos attentes.", avatar: "/avatars/avatar7.jpg", name: "Studio de Yoga", role: "Bien-être et Sport" },
  { stars: 5, text: "Leur expertise en automatisation nous a fait gagner un temps précieux. Un investissement rentabilisé en quelques mois seulement.", avatar: "/avatars/avatar8.jpg", name: "Cabinet Comptable", role: "Services aux entreprises" },
];

const testimonialsRow2 = [
  {
    stars: 5,
    text: "En tant qu’entreprise de nettoyage, nous avions besoin d’un site qui soit à la fois simple, clair et qui inspire confiance. Mey Conception a su capter exactement notre façon de travailler et l’image que nous voulions transmettre à nos clients.",
    avatar: "/avatars/avatar9.jpg",
    name: "Propre & Net",
    role: "Société de nettoyage"
  },
  {
    stars: 5,
    text: "Une équipe formidable, réactive et à votre écoute. J'ai d'abord contacté Mey Conception pour leur tarif très attractif, et très vite j'ai compris que j'avais affaire à de vrais pro, créatifs, rapides et efficaces. Le résultat final est tout simplement magnifique !",
    avatar: "/avatars/avatar10.jpg",
    name: "Le Goût du Terroir",
    role: "Producteur local"
  },
  {
    stars: 5,
    text: "L’équipe a été à l’écoute de mes besoins et a su retranscrire parfaitement l’image professionnelle que je souhaitais donner à mon entreprise. Le site est moderne, clair et facile à utiliser. Je recommande vivement !",
    avatar: "/avatars/avatar11.jpg",
    name: "MF Rénovation",
    role: "Société de couverture"
  },
  {
    stars: 5,
    text: "Eyma est très professionnelle, mon site web a été fait très rapidement et de manière à optimiser le contenu. Elle est toujours disponible, je la recommande vivement et à 100% autour de moi vous pouvez y aller les yeux fermés !",
    avatar: "/avatars/avatar12.jpg",
    name: "Laboratoire Biocénose",
    role: "Soins équins"
  },
  // Fake data
  { stars: 5, text: "L'application mobile qu'ils ont développée pour nous est un succès. L'engagement de nos utilisateurs a doublé en trois mois.", avatar: "/avatars/avatar12.jpg", name: "Fitness App Co.", role: "Application mobile" },
  { stars: 5, text: "Leur service de closing est redoutable d'efficacité. Notre taux de conversion a augmenté de 25% comme promis. Incroyable.", avatar: "/avatars/avatar12.jpg", name: "Formation en Ligne", role: "E-learning" },
  { stars: 5, text: "Un design épuré, une expérience utilisateur sans faille. Ils ont vraiment su moderniser notre image de marque en ligne.", avatar: "/avatars/avatar11.jpg", name: "Architecte & Design", role: "Cabinet d'architecture" },
  { stars: 5, text: "Leur support technique est impeccable. Toujours là pour répondre à nos questions et assurer la maintenance de notre site.", avatar: "/avatars/avatar11.jpg", name: "Tech Innovate", role: "Start-up technologique" },
];


const TestimonialCard = ({ review }) => (
  <div className="flex-none bg-white border border-gray-200 rounded-2xl shadow-sm w-[501px] h-[300px] p-8 flex flex-col justify-between">
    <div className="flex">
      {[...Array(review.stars)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
    </div>
    <p className="text-left text-sm leading-7 tracking-tight text-black flex-grow mt-4">
      {review.text}
    </p>
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center gap-3">
        <Image src={review.avatar} alt={review.name} width={42} height={42} className="rounded-full" />
        <div>
          <p className="text-sm font-semibold text-black">{review.name}</p>
          <p className="text-xs text-black/50">{review.role}</p>
        </div>
      </div>
      <Image src="/google.png" alt="Logo de Google" width={20} height={20} className="rounded-full" />
    </div>
  </div>
);

const realisationsData = [
  { imageSrc: "/realisations/abboud.jpg", title: "Docteur Nicolas Abboud", subtitle: "Chirurgie esthétique et réparatrice" },
  { imageSrc: "/realisations/trait-union.jpg", title: "Trait d'Union Immobilier", subtitle: "Agence immobilière" },
  { imageSrc: "/realisations/ubud.jpg", title: "Ubud Suite & Spa", subtitle: "Centre de bien-être" },
  { imageSrc: "/realisations/tech-startup.jpg", title: "Innovate Solutions", subtitle: "Startup Technologique" },
  { imageSrc: "/realisations/restaurant.jpg", title: "Le Gourmet Parisien", subtitle: "Restaurant Gastronomique" },
  { imageSrc: "/realisations/architecte.jpg", title: "Studio d'Architecture Vision", subtitle: "Cabinet d'architectes" },
  { imageSrc: "/realisations/ecommerce.jpg", title: "Luxe & Cuir", subtitle: "E-commerce de maroquinerie" },
];


const RealisationsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);


  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  return (
    <div className="relative container mx-auto mt-10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {realisationsData.map((item, index) => (
            <div key={index} className="flex-none w-full md:w-1/2 lg:w-1/3 pl-4">
              <div className="relative w-[407px] h-[474px] rounded-[18px] bg-[#fdfdfd] overflow-hidden group">
                <Image src={item.imageSrc} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white w-full flex justify-between items-end">
                  <div>
                    <h3 className="font-bold text-[16.47px] leading-6 tracking-tight">{item.title}</h3>
                    <p className="text-[11.06px] tracking-tight opacity-80">{item.subtitle}</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-[7px] w-[45px] h-[31px] flex items-center justify-center">
                    <EyeIcon />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Boutons de navigation */}
      <button onClick={scrollPrev} className="absolute top-1/2 left-4 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/40 transition-colors">
        <ChevronLeftIcon />
      </button>
      <button onClick={scrollNext} className="absolute top-1/2 right-4 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/40 transition-colors">
        <ChevronRightIcon />
      </button>
      
      {/* Pagination (points) */}
      <div className="flex justify-center gap-2 mt-8">
        {realisationsData.map((_, index) => (
          <button 
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-[5px] h-[5px] rounded-full transition-all duration-300 ${selectedIndex === index ? 'bg-black opacity-100' : 'bg-black opacity-30'}`}
          />
        ))}
      </div>
    </div>
  );
};

const ExpertsSection = () => {
  const column1Images = [
    { src: "/experts/col1-1.jpg" }, { src: "/experts/col1-2.jpg" }, { src: "/experts/col1-3.jpg" }
  ];
  const column2Images = [
    { src: "/experts/col2-1.jpg" }, { src: "/experts/col2-2.jpg" }
  ];
  return (
    <section className="bg-white py-28">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-[0px_0px_9px_3px_rgba(0,0,0,0.1)] grid lg:grid-cols-1 lg:grid-cols-5 max-w-[1281px] mx-auto overflow-hidden">
          {/* --- PARTIE GAUCHE : TEXTE --- */}
          <div className="p-12 lg:p-16  flex flex-col justify-center col-span-3 ">
            <h2 className="text-[35.3px] font-semibold leading-9 tracking-tight text-black">
              Un réseau d’experts digitaux.
            </h2>
            <p className="mt-6 text-[14.06px] leading-[21px] tracking-tight text-black/50 max-w-[600px]">
              Notre agence digitale s’appuie sur un réseau de plus de 1000 professionnels expérimentés : développeurs web, ingénieurs mobile, experts en automatisation, designers UI/UX et closers commerciaux. Nous accompagnons les PME et grandes entreprises avec des solutions sur mesure, performantes et évolutives. Notre priorité : accélérer votre croissance, optimiser vos conversions et garantir des résultats mesurables.
            </p>
            <ul className="mt-8 space-y-3">
              <li className="flex items-center gap-3 text-[14.53px] font-light leading-6 tracking-tight text-black">
                <CheckIcon /> <span>Équipe internationale : +1000 experts disponibles pour vos projets digitaux.</span>
              </li>
              <li className="flex items-center gap-3 text-[14.53px] font-light leading-6 tracking-tight text-black">
                <CheckIcon /> <span>Expertise globale : développement, mobile, automatisations, design et closing.</span>
              </li>
              <li className="flex items-center gap-3 text-[14.53px] font-light leading-6 tracking-tight text-black">
                <CheckIcon /> <span>Résultats concrets : +35% de productivité et +25% de conversions en moyenne.</span>
              </li>
              <li className="flex items-center gap-3 text-[14.53px] font-light leading-6 tracking-tight text-black">
                <CheckIcon /> <span>Accompagnement complet : de la stratégie à la mise en production.</span>
              </li>
            </ul>
          </div>

          {/* --- PARTIE DROITE : IMAGES --- */}
          <div className="w-full max-w-[421px] px-[20px] h-[549px] flex gap-4 overflow-hidden relative col-span-2">
            {/* Colonne 1 */}
            <div className="w-1/2 h-full">
              <div className="flex flex-col h-max animate-scroll-vertical-reverse">
                {/* On duplique les images pour un effet infini */}
                {[...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images, ...column1Images].map((img, index) => (
                  <Image key={index} src={img.src} alt={`Expert photo ${index + 1}`} width={203} height={270} className="w-full h-auto rounded-2xl mb-4"/>
                ))}
              </div>
            </div>
            {/* Colonne 2 */}
            <div className="w-1/2 h-full mt-[-100px]"> {/* Le mt négatif décale le début du scroll */}
              <div className="flex flex-col h-max animate-scroll-vertical" style={{animationDuration: '40s'}}> {/* Durée différente pour un effet asynchrone */}
                {/* On duplique les images */}
                {[...column2Images, ...column2Images, ...column2Images, ...column2Images, ...column2Images, ...column2Images, ...column2Images, ...column2Images].map((img, index) => (
                  <Image key={index} src={img.src} alt={`Team photo ${index + 1}`} width={203} height={270} className="w-full h-auto rounded-2xl mb-4"/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const faqData = [
  {
    question: "Combien de temps dure la création d’un projet digital ?",
    answer: [
      "Le délai dépend de la complexité du projet et de vos besoins spécifiques.",
      { type: 'list', items: ["Un site vitrine simple peut être livré en 3 à 4 semaines.", "Un site e-commerce, une application mobile ou une automatisation complète (CRM, facturation, gestion des leads…) peut nécessiter plusieurs mois."] },
      "Un planning clair, détaillé et validé ensemble vous est fourni avant chaque démarrage afin de garantir un suivi transparent."
    ]
  },
  {
    question: "Travaillez-vous avec tous les secteurs d’activité ?",
    answer: [
      "Oui, nous accompagnons aussi bien des PME locales que des grands comptes internationaux, dans des secteurs variés : immobilier, santé, services, retail, industrie, formation, etc.",
      "Notre méthodologie flexible nous permet de comprendre les spécificités de chaque métier et de proposer une solution digitale réellement adaptée."
    ]
  },
  {
    question: "Quel est votre secteur géographique ?",
    answer: [
      "Nous travaillons principalement en France, Belgique et Pays-bas, mais également à l’international grâce à nos équipes dématérialisées. Des rendez-vous peuvent être organisés :",
      { type: 'list', items: ["en présentiel dans vos locaux,", "ou à distance via visioconférence et outils collaboratifs."] }
    ]
  },
  {
    question: "Quelles sont vos garanties ?",
    answer: [
      "Nous mettons en place des garanties pour sécuriser chaque projet :",
      { type: 'list-numbered', items: ["Modifications illimitées jusqu’à validation finale.", "Garantie satisfait ou remboursé (selon conditions définies au contrat).", "Un interlocuteur unique pour un suivi fluide et personnalisé.", "Engagement de performance avec suivi SEO, optimisation de conversion et accompagnement post-livraison."] }
    ]
  },
  {
    question: "Quelle est votre expertise principale ?",
    answer: [
      "Nous sommes spécialisés dans 4 pôles complémentaires :",
      { type: 'list', items: ["Création et refonte de sites internet modernes et optimisés SEO.", "Automatisations & agents IA pour gagner en productivité.", "Applications mobiles sur mesure (iOS & Android).", "Closing et prospection déléguée pour aider nos clients à transformer leurs leads en clients."] },
      "Cette expertise 360° nous permet de proposer une stratégie digitale complète et cohérente."
    ]
  },
  {
    question: "Proposez-vous une grille tarifaire ?",
    answer: [
      "Chaque projet est unique, c’est pourquoi nous ne proposons pas de tarifs standards. Nos prix dépendent de plusieurs facteurs : complexité du projet, nombre de fonctionnalités, délais souhaités, accompagnement après livraison.",
      "À l’issue du premier rendez-vous, nous fournissons une proposition commerciale détaillée incluant :",
      { type: 'list', items: ["planning de réalisation,", "cahier des charges précis,", "coûts transparents sans frais cachés."] },
      "Notre objectif : vous garantir le meilleur retour sur investissement."
    ]
  }
];

const FaqItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-black/10">
      <button 
        className="w-full flex justify-between items-center text-left py-6"
        onClick={onClick}
      >
        <span className="text-[16.73px] leading-6 tracking-tight text-black">{item.question}</span>
        <span className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-black flex items-center justify-center">
          <ChevronDownIcons className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <div 
        className="grid transition-all duration-500 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pb-6 text-black/70 text-[16.73px] leading-6 tracking-tight space-y-4">
            {item.answer.map((content, index) => {
              if (typeof content === 'string') {
                return <p key={index}>{content}</p>;
              }
              if (content.type === 'list') {
                return <ul key={index} className="list-disc list-inside space-y-2 pl-2">{content.items.map((li, i) => <li key={i}>{li}</li>)}</ul>;
              }
              if (content.type === 'list-numbered') {
                return <ol key={index} className="list-decimal list-inside space-y-2 pl-2">{content.items.map((li, i) => <li key={i}>{li}</li>)}</ol>;
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-28">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-[39.22px] font-semibold leading-10 tracking-tight text-black">
          Questions fréquentes.
        </h2>
        <p className="mt-4 text-[14.06px] leading-6 tracking-tight text-black/50 max-w-2xl mx-auto">
          Retrouvez ici les réponses aux questions les plus fréquentes sur nos services.
        </p>
      </div>
      
      <div className="container mx-auto px-6 mt-16 max-w-5xl">
        {faqData.map((item, index) => (
          <FaqItem 
            key={index} 
            item={item}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
      
      <div className="text-center mt-16">
        <a href="#contact" className="inline-flex items-center gap-2 bg-black text-white text-sm font-bold py-3 px-6 rounded-md hover:bg-brand-beige transition-colors duration-300">
          <PaperIcon /> Devis Gratuit
        </a>
      </div>
    </section>
  );
};

const CustomSelect = ({ label, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeholder);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };
  return (
    <div className="relative" ref={selectRef}>
      <label className="block text-[14.53px] font-normal leading-6 tracking-tight text-black mb-2">{label}</label>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 px-3 text-sm border border-gray-900/10 rounded-[10px] flex justify-between items-center text-left"
      >
        <span className={selectedValue === placeholder ? "text-gray-400" : "text-black"}>{selectedValue}</span>
        <ChevronDownIcon className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Menu déroulant avec animation */}
      <div className={`absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-[10px] shadow-lg z-10 transition-all duration-300 ease-in-out transform ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="max-h-48 overflow-y-auto p-1">
          {options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-brand-beige hover:text-white rounded-md cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  return (
    <section id="contact" className="bg-gray-50 py-28">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-[39.22px] font-semibold leading-10 tracking-tight text-black">Demande de devis gratuit.</h2>
        <div className="mt-4 text-black/50 max-w-3xl mx-auto">
          <span className="text-[14.18px]">Remplissez le formulaire pour recevoir un devis gratuitement. </span>
          <a href="mailto:votre.email@exemple.com" className="underline text-[13.71px]">Contactez-nous</a>
          <span className="text-[15px]"> par email ou par </span>
          <a href="tel:+33000000000" className="underline text-[15px]">téléphone</a>
          <span className="text-[14.06px]"> pour une réponse plus rapide (WhatsApp disponible).</span>
        </div>
      </div>
      
      <div className="container mx-auto mt-16 max-w-[865px]">
        <form className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] p-8">
          <div className="mb-6">
            <label htmlFor="fullName" className="block text-[13.83px] font-normal leading-6 tracking-tight text-black mb-2">Nom complet</label>
            <input type="text" id="fullName" placeholder="David Dupont" className="w-full h-12 px-3 text-sm border border-gray-900/10 rounded-[10px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-beige" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="companyName" className="block text-[14.53px] font-normal leading-6 tracking-tight text-black mb-2">Raison Sociale</label>
              <input type="text" id="companyName" placeholder="Exemple SA" className="w-full h-12 px-3 text-sm border border-gray-900/10 rounded-[10px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-beige" />
            </div>
            <CustomSelect label="Localisation" placeholder="Sélectionner" options={["France", "Belgique", "Pays-Bas", "International"]} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="email" className="block text-[14.53px] font-normal leading-6 tracking-tight text-black mb-2">Email</label>
              <input type="email" id="email" placeholder="exemple@entreprise.com" className="w-full h-12 px-3 text-sm border border-gray-900/10 rounded-[10px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-beige" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-[14.53px] font-normal leading-6 tracking-tight text-black mb-2">Téléphone</label>
              <input type="tel" id="phone" placeholder="Entrez votre numéro" className="w-full h-12 px-3 text-sm border border-gray-900/10 rounded-[10px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-beige" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <CustomSelect label="Avez-vous un site internet ?" placeholder="Sélectionner" options={["Oui", "Non", "En projet"]} />
            <div>
              <label htmlFor="websiteLink" className="block text-[14.53px] font-normal leading-6 tracking-tight text-black mb-2">Lien de votre site internet (facultatif)</label>
              <input type="url" id="websiteLink" placeholder="www.exemple.com" className="w-full h-12 px-3 text-sm border border-gray-900/10 rounded-[10px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-beige" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <CustomSelect label="Service(s) souhaité(s)" placeholder="Sélectionner" options={["Création de site internet", "Automatisation & IA", "Application mobile", "Closing & Prospection"]} />
            <CustomSelect label="Budget" placeholder="Sélectionner" options={["Moins de 3000€", "3000€ - 5000€", "5000€ - 10000€", "Plus de 10000€"]} />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-[13.83px] font-normal leading-6 tracking-tight text-black mb-2">Message</label>
            <textarea id="message" placeholder="Parlez-nous de votre projet avec le plus de détails possible..." rows="4" className="w-full p-3 text-sm border border-gray-900/10 rounded-[10px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-beige"></textarea>
          </div>
          
          {/* Checkbox confidentialité - CORRIGÉ */}
          <div className="flex items-center justify-center mb-6">
            <input type="checkbox" id="confidentiality" className="h-4 w-4 rounded border-gray-300 text-brand-beige focus:ring-brand-beige" />
            <label htmlFor="confidentiality" className="ml-2 block text-[11.06px] tracking-tight text-black/70">Vos informations sont 100% confidentielles. Aucun engagement.</label>
          </div>
          
          <button type="submit" className="w-full h-12 bg-black text-white text-[11.44px] font-normal leading-4 tracking-tight rounded-[7px] hover:bg-gray-800 transition-colors duration-300">
            Envoyer ma demande
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-16">
          
          {/* --- PARTIE GAUCHE --- */}
          <div className="lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#accueil" className="font-['Mada'] text-[21px] font-semibold leading-[65px] tracking-[-1.5px] text-black">
              MUNTU<span className="font-light text-[21px] text-black/60">LABS</span>
            </a>
            <p className="mt-2 text-[14.18px] leading-[21px] tracking-tight text-black max-w-xs">
              Solutions digitales 360° : création de sites internet, apps mobiles, automatisations intelligentes et services de closing B2B.
            </p>
            <div className="flex items-center gap-5 mt-6">
              <a href="#" className="text-black hover:opacity-70 transition-opacity"><InstagramIcon /></a>
              <a href="#" className="text-black hover:opacity-70 transition-opacity"><LinkedinIcon /></a>
              <a href="#" className="text-black hover:opacity-70 transition-opacity"><FacebookIcon /></a>
            </div>
          </div>

          {/* --- PARTIE DROITE (Conteneur) --- */}
          <div className="lg:col-span-2 flex justify-center md:justify-end">
            <div className="flex flex-col sm:flex-row gap-12 text-center sm:text-left">
              {/* Colonne Contact */}
              <div className="space-y-3">
                <h3 className="font-medium text-[17px] leading-6 tracking-tight text-black">Contact général</h3>
                <div className="space-y-1">
                  <p><a href="tel:+33756938435" className="text-[13.95px] leading-6 tracking-tight text-black hover:underline">+33 7 56 93 84 35</a></p>
                  <p><a href="mailto:contact@muntulabs.com" className="text-[13.83px] leading-6 tracking-tight text-black hover:underline">contact@muntulabs.com</a></p>
                  <p><a href="#" className="text-[14.06px] leading-6 tracking-tight text-black hover:underline">Mentions légales</a></p>
                </div>
              </div>

              {/* Colonne Présence */}
              <div className="space-y-3">
                <h3 className="font-medium text-[17px] leading-6 tracking-tight text-black">Présence en Europe</h3>
                <div className="space-y-1">
                  <p className="flex items-center gap-2 text-[13.95px] leading-6 tracking-tight text-black">France  <FranceFlagIcon /></p>
                  <p className="flex items-center gap-2 text-[13.83px] leading-6 tracking-tight text-black">Belgique <BelgiumFlagIcon /></p>
                  <p className="flex items-center gap-2 text-[14.06px] leading-6 tracking-tight text-black">Pays-Bas <NetherlandsFlagIcon /></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Ligne Copyright --- */}
        <div className="border-t border-gray-200/80 py-6 text-center">
          <p className="text-[13.83px] leading-6 tracking-tight text-black">
            Copyright © {new Date().getFullYear()} - MuntuLabs. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 650);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTextClass = isScrolled ? 'text-black' : 'text-white';


  return (
    <div className="bg-white text-black min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white/20 backdrop-blur-sm ">
      <div className="container mx-auto px-6 h-full flex justify-between items-center">
          
        <div className="flex-shrink-0">   
        <a 
              href="#accueil" 
              className={`font-['Mada']   transition-colors duration-300
                ${isScrolled ? 'text-black' : 'text-white'}`}
            >
              <span className="text-[21px] font-semibold leading-[65px] tracking-[-1.5px]">MUNTU</span>
              <span className={`font-xs text-[21px] ${isScrolled ? 'text-black/60' : 'text-white/60'}`}>LABS</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#accueil" className="font-medium text-[14.41px] leading-[21px] tracking-[-0.5px] text-black hover:opacity-75 transition-opacity">
              Accueil
            </a>
            <a href="#services" className="font-medium text-[14.41px] leading-[21px] tracking-[-0.5px] text-black hover:opacity-75 transition-opacity">
              Services
            </a>
            <a href="#methode" className="font-medium text-[14.41px] leading-[21px] tracking-[-0.5px] text-black hover:opacity-75 transition-opacity">
              Méthode
            </a>
            <a href="#avis" className="font-medium text-[14.41px] leading-[21px] tracking-[-0.5px] text-black hover:opacity-75 transition-opacity">
              Avis Clients
            </a>
            <a href="#realisations" className="font-medium text-[14.41px] leading-[21px] tracking-[-0.5px] text-black hover:opacity-75 transition-opacity">
              Réalisations
            </a>
            <a href="#faq" className="font-medium text-[14.41px] leading-[21px] tracking-[-0.5px] text-black hover:opacity-75 transition-opacity">
              FAQ
            </a>
          </div>

          <div className="flex-shrink-0">
            <a 
              href="#contact" 
              className="bg-black text-white font-medium text-sm leading-[21px] tracking-[-0.5px] rounded-[7px] flex items-center justify-center  gap-2 py-3 px-6  transform hover:scale-105 transition-transform duration-300 ease-out"
            >
              <PaperIcon />
              <span>Devis Gratuit</span>
            </a>
          </div>

          <div className="md:hidden">
            <button className="text-black focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <main>
      <section id="accueil" className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 z-0 ">
            <Image
              src="/hero-background.jpg"
              alt="Arrière-plan de la section d'accueil"
              fill
              className="object-cover" 
              quality={85}
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6">
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-[90px] h-[40px]">
                <Image
                  src="/avatar1.jpg" 
                  alt="Avatar client 1"
                  width={40}
                  height={40}
                  className="absolute top-0 left-0 rounded-full border-2 border-white z-10"
                />
                <Image
                  src="/avatar2.jpg" 
                  alt="Avatar client 2"
                  width={40}
                  height={40}
                  className="absolute top-0 left-[25px] rounded-full border-2 border-white z-20"
                />
                <Image
                  src="/avatar3.jpg" 
                  alt="Avatar client 3"
                  width={40}
                  height={40}
                  className="absolute top-0 left-[50px] rounded-full border-2 border-white z-30"
                />
              </div>
              <div className="flex flex-col items-start">
                <div className="flex">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="font-normal text-[13.95px] leading-[21px] tracking-[-0.5px]">
                  +50 avis - Google.
                </p>
              </div>
            </div>

            <h1 className="font-bold text-[42.89px] leading-[54px] tracking-[-1.3px] max-w-[536px] mb-6">
              Une stratégie optimisée.<br/>
              Un système qui convertit.
            </h1>
            
            <p className="font-normal text-[16.73px] leading-[25.2px] tracking-[-0.5px] max-w-[492px] mb-8">
              Sites performants, automatisations intelligentes, applications mobiles sur mesure et un service de closing pour transformer vos prospects en clients.
            </p>

            <a 
              href="#contact" 
              className="bg-white/5 backdrop-blur-sm border border-white/20 text-white font-medium text-[14.41px] leading-[21px] tracking-[-0.5px] rounded-[7px] flex items-center justify-center w-[164.28px] h-[37px] gap-[10px] transform hover:scale-105 transition-transform duration-300 ease-out"
            >
              <ArrowUpRightIcon />
              <span>Réserver un appel</span>
              
            </a>
          </div>
        </section>

        <LogoCarousel />

        <section id="services" className="relative bg-white pt-16 pb-28">
            <div className="container mx-auto px-6 text-center py-8 sticky top-[72px] z-20 bg-white/80 backdrop-blur-sm"> 
                <h2 className="font-semibold text-[39.22px] leading-[40px] tracking-[-0.2px] text-black">
                    Découvrez nos services.
                </h2>
                <p className="mt-4 font-normal text-[13.95px] leading-[21px] tracking-[-0.5px] text-neutral-600 max-w-2xl mx-auto">
                    Des solutions digitales élégantes et performantes, créées pour attirer,<br/>
                    convaincre et faire grandir votre activité.
                </p>
            </div>
            
            <div className="relative z-40 container mx-auto" style={{ height: `${servicesData.length * 84}vh`, marginTop: '-24px' }}> 
                {servicesData.map((service, index) => (
                    <div 
                        key={index} 
                        className="sticky flex items-center justify-center w-full"
                        style={{ top: `calc(200px + ${index * 0}px)` }}
                    >
                        <div className="bg-white p-8 rounded-2xl shadow-2xl grid md:grid-cols-2 gap-12 items-center max-w-5xl w-full">
                            <div className="w-full">
                                <Image 
                                    src={service.imageSrc} 
                                    alt={service.title} 
                                    width={512} 
                                    height={426} 
                                    className="rounded-[16px] object-cover w-[512px] h-[426px]"
                                />
                            </div>
                            <div className="flex flex-col items-start text-left">
                                <h3 className="font-semibold text-[28.01px] leading-[45px] tracking-[-0.7px] text-black">
                                    {service.title}
                                </h3>
                                <ul className="mt-6 space-y-4">
                                    {service.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-3">
                                            <span className="mt-1"><CheckIcon /></span>
                                            <span className="font-normal text-[13.83px] leading-[21px] tracking-[-0.5px] text-neutral-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a 
                                    href="#contact" 
                                    className="mt-8 bg-black text-white font-normal text-[13.83px] leading-[21px] tracking-[-0.5px] rounded-[7px] flex items-center justify-center gap-2 w-[126.88px] h-[37px] transform hover:scale-105 transition-transform duration-300 ease-out"
                                >
                                    <PaperIcon />
                                    <span>Devis Gratuit</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
      </section>
        
        {/* ... Répétez pt-20 pour les autres sections ... */}
        
        <section id="methode" className="bg-gray-50 py-28">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-black">
              Notre méthode de travail.
            </h2>
            <p className="mt-4 text-base leading-7 text-black/50 max-w-2xl mx-auto">
              Du premier contact avec notre agence à la livraison de votre site internet, nous vous expliquons chaque étape avec transparence.
            </p>
          </div>

          <div className="container mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
            
            {/* --- CARTE 1 --- */}
            <div className="border border-gray-200/80 rounded-[32px] w-full max-w-[534px] h-[480px] mx-auto flex flex-col p-8 group">
              <div className="relative w-[470px] h-[332px] mx-auto [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
                <Image src="/methode-1c.jpg" alt="Maquette 3" width={204} height={250.99} className="rounded-2xl absolute top-1/2 left-1/2 -translate-x-[-20px] -translate-y-1/2 z-40  transform rotate-3 transition-transform duration-500 ease-in-out group-hover:rotate-[8deg] "/>
                <Image src="/methode-1b.jpg" alt="Maquette 2" width={190} height={250.99} className="rounded-2xl absolute top-1/2 left-1/2 -translate-x-[82px]  -translate-y-1/2 z-30  transform rotate-0 transition-transform duration-500 ease-in-out group-hover:-rotate-[4deg]"/>
                <Image src="/methode-1a.jpg" alt="Maquette 1" width={204} height={250.99} className="rounded-2xl absolute top-1/2   left-1/2 translate-x-[-200px] -translate-y-1/2 z-20  transform -rotate-0 transition-transform duration-500 ease-in-out group-hover:-rotate-[4deg]"/>
              </div>
              <div className="flex-1 flex flex-col justify-center  text-left">
                <h3 className="text-lg  font-normal tracking-tight text-black">1 - Premier rendez-vous.</h3>
                <p className="mt-2 text-sm leading-6 text-black/50 max-w-3xs">
                  Première discussion en visioconférence pour comprendre vos besoins, vos objectifs et votre activité. Audit gratuit inclus.
                </p>
              </div>
            </div>

            {/* --- CARTE 2 --- */}
            <div className="border border-gray-200/80 rounded-[32px] w-full max-w-[534px] h-[480px] mx-auto flex flex-col p-8 group">
      <div className="relative w-[470px] h-[352px] mx-auto flex items-center justify-center pt-12 [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
        {/* Cercles */}
        
        <div className="absolute w-[313px] h-[313px] rounded-full border-[5px] border-brand-blue/30 [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] transition-all duration-500 ease-in group-hover:scale-110 group-hover:w-[350px] group-hover:h-[350px] group-hover:border-[4px] "></div>
        <div className="absolute w-[251px] h-[251px] rounded-full border-[6px] border-brand-blue/60 [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]  transition-all duration-500 ease-in group-hover:scale-110 group-hover:w-[290px] group-hover:h-[290px] group-hover:border-[5px]"></div>
        
        <div className="absolute w-0 h-0 rounded-full border-[7px] border-brand-blue/65 [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]   transition-all duration-500 ease-out group-hover:w-[230px] group-hover:h-[230px] group-hover:opacity-100 group-hover:scale-110 opacity-0"></div> 

        {/* Image centrale */}
        <Image src="/methode-2-center.jpg" alt="Avatar central" width={190} height={190} className="rounded-full  [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]transition-transform duration-500 ease-out group-hover:scale-110 relative z-10 "/>
        
        {/* Avatars positionnés en arc sur le cercle extérieur */}
        <div className="absolute w-[313px] h-[313px]">
          <Image src="/methode-2-av5.jpg" alt="Avatar 5" width={62} height={62} className="rounded-full border-4 border-brand-blue absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2  transition-all duration-500 ease-out group-hover:scale-110 group-hover:translate-x-[50px] group-hover:translate-y-[1px]"/>
          <Image src="/methode-2-av4.jpg" alt="Avatar 4" width={62} height={62} className="rounded-full border-4 border-brand-blue absolute top-[15%] right-[15%] translate-x-1/2 -translate-y-1/2 ransition-all duration-500 ease-out group-hover:scale-110 group-hover:translate-x-[65px] group-hover:translate-y-[1px]"/>
          <Image src="/methode-2-av3.jpg" alt="Avatar 3" width={62} height={62} className="rounded-full border-4 border-brand-blue absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out group-hover:scale-110 "/>
          <Image src="/methode-2-av2.jpg" alt="Avatar 2" width={62} height={62} className="rounded-full border-4 border-brand-blue absolute top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-x-[65px] group-hover:translate-y-[1px]"/>
          <Image src="/methode-2-av1.jpg" alt="Avatar 1" width={62} height={62} className="rounded-full border-4 border-brand-blue absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-x-[50px] group-hover:translate-y-[1px]"/>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end text-left pt-4 -mt-10">
        <h3 className="text-[18.44px] font-normal leading-[28px] tracking-[-0.5px] text-black">2 - Proposition commerciale personnalisée.</h3>
        <p className="mt-2 text-[13.95px] leading-[21px] tracking-[-0.5px] text-black/50 max-w-3xs">
          Présentation d’une offre claire et adaptée à votre entreprise, avec un plan d’action sur mesure et transparent.
        </p>
      </div>
    </div>

            {/* --- CARTE 3 --- */}
            <div className="border border-gray-200/80 rounded-[32px] w-full max-w-[534px] h-[480px] mx-auto flex flex-col p-8 group">
              <div className="relative h-1/ w-full flex items-center justify-center">
                <Image src="/methode-3.jpg" alt="Design de site web" width={534} height={334} className="rounded-t-2xl transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-3xl"/>
              </div>
              <div className="flex-1 flex flex-col justify-center  text-left">
                <h3 className="text-lg font-normal pt-8 tracking-tight text-left text-black">3 - Conception et votre projet avec vous.</h3>
                <p className="mt-2 text-sm leading-6  text-black/50 max-w-3xs">
                  Chaque étape est validée avec vos retours. Vous êtes impliqué dans le processus pour garantir un résultat fidèle.
                </p>
              </div>
            </div>
            
            {/* --- CARTE 4 --- */}
            <div className="border border-gray-200/80 rounded-[32px] w-full max-w-[534px] h-[480px] mx-auto flex flex-col p-8 justify-between group">
            <div className="relative w-full h-2/3 ">
        <div className="space-y-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white border border-gray-200/80 rounded-full p-2 flex flex-row-reverse items-center justify-between  w-[295px] h-[64px]  transition-transform duration-1000 ease-in relative z-40 group-hover:translate-y-[76px] group-hover:z-30  group-hover:top-[8px]">
              <Image src="/methode-4a.jpg" alt="Icon" width={51} height={48} className="rounded-full"/>
              <div className="text-left ml-4">
                  <p className="font-normal text-[14.3px] leading-[21px] tracking-[-0.5px] text-black">Sites web optimisés</p>
                  <p className="font-normal text-[13.34px] leading-[19.6px] text-green-700">100% responsive et SEO-friendly</p>
              </div>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-full p-2 flex flex-row-reverse items-center justify-between  w-[295px] h-[64px]  transition-transform duration-1000 ease-in relative z-30 group-hover:translate-y-[76px] group-hover:z-20 group-hover:top-[4px]">
              <Image src="/methode-4b.jpg" alt="Icon" width={51} height={48} className="rounded-full"/>
              <div className="text-left ml-4">
                  <p className="font-normal text-[14.3px] leading-[21px] tracking-[-0.5px] text-black">Automatisation intégrées</p>
                  <p className="font-normal text-[13.34px] leading-[19.6px] text-green-700">+35% de productivité</p>
              </div>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-full p-2 flex flex-row-reverse items-center justify-between  w-[295px] h-[64px] transition-transform duration-1000 ease-in relative z-20 group-hover:-translate-y-[140px] group-hover:z-40">
              <Image src="/methode-4c.jpg" alt="Icon" width={51} height={48} className="rounded-full"/>
              <div className="text-left ml-4">
                  <p className="font-normal text-[14.3px] leading-[21px] tracking-[-0.5px] text-black">Applications mobiles</p>
                  <p className="font-normal text-[13.34px] leading-[19.6px] text-green-700">2 fois plus d’engagement client</p>
              </div>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-full p-2 flex flex-row-reverse items-center justify-between w-[295px] h-[64px] transition-transform duration-1000 ease-in relative z-10 group-hover:translate-y-0 group-hover:z-10">
              <Image src="/methode-4d.jpg" alt="Icon" width={51} height={48} className="rounded-full"/>
              <div className="text-left ml-4">
                  <p className="font-normal text-[14.3px] leading-[21px] tracking-[-0.5px] text-black">Closing et prospection</p>
                  <p className="font-normal text-[13.34px] leading-[19.6px] text-green-700">+25% de conversions</p>
              </div>
          </div>
        </div>
      </div>
              <div className="flex-1 flex flex-col justify-center text-left pt-4 mt-4">
                <h3 className="text-lg font-normal tracking-tight text-black">4 - Livraison et accompagnement.</h3>
                <p className="mt-2 text-sm leading-6 text-black/50 max-w-3xs">
                  Mise en ligne de votre projet avec un suivi continu et des optimisations régulières pour assurer votre réussite.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <a href="#contact" className="inline-flex items-center gap-2 bg-black text-white text-sm font-bold py-3 px-6 rounded-md hover:bg-brand-beige transition-colors duration-300">
              <PaperIcon /> Devis Gratuit
            </a>
          </div>
        </section>
        
        <section id="avis" className="bg-white py-28 overflow-hidden">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-[40px] font-semibold leading-[40px] tracking-[-0.2px] text-black">
      Avis de nos clients.
    </h2>
    <p className="mt-4 text-[13.95px] leading-[21px] tracking-[-0.5px] text-black/50 max-w-2xl mx-auto">
      Fiers d’annoncer que nous avons reçu plus de 50 avis clients positifs, nous attribuant une note parfaite de 5/5 sur Google.
    </p>
  </div>

  {/* Carrousel 1: Droite vers Gauche */}
  <div className="relative mt-10 w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
    <div className="flex w-max animate-scroll">
      {[...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1].map((review, index) => (
        <div key={index} className="flex-none mx-4">
          <TestimonialCard review={review} />
        </div>
      ))}
    </div>
  </div>
  
  {/* Carrousel 2: Gauche vers Droite */}
  <div className="relative mt-8 w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
    <div className="flex w-max animate-scroll-reverse">
      {[...testimonialsRow2,...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2].map((review, index) => (
        <div key={index} className="flex-none mx-4">
          <TestimonialCard  review={review}/>
        </div>
      ))}
    </div>
  </div>
  
  <div className="text-center mt-16">
    <a href="#contact" className="inline-flex items-center gap-2 bg-black text-white text-sm font-bold py-3 px-6 rounded-md hover:bg-brand-beige transition-colors duration-300">
      <PaperIcon /> Devis Gratuit
    </a>
  </div>
</section>

<section id="realisations" className=" py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-[39.84px] font-semibold leading-tight tracking-tight text-black">
              Nos articles et conseils.
            </h2>
            <p className="mt-4 text-[14.18px] leading-6 tracking-tight text-black/50 max-w-2xl mx-auto">
              Découvrez nos analyses, astuces et actualités pour booster votre activité digitale.
            </p>
          </div>
          <RealisationsCarousel />
        </section>

        <ExpertsSection />

        <section id="faq" className="min-h-screen flex items-center justify-center bg-white pt-0">
        <FaqSection />
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center bg-white pt-0">
        <ContactForm />
        </section>
      </main>

         <Footer />

    </div>
  );
}
