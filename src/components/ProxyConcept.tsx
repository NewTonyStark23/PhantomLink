import { useState } from 'react'

export default function ProxyConcept() {
  const [activeTab, setActiveTab] = useState<'concept' | 'diagram' | 'code'>('concept')

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          The "Server Extension" Concept
        </h2>
        <p className="text-gray-400 text-center mb-8 max-w-3xl mx-auto">
          Your idea of making the phone's data feel like a "server data extension" is actually a well-known 
          networking pattern. Here's how to implement it:
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {(['concept', 'diagram', 'code'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab === 'concept' && '💡 Concept'}
              {tab === 'diagram' && '📊 Architecture'}
              {tab === 'code' && '💻 Implementation'}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">What You're Describing</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  You want the phone to act as a <strong className="text-indigo-300">transparent network gateway</strong> — 
                  where other devices connect to it and it "extends" the phone's data connection to them, 
                  making it feel like the data is native to those devices.
                </p>
                <p>
                  This is essentially a <strong className="text-cyan-300">Network Address Translation (NAT) gateway</strong> or 
                  a <strong className="text-green-300">SOCKS proxy</strong> running on the phone, accessible via USB or Bluetooth 
                  instead of WiFi.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <span className="text-3xl mb-3 block">🔌</span>
                <h4 className="font-bold text-white mb-2">USB Transport</h4>
                <p className="text-sm text-gray-400">
                  Use ADB port forwarding or RNDIS (USB Ethernet) to create a direct data pipe. 
                  The phone becomes a network interface on your PC.
                </p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <span className="text-3xl mb-3 block">📶</span>
                <h4 className="font-bold text-white mb-2">Bluetooth Transport</h4>
                <p className="text-sm text-gray-400">
                  Use Bluetooth RFCOMM or PAN to create a serial/network link. 
                  Slower but wireless and zero WiFi heat.
                </p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <span className="text-3xl mb-3 block">🖥️</span>
                <h4 className="font-bold text-white mb-2">The "Server"</h4>
                <p className="text-sm text-gray-400">
                  A proxy (SOCKS5/HTTP) or VPN running on the phone. 
                  It receives connections and forwards them through mobile data.
                </p>
              </div>
            </div>

            <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-6">
              <h4 className="font-bold text-purple-300 mb-3">🎯 Why This Is Better Than Hotspot</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-300 mb-2"><strong>Hotspot does:</strong></p>
                  <ul className="space-y-1 text-gray-400">
                    <li>• Activates WiFi AP radio (heat source!)</li>
                    <li>• Broadcasts beacons 10x/second</li>
                    <li>• Manages WiFi associations</li>
                    <li>• Handles WPA2 encryption in hardware</li>
                    <li>• Runs DHCP server</li>
                  </ul>
                </div>
                <div>
                  <p className="text-gray-300 mb-2"><strong>Server Extension does:</strong></p>
                  <ul className="space-y-1 text-gray-400">
                    <li>• WiFi radio stays OFF</li>
                    <li>• No beaconing at all</li>
                    <li>• Direct USB/BT data pipe</li>
                    <li>• Simple packet forwarding</li>
                    <li>• Minimal CPU overhead</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'diagram' && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Architecture: Phone as Network Gateway</h3>
            
            {/* Architecture Diagram */}
            <div className="space-y-6">
              {/* Layer 1: Transport */}
              <div className="border border-cyan-500/30 rounded-xl p-4 bg-cyan-500/5">
                <p className="text-xs text-cyan-400 font-mono mb-3">LAYER 1: TRANSPORT (USB/Bluetooth)</p>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center text-2xl mb-2">💻</div>
                    <p className="text-xs text-gray-400">PC / Device</p>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full relative">
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full opacity-30" />
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-1">USB (ADB forward) or Bluetooth RFCOMM</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center text-2xl mb-2">📱</div>
                    <p className="text-xs text-gray-400">Phone</p>
                  </div>
                </div>
              </div>

              {/* Layer 2: Proxy/Gateway */}
              <div className="border border-indigo-500/30 rounded-xl p-4 bg-indigo-500/5">
                <p className="text-xs text-indigo-400 font-mono mb-3">LAYER 2: GATEWAY (Running on Phone)</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-lg mb-1">🔀</p>
                    <p className="text-xs text-gray-300">SOCKS5 Proxy</p>
                    <p className="text-xs text-gray-500">Port 1080</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-lg mb-1">🌐</p>
                    <p className="text-xs text-gray-300">HTTP Proxy</p>
                    <p className="text-xs text-gray-500">Port 8080</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-lg mb-1">🛡️</p>
                    <p className="text-xs text-gray-300">VPN Tunnel</p>
                    <p className="text-xs text-gray-500">TUN interface</p>
                  </div>
                </div>
              </div>

              {/* Layer 3: Mobile Data */}
              <div className="border border-purple-500/30 rounded-xl p-4 bg-purple-500/5">
                <p className="text-xs text-purple-400 font-mono mb-3">LAYER 3: MOBILE DATA (Phone's Native Connection)</p>
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-gray-800 rounded-lg px-4 py-2 text-center">
                    <p className="text-xs text-gray-300">rmnet0 (Mobile Interface)</p>
                    <p className="text-xs text-gray-500">4G/5G Data</p>
                  </div>
                  <span className="text-gray-600">→</span>
                  <div className="bg-gray-800 rounded-lg px-4 py-2 text-center">
                    <p className="text-xs text-gray-300">Cell Tower</p>
                    <p className="text-xs text-gray-500">Internet</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">
                <strong className="text-white">Data Flow:</strong> PC request → USB cable → Phone's proxy receives it → 
                Phone forwards via mobile data → Response comes back → Phone sends via USB → PC gets response. 
                The phone's WiFi radio is <strong className="text-green-400">completely off</strong>.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Option A: Gnirehtet (Easiest)</h3>
              <pre className="bg-gray-950 border border-gray-800 rounded-xl p-4 text-sm text-green-400 overflow-x-auto font-mono leading-relaxed">
{`# Download Gnirehtet
git clone https://github.com/Genymobile/gnirehtet
cd gnirehtet

# On your phone: enable USB Debugging
# Settings → Developer Options → USB Debugging

# Connect phone via USB, then:
./gnirehtet run

# That's it! Your PC now uses phone's mobile data.
# Phone stays cool — it's just running a lightweight VPN.

# To stop:
./gnirehtet stop`}
              </pre>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Option B: SOCKS Proxy via Termux (Multi-Device)</h3>
              <pre className="bg-gray-950 border border-gray-800 rounded-xl p-4 text-sm text-green-400 overflow-x-auto font-mono leading-relaxed">
{`# Install Termux on your phone (from F-Droid, NOT Play Store)
# Then in Termux:

pkg update && pkg upgrade
pkg install python

# Create a simple SOCKS5 proxy server
cat > proxy.py << 'EOF'
import socket, threading, struct

def handle_client(client, addr):
    # SOCKS5 handshake
    version, nmethods = client.recv(2)
    methods = client.recv(nmethods)
    client.sendall(b'\\x05\\x00')  # No auth
    
    # Connect request
    ver, cmd, rsv, atyp = client.recv(4)
    if atyp == 1:  # IPv4
        addr = socket.inet_ntoa(client.recv(4))
    elif atyp == 3:  # Domain
        length = client.recv(1)[0]
        addr = client.recv(length).decode()
    port = struct.unpack('>H', client.recv(2))[0]
    
    remote = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    remote.connect((addr, port))
    client.sendall(b'\\x05\\x00\\x00\\x01' + b'\\x00\\x00\\x00\\x00\\x00\\x00')
    
    # Relay data
    def relay(src, dst):
        try:
            while True:
                data = src.recv(4096)
                if not data: break
                dst.sendall(data)
        except: pass
        finally: src.close(); dst.close()
    
    threading.Thread(target=relay, args=(client, remote)).start()
    threading.Thread(target=relay, args=(remote, client)).start()

server = socket.socket()
server.bind(('127.0.0.1', 1080))
server.listen(5)
print("SOCKS5 proxy on :1080")
while True:
    c, a = server.accept()
    threading.Thread(target=handle_client, args=(c, a)).start()
EOF

python proxy.py &

# Now forward port to PC via ADB:
# (from PC terminal)
adb forward tcp:1080 tcp:1080

# Set PC proxy to: 127.0.0.1:1080 (SOCKS5)
# For multiple devices, forward different ports!`}
              </pre>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Option C: USB Ethernet (RNDIS) — Zero Config</h3>
              <pre className="bg-gray-950 border border-gray-800 rounded-xl p-4 text-sm text-green-400 overflow-x-auto font-mono leading-relaxed">
{`# This is the simplest method — built into Android!
# No apps, no ADB, no commands needed.

# On your phone:
1. Connect USB cable to PC
2. Settings → Network → Hotspot & Tethering
3. Toggle ON "USB tethering"
   (NOT "WiFi hotspot" — that's the burning one!)

# On PC:
# Windows: Auto-detects as Ethernet adapter
# Linux: Creates usb0 interface automatically
# Mac: May need HoRNDIS driver (free)

# That's it. Your PC has internet through phone's data.
# Phone WiFi radio = OFF. Heat = minimal.
# You can still game on the phone!

# Check on Linux:
ip addr show usb0
# Should show an IP like 192.168.42.x`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
