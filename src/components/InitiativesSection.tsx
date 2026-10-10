import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, Sparkles } from 'lucide-react';

export const InitiativesSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-16 bg-[#f7f7f5] border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: 3 Initiatives Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col space-y-3">
              <div className="h-40 rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&auto=format&fit=crop&q=80"
                  alt="School Children"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-gray-900 backdrop-blur-sm">
                  School Safety
                </span>
              </div>
              <h4 className="font-bold text-sm text-gray-900 leading-snug">
                Child Lung Defense Protocol
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Automated closure alerts prevent acute pediatric asthma episodes during winter inversions.
              </p>
              <div className="pt-2 text-[11px] font-bold text-emerald-700 flex items-center space-x-1 cursor-pointer">
                <span>Learn More</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col space-y-3">
              <div className="h-40 rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=80"
                  alt="Clean Energy & Farming"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-gray-900 backdrop-blur-sm">
                  Crop Solutions
                </span>
              </div>
              <h4 className="font-bold text-sm text-gray-900 leading-snug">
                Pusa Decomposer Routing
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Directs bio-enzymatic sprayers to high-density farm fire clusters across Punjab and Haryana.
              </p>
              <div className="pt-2 text-[11px] font-bold text-emerald-700 flex items-center space-x-1 cursor-pointer">
                <span>Learn More</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col space-y-3">
              <div className="h-40 rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80"
                  alt="Clean Transit Corridors"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-gray-900 backdrop-blur-sm">
                  Transit Health
                </span>
              </div>
              <h4 className="font-bold text-sm text-gray-900 leading-snug">
                Clean Transit Corridors
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Empowering millions of commuters with dosage-optimized routes and air-conditioned metro connections.
              </p>
              <div className="pt-2 text-[11px] font-bold text-emerald-700 flex items-center space-x-1 cursor-pointer">
                <span>Learn More</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Right Column: Impact Copy & Lime Newsletter Box (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Real Policies. Real Telemetry.<br />
                <span className="text-emerald-700">A Breathable Future.</span>
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Discover how deterministic AWS Cedar code and cloud telemetry remove bureaucratic delays, protecting public health in real time.
              </p>
            </div>

            {/* Lime Newsletter Card (Exact match to reference image bottom-right lime card) */}
            <div className="bg-[#dcf468] rounded-3xl p-7 text-gray-950 shadow-lg space-y-4">
              <div>
                <h4 className="text-lg font-black tracking-tight text-gray-950">
                  Stay Protected. Stay Informed.
                </h4>
                <p className="text-xs text-gray-800 mt-1 font-medium leading-relaxed">
                  Subscribe to daily 6:00 AM Delhi morning air alerts, school closure forecasts, and Cedar GRAP advisories.
                </p>
              </div>

              {subscribed ? (
                <div className="p-3 bg-white/90 rounded-2xl flex items-center space-x-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Subscribed! You will receive daily 6:00 AM air bulletins.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex bg-white rounded-full p-1 border border-gray-300 shadow-sm">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-xs text-gray-900 px-4 py-2 focus:outline-none placeholder:text-gray-400 font-medium"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-full bg-gray-950 hover:bg-gray-800 text-white text-xs font-bold shrink-0 transition-all shadow-sm"
                    >
                      Subscribe →
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] text-gray-800 font-medium px-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-gray-900" />
                    <span>Free community alert network • Zero spam</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
