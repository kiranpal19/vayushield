import React from 'react';
import { Wind, Heart, Shield, Cloud, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenAwsModal: () => void;
  onNavigate: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAwsModal, onNavigate }) => {
  return (
    <footer className="bg-white border-t border-gray-200/80 pt-16 pb-12 text-xs text-gray-500 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-gray-200/80">
          {/* Brand Col (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-sm">
                <Wind className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-gray-900">
                VayuShield
              </span>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed text-xs">
              Together, we can create a breathable, resilient, and safe environment for Delhi-NCR through open-source cloud telemetry and deterministic health policies.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-gray-400">
              <span className="text-[11px] font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                Team VayuKraft
              </span>
              <span className="text-[11px] text-gray-400">Environmental Hacks @ DTU Delhi</span>
            </div>
          </div>

          {/* Col 1: Explore */}
          <div className="space-y-3">
            <h5 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">Explore Suite</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-emerald-700 transition-colors">
                  Delhi Air Quality Grid
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('school')} className="hover:text-emerald-700 transition-colors">
                  School Safety & Cedar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stubble')} className="hover:text-emerald-700 transition-colors">
                  Satellite Stubble Radar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('commute')} className="hover:text-emerald-700 transition-colors">
                  Commute Dosimeter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('indoor')} className="hover:text-emerald-700 transition-colors">
                  Indoor CADR Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: AWS Stack */}
          <div className="space-y-3">
            <h5 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">AWS Architecture</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenAwsModal} className="hover:text-emerald-700 transition-colors font-medium">
                  AWS Cedar Policy Engine
                </button>
              </li>
              <li>
                <button onClick={onOpenAwsModal} className="hover:text-emerald-700 transition-colors">
                  AWS SAM Serverless IaC
                </button>
              </li>
              <li>
                <button onClick={onOpenAwsModal} className="hover:text-emerald-700 transition-colors">
                  Amazon DynamoDB Table
                </button>
              </li>
              <li>
                <button onClick={onOpenAwsModal} className="hover:text-emerald-700 transition-colors">
                  Amazon SNS Push Alerts
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hackathon */}
          <div className="space-y-3">
            <h5 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">Hackathon Info</h5>
            <ul className="space-y-2">
              <li><span className="text-gray-600">Track 01: Air Quality</span></li>
              <li><span className="text-gray-600">DTU, Delhi (Oct 10)</span></li>
              <li><span className="text-gray-600">Amazon Team Workshops</span></li>
              <li><span className="text-gray-600">License: Apache-2.0</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 text-[11px]">
          <p>© 2026 VayuShield (Team VayuKraft). Built for Environmental Hacks at Delhi Technological University.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-600 cursor-pointer">Terms of Directive</span>
            <span className="hover:text-gray-600 cursor-pointer">CPCB Data Attribution</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
