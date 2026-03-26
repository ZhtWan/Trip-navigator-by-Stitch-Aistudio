import { useState, useEffect } from 'react';
import { 
  PlaneTakeoff, 
  X, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Umbrella, 
  Mountain, 
  Users, 
  Music, 
  ArrowRight, 
  Sun, 
  MoreVertical, 
  CloudRain, 
  Cloud, 
  CloudSun, 
  Droplets, 
  Package, 
  Shirt, 
  CheckSquare, 
  ListChecks, 
  User, 
  BadgeCheck, 
  Info, 
  Activity, 
  PlusCircle, 
  Lightbulb, 
  ShoppingBag, 
  Check, 
  GripVertical, 
  Smartphone,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Screen = 'home' | 'weather' | 'item-details' | 'checklist';

interface TripDetails {
  destination: string;
  departureDate: string;
  returnDate: string;
  tripType: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    destination: 'Tokyo',
    departureDate: 'Oct 12, 2024',
    returnDate: 'Oct 20, 2024',
    tripType: 'Business'
  });

  const [checklist, setChecklist] = useState([
    { id: 1, name: 'Linen Shirts (4)', category: 'Clothing', checked: true },
    { id: 2, name: 'Swim Shorts', category: 'Clothing', checked: false },
    { id: 3, name: 'Evening Blazer', category: 'Clothing', checked: false },
    { id: 4, name: 'Camera & SD Cards', category: 'Electronics', checked: true },
    { id: 5, name: 'Universal Power Adapter', category: 'Electronics', checked: false, note: 'Essential for Italy' },
  ]);

  const toggleItem = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const packedCount = checklist.filter(item => item.checked).length;
  const totalCount = checklist.length;
  const progress = Math.round((packedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-fixed selection:text-on-primary">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <HomeScreen key="home" onGenerate={() => setCurrentScreen('weather')} tripDetails={tripDetails} setTripDetails={setTripDetails} />
        )}
        {currentScreen === 'weather' && (
          <WeatherScreen key="weather" tripDetails={tripDetails} onNext={() => setCurrentScreen('item-details')} onNav={(s) => setCurrentScreen(s)} />
        )}
        {currentScreen === 'item-details' && (
          <ItemDetailsScreen key="item-details" tripDetails={tripDetails} onNav={(s) => setCurrentScreen(s)} />
        )}
        {currentScreen === 'checklist' && (
          <ChecklistScreen 
            key="checklist" 
            tripDetails={tripDetails} 
            checklist={checklist} 
            toggleItem={toggleItem} 
            progress={progress}
            packedCount={packedCount}
            totalCount={totalCount}
            onNav={(s) => setCurrentScreen(s)} 
          />
        )}
      </AnimatePresence>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary-fixed/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[5%] w-[35%] h-[35%] bg-tertiary-container/10 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}

function Header({ onBack, showClose = false }: { onBack?: () => void, showClose?: boolean }) {
  return (
    <header className="fixed top-0 w-full z-50 px-6 py-6 flex items-center justify-between bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <PlaneTakeoff className="text-primary w-8 h-8" />
        <span className="font-headline font-extrabold italic text-xl tracking-tight text-primary">Trip Navigator</span>
      </div>
      <button onClick={onBack} className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low">
        {showClose ? <X className="w-6 h-6" /> : <MoreVertical className="w-6 h-6" />}
      </button>
    </header>
  );
}

function BottomNav({ active, onNav }: { active: Screen, onNav: (s: Screen) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-8 pt-4 bg-surface-container-lowest/80 backdrop-blur-2xl z-50 rounded-t-[32px] shadow-[0_-8px_32px_rgba(0,100,154,0.06)] border-t border-outline-variant/10">
      <button 
        onClick={() => onNav('checklist')}
        className={`flex flex-col items-center justify-center px-5 py-2 rounded-2xl transition-all duration-200 ${active === 'checklist' ? 'bg-primary-fixed/20 text-primary scale-105' : 'text-on-surface-variant hover:text-primary'}`}
      >
        <ListChecks className={`w-6 h-6 ${active === 'checklist' ? 'fill-current' : ''}`} />
        <span className="font-body text-[11px] font-medium tracking-wide mt-1">Checklist</span>
      </button>
      <button 
        onClick={() => onNav('weather')}
        className={`flex flex-col items-center justify-center px-5 py-2 rounded-2xl transition-all duration-200 ${active === 'weather' ? 'bg-primary-fixed/20 text-primary scale-105' : 'text-on-surface-variant hover:text-primary'}`}
      >
        <Sun className={`w-6 h-6 ${active === 'weather' ? 'fill-current' : ''}`} />
        <span className="font-body text-[11px] font-medium tracking-wide mt-1">Weather</span>
      </button>
      <button 
        onClick={() => onNav('item-details')}
        className={`flex flex-col items-center justify-center px-5 py-2 rounded-2xl transition-all duration-200 ${active === 'item-details' ? 'bg-primary-fixed/20 text-primary scale-105' : 'text-on-surface-variant hover:text-primary'}`}
      >
        <User className={`w-6 h-6 ${active === 'item-details' ? 'fill-current' : ''}`} />
        <span className="font-body text-[11px] font-medium tracking-wide mt-1">Profile</span>
      </button>
    </nav>
  );
}

function CalendarPopup({ 
  selectedDate, 
  onSelect, 
  onClose 
}: { 
  selectedDate: string, 
  onSelect: (date: string) => void, 
  onClose: () => void 
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const formatDate = (day: number) => {
    const month = monthNames[currentMonth.getMonth()].substring(0, 3);
    const year = currentMonth.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const days = [];
  const totalDays = daysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const startDay = firstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = formatDate(d);
    const isSelected = dateStr === selectedDate;
    days.push(
      <button
        key={d}
        onClick={() => {
          onSelect(dateStr);
          onClose();
        }}
        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm transition-all ${
          isSelected 
            ? 'bg-primary text-on-primary font-bold' 
            : 'hover:bg-primary-fixed/20 text-on-surface'
        }`}
      >
        {d}
      </button>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute top-full left-0 mt-4 z-[100] bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-outline-variant/10 w-[320px]"
    >
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-on-surface-variant" />
        </button>
        <span className="font-headline font-bold text-on-surface">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button 
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-on-surface-variant" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
          <div key={day} className="h-10 w-10 flex items-center justify-center text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>

      <button 
        onClick={onClose}
        className="mt-6 w-full py-3 text-sm font-bold text-primary hover:bg-primary-fixed/10 rounded-xl transition-colors"
      >
        Close
      </button>
    </motion.div>
  );
}

function HomeScreen({ onGenerate, tripDetails, setTripDetails }: { key?: string, onGenerate: () => void, tripDetails: TripDetails, setTripDetails: (t: TripDetails) => void }) {
  const [activePicker, setActivePicker] = useState<'departure' | 'return' | null>(null);
  const tripTypes = [
    { id: 'Business', icon: Briefcase },
    { id: 'Beach', icon: Umbrella },
    { id: 'Hiking', icon: Mountain },
    { id: 'Family', icon: Users },
    { id: 'City Break', icon: Music },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-24 pb-12 px-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10"
    >
      <Header showClose />
      
      {/* Left Column: Branding & Inspiration */}
      <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
        <div className="space-y-4">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
            Where does your <span className="text-primary">story</span> begin?
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
            Transform your packing list from a chore into a pre-travel ritual. Tell us about your journey, and we'll handle the details.
          </p>
        </div>
        
        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl group">
          <img 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1920" 
            alt="Tokyo"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dim/80 to-transparent flex items-end p-8">
            <div className="text-on-primary">
              <span className="text-xs uppercase tracking-[0.2em] font-bold opacity-80">Next Destination</span>
              <h2 className="font-headline text-3xl font-bold">Tokyo, Japan</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Input Form */}
      <div className="lg:col-span-7 flex flex-col justify-center">
        <div className="bg-surface-container-low rounded-[2.5rem] p-8 lg:p-12 space-y-10 border border-outline-variant/10 shadow-sm">
          {/* Destination Input */}
          <div className="space-y-4">
            <label className="font-headline text-sm font-semibold tracking-widest uppercase text-on-surface-variant ml-2">Destination</label>
            <div className="relative group">
              <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-primary w-6 h-6" />
              <input 
                className="w-full bg-surface-container-lowest text-on-surface font-headline text-xl font-medium py-6 pl-16 pr-6 rounded-[1.5rem] transition-all border-none shadow-sm focus:ring-2 focus:ring-primary/20 placeholder:text-outline-variant" 
                placeholder="e.g. Tokyo, Japan" 
                type="text" 
                value={tripDetails.destination}
                onChange={(e) => setTripDetails({ ...tripDetails, destination: e.target.value })}
              />
            </div>
          </div>

          {/* Date Selection Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4 relative">
              <label className="font-headline text-sm font-semibold tracking-widest uppercase text-on-surface-variant ml-2">Departure</label>
              <div className="relative group">
                <button 
                  onClick={() => setActivePicker(activePicker === 'departure' ? null : 'departure')}
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary w-5 h-5 z-10 hover:scale-110 transition-transform"
                >
                  <Calendar className="w-full h-full" />
                </button>
                <input 
                  className="w-full bg-surface-container-lowest text-on-surface font-body text-md py-5 pl-14 pr-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-secondary/20" 
                  placeholder="Oct 12, 2024" 
                  type="text"
                  value={tripDetails.departureDate}
                  onChange={(e) => setTripDetails({ ...tripDetails, departureDate: e.target.value })}
                />
              </div>
              <AnimatePresence>
                {activePicker === 'departure' && (
                  <CalendarPopup 
                    selectedDate={tripDetails.departureDate}
                    onSelect={(date) => setTripDetails({ ...tripDetails, departureDate: date })}
                    onClose={() => setActivePicker(null)}
                  />
                )}
              </AnimatePresence>
            </div>
            <div className="space-y-4 relative">
              <label className="font-headline text-sm font-semibold tracking-widest uppercase text-on-surface-variant ml-2">Return</label>
              <div className="relative group">
                <button 
                  onClick={() => setActivePicker(activePicker === 'return' ? null : 'return')}
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary w-5 h-5 z-10 hover:scale-110 transition-transform"
                >
                  <Calendar className="w-full h-full" />
                </button>
                <input 
                  className="w-full bg-surface-container-lowest text-on-surface font-body text-md py-5 pl-14 pr-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-secondary/20" 
                  placeholder="Oct 20, 2024" 
                  type="text"
                  value={tripDetails.returnDate}
                  onChange={(e) => setTripDetails({ ...tripDetails, returnDate: e.target.value })}
                />
              </div>
              <AnimatePresence>
                {activePicker === 'return' && (
                  <CalendarPopup 
                    selectedDate={tripDetails.returnDate}
                    onSelect={(date) => setTripDetails({ ...tripDetails, returnDate: date })}
                    onClose={() => setActivePicker(null)}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Trip Type Chips */}
          <div className="space-y-5">
            <label className="font-headline text-sm font-semibold tracking-widest uppercase text-on-surface-variant ml-2 text-center block">What kind of trip is this?</label>
            <div className="flex flex-wrap justify-center gap-3">
              {tripTypes.map(type => (
                <button 
                  key={type.id}
                  onClick={() => setTripDetails({ ...tripDetails, tripType: type.id })}
                  className={`flex items-center gap-2 px-6 py-4 rounded-full transition-all active:scale-95 font-medium ${tripDetails.tripType === type.id ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/10'}`}
                >
                  <type.icon className="w-5 h-5" />
                  {type.id}
                </button>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4">
            <button 
              onClick={onGenerate}
              className="w-full bg-gradient-to-br from-primary to-primary-dim text-on-primary font-headline font-bold text-lg py-6 rounded-[1.5rem] shadow-xl shadow-primary/30 transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-3"
            >
              Generate My Trip
              <ArrowRight className="w-6 h-6" />
            </button>
            <p className="text-center text-outline-variant text-xs mt-6 uppercase tracking-widest font-medium">
              Powered by Atlas Air Navigator System
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WeatherScreen({ tripDetails, onNext, onNav }: { key?: string, tripDetails: TripDetails, onNext: () => void, onNav: (s: Screen) => void }) {
  const getForecastDays = () => {
    const startDate = new Date(tripDetails.departureDate);
    const baseDate = isNaN(startDate.getTime()) ? new Date() : startDate;
    
    const icons = [Cloud, CloudRain, CloudSun, Sun];
    
    return [0, 1, 2, 3].map(offset => {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + offset);
      return {
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        Icon: icons[offset % icons.length]
      };
    });
  };

  const forecastDays = getForecastDays();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-24 pb-32 px-6 max-w-2xl mx-auto"
    >
      <Header />
      
      <section className="mb-10 ml-4">
        <p className="text-secondary font-headline font-bold uppercase tracking-widest text-[10px] mb-2">Destination Forecast</p>
        <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tighter leading-none mb-4">{tripDetails.destination}</h2>
        <p className="text-on-surface-variant max-w-[280px] leading-relaxed">Prepare for misty mornings and intermittent showers. Your smart list is ready.</p>
      </section>

      <div className="grid grid-cols-12 gap-4 mb-12">
        <div className="col-span-12 md:col-span-8 glass-panel rounded-[32px] p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,100,154,0.06)]">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CloudRain className="text-secondary w-8 h-8" />
                <span className="font-headline font-bold text-lg text-on-surface">Rainy</span>
              </div>
              <p className="text-on-surface-variant text-sm">Light precipitation expected</p>
            </div>
            <div className="text-right">
              <span className="font-headline text-6xl font-light tracking-tighter text-on-surface">18°</span>
              <span className="text-on-surface-variant text-xl">C</span>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between items-center bg-surface-container-low/50 rounded-2xl p-4">
            {forecastDays.map((day, i) => (
              <div key={i} className={`text-center ${i > 0 && i < forecastDays.length - 1 ? 'border-x border-outline-variant/10 px-4' : ''}`}>
                <p className={`text-[10px] uppercase font-bold mb-1 ${i === 1 ? 'text-primary' : 'text-on-surface-variant'}`}>{day.dayName}</p>
                <day.Icon className={`${i === 1 ? 'text-secondary fill-current' : 'text-on-surface-variant'} w-5 h-5 mx-auto`} />
              </div>
            ))}
          </div>
          <img 
            className="absolute -bottom-12 -right-12 w-48 h-48 opacity-10 grayscale rotate-12 pointer-events-none" 
            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800" 
            alt="London"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="col-span-12 md:col-span-4 bg-secondary-container rounded-[32px] p-6 flex flex-col justify-between shadow-sm">
          <div className="bg-white/40 w-10 h-10 rounded-full flex items-center justify-center">
            <Droplets className="text-on-secondary-container w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-secondary-container uppercase tracking-widest mb-1">Humidity</p>
            <p className="font-headline text-3xl font-bold text-on-secondary-container leading-none">84%</p>
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center gap-3 mb-6 ml-4">
          <Package className="text-secondary w-6 h-6" />
          <h3 className="font-headline text-xl font-bold tracking-tight">Weather Essentials</h3>
        </div>
        <div className="space-y-2">
          {[
            { name: 'Compact Umbrella', desc: 'Recommended for high precipitation', icon: Umbrella },
            { name: 'Light Jacket', desc: 'Windproof and water-resistant layers', icon: Shirt },
            { name: 'Waterproof Shoes', desc: 'Comfortable for walking in rain', icon: Mountain },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-surface-container-lowest rounded-[24px] shadow-sm hover:bg-primary-fixed/10 transition-all active:scale-[0.98] group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center group-hover:bg-primary-fixed/40 transition-colors">
                  <item.icon className="text-primary w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-on-surface">{item.name}</p>
                  <p className="text-xs text-on-surface-variant">{item.desc}</p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-primary-fixed flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary-fixed opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <button 
            onClick={onNext}
            className="bg-primary hover:bg-primary-dim text-on-primary font-headline font-bold px-10 py-5 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-3"
          >
            Add all to Checklist
            <CheckSquare className="w-5 h-5" />
          </button>
        </div>
      </section>

      <BottomNav active="weather" onNav={onNav} />
    </motion.div>
  );
}

function ItemDetailsScreen({ tripDetails, onNav }: { key?: string, tripDetails: TripDetails, onNav: (s: Screen) => void }) {
  const getForecastDays = () => {
    const startDate = new Date(tripDetails.departureDate);
    const baseDate = isNaN(startDate.getTime()) ? new Date() : startDate;
    
    const icons = [Cloud, CloudRain, CloudSun];
    
    return [0, 1, 2].map(offset => {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + offset);
      return {
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        Icon: icons[offset % icons.length]
      };
    });
  };

  const forecastDays = getForecastDays();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="pt-24 pb-32 px-6 md:max-w-4xl md:mx-auto"
    >
      <Header />
      
      <section className="mb-10">
        <span className="text-secondary font-headline font-bold tracking-widest text-xs uppercase mb-2 block">Item Intelligence</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">Pack Smarter</h1>
        <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">Customize your gear based on real-time data and historical travel patterns.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 group">
          <div className="glass-panel rounded-[32px] p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,100,154,0.04)] border border-white/20 transition-all duration-300 hover:shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-fixed/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">High Priority</span>
                  <span className="flex items-center gap-1 text-primary font-medium text-xs">
                    <BadgeCheck className="w-4 h-4 fill-current" />
                    AI Verified
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-on-surface">Light Raincoat</h2>
                <p className="text-on-surface-variant mt-1">Essential Outerwear</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-primary-container/30 flex items-center justify-center text-primary">
                <CloudRain className="w-10 h-10" />
              </div>
            </div>
            <div className="space-y-6 relative z-10">
              <div className="bg-surface-container-lowest/80 p-5 rounded-2xl border border-outline-variant/10">
                <h3 className="text-sm font-bold text-secondary mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Why we recommend this:
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  A 75% chance of light showers is forecast for {tripDetails.destination} during your arrival. Our historical data shows travelers who packed a light shell reported 40% higher satisfaction in similar conditions.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:brightness-110 active:scale-95 transition-all">
                  Add to Checklist
                </button>
                <button className="bg-surface-container-high text-primary px-6 py-3 rounded-xl font-bold text-sm hover:bg-surface-container-highest active:scale-95 transition-all">
                  View Alternatives
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="bg-secondary-container/30 rounded-[32px] p-6 h-full flex flex-col border border-secondary-container/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline font-bold text-on-secondary-container">{tripDetails.destination} Pulse</h3>
              <Activity className="text-on-secondary-container/50 w-5 h-5" />
            </div>
            <div className="flex-grow flex flex-col justify-center items-center text-center">
              <span className="text-5xl font-headline font-extrabold text-on-secondary-container">14°C</span>
              <div className="flex items-center gap-2 mt-2 text-on-secondary-container/70 font-medium">
                <Droplets className="w-4 h-4" />
                <span>82% Humidity</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-on-secondary-container/10">
              <p className="text-[11px] font-bold tracking-widest uppercase text-on-secondary-container/40 mb-3">Forecast Snapshot</p>
              <div className="flex justify-between">
                {forecastDays.map((day, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[10px] text-on-secondary-container/60 mb-1">{day.dayName}</p>
                    <day.Icon className="text-secondary w-5 h-5 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-12">
          <div className="bg-surface-container-low rounded-[32px] p-8 border border-white/40">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                <PlusCircle className="w-8 h-8 fill-current" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-on-surface">Add Custom Item</h2>
                <p className="text-on-surface-variant text-sm">Something we missed? Add it manually.</p>
              </div>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={e => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant ml-2 uppercase tracking-tighter">Item Name</label>
                <input className="w-full bg-white border-none rounded-2xl p-4 text-on-surface focus:ring-2 focus:ring-primary-fixed placeholder:text-outline-variant/60 shadow-sm transition-all" placeholder="e.g., Leica M11 Camera" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant ml-2 uppercase tracking-tighter">Category</label>
                <select className="w-full bg-white border-none rounded-2xl p-4 text-on-surface focus:ring-2 focus:ring-primary-fixed shadow-sm appearance-none transition-all">
                  <option>Tech & Electronics</option>
                  <option>Clothing</option>
                  <option>Toiletries</option>
                  <option>Documents</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-primary-dim text-on-primary py-4 rounded-2xl font-bold hover:bg-primary transition-colors shadow-lg shadow-primary/10" type="submit">
                  Save to List
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-surface-container-high transition-transform hover:-translate-y-1">
            <div className="flex gap-4">
              <div className="bg-tertiary-container/30 w-12 h-12 rounded-xl flex items-center justify-center text-tertiary shrink-0">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-on-surface mb-1">Power Adapter Rule</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">UK uses Type G plugs. Your destination hotel provides converters, but we recommend bringing one universal unit.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-surface-container-high transition-transform hover:-translate-y-1">
            <div className="flex gap-4">
              <div className="bg-secondary-container/30 w-12 h-12 rounded-xl flex items-center justify-center text-secondary shrink-0">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-on-surface mb-1">Local Shopping</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Bond Street is 1.2 miles from your stay if you need to pick up premium rain gear locally.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="item-details" onNav={onNav} />
    </motion.div>
  );
}

function ChecklistScreen({ 
  tripDetails, 
  checklist, 
  toggleItem, 
  progress, 
  packedCount, 
  totalCount,
  onNav 
}: { 
  key?: string,
  tripDetails: TripDetails, 
  checklist: any[], 
  toggleItem: (id: number) => void, 
  progress: number,
  packedCount: number,
  totalCount: number,
  onNav: (s: Screen) => void 
}) {
  const categories = Array.from(new Set(checklist.map(item => item.category)));
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-24 pb-32 px-4 max-w-2xl mx-auto"
    >
      <Header />
      
      <section className="mb-10 relative">
        <div className="flex justify-between items-end mb-4">
          <div className="asymmetric-indent">
            <p className="text-on-surface-variant text-sm font-medium tracking-wide font-headline mb-1 uppercase">{tripDetails.destination.toUpperCase()}, {tripDetails.tripType.toUpperCase()}</p>
            <h2 className="font-headline text-4xl font-extrabold text-on-surface leading-tight">Summer Voyage</h2>
          </div>
          <div className="glass-card rounded-2xl p-4 border border-outline-variant/10 shadow-sm flex flex-col items-center">
            <Sun className="text-secondary w-8 h-8 mb-1 fill-current" />
            <span className="font-headline font-bold text-lg">28°C</span>
          </div>
        </div>
        
        <div className="bg-surface-container-highest h-3 w-full rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-secondary to-secondary-fixed-dim rounded-full"
          />
        </div>
        <div className="flex justify-between mt-2 px-1">
          <span className="text-[11px] font-bold text-secondary font-headline tracking-widest uppercase">{progress}% PACKED</span>
          <span className="text-[11px] font-medium text-on-surface-variant font-body">{packedCount} of {totalCount} items</span>
        </div>
      </section>

      {categories.map(category => {
        const isCollapsed = collapsedCategories.includes(category);
        const categoryItems = checklist.filter(item => item.category === category);
        const categoryPackedCount = categoryItems.filter(item => item.checked).length;

        return (
          <section key={category} className="mb-6">
            <button 
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between py-4 asymmetric-indent group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isCollapsed ? 'bg-surface-container-low' : 'bg-primary-fixed/20'}`}>
                  {category === 'Clothing' ? <Shirt className="text-primary w-4 h-4" /> : <Smartphone className="text-primary w-4 h-4" />}
                </div>
                <div className="text-left">
                  <h3 className="font-headline text-sm font-bold tracking-[0.05rem] text-on-surface uppercase">{category}</h3>
                  <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                    {categoryPackedCount} / {categoryItems.length} PACKED
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isCollapsed ? -90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="text-outline-variant w-5 h-5 group-hover:text-primary transition-colors" />
              </motion.div>
            </button>
            
            <AnimatePresence initial={false}>
              {!isCollapsed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pb-4">
                    {categoryItems.map(item => (
                      <div 
                        key={item.id} 
                        onClick={() => toggleItem(item.id)}
                        className={`flex items-center justify-between p-4 rounded-2xl transition-all active:scale-[0.98] cursor-pointer ${item.checked ? 'bg-surface-container-high' : 'bg-surface-container-lowest shadow-sm'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 border-primary-fixed flex items-center justify-center transition-colors ${item.checked ? 'bg-primary-fixed' : ''}`}>
                            {item.checked && <Check className="text-white w-4 h-4" />}
                          </div>
                          <div className="flex flex-col">
                            <span className={`font-body transition-all ${item.checked ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>{item.name}</span>
                            {item.note && <span className="text-xs text-secondary font-medium uppercase tracking-tighter">{item.note}</span>}
                          </div>
                        </div>
                        <GripVertical className="text-outline-variant w-5 h-5" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        );
      })}

      <section className="mb-12 grid grid-cols-2 gap-4">
        <div className="col-span-2 p-6 bg-secondary-container rounded-[2rem] flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <h4 className="font-headline font-bold text-on-secondary-container text-lg mb-1">Missing something?</h4>
            <p className="text-on-secondary-container/80 text-sm font-body">Sunscreen is highly recommended for {tripDetails.destination}.</p>
          </div>
          <div className="relative z-10 bg-white/40 p-3 rounded-full">
            <Plus className="text-on-secondary-container w-6 h-6" />
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
        </div>
      </section>

      <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary rounded-2xl shadow-lg flex items-center justify-center text-on-primary transition-transform active:scale-90 z-40">
        <Plus className="w-8 h-8" />
      </button>

      <BottomNav active="checklist" onNav={onNav} />
    </motion.div>
  );
}
