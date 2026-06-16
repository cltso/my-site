import React, { useState, useMemo } from 'react';
import {
  BookOpen, Award, Cpu, GraduationCap, Briefcase,
  Search, Mail, MapPin, Menu, X, Sparkles, BookMarked,
  User, Compass, Bookmark, Globe
} from 'lucide-react';

import { PUBLICATIONS, AI_LESSONS, UI } from './i18n';

// 個人照片放在 public 資料夾，直接用根路徑引用
const profilePhoto = '/PHOTO1.jpg';

export default function App() {
  const [lang, setLang] = useState('zh');           // 'zh' 中文 | 'en' English
  const [activeTab, setActiveTab] = useState('about');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [imgError, setImgError] = useState(false);

  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  // 取字串小幫手：t(物件) 回傳當前語言版本
  const t = (obj) => (obj && typeof obj === 'object' && lang in obj ? obj[lang] : obj);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      const subject = contactForm.subject || (lang === 'zh' ? '學術合作詢問' : 'Academic Inquiry');
      const body =
        (lang === 'zh' ? '寄件人：' : 'From: ') + contactForm.name + '\n' +
        (lang === 'zh' ? '回信信箱：' : 'Reply to: ') + contactForm.email + '\n\n' +
        contactForm.message;
      window.location.href =
        `mailto:cltso@thu.edu.tw?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setFeedbackSent(true);
      setTimeout(() => {
        setFeedbackSent(false);
        setContactForm({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    }
  };

  const filteredPublications = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return PUBLICATIONS.filter(pub => {
      const matchesSearch =
        pub.title[lang].toLowerCase().includes(q) ||
        pub.venue[lang].toLowerCase().includes(q) ||
        (pub.advisor && pub.advisor[lang].toLowerCase().includes(q)) ||
        pub.tags[lang].some(tag => tag.toLowerCase().includes(q));
      if (selectedType === 'all') return matchesSearch;
      return pub.type === selectedType && matchesSearch;
    });
  }, [searchTerm, selectedType, lang]);

  const publicationCounts = useMemo(() => ({
    all: PUBLICATIONS.length,
    thesis: PUBLICATIONS.filter(p => p.type === 'thesis').length,
    journal: PUBLICATIONS.filter(p => p.type === 'journal').length,
    conference: PUBLICATIONS.filter(p => p.type === 'conference').length,
    book: PUBLICATIONS.filter(p => p.type === 'book').length,
  }), []);

  const navItems = [
    { id: 'about', label: t(UI.nav.about) },
    { id: 'teaching', label: t(UI.nav.teaching) },
    { id: 'publications', label: t(UI.nav.publications) },
    { id: 'contact', label: t(UI.nav.contact) }
  ];

  const LangToggle = ({ className = '' }) => (
    <button
      onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition ${className}`}
      aria-label="Switch language"
    >
      <Globe size={14} />
      <span>{lang === 'zh' ? 'EN' : '中文'}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-amber-100 selection:text-amber-900 flex flex-col">

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-amber-800 to-amber-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-md border border-amber-700">
                左
              </div>
              <div>
                <span className="text-xl font-bold text-stone-900 tracking-wider">{t(UI.brandName)}</span>
                <span className="ml-2.5 text-xs font-semibold px-2 py-0.5 bg-amber-50 text-amber-800 rounded-full border border-amber-200 hidden sm:inline">
                  {t(UI.brandTag)}
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-amber-50 text-amber-950 font-semibold border-b-2 border-amber-700 rounded-b-none'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <LangToggle className="ml-2" />
            </nav>

            <div className="md:hidden flex items-center space-x-2">
              <LangToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  activeTab === item.id
                    ? 'bg-amber-50 text-amber-950 font-bold border-l-4 border-amber-700'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <section className="bg-gradient-to-b from-stone-900 to-stone-950 text-stone-100 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">

            <div className="md:col-span-4 flex flex-col items-center text-center md:text-left">
              <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-amber-600/30 shadow-2xl bg-stone-800 p-2 group transition-all duration-300 hover:border-amber-500">
                {!imgError ? (
                  <img src={profilePhoto} alt={t(UI.brandName)} className="w-full h-full object-cover rounded-lg" onError={() => setImgError(true)} />
                ) : (
                  <div className="w-full h-full bg-stone-900 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="text-amber-500/20 text-[10rem] font-serif absolute -bottom-10 -right-5 select-none font-bold">甲</div>
                    <User className="text-stone-500 w-24 h-24 mb-2 z-10" />
                    <span className="text-amber-500/80 font-serif text-sm tracking-widest font-semibold z-10">{t(UI.hero.avatarField)}</span>
                    <span className="text-stone-400 text-xs mt-1 z-10">{t(UI.brandName)}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-2 text-stone-300">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <MapPin size={16} className="text-amber-500" />
                  <span>{t(UI.hero.location)}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Mail size={16} className="text-amber-500" />
                  <span className="text-sm">cltso@thu.edu.tw</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold">
                <Sparkles size={14} />
                <span>{t(UI.hero.badge)}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider text-white font-serif leading-tight">
                {t(UI.hero.title1)}<br className="hidden sm:block" />
                {t(UI.hero.title2a)}<span className="text-amber-400">{t(UI.hero.title2b)}</span>{t(UI.hero.title2c)}
              </h1>

              <p className="text-stone-300 text-base md:text-lg max-w-2xl leading-relaxed">
                {t(UI.hero.summary)}
              </p>

              <div className="pt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <button onClick={() => setActiveTab('publications')}
                  className="px-6 py-3 rounded-lg bg-amber-600 text-white font-semibold shadow-lg hover:bg-amber-500 hover:shadow-amber-900/20 transition duration-200 text-sm flex items-center space-x-2">
                  <BookOpen size={16} />
                  <span>{t(UI.hero.btnPublications)}</span>
                </button>
                <button onClick={() => setActiveTab('teaching')}
                  className="px-6 py-3 rounded-lg bg-stone-800 text-amber-400 font-semibold border border-stone-700 hover:bg-stone-700 hover:text-amber-300 transition duration-200 text-sm flex items-center space-x-2">
                  <Cpu size={16} />
                  <span>{t(UI.hero.btnTeaching)}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {activeTab === 'about' && (
          <div className="space-y-12 animate-fadeIn">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-amber-50 rounded-lg text-amber-800"><Compass size={24} /></div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">{t(UI.stats.s1t)}</h3>
                  <p className="text-xs text-stone-500 mt-1">{t(UI.stats.s1d)}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-amber-50 rounded-lg text-amber-800"><Cpu size={24} /></div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">{t(UI.stats.s2t)}</h3>
                  <p className="text-xs text-stone-500 mt-1">{t(UI.stats.s2d)}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-amber-50 rounded-lg text-amber-800"><BookMarked size={24} /></div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">{t(UI.stats.s3t)}</h3>
                  <p className="text-xs text-stone-500 mt-1">{t(UI.stats.s3d)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">

                <div className="lg:col-span-4 bg-stone-50 border-r border-stone-200 p-8 flex flex-col items-center">
                  <div className="relative w-44 h-52 rounded-xl overflow-hidden shadow-md border-2 border-stone-200 mb-6 bg-stone-100 flex items-center justify-center">
                    {!imgError ? (
                      <img src={profilePhoto} alt={t(UI.brandName)} className="w-full h-full object-cover" onError={() => setImgError(true)} />
                    ) : (
                      <div className="text-stone-400 flex flex-col items-center justify-center text-center p-4">
                        <User size={48} className="text-stone-300 mb-2" />
                        <span className="text-xs">{t(UI.bio.name)}</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full space-y-4">
                    <div className="text-center border-b border-stone-200 pb-3">
                      <h3 className="text-xl font-bold text-stone-950 font-serif">{t(UI.bio.name)}</h3>
                      <p className="text-xs text-stone-500 mt-1 tracking-wider">Dr. Chia-Lun Tso</p>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between py-1.5 border-b border-stone-200">
                        <span className="text-stone-500 font-medium">{t(UI.bio.fields.gender)}</span>
                        <span className="text-stone-900 font-semibold">{t(UI.bio.fields.genderVal)}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-stone-200">
                        <span className="text-stone-500 font-medium">{t(UI.bio.fields.birth)}</span>
                        <span className="text-stone-900 font-semibold">{t(UI.bio.fields.birthVal)}</span>
                      </div>
                      <div className="flex items-start justify-between py-1.5 border-b border-stone-200 gap-3">
                        <span className="text-stone-500 font-medium whitespace-nowrap">{t(UI.bio.fields.current)}</span>
                        <span className="text-stone-900 font-semibold text-right leading-tight">{t(UI.bio.fields.currentVal)}</span>
                      </div>
                      <div className="flex items-start justify-between py-1.5 border-b border-stone-200 gap-3">
                        <span className="text-stone-500 font-medium whitespace-nowrap">{t(UI.bio.fields.expertise)}</span>
                        <span className="text-stone-900 font-semibold text-right leading-tight">{t(UI.bio.fields.expertiseVal)}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-stone-500 font-medium">{t(UI.bio.fields.email)}</span>
                        <a href="mailto:cltso@thu.edu.tw" className="text-amber-800 font-bold hover:underline">cltso@thu.edu.tw</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 p-8 md:p-10 space-y-6">
                  <h2 className="text-2xl font-bold font-serif text-stone-900 border-b border-stone-100 pb-4 flex items-center space-x-2">
                    <User className="text-amber-700" size={24} />
                    <span>{t(UI.bio.heading)}</span>
                  </h2>

                  <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed space-y-6 text-sm md:text-base">
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 font-serif mb-2 flex items-center space-x-1.5">
                        <Bookmark size={16} className="text-amber-700" /><span>{t(UI.bio.s1h)}</span>
                      </h3>
                      <p>{t(UI.bio.s1p1)}</p>
                      <p className="mt-2">{t(UI.bio.s1p2)}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 font-serif mb-2 flex items-center space-x-1.5">
                        <Bookmark size={16} className="text-amber-700" /><span>{t(UI.bio.s2h)}</span>
                      </h3>
                      <p>{t(UI.bio.s2p1)}</p>
                      <p className="mt-2">{t(UI.bio.s2p2)}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 font-serif mb-2 flex items-center space-x-1.5">
                        <Bookmark size={16} className="text-amber-700" /><span>{t(UI.bio.s3h)}</span>
                      </h3>
                      <p>{t(UI.bio.s3p1)}</p>
                      <p className="mt-2">{t(UI.bio.s3p2)}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 font-serif mb-2 flex items-center space-x-1.5">
                        <Bookmark size={16} className="text-amber-700" /><span>{t(UI.bio.s4h)}</span>
                      </h3>
                      <p>{t(UI.bio.s4p1)}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
                <h3 className="text-xl font-bold font-serif text-stone-900 border-b border-stone-100 pb-3 mb-6 flex items-center space-x-2">
                  <GraduationCap className="text-amber-700" size={22} /><span>{t(UI.edu.heading)}</span>
                </h3>
                <div className="space-y-6 relative before:absolute before:inset-y-1 before:left-3.5 before:w-0.5 before:bg-stone-200">
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-amber-50 border-2 border-amber-700 flex items-center justify-center z-10 text-[10px] font-bold text-amber-800">博</div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full">2014 – 2025</span>
                    <h4 className="font-bold text-stone-900 text-base mt-2">{t(UI.edu.phd)}</h4>
                    <p className="text-sm text-stone-600 mt-1">{t(UI.edu.phdDesc)}</p>
                    <p className="text-xs text-stone-500 mt-1 italic">{t(UI.edu.phdThesis)}</p>
                  </div>
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-stone-100 border-2 border-stone-400 flex items-center justify-center z-10 text-[10px] font-bold text-stone-600">碩</div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-stone-200 text-stone-700 rounded-full">2008 – 2012</span>
                    <h4 className="font-bold text-stone-900 text-base mt-2">{t(UI.edu.ma)}</h4>
                    <p className="text-sm text-stone-600 mt-1">{t(UI.edu.maDesc)}</p>
                  </div>
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-stone-100 border-2 border-stone-400 flex items-center justify-center z-10 text-[10px] font-bold text-stone-600">學</div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-stone-200 text-stone-700 rounded-full">2004 – 2008</span>
                    <h4 className="font-bold text-stone-900 text-base mt-2">{t(UI.edu.ba)}</h4>
                    <p className="text-sm text-stone-600 mt-1">{t(UI.edu.baDesc)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
                <h3 className="text-xl font-bold font-serif text-stone-900 border-b border-stone-100 pb-3 mb-6 flex items-center space-x-2">
                  <Briefcase className="text-amber-700" size={22} /><span>{t(UI.work.heading)}</span>
                </h3>
                <div className="space-y-6 relative before:absolute before:inset-y-1 before:left-3.5 before:w-0.5 before:bg-stone-200">
                  <div className="relative pl-10">
                    <div className="absolute left-1 top-2.5 w-5 h-5 rounded-full bg-amber-700 border-4 border-amber-100 z-10"></div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-full">2026.01 – {t(UI.work.now)}</span>
                    <h4 className="font-bold text-stone-900 text-base mt-2">{t(UI.work.j1org)}</h4>
                    <p className="text-sm text-stone-800 font-medium">{t(UI.work.j1role)}</p>
                    <p className="text-xs text-stone-500 mt-1">{t(UI.work.j1desc)}</p>
                  </div>
                  <div className="relative pl-10">
                    <div className="absolute left-1 top-2.5 w-5 h-5 rounded-full bg-amber-600 border-4 border-amber-100 z-10"></div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-full">2025.09 – {t(UI.work.now)}</span>
                    <h4 className="font-bold text-stone-900 text-base mt-2">{t(UI.work.j2org)}</h4>
                    <p className="text-sm text-stone-800 font-medium">{t(UI.work.j2role)}</p>
                    <p className="text-xs text-stone-500 mt-1">{t(UI.work.j2desc)}</p>
                  </div>
                  <div className="relative pl-10">
                    <div className="absolute left-1 top-2.5 w-5 h-5 rounded-full bg-stone-500 border-4 border-stone-100 z-10"></div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-stone-100 text-stone-700 rounded-full">2016.09 – 2025.12</span>
                    <h4 className="font-bold text-stone-900 text-base mt-2">{t(UI.work.j3org)}</h4>
                    <p className="text-sm text-stone-800 font-medium">{t(UI.work.j3role)}</p>
                    <p className="text-xs text-stone-500 mt-1">{t(UI.work.j3desc)}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'teaching' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <h2 className="text-2xl font-bold font-serif text-stone-900 flex items-center space-x-3">
                    <Cpu className="text-amber-700" size={26} /><span>{t(UI.teaching.heading)}</span>
                  </h2>
                  <p className="text-stone-600 leading-relaxed">{t(UI.teaching.p1)}</p>
                  <blockquote className="border-l-4 border-amber-600 pl-4 py-1 my-3 text-stone-700 italic font-serif">{t(UI.teaching.quote)}</blockquote>
                  <p className="text-stone-600 leading-relaxed">{t(UI.teaching.p2)}</p>
                </div>
                <div className="lg:col-span-4 bg-amber-50/50 p-6 rounded-xl border border-amber-100 space-y-4">
                  <h4 className="font-bold text-amber-900 flex items-center space-x-2">
                    <Sparkles size={18} /><span>{t(UI.teaching.dimTitle)}</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs text-amber-950 font-medium">
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                      <span><strong>{t(UI.teaching.dim1)}</strong>{t(UI.teaching.dim1d)}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                      <span><strong>{t(UI.teaching.dim2)}</strong>{t(UI.teaching.dim2d)}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center font-bold shrink-0">3</span>
                      <span><strong>{t(UI.teaching.dim3)}</strong>{t(UI.teaching.dim3d)}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold font-serif text-stone-900 mb-4">{t(UI.teaching.demoHeading)}</h3>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4 space-y-3">
                  {AI_LESSONS.map((lesson, idx) => (
                    <button key={idx} onClick={() => setSelectedLesson(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedLesson === idx ? 'bg-amber-800 text-white border-amber-800 shadow-md' : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}>
                      <span className="text-xs block mb-1 opacity-70">{t(lesson.course)}</span>
                      <h4 className="font-bold text-sm tracking-wide">{t(lesson.title)}</h4>
                    </button>
                  ))}
                  <div className="p-4 bg-stone-100 rounded-xl border border-stone-200 text-xs text-stone-500 leading-relaxed">
                    <strong>{t(UI.teaching.coreLabel)}</strong><br />{t(UI.teaching.coreText)}
                  </div>
                </div>

                <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                  <div>
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">{t(AI_LESSONS[selectedLesson].course)}</span>
                    <h4 className="text-lg font-bold text-stone-900 mt-2">{t(AI_LESSONS[selectedLesson].title)}</h4>
                    <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">{t(AI_LESSONS[selectedLesson].concept)}</p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-stone-400">{t(UI.teaching.stepsLabel)}</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {AI_LESSONS[selectedLesson].workflow.map((item) => (
                        <div key={item.step} className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                          <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full flex items-center justify-center">{item.step}</span>
                            <span className="font-bold text-xs text-stone-800">{t(item.label)}</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">{t(item.desc)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-stone-900 text-stone-300 p-4 rounded-xl border border-stone-900 space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="flex items-center space-x-1.5">
                        <Sparkles size={12} className="text-amber-500" />
                        <span className="font-bold text-amber-500">{t(UI.teaching.promptLabel)}</span>
                      </span>
                      <span>{t(UI.teaching.promptFor)}</span>
                    </div>
                    <p className="text-xs font-mono text-stone-200 bg-stone-950 p-2.5 rounded border border-stone-800 italic">
                      {t(AI_LESSONS[selectedLesson].promptExample)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'publications' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-serif text-stone-900">{t(UI.pubs.heading)}</h2>
                  <p className="text-sm text-stone-500 mt-1">{t(UI.pubs.subtitle)}</p>
                </div>
                <div className="relative w-full md:w-72">
                  <Search size={18} className="absolute left-3 top-3 text-stone-400" />
                  <input type="text" placeholder={t(UI.pubs.searchPlaceholder)} value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600" />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 text-xs font-semibold">{t(UI.pubs.clear)}</button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
                {[
                  { key: 'all', label: t(UI.pubs.filterAll), count: publicationCounts.all },
                  { key: 'thesis', label: t(UI.pubs.filterThesis), count: publicationCounts.thesis },
                  { key: 'journal', label: t(UI.pubs.filterJournal), count: publicationCounts.journal },
                  { key: 'conference', label: t(UI.pubs.filterConference), count: publicationCounts.conference },
                  { key: 'book', label: t(UI.pubs.filterBook), count: publicationCounts.book },
                ].map(f => (
                  <button key={f.key} onClick={() => setSelectedType(f.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      selectedType === f.key ? 'bg-amber-800 text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}>
                    {f.label} ({f.count})
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 px-1">
              <span>{t(UI.pubs.showing)(filteredPublications.length)}</span>
              {searchTerm && <span>{t(UI.pubs.filterKeyword)(searchTerm)}</span>}
            </div>

            <div className="space-y-4">
              {filteredPublications.map((pub, index) => (
                <div key={pub.id} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:border-amber-500/40 transition group relative">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded ${
                          pub.type === 'thesis' ? 'bg-amber-100 text-amber-950 border border-amber-200' :
                          pub.type === 'journal' ? 'bg-indigo-50 text-indigo-900 border border-indigo-100' :
                          pub.type === 'conference' ? 'bg-emerald-50 text-emerald-900 border border-emerald-100' :
                          'bg-rose-50 text-rose-900 border border-rose-100'
                        }`}>
                          {pub.type === 'thesis' ? t(UI.pubs.badgeThesis) :
                           pub.type === 'journal' ? t(UI.pubs.badgeJournal) :
                           pub.type === 'conference' ? t(UI.pubs.badgeConference) : t(UI.pubs.badgeBook)}
                        </span>
                        <span className="text-[10px] text-stone-400 font-medium">{t(UI.pubs.dateLabel)(pub.year, pub.month)}</span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-800 font-serif">{pub.title[lang]}</h4>

                      <div className="text-sm text-stone-600 flex flex-wrap gap-x-4 gap-y-1">
                        <span className="font-medium">{t(UI.pubs.authorLabel)}{pub.author[lang]}</span>
                        <span className="text-stone-400">|</span>
                        <span>{t(UI.pubs.venueLabel)}{pub.venue[lang]}</span>
                        {pub.advisor && (<><span className="text-stone-400">|</span><span className="text-stone-500 italic">{pub.advisor[lang]}</span></>)}
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {pub.tags[lang].map(tag => (
                          <span key={tag} className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-md font-medium">#{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="absolute right-4 top-4 hidden sm:flex text-stone-200 text-3xl font-extrabold select-none opacity-40">
                      {String(filteredPublications.length - index).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              ))}

              {filteredPublications.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-stone-200">
                  <BookOpen className="mx-auto text-stone-300 w-12 h-12 mb-3" />
                  <p className="text-stone-500 font-medium">{t(UI.pubs.noResults)}</p>
                  <button onClick={() => { setSearchTerm(''); setSelectedType('all'); }} className="text-amber-700 hover:text-amber-600 font-semibold text-xs mt-2 underline">{t(UI.pubs.reset)}</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto animate-fadeIn space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-5 bg-stone-900 text-stone-100 p-8 rounded-2xl space-y-6 flex flex-col justify-between border border-stone-900">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500">{t(UI.contact.infoLabel)}</span>
                    <h3 className="text-2xl font-bold font-serif text-white mt-1">{t(UI.contact.infoHeading)}</h3>
                  </div>
                  <p className="text-sm text-stone-300 leading-relaxed">{t(UI.contact.intro)}</p>
                  <div className="space-y-3.5 text-sm">
                    <div className="flex items-center space-x-3 text-stone-300">
                      <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-500 shrink-0"><BookOpen size={16} /></div>
                      <span>{t(UI.contact.topic1)}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-stone-300">
                      <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-500 shrink-0"><Cpu size={16} /></div>
                      <span>{t(UI.contact.topic2)}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-stone-300">
                      <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-500 shrink-0"><Award size={16} /></div>
                      <span>{t(UI.contact.topic3)}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-stone-800 pt-6 space-y-2 text-xs text-stone-400">
                  <p>{t(UI.contact.office)}</p>
                  <p>{t(UI.contact.emailLine)}</p>
                </div>
              </div>

              <div className="md:col-span-7 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-stone-900">{t(UI.contact.formHeading)}</h4>
                  <p className="text-xs text-stone-500 mt-1">{t(UI.contact.formIntro)}</p>
                </div>

                {feedbackSent ? (
                  <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl text-center space-y-3 py-12">
                    <Sparkles size={32} className="text-amber-600 mx-auto animate-bounce" />
                    <h5 className="font-bold text-amber-900">{t(UI.contact.sentHeading)}</h5>
                    <p className="text-xs text-amber-800 max-w-sm mx-auto leading-relaxed">{t(UI.contact.sentText)}</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-600">{t(UI.contact.fName)}</label>
                        <input type="text" required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} placeholder={t(UI.contact.fNamePh)}
                          className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-600">{t(UI.contact.fEmail)}</label>
                        <input type="email" required value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder={t(UI.contact.fEmailPh)}
                          className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-600">{t(UI.contact.fSubject)}</label>
                      <input type="text" value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} placeholder={t(UI.contact.fSubjectPh)}
                        className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-600">{t(UI.contact.fMessage)}</label>
                      <textarea rows={4} required value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} placeholder={t(UI.contact.fMessagePh)}
                        className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600"></textarea>
                    </div>
                    <button type="submit" className="w-full py-2.5 rounded-lg bg-amber-800 text-white font-bold hover:bg-amber-700 transition duration-200 text-xs shadow">{t(UI.contact.submit)}</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      <footer className="bg-stone-900 text-stone-400 py-10 mt-12 border-t border-stone-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-base font-bold text-white tracking-wider font-serif">{t(UI.footer.site)}</span>
              <p className="text-xs text-stone-500">{t(UI.footer.tagline)}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-stone-400">
              <button onClick={() => setActiveTab('about')} className="hover:text-white transition">{t(UI.nav.about)}</button>
              <button onClick={() => setActiveTab('teaching')} className="hover:text-white transition">{t(UI.nav.teaching)}</button>
              <button onClick={() => setActiveTab('publications')} className="hover:text-white transition">{t(UI.nav.publications)}</button>
              <button onClick={() => setActiveTab('contact')} className="hover:text-white transition">{t(UI.nav.contact)}</button>
            </div>
          </div>
          <div className="border-t border-stone-900 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-600 gap-2">
            <p>{t(UI.footer.rights)}</p>
            <p className="italic">{t(UI.footer.affil)}</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
