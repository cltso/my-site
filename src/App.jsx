import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Award, 
  Cpu, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  Search, 
  Filter, 
  Mail, 
  MapPin, 
  ChevronRight, 
  FileText, 
  MessageSquare, 
  ExternalLink,
  Menu,
  X,
  Sparkles,
  BookMarked,
  User,
  Compass,
  CalendarDays,
  Bookmark
} from 'lucide-react';

// === 論文與著作數據 ===
const PUBLICATIONS = [
  {
    id: 'thesis-1',
    type: 'thesis',
    title: '《甲骨文組類語言差異研究——以詞、句為例》',
    author: '左家綸 (代表作)',
    venue: '臺灣東海大學博士論文',
    advisor: '指導教授：朱歧祥',
    year: '2025',
    month: '6',
    tags: ['博士論文', '甲骨文', '語法學']
  },
  {
    id: 'journal-1',
    type: 'journal',
    title: '〈甲骨文「□」字補說〉',
    author: '左家綸',
    venue: '《說文論語》',
    year: '2024',
    month: '10',
    tags: ['期刊論文', '甲骨文字形']
  },
  {
    id: 'journal-2',
    type: 'journal',
    title: '〈甲骨文「往」字片語的歷時差異考察〉',
    author: '左家綸',
    venue: '《說文論語》',
    year: '2023',
    month: '12',
    tags: ['期刊論文', '歷時考察', '片語研究']
  },
  {
    id: 'journal-3',
    type: 'journal',
    title: '〈甲骨文「祟」字字形用法考〉',
    author: '左家綸',
    venue: '《輔大中研所學刊》',
    year: '2023',
    month: '12',
    tags: ['期刊論文', '字形考辨']
  },
  {
    id: 'journal-4',
    type: 'journal',
    title: '〈花園莊東地甲骨賓語移位句語用研究-以焦點為中心的考察〉',
    author: '左家綸',
    venue: '《東海中文學報》',
    year: '2017',
    month: '6',
    tags: ['期刊論文', '賓語移位', '語用學']
  },
  {
    id: 'conf-1',
    type: 'conference',
    title: '〈論一辭多卜及其語言現象〉',
    author: '左家綸',
    venue: '第11屆澳門漢字學會年會 (澳門科技大學)',
    year: '2025',
    month: '11',
    tags: ['會議論文', '一辭多卜', '語言現象']
  },
  {
    id: 'conf-2',
    type: 'conference',
    title: '〈甲骨文「□」字補說〉',
    author: '左家綸',
    venue: '第10屆澳門漢字學會年會 (澳門科技大學)',
    year: '2024',
    month: '10',
    tags: ['會議論文', '字形補說']
  },
  {
    id: 'conf-3',
    type: 'conference',
    title: '〈甲骨文田狩類「田」字用法的歷時考察—兼談休咎套語「往來無災」的形成〉',
    author: '左家綸',
    venue: '第四屆文字學青年學者暨研究生論文研討會 (中央大學)',
    year: '2024',
    month: '4',
    tags: ['會議論文', '歷時考察', '套語']
  },
  {
    id: 'conf-4',
    type: 'conference',
    title: '〈甲骨文往字用法組類差異探析〉',
    author: '左家綸',
    venue: '第9屆澳門漢字學會年會 (陝西師範珠海分院)',
    year: '2023',
    month: '11',
    tags: ['會議論文', '用法差異']
  },
  {
    id: 'conf-5',
    type: 'conference',
    title: '〈甲骨文比、从補論〉',
    author: '左家綸',
    venue: '第8屆澳門漢字學會年會 (中山大學)',
    year: '2022',
    month: '8',
    tags: ['會議論文', '字義補論']
  },
  {
    id: 'conf-6',
    type: 'conference',
    title: '〈甲骨文「□」字字形用法考辨〉',
    author: '左家綸',
    venue: '第32屆中國文字學國際學術研討會 (台北教育大學)',
    year: '2021',
    month: '5',
    tags: ['會議論文', '字形用法']
  },
  {
    id: 'conf-7',
    type: 'conference',
    title: '〈甲骨文祓與奏字的流變與異同〉',
    author: '左家綸',
    venue: '第7屆澳門漢字學會年會 (北京師範大學)',
    year: '2021',
    month: '3',
    tags: ['會議論文', '流變研究']
  },
  {
    id: 'conf-8',
    type: 'conference',
    title: '〈甲骨文召字繁簡諸形用法辨析〉',
    author: '左家綸',
    venue: '第6屆澳門漢字學會年會 (澳門科技大學)',
    year: '2019',
    month: '11',
    tags: ['會議論文', '繁簡字形']
  },
  {
    id: 'conf-9',
    type: 'conference',
    title: '〈卜辭「曰」字介詞用法再議〉',
    author: '左家綸',
    venue: '第30屆中國文字學國際學術研討會 (成功大學)',
    year: '2019',
    month: '5',
    tags: ['會議論文', '介詞用法']
  },
  {
    id: 'conf-10',
    type: 'conference',
    title: '〈卜辭「曰」字用法整理與相關問題討論〉',
    author: '左家綸',
    venue: '第5屆澳門漢字學會年會 (陝西師範大學)',
    year: '2018',
    month: '11',
    tags: ['會議論文', '用法整理']
  },
  {
    id: 'conf-11',
    type: 'conference',
    title: '〈甾字字源考辨〉',
    author: '左家綸',
    venue: '第20屆中區文字學研討會 (台中教育大學)',
    year: '2018',
    month: '5',
    tags: ['會議論文', '字源考辨']
  },
  {
    id: 'conf-12',
    type: 'conference',
    title: '〈甲骨文「至」字虛化歷程的觀察〉',
    author: '左家綸',
    venue: '第4屆澳門漢字學會年會 (澳門科技大學)',
    year: '2017',
    month: '12',
    tags: ['會議論文', '虛化歷程']
  },
  {
    id: 'conf-13',
    type: 'conference',
    title: '〈《詩經》「奏假」「昭假」古義探求〉',
    author: '左家綸',
    venue: '第19屆中區文字學研討會 (靜宜大學)',
    year: '2017',
    month: '5',
    tags: ['會議論文', '詩經', '古義考證']
  },
  {
    id: 'conf-14',
    type: 'conference',
    title: '〈非王卜辭賓語移位句的語用考察〉',
    author: '左家綸',
    venue: '第3屆澳門漢字學會年會 (澳門科技大學)',
    year: '2016',
    month: '6',
    tags: ['會議論文', '非王卜辭']
  },
  {
    id: 'conf-15',
    type: 'conference',
    title: '〈商周國土用字異同考〉',
    author: '左家綸',
    venue: '第3屆許慎文化研討會 (河南許慎文化園)',
    year: '2015',
    month: '10',
    tags: ['會議論文', '商周用字', '地域字形']
  },
  {
    id: 'conf-16',
    type: 'conference',
    title: '〈歲字字源與相關問題探討〉',
    author: '左家綸',
    venue: '第2屆澳門漢字學會年會 (澳門皇都酒店)',
    year: '2015',
    month: '8',
    tags: ['會議論文', '字源研究']
  },
  {
    id: 'conf-17',
    type: 'conference',
    title: '〈《甲骨文專集》摹本評介〉',
    author: '左家綸',
    venue: '第1屆澳門漢字學會年會 (澳門科技大學)',
    year: '2014',
    month: '9',
    tags: ['會議論文', '摹本評介']
  },
  {
    id: 'book-1',
    type: 'book',
    title: '《甲骨文詞譜》（全五冊）',
    author: '朱歧祥 主編 / 左家綸 等合編',
    venue: '臺北：里仁書局',
    year: '2014',
    month: '5',
    tags: ['學術專書', '工具書', '詞譜編纂']
  }
];

// === AI 融入教學教案模擬數據 ===
const AI_LESSONS = [
  {
    title: "經典敘事與 AI 寫作思辨",
    course: "大一國文（敘事與思辨）",
    concept: "利用 AI 作為對話媒介，引導學生在「提問-反思-修正」的過程中深化對古典文本結構的理解。",
    workflow: [
      { step: "1", label: "文本輸入", desc: "學生閱讀古典文獻（如《左傳》經典段落），分析其敘事視角與結構核心。" },
      { step: "2", label: "AI 協同寫作", desc: "引導學生設定 Prompt 促使 AI 模擬該文章風格進行現代故事改寫。" },
      { step: "3", label: "比對與思辨", desc: "學生比對 AI 生成文本與原典，分析「AI 遺漏了哪些關鍵的情感與文學張力」，進而理解古典敘事的留白與精鍊。" }
    ],
    promptExample: "請扮演文字美學家，分析《左傳·燭之武退秦師》中，燭之武說辭的說服邏輯，並指出其中隱含的語用策略。"
  },
  {
    title: "古文字形結構解析與視覺化",
    course: "文字學及相關專題",
    concept: "將生成式 AI 工具與古文字字形流變相結合，輔助學生跨越甲骨文、金文到小篆的視覺與意象障礙。",
    workflow: [
      { step: "1", label: "字源探析", desc: "探討特定古文字（如「往」、「買」）的甲骨文字形及最初造字本義。" },
      { step: "2", label: "AI 意象重構", desc: "學生設計精確提示詞，讓 AI 還原字形所蘊含的古代社會生活場景（例如：市集交易、田獵占問）。" },
      { step: "3", label: "文字學考證", desc: "結合字形與圖像，引導學生撰寫考辨微論文，訓練文字學邏輯與現代應用能力。" }
    ],
    promptExample: "請依據甲骨文「田」字與「往來無災」套語的關聯，描摹出一幅商代君王田獵占問的社會生活圖像，並著重於空間及儀式感。"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [imgError, setImgError] = useState(false); // 追蹤照片載入狀態
  
  // 聯絡表單狀態
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      const subject = contactForm.subject || '學術合作詢問';
      const body =
        `寄件人：${contactForm.name}\n` +
        `回信信箱：${contactForm.email}\n\n` +
        `${contactForm.message}`;
      window.location.href =
        `mailto:cltso@thu.edu.tw?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setFeedbackSent(true);
      setTimeout(() => {
        setFeedbackSent(false);
        setContactForm({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    }
  };

  // 篩選著作目錄
  const filteredPublications = useMemo(() => {
    return PUBLICATIONS.filter(pub => {
      const matchesSearch = 
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pub.advisor && pub.advisor.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pub.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (selectedType === 'all') return matchesSearch;
      return pub.type === selectedType && matchesSearch;
    });
  }, [searchTerm, selectedType]);

  const publicationCounts = useMemo(() => {
    const counts = {
      all: PUBLICATIONS.length,
      thesis: PUBLICATIONS.filter(p => p.type === 'thesis').length,
      journal: PUBLICATIONS.filter(p => p.type === 'journal').length,
      conference: PUBLICATIONS.filter(p => p.type === 'conference').length,
      book: PUBLICATIONS.filter(p => p.type === 'book').length,
    };
    return counts;
  }, []);

  const navItems = [
    { id: 'about', label: '學術自傳' },
    { id: 'teaching', label: '教學理念 & AI 實踐' },
    { id: 'publications', label: '學術著作目錄' },
    { id: 'contact', label: '聯絡左博士' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-amber-100 selection:text-amber-900 flex flex-col">
      
      {/* === HEADER === */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-amber-800 to-amber-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-md border border-amber-700">
                左
              </div>
              <div>
                <span className="text-xl font-bold text-stone-900 tracking-wider">左家綸 博士</span>
                <span className="ml-2.5 text-xs font-semibold px-2 py-0.5 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                  古文字學 × AI 語文教學
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 lg:space-x-3">
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
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
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

      {/* === HERO SECTION === */}
      <section className="bg-gradient-to-b from-stone-900 to-stone-950 text-stone-100 py-16 md:py-24 relative overflow-hidden">
        {/* Decorative background grid pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left side: Avatar/Visual & Basics */}
            <div className="md:col-span-4 flex flex-col items-center text-center md:text-left">
              <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-amber-600/30 shadow-2xl bg-stone-800 p-2 group transition-all duration-300 hover:border-amber-500">
                {/* 讀取個人上傳之相片，若載入失敗則 fallback 至優美的字形頭像 */}
                {!imgError ? (
                  <img 
                    src="2.png" 
                    alt="左家綸 博士" 
                    className="w-full h-full object-cover rounded-lg"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-stone-900 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="text-amber-500/20 text-[10rem] font-serif absolute -bottom-10 -right-5 select-none font-bold">
                      甲
                    </div>
                    <User className="text-stone-500 w-24 h-24 mb-2 z-10" />
                    <span className="text-amber-500/80 font-serif text-sm tracking-widest font-semibold z-10">
                      中國語言文字學
                    </span>
                    <span className="text-stone-400 text-xs mt-1 z-10">左家綸 博士</span>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-2 text-stone-300">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <MapPin size={16} className="text-amber-500" />
                  <span>臺灣台中市 · 東海大學</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Mail size={16} className="text-amber-500" />
                  <span className="text-sm">cltso@thu.edu.tw</span>
                </div>
              </div>
            </div>

            {/* Right side: Summary & Highlight */}
            <div className="md:col-span-8 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold">
                <Sparkles size={14} />
                <span>東海大學中文系 兼任助理教授</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider text-white font-serif leading-tight">
                深研古文字文字學<br className="hidden sm:block"/>
                開拓 <span className="text-amber-400">AI 融入語文教學</span> 新藍海
              </h1>
              
              <p className="text-stone-300 text-base md:text-lg max-w-2xl leading-relaxed">
                畢業於東海大學中文系博士班。專攻甲骨文、古文字與語法學，深耕學術多年，編纂《甲骨文詞譜》。
                近三年致力於將生成式 AI 工具融入中文閱讀與寫作課程，引領學生透過「對話媒介」深化思辨能力，
                實現「理解轉化、應用導向」之教育願景。
              </p>

              <div className="pt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <button 
                  onClick={() => setActiveTab('publications')}
                  className="px-6 py-3 rounded-lg bg-amber-600 text-white font-semibold shadow-lg hover:bg-amber-500 hover:shadow-amber-900/20 transition duration-200 text-sm flex items-center space-x-2"
                >
                  <BookOpen size={16} />
                  <span>檢視 23 項學術成果</span>
                </button>
                <button 
                  onClick={() => setActiveTab('teaching')}
                  className="px-6 py-3 rounded-lg bg-stone-800 text-amber-400 font-semibold border border-stone-700 hover:bg-stone-700 hover:text-amber-300 transition duration-200 text-sm flex items-center space-x-2"
                >
                  <Cpu size={16} />
                  <span>觀看 AI 教學實踐</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* === MAIN CONTENT === */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* TAB 1: ABOUT (學術自傳 & 經歷時間軸) */}
        {activeTab === 'about' && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* Core Stats / Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-amber-50 rounded-lg text-amber-800">
                  <Compass size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">古文字與語法學</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    專攻甲骨文、古文字形體演變與賓語移位、焦點等語用特徵分析。
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-amber-50 rounded-lg text-amber-800">
                  <Cpu size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">AI 語文創新生態</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    近三年將生成式 AI 設計成語文教學之「對話媒介」，強化引導式教學。
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-amber-50 rounded-lg text-amber-800">
                  <BookMarked size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">紮實語料編纂力</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    參與國家級計畫，合編里仁書局發行《甲骨文詞譜》全五冊。
                  </p>
                </div>
              </div>
            </div>

            {/* Biography & Personal Info Grid */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Sidebar: Detailed Personal Profile Card containing photo */}
                <div className="lg:col-span-4 bg-stone-50 border-r border-stone-200 p-8 flex flex-col items-center">
                  
                  {/* Photo Section */}
                  <div className="relative w-44 h-52 rounded-xl overflow-hidden shadow-md border-2 border-stone-200 mb-6 bg-stone-100 flex items-center justify-center">
                    {!imgError ? (
                      <img 
                        src="2.png" 
                        alt="左家綸 博士" 
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <div className="text-stone-400 flex flex-col items-center justify-center text-center p-4">
                        <User size={48} className="text-stone-300 mb-2" />
                        <span className="text-xs">左家綸 博士<br/>(照片加載中)</span>
                      </div>
                    )}
                  </div>

                  {/* Profile Key Details */}
                  <div className="w-full space-y-4">
                    <div className="text-center border-b border-stone-200 pb-3">
                      <h3 className="text-xl font-bold text-stone-950 font-serif">左家綸</h3>
                      <p className="text-xs text-stone-500 mt-1 tracking-wider">Dr. Chia-Lun Tso</p>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between py-1.5 border-b border-stone-200">
                        <span className="text-stone-500 font-medium">性別</span>
                        <span className="text-stone-900 font-semibold">男</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-stone-200">
                        <span className="text-stone-500 font-medium">出生年月</span>
                        <span className="text-stone-900 font-semibold">1985 年 12 月 16 日</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-stone-200">
                        <span className="text-stone-500 font-medium">現職</span>
                        <span className="text-stone-900 font-semibold text-right leading-tight">
                          東海大學中文系 兼任助理教授<br/>
                          僑光科技大學 兼任教師
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-stone-200">
                        <span className="text-stone-500 font-medium">學術專長</span>
                        <span className="text-stone-900 font-semibold text-right leading-tight">
                          甲骨文、古文字學、<br/>語法學、AI 語文教學
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-stone-500 font-medium">信箱</span>
                        <a href="mailto:cltso@thu.edu.tw" className="text-amber-800 font-bold hover:underline">
                          cltso@thu.edu.tw
                        </a>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Area: Biography prose content */}
                <div className="lg:col-span-8 p-8 md:p-10 space-y-6">
                  <h2 className="text-2xl font-bold font-serif text-stone-900 border-b border-stone-100 pb-4 flex items-center space-x-2">
                    <User className="text-amber-700" size={24} />
                    <span>學術與教學自傳</span>
                  </h2>

                  <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed space-y-6 text-sm md:text-base">
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 font-serif mb-2 flex items-center space-x-1.5">
                        <Bookmark size={16} className="text-amber-700" />
                        <span>一、學習背景與研究專長</span>
                      </h3>
                      <p>
                        本人畢業於<strong>東海大學中國文學系博士班</strong>，專攻中國語言文字學，研究方向以甲骨文、古文字及語法學為核心。博士學位論文《甲骨文組類語言差異研究——以詞、句為例》在既有文字學研究基礎上，進一步結合語法與語用分析，嘗試從語言結構層面深化對甲骨文之理解。
                      </p>
                      <p className="mt-2">
                        在學期間，曾參與朱歧祥教授主持之甲骨文詞類研究計畫，並協助編撰<strong>《甲骨文詞譜》全五冊套書</strong>，從語料整理、詞類判定到實際編纂，累積扎實之研究與資料處理能力。相關研究成果持續發表於國內外研討會與學術期刊，並曾獲中國文字學領域之學術獎項肯定。
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-stone-900 font-serif mb-2 flex items-center space-x-1.5">
                        <Bookmark size={16} className="text-amber-700" />
                        <span>二、教學經驗與核心理念</span>
                      </h3>
                      <p>
                        自 2016 年起於東海大學擔任兼任教師，迄今已累積 <strong>9 年大學國語文教學經驗</strong>，並於僑光科技大學通識教育中心授課，教學對象涵蓋不同專業背景與程度之學生。授課內容包含大一國文（文學欣賞與實用、敘事與思辨）、文字學及相關基礎與通識課程。
                      </p>
                      <p className="mt-2">
                        在教學實務上，本人極為重視<strong>「理解轉化」與「應用導向」</strong>。對於抽象之文字學與語文理論，擅長透過範例分析、語境討論與分段引導，使學生能由「死記硬背」走向「活用表達」；在大一國文課程中，則強調語文表達、閱讀理解與思辨能力的系統性培養。
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-stone-900 font-serif mb-2 flex items-center space-x-1.5">
                        <Bookmark size={16} className="text-amber-700" />
                        <span>三、課程設計與教材經驗</span>
                      </h3>
                      <p>
                        長期參與不同類型國語文課程之規劃與實施，對於課程目標設定、教材選編與學習評量具有整體性思考。過往授課過程中，持續調整教材內容與教學節奏，以回應學生程度差異，並強化課程之結構性與連貫性。
                      </p>
                      <p className="mt-2">
                        在文字學課程中，重視由基礎字形認識逐步進入語言分析；在大一國文課程中，則結合文本閱讀與實作練習，使學生能逐步建立語文能力。此類經驗有助於未來參與教材共備及教學資源研發工作。
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-stone-900 font-serif mb-2 flex items-center space-x-1.5">
                        <Bookmark size={16} className="text-amber-700" />
                        <span>四、學術服務與合作特質</span>
                      </h3>
                      <p>
                        曾擔任<strong>中國文字學會</strong>與<strong>澳門漢字學會</strong>秘書，參與學術活動之規劃、籌備與執行，具備豐富之行政協調與團隊合作經驗。對於跨學科課程合作、活動推動及教學共備等工作，具備良好適應力。
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Timeline: Experience & Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Education */}
              <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
                <h3 className="text-xl font-bold font-serif text-stone-900 border-b border-stone-100 pb-3 mb-6 flex items-center space-x-2">
                  <GraduationCap className="text-amber-700" size={22} />
                  <span>教育學習歷程</span>
                </h3>
                
                <div className="space-y-6 relative before:absolute before:inset-y-1 before:left-3.5 before:w-0.5 before:bg-stone-200">
                  
                  {/* PhD */}
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-amber-50 border-2 border-amber-700 flex items-center justify-center z-10 text-[10px] font-bold text-amber-800">
                      博
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full">
                      2014 – 2025
                    </span>
                    <h4 className="font-bold text-stone-900 text-base mt-2">東海大學 中國文學系 博士</h4>
                    <p className="text-sm text-stone-600 mt-1">專攻中國語言文字學、甲骨文字體組類與語法語用分析</p>
                    <p className="text-xs text-stone-500 mt-1 italic">論文：《甲骨文組類語言差異研究——以詞、句為例》</p>
                  </div>

                  {/* MA */}
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-stone-100 border-2 border-stone-400 flex items-center justify-center z-10 text-[10px] font-bold text-stone-600">
                      碩
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-stone-200 text-stone-700 rounded-full">
                      2008 – 2012
                    </span>
                    <h4 className="font-bold text-stone-900 text-base mt-2">東海大學 中國文學系 碩士</h4>
                    <p className="text-sm text-stone-600 mt-1">主修中國古典文字、語法結構研究</p>
                  </div>

                  {/* BA */}
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-stone-100 border-2 border-stone-400 flex items-center justify-center z-10 text-[10px] font-bold text-stone-600">
                      學
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-stone-200 text-stone-700 rounded-full">
                      2004 – 2008
                    </span>
                    <h4 className="font-bold text-stone-900 text-base mt-2">元智大學 中國語文學系 學士</h4>
                    <p className="text-sm text-stone-600 mt-1">奠定國學、語言學與文學欣賞之紮實基礎</p>
                  </div>

                </div>
              </div>

              {/* Right Column: Work Experience */}
              <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
                <h3 className="text-xl font-bold font-serif text-stone-900 border-b border-stone-100 pb-3 mb-6 flex items-center space-x-2">
                  <Briefcase className="text-amber-700" size={22} />
                  <span>教學與工作簡歷</span>
                </h3>
                
                <div className="space-y-6 relative before:absolute before:inset-y-1 before:left-3.5 before:w-0.5 before:bg-stone-200">
                  
                  {/* Assistant Prof THU */}
                  <div className="relative pl-10">
                    <div className="absolute left-1 top-2.5 w-5 h-5 rounded-full bg-amber-700 border-4 border-amber-100 z-10"></div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-full">
                      2026.01 – 迄今
                    </span>
                    <h4 className="font-bold text-stone-900 text-base mt-2">東海大學 中文系</h4>
                    <p className="text-sm text-stone-800 font-medium">兼任助理教授</p>
                    <p className="text-xs text-stone-500 mt-1">授課：大一國文、古典文字學研究、實用文寫作、敘事思辨課程</p>
                  </div>

                  {/* Teacher KPU */}
                  <div className="relative pl-10">
                    <div className="absolute left-1 top-2.5 w-5 h-5 rounded-full bg-amber-600 border-4 border-amber-100 z-10"></div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-full">
                      2025.09 – 迄今
                    </span>
                    <h4 className="font-bold text-stone-900 text-base mt-2">僑光科技大學 通識教育中心</h4>
                    <p className="text-sm text-stone-800 font-medium">兼任教師</p>
                    <p className="text-xs text-stone-500 mt-1">授課：大學國文、實用表達、語文思辨與通識文學欣賞</p>
                  </div>

                  {/* Lecturer THU */}
                  <div className="relative pl-10">
                    <div className="absolute left-1 top-2.5 w-5 h-5 rounded-full bg-stone-500 border-4 border-stone-100 z-10"></div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-stone-100 text-stone-700 rounded-full">
                      2016.09 – 2025.12
                    </span>
                    <h4 className="font-bold text-stone-900 text-base mt-2">東海大學 中文系</h4>
                    <p className="text-sm text-stone-800 font-medium">兼任講師</p>
                    <p className="text-xs text-stone-500 mt-1">服務長達 9 年，積累極豐富之大一國語文教學、課程規劃與學生輔導實務</p>
                  </div>

                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: TEACHING & AI (教學理念與 AI 融合實踐) */}
        {activeTab === 'teaching' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Overview / Philosophy Card */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <h2 className="text-2xl font-bold font-serif text-stone-900 flex items-center space-x-3">
                    <Cpu className="text-amber-700" size={26} />
                    <span>AI 融入中文教學之實踐與理念</span>
                  </h2>
                  <p className="text-stone-600 leading-relaxed">
                    近三年，左博士深度參與東海大學的「AI 融入中文教學」相關課程計畫，嘗試將生成式 AI 工具（如 Large Language Models）導入傳統的大一國文及文字學課堂。
                  </p>
                  <blockquote className="border-l-4 border-amber-600 pl-4 py-1 my-3 text-stone-700 italic font-serif">
                    「AI 不僅僅是取代人寫作的工具，更是引導語文教學的『對話媒介』。」
                  </blockquote>
                  <p className="text-stone-600 leading-relaxed">
                    透過適當的教案設計，AI 能夠扮演「寫作評論家」、「古代背景還原者」或「邏輯思辨對手」，引導學生主動進行<strong>比較、修正、反思與重構</strong>，從而避免傳統語文教學被動吸收的痛點，顯著深化學生的學習成效。
                  </p>
                </div>
                <div className="lg:col-span-4 bg-amber-50/50 p-6 rounded-xl border border-amber-100 space-y-4">
                  <h4 className="font-bold text-amber-900 flex items-center space-x-2">
                    <Sparkles size={18} />
                    <span>AI 中文教學三維度</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs text-amber-950 font-medium">
                    <li className="flex items-center space-x-2">
                      <span className="w-5 h-5 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center font-bold">1</span>
                      <span><strong>輔助文本分析：</strong>加速語彙語境拆解</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-5 h-5 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center font-bold">2</span>
                      <span><strong>多維寫作回饋：</strong>即時精確指出邏輯漏洞</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-5 h-5 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center font-bold">3</span>
                      <span><strong>引導反思實作：</strong>比較原典與 AI 重構差異</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Simulated Interactive Course Demo */}
            <div>
              <h3 className="text-xl font-bold font-serif text-stone-900 mb-4">
                實務展示：左家綸博士 AI 課程教案拆解
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Navigation for Lessons */}
                <div className="md:col-span-4 space-y-3">
                  {AI_LESSONS.map((lesson, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedLesson(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedLesson === idx
                          ? 'bg-amber-800 text-white border-amber-800 shadow-md'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-xs block mb-1 opacity-70">{lesson.course}</span>
                      <h4 className="font-bold text-sm tracking-wide">{lesson.title}</h4>
                    </button>
                  ))}
                  
                  <div className="p-4 bg-stone-100 rounded-xl border border-stone-200 text-xs text-stone-500 leading-relaxed">
                    <strong>教學核心：</strong><br />
                    左博士主張學生不應盲從 AI 結果，而須在教師引導下審視 AI 輸出。
                  </div>
                </div>

                {/* Right Interactive Presentation panel */}
                <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                  
                  {/* Concept & Course info */}
                  <div>
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                      {AI_LESSONS[selectedLesson].course}
                    </span>
                    <h4 className="text-lg font-bold text-stone-900 mt-2">
                      {AI_LESSONS[selectedLesson].title}
                    </h4>
                    <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                      {AI_LESSONS[selectedLesson].concept}
                    </p>
                  </div>

                  {/* Flow Steps */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-stone-400">教學實施步驟</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {AI_LESSONS[selectedLesson].workflow.map((item) => (
                        <div key={item.step} className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                          <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full flex items-center justify-center">
                              {item.step}
                            </span>
                            <span className="font-bold text-xs text-stone-800">{item.label}</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prompt Design Showcase */}
                  <div className="bg-stone-900 text-stone-300 p-4 rounded-xl border border-stone-900 space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="flex items-center space-x-1.5">
                        <Sparkles size={12} className="text-amber-500" />
                        <span className="font-bold text-amber-500">左博士特製教學 Prompt 示範</span>
                      </span>
                      <span>適用於 Generative AI</span>
                    </div>
                    <p className="text-xs font-mono text-stone-200 bg-stone-950 p-2.5 rounded border border-stone-800 italic">
                      「{AI_LESSONS[selectedLesson].promptExample}」
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: PUBLICATIONS (學術著作目錄 & 篩選) */}
        {activeTab === 'publications' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Intro & Search Panel */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-serif text-stone-900">學術著作與研究成果</h2>
                  <p className="text-sm text-stone-500 mt-1">
                    收錄博士代表作 1 篇、期刊論文 4 篇、國際學術會議論文 17 篇及學術專書 1 部，共 23 項成果。
                  </p>
                </div>
                
                {/* Search input */}
                <div className="relative w-full md:w-72">
                  <Search size={18} className="absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    placeholder="搜尋著作名稱、研討會名稱或關鍵字..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 text-xs font-semibold"
                    >
                      清除
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedType === 'all'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  全部著作 ({publicationCounts.all})
                </button>
                <button
                  onClick={() => setSelectedType('thesis')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedType === 'thesis'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  代表作 / 學位論文 ({publicationCounts.thesis})
                </button>
                <button
                  onClick={() => setSelectedType('journal')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedType === 'journal'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  期刊論文 ({publicationCounts.journal})
                </button>
                <button
                  onClick={() => setSelectedType('conference')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedType === 'conference'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  會議論文 ({publicationCounts.conference})
                </button>
                <button
                  onClick={() => setSelectedType('book')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedType === 'book'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  學術專書 ({publicationCounts.book})
                </button>
              </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between text-xs text-stone-500 px-1">
              <span>正在顯示 {filteredPublications.length} 篇研究成果</span>
              {searchTerm && <span>篩選關鍵字："{searchTerm}"</span>}
            </div>

            {/* Publications List Grid */}
            <div className="space-y-4">
              {filteredPublications.map((pub, index) => (
                <div 
                  key={pub.id} 
                  className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:border-amber-500/40 transition group relative"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    
                    {/* Publication Content */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {/* Type badge */}
                        <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded ${
                          pub.type === 'thesis' ? 'bg-amber-100 text-amber-950 border border-amber-200' :
                          pub.type === 'journal' ? 'bg-indigo-50 text-indigo-900 border border-indigo-100' :
                          pub.type === 'conference' ? 'bg-emerald-50 text-emerald-900 border border-emerald-100' :
                          'bg-rose-50 text-rose-900 border border-rose-100'
                        }`}>
                          {pub.type === 'thesis' ? '學位論文/代表作' :
                           pub.type === 'journal' ? '期刊論文' :
                           pub.type === 'conference' ? '會議研討會論文' : '合編專書'}
                        </span>
                        
                        {/* Chronology badge */}
                        <span className="text-[10px] text-stone-400 font-medium">
                          {pub.year} 年 {pub.month} 月
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-800 font-serif">
                        {pub.title}
                      </h4>

                      <div className="text-sm text-stone-600 flex flex-wrap gap-x-4 gap-y-1">
                        <span className="font-medium">作者：{pub.author}</span>
                        <span className="text-stone-400">|</span>
                        <span>發表：{pub.venue}</span>
                        {pub.advisor && (
                          <>
                            <span className="text-stone-400">|</span>
                            <span className="text-stone-500 italic">{pub.advisor}</span>
                          </>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {pub.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-md font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Numeric Indicator for chronological scan */}
                    <div className="absolute right-4 top-4 hidden sm:flex text-stone-200 text-3xl font-extrabold select-none opacity-40">
                      {String(filteredPublications.length - index).padStart(2, '0')}
                    </div>

                  </div>
                </div>
              ))}

              {filteredPublications.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-stone-200">
                  <BookOpen className="mx-auto text-stone-300 w-12 h-12 mb-3" />
                  <p className="text-stone-500 font-medium">無符合搜尋條件的文獻著作</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedType('all'); }}
                    className="text-amber-700 hover:text-amber-600 font-semibold text-xs mt-2 underline"
                  >
                    重設所有篩選器
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 4: CONTACT (聯絡資訊與邀約) */}
        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto animate-fadeIn space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Left Column: Info card */}
              <div className="md:col-span-5 bg-stone-900 text-stone-100 p-8 rounded-2xl space-y-6 flex flex-col justify-between border border-stone-900">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500">聯絡資訊</span>
                    <h3 className="text-2xl font-bold font-serif text-white mt-1">學術交流與演講合作</h3>
                  </div>

                  <p className="text-sm text-stone-300 leading-relaxed">
                    左家綸博士熱忱歡迎關於下列主題之學術合作、專題講演邀約、AI 語文共備推廣及學術諮詢：
                  </p>

                  <div className="space-y-3.5 text-sm">
                    <div className="flex items-center space-x-3 text-stone-300">
                      <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-500">
                        <BookOpen size={16} />
                      </div>
                      <span>甲骨文與古文字學專題講演</span>
                    </div>
                    <div className="flex items-center space-x-3 text-stone-300">
                      <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-500">
                        <Cpu size={16} />
                      </div>
                      <span>大一國文 AI 教案共備與整合實踐</span>
                    </div>
                    <div className="flex items-center space-x-3 text-stone-300">
                      <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-500">
                        <Award size={16} />
                      </div>
                      <span>文字學與語法學跨學科研究合作</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-stone-800 pt-6 space-y-2 text-xs text-stone-400">
                  <p>主要學術辦公：臺灣台中市西屯區台灣大道四段1727號 (東海大學)</p>
                  <p>電子郵件聯繫：cltso@thu.edu.tw</p>
                </div>
              </div>

              {/* Right Column: Simulated Message Form */}
              <div className="md:col-span-7 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-stone-900">發送學術詢問 / 合作訊息</h4>
                  <p className="text-xs text-stone-500 mt-1">
                    若您有教學觀摩、論文合撰或共備計畫，歡迎填寫以下表單。送出後將自動開啟您的郵件軟體，協助您寄信至左博士信箱。
                  </p>
                </div>

                {feedbackSent ? (
                  <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl text-center space-y-3 py-12">
                    <Sparkles size={32} className="text-amber-600 mx-auto animate-bounce" />
                    <h5 className="font-bold text-amber-900">已為您開啟郵件軟體！</h5>
                    <p className="text-xs text-amber-800 max-w-sm mx-auto leading-relaxed">
                      若未自動開啟，請直接來信至 <strong>cltso@thu.edu.tw</strong>，左博士將儘速與您聯繫。
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-600">您的姓名</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          placeholder="例如：王教授、林同學"
                          className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-600">電子信箱</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          placeholder="example@univ.edu.tw"
                          className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-600">訊息主旨</label>
                      <input
                        type="text"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        placeholder="請輸入如：『大一國文AI教材共同開發合作』..."
                        className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-600">合作內容 / 訊息詳情</label>
                      <textarea
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        placeholder="請詳細敘述您的來意..."
                        className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-amber-800 text-white font-bold hover:bg-amber-700 transition duration-200 text-xs shadow"
                    >
                      送出合作邀約信件
                    </button>
                  </form>
                )}

              </div>

            </div>

          </div>
        )}

      </main>

      {/* === FOOTER === */}
      <footer className="bg-stone-900 text-stone-400 py-10 mt-12 border-t border-stone-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-2 text-center md:text-left">
              <span className="text-base font-bold text-white tracking-wider font-serif">
                左家綸 博士個人學術網站
              </span>
              <p className="text-xs text-stone-500">
                專攻：甲骨文與古文字學、中文語法語用學、生成式 AI 中文創新生態教學。
              </p>
            </div>

            <div className="flex space-x-6 text-xs text-stone-400">
              <button onClick={() => setActiveTab('about')} className="hover:text-white transition">學術自傳</button>
              <button onClick={() => setActiveTab('teaching')} className="hover:text-white transition">AI 教學實踐</button>
              <button onClick={() => setActiveTab('publications')} className="hover:text-white transition">學術著作</button>
              <button onClick={() => setActiveTab('contact')} className="hover:text-white transition">聯絡與邀約</button>
            </div>

          </div>
          
          <div className="border-t border-stone-900 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-600">
            <p>© 2026 Dr. Chia-Lun Tso. All Rights Reserved. (資料更新日期：2026年5月4日)</p>
            <p className="mt-1 sm:mt-0 italic">東海大學 中國文學系 / 僑光科技大學 通識教育中心</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
