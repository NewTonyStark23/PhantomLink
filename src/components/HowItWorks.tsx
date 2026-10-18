import { useState } from 'react'
import {
  Layers, Shield, Cable, Server, EyeOff, Fingerprint, Radio,
  Lock, ArrowDown, ArrowRight, Check, Smartphone, Monitor,
  Zap, AlertTriangle, Wifi, WifiOff
} from 'lucide-react'

type Tab = 'overview' | 'layer1' | 'layer2' | 'comparison'

export default function HowItWorks() {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Layers size={22} className="text-indigo-400" />
          How It Works
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Two layers stacked together: Reverse Tethering + Stealth Security
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-800 pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: <Layers size={14} /> },
          { id: 'layer1', label: 'Layer 1: Reverse Tether', icon: <Cable size={14} /> },
          { id: 'layer2', label: 'Layer 2: Stealth Security', icon: <Shield size={14} /> },
          { id: 'comparison', label: 'vs Regular Tethering', icon: <AlertTriangle size={14} /> },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as Tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm transition-all ${
              tab === t.id
                ? 'bg-indigo-600/20 text-indigo-300 border-b-2 border-indigo-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-950/50 to-purple-950/50 border border-indigo-500/20 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-2 text-center">The Two-Layer Concept</h2>
            <p className="text-center text-gray-400 text-sm mb-8">
              You need BOTH layers. One without the other doesn't work.
            </p>

            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Layer 2 - Security (on top) */}
              <div className="bg-purple-500/5 border-2 border-purple-500/30 rounded-xl p-5 relative">
                <div className="absolute -top-3 left-4 bg-purple-600 px-3 py-0.5 rounded-full text-xs font-bold text-white">
                  LAYER 2 — Stealth Security
                </div>
                <p className="text-sm text-gray-300 mb-3 mt-2">
                  Makes your PC <strong className="text-purple-300">indistinguishable</strong> from the phone itself
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <MiniBadge icon={<Radio size={12} />} label="TTL Fix" />
                  <MiniBadge icon={<Server size={12} />} label="APN Spoof" />
                  <MiniBadge icon={<Fingerprint size={12} />} label="Fingerprint" />
                  <MiniBadge icon={<Lock size={12} />} label="DNS Protect" />
                  <MiniBadge icon={<EyeOff size={12} />} label="Header Strip" />
                  <MiniBadge icon={<Shield size={12} />} label="IP Match" />
                </div>
                <p className="text-xs text-purple-300 mt-3 text-center">
                  Without this → carrier detects tethering → hotspot billing
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <ArrowDown size={16} className="text-gray-600" />
                  <span className="text-[10px] text-gray-600">built on top of</span>
                </div>
              </div>

              {/* Layer 1 - Reverse Tether (foundation) */}
              <div className="bg-cyan-500/5 border-2 border-cyan-500/30 rounded-xl p-5 relative">
                <div className="absolute -top-3 left-4 bg-cyan-600 px-3 py-0.5 rounded-full text-xs font-bold text-white">
                  LAYER 1 — Reverse Tethering
                </div>
                <p className="text-sm text-gray-300 mb-3 mt-2">
                  Creates the <strong className="text-cyan-300">data path</strong> from PC through phone's mobile data
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="bg-gray-800 rounded-lg px-3 py-2 text-center">
                    <Monitor size={20} className="mx-auto text-gray-300 mb-1" />
                    <p className="text-[10px] text-gray-400">PC</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded" />
                    <Cable size={14} className="text-cyan-400" />
                    <span className="text-[10px] text-gray-500">USB</span>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded" />
                  </div>
                  <div className="bg-gray-800 rounded-lg px-3 py-2 text-center">
                    <Smartphone size={20} className="mx-auto text-indigo-400 mb-1" />
                    <p className="text-[10px] text-gray-400">Phone</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded" />
                    <Radio size={14} className="text-purple-400" />
                  </div>
                  <div className="bg-gray-800 rounded-lg px-3 py-2 text-center">
                    <Zap size={20} className="mx-auto text-yellow-400 mb-1" />
                    <p className="text-[10px] text-gray-400">Internet</p>
                  </div>
                </div>
                <p className="text-xs text-cyan-300 mt-3 text-center">
                  Without this → no connection at all, PC can't reach phone's data
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Check size={16} className="text-green-400" />
                What this gives you
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ PC internet from phone's data plan</li>
                <li>✓ Carrier sees only ONE device (the phone)</li>
                <li>✓ Billed as regular data, NOT hotspot</li>
                <li>✓ Phone stays cool (no WiFi AP heat)</li>
                <li>✓ You can still game on the phone</li>
                <li>✓ Works even if carrier blocks tethering</li>
              </ul>
            </div>
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <AlertTriangle size={16} className="text-yellow-400" />
                What this is NOT
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✗ Not a WiFi hotspot (no AP broadcast)</li>
                <li>✗ Not standard USB tethering (uses primary APN)</li>
                <li>✗ Not Bluetooth tethering (too slow)</li>
                <li>✗ Not a separate data plan</li>
                <li>✗ Not detectable by carrier inspection</li>
                <li>✗ Not using hotspot data bucket</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Layer 1 Detail */}
      {tab === 'layer1' && (
        <div className="space-y-6">
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-600/20 rounded-xl flex items-center justify-center">
                <Cable size={20} className="text-cyan-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Layer 1: Reverse Tethering</h2>
                <p className="text-sm text-gray-400">The data path — how PC traffic reaches phone's modem</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Reverse tethering is the opposite of normal tethering. Instead of phone sharing its internet
                <em> out</em> to other devices via WiFi, your PC's traffic flows <em>into</em> the phone via USB,
                and the phone sends it out through its own mobile data connection.
              </p>

              <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs">
                <p className="text-gray-500 mb-2"># Data flow:</p>
                <p className="text-cyan-300">PC request → USB cable → Phone's TUN/VPN interface</p>
                <p className="text-cyan-300">→ Phone's network stack → Phone's mobile modem</p>
                <p className="text-cyan-300">→ Cell tower → Internet</p>
                <p className="text-gray-500 mt-3"># Response comes back the same way:</p>
                <p className="text-purple-300">Internet → Cell tower → Phone's modem</p>
                <p className="text-purple-300">→ Phone's network stack → USB cable → PC</p>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-white mb-1">Transport</h4>
                  <p className="text-xs text-gray-400">USB cable (ADB) or Bluetooth RFCOMM carries the raw data between PC and phone.</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-white mb-1">TUN Interface</h4>
                  <p className="text-xs text-gray-400">Phone creates a virtual network interface. PC's traffic enters here, phone routes it through mobile data.</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-white mb-1">Phone's Modem</h4>
                  <p className="text-xs text-gray-400">Traffic exits from the phone's own cellular modem — same as if you were browsing on the phone.</p>
                </div>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-sm text-yellow-300">
                  <strong>Key point:</strong> Layer 1 alone = reverse tethering. It works, BUT carriers can detect it
                  because standard reverse tethering still decrements TTL and uses the tethering APN.
                  That's why you need Layer 2.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layer 2 Detail */}
      {tab === 'layer2' && (
        <div className="space-y-6">
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Layer 2: Stealth Security</h2>
                <p className="text-sm text-gray-400">The disguise — makes PC invisible to carrier detection</p>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-4">
              Carriers use multiple techniques to detect tethering. Layer 2 defeats each one:
            </p>

            <div className="space-y-3">
              <StealthDetail
                icon={<Radio size={18} />}
                title="TTL Correction"
                how="Phone sends packets with TTL=64. Every router hop decrements by 1. If PC sends through phone, it arrives at carrier with TTL=63 (decremented once). Carrier sees 63 → tethering detected."
                fix="We intercept packets at the phone's TUN interface and RESET TTL back to 64 before they hit the modem. Carrier sees TTL=64 — same as phone's own traffic."
              />
              <StealthDetail
                icon={<Server size={18} />}
                title="APN Spoofing"
                how="Android has multiple APNs: 'internet' (primary data) and 'internet.tether' (hotspot). Standard tethering uses the tether APN, which carrier bills separately."
                fix="We force all traffic through the PRIMARY APN — the same one the phone uses for its own browsing. Carrier billing system sees primary APN = regular data."
              />
              <StealthDetail
                icon={<Fingerprint size={18} />}
                title="Device Fingerprint Match"
                how="HTTP headers, TCP stack fingerprints (p0f), and TLS Client Hello patterns reveal the OS. A Windows PC has different fingerprints than an Android phone."
                fix="We rewrite HTTP headers to match the phone's User-Agent, and use iptables TCP MSS clamping to match the phone's TCP fingerprint. Carrier DPI sees Android phone."
              />
              <StealthDetail
                icon={<Lock size={18} />}
                title="DNS Leak Protection"
                how="If PC uses its own DNS (like 8.8.8.8) while phone uses carrier DNS, carrier sees two different DNS patterns from one IP = suspicious."
                fix="All DNS queries are forced through the phone's carrier DNS. PC never contacts external DNS directly. Pattern matches phone's own browsing."
              />
              <StealthDetail
                icon={<EyeOff size={18} />}
                title="Header Stripping"
                how="PC browsers add headers like 'Sec-CH-UA: Windows', 'X-Forwarded-For', etc. These reveal a non-phone device."
                fix="We strip all PC-specific headers and inject the phone's exact header set. Carrier sees identical HTTP signatures to phone's Chrome."
              />
              <StealthDetail
                icon={<Shield size={18} />}
                title="IP Address Match"
                how="With NAT, PC gets a different internal IP. Carrier can see multiple devices behind one public IP."
                fix="Since traffic exits from phone's modem using phone's IP, there's only ONE IP visible to carrier. PC is invisible at the IP layer."
              />
            </div>
          </div>
        </div>
      )}

      {/* Comparison */}
      {tab === 'comparison' && (
        <div className="space-y-6">
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 text-center">PhoneNet Bridge vs Regular Tethering</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Feature</th>
                    <th className="text-center py-3 px-4 text-red-400 font-medium">
                      <div className="flex items-center justify-center gap-1"><Wifi size={14} /> WiFi Hotspot</div>
                    </th>
                    <th className="text-center py-3 px-4 text-yellow-400 font-medium">
                      <div className="flex items-center justify-center gap-1"><Cable size={14} /> USB Tether</div>
                    </th>
                    <th className="text-center py-3 px-4 text-green-400 font-medium">
                      <div className="flex items-center justify-center gap-1"><Shield size={14} /> PhantomLink</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <CompareRow feature="Carrier Detection" hotspot="🔴 Detected" usb="🟡 Sometimes" stealth="🟢 Invisible" />
                  <CompareRow feature="Data Plan Used" hotspot="Hotspot bucket" usb="Hotspot bucket" stealth="Regular data" />
                  <CompareRow feature="Phone Heat" hotspot="🔥 Very Hot" usb="🟡 Warm" stealth="🟢 Normal" />
                  <CompareRow feature="WiFi AP Active" hotspot="Yes" usb="No" stealth="No" />
                  <CompareRow feature="TTL Value" hotspot="63 (detected)" usb="63 (detected)" stealth="64 (matches phone)" />
                  <CompareRow feature="APN Used" hotspot="Tethering APN" usb="Tethering APN" stealth="Primary APN" />
                  <CompareRow feature="Fingerprint" hotspot="Mixed" usb="Mixed" stealth="Phone only" />
                  <CompareRow feature="Can Game on Phone" hotspot="Laggy" usb="Yes" stealth="Yes" />
                  <CompareRow feature="Carrier Bills As" hotspot="Hotspot data" usb="Hotspot data" stealth="Regular data" />
                  <CompareRow feature="Works if tether blocked" hotspot="No" usb="No" stealth="Yes" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">
            <h3 className="font-semibold text-green-300 mb-2">The Bottom Line</h3>
            <p className="text-sm text-gray-300">
              Regular hotspot/tethering = carrier sees <strong className="text-red-400">two devices</strong> → hotspot billing.
              PhantomLink = carrier sees <strong className="text-green-400">one device (your phone)</strong> → regular data billing.
              Your PC is just another "app" running on the phone as far as the carrier knows.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function MiniBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg px-2 py-1.5">
      <span className="text-purple-400">{icon}</span>
      <span className="text-[10px] text-purple-300">{label}</span>
    </div>
  )
}

function StealthDetail({ icon, title, how, fix }: {
  icon: React.ReactNode; title: string; how: string; fix: string
}) {
  return (
    <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-purple-400">{icon}</span>
        <h4 className="font-semibold text-white text-sm">{title}</h4>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] text-red-400 uppercase tracking-wider mb-1">How carriers detect</p>
          <p className="text-xs text-gray-400">{how}</p>
        </div>
        <div>
          <p className="text-[10px] text-green-400 uppercase tracking-wider mb-1">How we defeat it</p>
          <p className="text-xs text-gray-300">{fix}</p>
        </div>
      </div>
    </div>
  )
}

function CompareRow({ feature, hotspot, usb, stealth }: {
  feature: string; hotspot: string; usb: string; stealth: string
}) {
  return (
    <tr className="border-b border-gray-800/50">
      <td className="py-3 px-4 text-gray-300 font-medium">{feature}</td>
      <td className="py-3 px-4 text-center text-gray-400 text-xs">{hotspot}</td>
      <td className="py-3 px-4 text-center text-gray-400 text-xs">{usb}</td>
      <td className="py-3 px-4 text-center text-green-300 text-xs font-medium">{stealth}</td>
    </tr>
  )
}
