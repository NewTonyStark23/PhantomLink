import { useState } from 'react'
import {
  Monitor, Cpu, HardDrive, Wifi, Zap, Layers, Cable,
  Smartphone, ArrowRight, Check, Play, Film, Gamepad2,
  MemoryStick, RefreshCw, Gauge, Server, Radio, Hand
} from 'lucide-react'

type Tab = 'overview' | 'display' | 'touch' | 'compute' | 'pipeline'

export default function FullIntegration() {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Layers size={22} className="text-indigo-400" />
          PhantomLink — Full Integration
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Your phone/tablet becomes a complete PC peripheral — network, display, input, compute, and video
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-800 pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: <Layers size={14} /> },
          { id: 'display', label: 'Display Extension', icon: <Monitor size={14} /> },
          { id: 'touch', label: 'Touch Input', icon: <Hand size={14} /> },
          { id: 'compute', label: 'Resource Pool', icon: <Cpu size={14} /> },
          { id: 'pipeline', label: 'Video Pipeline', icon: <Film size={14} /> },
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
            <h2 className="text-xl font-bold text-white mb-2 text-center">Five Layers of Integration</h2>
            <p className="text-center text-gray-400 text-sm mb-8">
              One USB cable. Five capabilities. Your phone/tablet becomes a full PC peripheral.
            </p>

            <div className="space-y-3 max-w-3xl mx-auto">
              {/* Layer 5 - Video Pipeline (top) */}
              <IntegrationLayer
                number={5}
                title="Video Pipeline"
                description="Phone's GPU/NPU handles encoding, rendering, AI tasks"
                icon={<Film size={18} />}
                color="pink"
              />
              
              {/* Layer 4 - Compute Resources */}
              <IntegrationLayer
                number={4}
                title="Resource Pool"
                description="Phone's RAM, storage, and processor extend PC capabilities"
                icon={<Cpu size={18} />}
                color="purple"
              />
              
              {/* Layer 3 - Touch Input */}
              <IntegrationLayer
                number={3}
                title="Touch Input (Tablet)"
                description="Tablet becomes mouse, touchpad, or drawing surface"
                icon={<Hand size={18} />}
                color="orange"
              />
              
              {/* Layer 2 - Display Extension */}
              <IntegrationLayer
                number={2}
                title="Display Extension"
                description="Phone/tablet becomes a second (or third) monitor"
                icon={<Monitor size={18} />}
                color="cyan"
              />
              
              {/* Layer 1 - Network Bridge (foundation) */}
              <IntegrationLayer
                number={1}
                title="Stealth Network Bridge"
                description="Phone's data = PC's internet (carrier-invisible)"
                icon={<Wifi size={18} />}
                color="green"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Check size={16} className="text-green-400" />
                What This Gives You
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Extra monitor (phone/tablet screen)</li>
                <li>✓ More RAM for your PC (phone's memory pool)</li>
                <li>✓ Extra storage (phone's flash as scratch disk)</li>
                <li>✓ GPU/NPU offload for video encoding</li>
                <li>✓ AI inference on phone's neural engine</li>
                <li>✓ Internet from phone's data plan (stealth)</li>
                <li>✓ Higher refresh rate for video tasks</li>
                <li>✓ All over ONE USB cable</li>
              </ul>
            </div>
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Zap size={16} className="text-yellow-400" />
                Real-World Use Cases
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>🎬 <strong>Video editing:</strong> Phone's GPU encodes exports</li>
                <li>🎮 <strong>Gaming:</strong> Phone as second screen for maps/chat</li>
                <li>🤖 <strong>AI tasks:</strong> Phone's NPU runs inference</li>
                <li>💾 <strong>Large files:</strong> Phone storage as temp workspace</li>
                <li>📺 <strong>Streaming:</strong> Phone handles stream encoding</li>
                <li>🖥️ <strong>Multi-monitor:</strong> Tablet as dedicated reference</li>
                <li>📱 <strong>Mobile work:</strong> Full workstation from phone</li>
                <li>🔋 <strong>Efficiency:</strong> Distribute load, less heat on PC</li>
              </ul>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Data Flow Architecture</h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <DeviceBlock icon={<Monitor size={24} />} label="PC" sublabel="Main System" color="cyan" />
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1">
                  <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded animate-pulse" />
                  <Cable size={14} className="text-indigo-400" />
                  <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded animate-pulse" />
                </div>
                <span className="text-[10px] text-gray-500">USB 3.2 (10 Gbps)</span>
              </div>
              <DeviceBlock icon={<Smartphone size={24} />} label="Phone" sublabel="Extension" color="purple" />
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded animate-pulse" />
                  <Radio size={14} className="text-pink-400" />
                </div>
                <span className="text-[10px] text-gray-500">5G Modem</span>
              </div>
              <DeviceBlock icon={<Zap size={24} />} label="Internet" sublabel="Carrier" color="yellow" />
            </div>
            <div className="mt-6 grid grid-cols-4 gap-2 text-center">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-2">
                <p className="text-[10px] text-cyan-300">Display Stream</p>
                <p className="text-xs text-gray-400">→ Phone screen</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2">
                <p className="text-[10px] text-purple-300">Compute Tasks</p>
                <p className="text-xs text-gray-400">← Phone CPU/GPU</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2">
                <p className="text-[10px] text-green-300">Network Traffic</p>
                <p className="text-xs text-gray-400">↔ Phone modem</p>
              </div>
              <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-2">
                <p className="text-[10px] text-pink-300">Video Encode</p>
                <p className="text-xs text-gray-400">← Phone NPU</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Touch Input */}
      {tab === 'touch' && (
        <div className="space-y-6">
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-600/20 rounded-xl flex items-center justify-center">
                <Hand size={20} className="text-orange-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Touch Input (Tablet Mode)</h2>
                <p className="text-sm text-gray-400">Tablet becomes mouse, touchpad, or drawing surface</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                When a tablet is connected via USB, it can serve as a high-precision touch input device for your PC.
                The tablet's touchscreen becomes a mouse pad, drawing tablet, or even a secondary touch display
                with multi-touch gestures.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Hand size={14} className="text-orange-400" />
                    Touchpad Mode
                  </h4>
                  <p className="text-xs text-gray-400 mb-2">
                    Large tablet screen = giant precision touchpad. Perfect for laptops or when you want more space.
                  </p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Multi-touch gestures</li>
                    <li>• Palm rejection</li>
                    <li>• Pressure sensitivity</li>
                    <li>• Customizable zones</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Gamepad2 size={14} className="text-orange-400" />
                    Drawing Tablet
                  </h4>
                  <p className="text-xs text-gray-400 mb-2">
                    Use stylus with tablet for digital art, photo editing, or annotation.
                  </p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• 4096+ pressure levels</li>
                    <li>• Low latency (&lt;10ms)</li>
                    <li>• Tilt support</li>
                    <li>• Works with Photoshop, etc</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Monitor size={14} className="text-orange-400" />
                    Touch Display
                  </h4>
                  <p className="text-xs text-gray-400 mb-2">
                    Tablet shows PC content AND accepts touch input. Interactive second screen.
                  </p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Touch the display to control</li>
                    <li>• Pinch/zoom/rotate</li>
                    <li>• Swipe between apps</li>
                    <li>• Perfect for presentations</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Implementation</h4>
                <div className="font-mono text-xs space-y-2">
                  <p className="text-gray-500"># Tablet sends touch events to PC via USB HID</p>
                  <p className="text-orange-300">Tablet: Capture touch → Package as HID report</p>
                  <p className="text-orange-300">→ Send over USB interrupt transfer</p>
                  <p className="text-cyan-300">PC: Receive HID → Translate to mouse/touch events</p>
                  <p className="text-cyan-300">→ Inject into OS input stack</p>
                  <p className="text-gray-500 mt-3"># Or use existing tools:</p>
                  <p className="text-green-300">• VirtualTablet (Android app + PC client)</p>
                  <p className="text-green-300">• SuperDisplay (USB + touch, commercial)</p>
                  <p className="text-green-300">• Wacom drivers (if tablet supports pen)</p>
                  <p className="text-green-300">• Custom HID gadget over ADB</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-orange-300 mb-2">Advantages Over Mouse</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>✓ Larger surface area = more precision</li>
                    <li>✓ Multi-touch gestures (pinch, rotate)</li>
                    <li>✓ Pressure sensitivity for art</li>
                    <li>✓ Can be mounted or positioned freely</li>
                    <li>✓ No batteries (powered by USB)</li>
                  </ul>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-orange-300 mb-2">Use Cases</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>🎨 Digital art & photo editing</li>
                    <li>📊 Data visualization (touch to explore)</li>
                    <li>🎮 Gaming (touch controls)</li>
                    <li>📺 Presentations (touch to navigate)</li>
                    <li>🎬 Video editing (touch timeline)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <p className="text-sm text-orange-300">
                  <strong>Pro tip:</strong> Since the tablet is already connected for display extension and network bridging,
                  adding touch input is just another data stream over the same USB cable. The tablet becomes a true
                  interactive peripheral — you see the PC's display on the tablet AND control it by touching the screen.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display Extension */}
      {tab === 'display' && (
        <div className="space-y-6">
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-600/20 rounded-xl flex items-center justify-center">
                <Monitor size={20} className="text-cyan-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Display Extension</h2>
                <p className="text-sm text-gray-400">Use phone/tablet as a second (or third) monitor</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Since the USB connection is already active for network bridging, we can multiplex display data
                over the same cable. The phone's screen becomes an extended desktop — drag windows to it,
                use it for reference, chat, monitoring, whatever you need.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <RefreshCw size={14} className="text-cyan-400" />
                    High Refresh Rate
                  </h4>
                  <p className="text-xs text-gray-400 mb-2">
                    Modern phones have 90Hz, 120Hz, even 144Hz displays. Perfect for:
                  </p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Video preview (smooth playback)</li>
                    <li>• Scrolling through timelines</li>
                    <li>• Reference monitor for color work</li>
                    <li>• Chat/Discord while gaming on main</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Gauge size={14} className="text-cyan-400" />
                    Low Latency
                  </h4>
                  <p className="text-xs text-gray-400 mb-2">
                    USB 3.2 has 10 Gbps bandwidth. Display compression:
                  </p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• &lt;5ms latency (imperceptible)</li>
                    <li>• Hardware encoding on phone</li>
                    <li>• Adaptive bitrate based on content</li>
                    <li>• No WiFi compression artifacts</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Implementation</h4>
                <div className="font-mono text-xs space-y-2">
                  <p className="text-gray-500"># Using USB display protocol (like UVC or custom)</p>
                  <p className="text-cyan-300">PC: Encode framebuffer → H.265 hardware encode</p>
                  <p className="text-cyan-300">→ Send over USB bulk transfer</p>
                  <p className="text-purple-300">Phone: Receive → Hardware decode → Display</p>
                  <p className="text-gray-500 mt-3"># Or use existing tools:</p>
                  <p className="text-green-300">• Spacedesk (WiFi, but can tunnel over USB)</p>
                  <p className="text-green-300">• Duet Display (USB native, commercial)</p>
                  <p className="text-green-300">• scrcpy (reverse — phone screen on PC)</p>
                  <p className="text-green-300">• Custom VNC over ADB tunnel</p>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-sm text-cyan-300">
                  <strong>Pro tip:</strong> Since you already have the stealth network bridge running,
                  you can tunnel display data through the same USB connection. No extra cables, no WiFi.
                  The phone's display becomes a native extension of your PC desktop.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compute Resources */}
      {tab === 'compute' && (
        <div className="space-y-6">
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center">
                <Cpu size={20} className="text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Resource Pool</h2>
                <p className="text-sm text-gray-400">Phone's RAM, storage, and processor as PC extension</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Modern phones have powerful hardware: 8-16GB RAM, fast UFS storage, multi-core CPUs,
                dedicated GPUs, and neural processing units (NPUs). We can expose these as network-mounted
                resources that the PC can use.
              </p>

              <div className="grid md:grid-cols-3 gap-3">
                <ResourceCard
                  icon={<MemoryStick size={20} />}
                  title="RAM Extension"
                  value="8-16 GB"
                  description="Phone's LPDDR5 as swap/paging file"
                  useCase="Large datasets, VMs, video editing"
                  color="purple"
                />
                <ResourceCard
                  icon={<HardDrive size={20} />}
                  title="Storage Pool"
                  value="128-512 GB"
                  description="UFS 3.1/4.0 as scratch disk"
                  useCase="Temp files, cache, large projects"
                  color="cyan"
                />
                <ResourceCard
                  icon={<Cpu size={20} />}
                  title="Compute Offload"
                  value="8 cores + GPU"
                  description="Phone's CPU/GPU for parallel tasks"
                  useCase="Encoding, AI inference, rendering"
                  color="pink"
                />
              </div>

              <div className="bg-gray-900 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-white mb-3">How It Works</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600/20 rounded flex items-center justify-center text-xs font-bold text-purple-400 flex-shrink-0">1</div>
                    <div>
                      <p className="text-sm text-white font-medium">Memory Pool (iSCSI/NBD)</p>
                      <p className="text-xs text-gray-400">Phone exposes RAM as network block device. PC mounts it as swap or temp storage. Useful for large datasets that don't fit in PC RAM.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600/20 rounded flex items-center justify-center text-xs font-bold text-purple-400 flex-shrink-0">2</div>
                    <div>
                      <p className="text-sm text-white font-medium">Storage Pool (SMB/NFS)</p>
                      <p className="text-xs text-gray-400">Phone's flash storage shared as network drive. UFS 4.0 is faster than SATA SSD. Perfect for scratch disk, cache, temp files.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600/20 rounded flex items-center justify-center text-xs font-bold text-purple-400 flex-shrink-0">3</div>
                    <div>
                      <p className="text-sm text-white font-medium">Compute Offload (RPC/gRPC)</p>
                      <p className="text-xs text-gray-400">PC sends tasks to phone via RPC. Phone's CPU/GPU processes them, returns results. Great for parallel workloads like video encoding.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <p className="text-sm text-purple-300">
                  <strong>Real-world example:</strong> You're editing 4K video on PC. PC sends raw frames
                  to phone via USB. Phone's GPU (Adreno/Mali) encodes them with hardware H.265. Phone sends
                  encoded video back. PC's CPU stays cool, phone's dedicated video encoder does the work.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Pipeline */}
      {tab === 'pipeline' && (
        <div className="space-y-6">
          <div className="bg-pink-500/5 border border-pink-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pink-600/20 rounded-xl flex items-center justify-center">
                <Film size={20} className="text-pink-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Video Pipeline</h2>
                <p className="text-sm text-gray-400">Phone's GPU/NPU handles encoding, rendering, AI tasks</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Modern phones have dedicated media engines and neural processing units that rival desktop GPUs
                for specific tasks. We can offload video encoding, AI inference, and rendering to the phone,
                freeing up PC resources.
              </p>

              <div className="bg-gray-900 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Video Encoding Pipeline</h4>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <PipelineStep icon={<Monitor size={16} />} label="PC: Raw frames" color="cyan" />
                  <ArrowRight size={14} className="text-gray-600" />
                  <PipelineStep icon={<Cable size={16} />} label="USB transfer" color="gray" />
                  <ArrowRight size={14} className="text-gray-600" />
                  <PipelineStep icon={<Cpu size={16} />} label="Phone: GPU encode" color="purple" />
                  <ArrowRight size={14} className="text-gray-600" />
                  <PipelineStep icon={<Film size={16} />} label="H.265 output" color="pink" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Phone Hardware</p>
                    <p className="text-sm text-white font-medium">Adreno 740 / Mali-G715</p>
                    <p className="text-xs text-gray-500">Dedicated video encoder</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Performance</p>
                    <p className="text-sm text-white font-medium">4K60 H.265 real-time</p>
                    <p className="text-xs text-gray-500">Lower power than PC GPU</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-white mb-3">AI Inference Pipeline</h4>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <PipelineStep icon={<Monitor size={16} />} label="PC: Input data" color="cyan" />
                  <ArrowRight size={14} className="text-gray-600" />
                  <PipelineStep icon={<Cable size={16} />} label="USB transfer" color="gray" />
                  <ArrowRight size={14} className="text-gray-600" />
                  <PipelineStep icon={<Zap size={16} />} label="Phone: NPU" color="yellow" />
                  <ArrowRight size={14} className="text-gray-600" />
                  <PipelineStep icon={<Server size={16} />} label="Results" color="green" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Phone Hardware</p>
                    <p className="text-sm text-white font-medium">Hexagon / Ethos NPU</p>
                    <p className="text-xs text-gray-500">15-45 TOPS AI performance</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Use Cases</p>
                    <p className="text-sm text-white font-medium">Image gen, upscaling, OCR</p>
                    <p className="text-xs text-gray-500">Runs quantized models efficiently</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Gamepad2 size={14} className="text-pink-400" />
                    Gaming Use Case
                  </h4>
                  <p className="text-xs text-gray-400 mb-2">Stream game from PC to phone display, use phone's GPU for physics calculations, send input back.</p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Phone as wireless controller + display</li>
                    <li>• Offload physics to phone's CPU</li>
                    <li>• Lower latency than cloud gaming</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Film size={14} className="text-pink-400" />
                    Video Production
                  </h4>
                  <p className="text-xs text-gray-400 mb-2">Edit on PC, phone handles color grading LUTs and final render encoding.</p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Real-time LUT preview on phone</li>
                    <li>• Hardware encode for final export</li>
                    <li>• Phone's display as reference monitor</li>
                  </ul>
                </div>
              </div>

              <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                <p className="text-sm text-pink-300">
                  <strong>The key insight:</strong> Phone hardware is optimized for media tasks. The GPU has
                  dedicated video encoders, the NPU is designed for AI, and the whole system is power-efficient.
                  By offloading these tasks, your PC stays cool and responsive while the phone handles the
                  heavy lifting — all over the same USB cable that's already providing internet.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function IntegrationLayer({ number, title, description, icon, color }: {
  number: number; title: string; description: string; icon: React.ReactNode; color: string
}) {
  const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
    pink: { bg: 'bg-pink-500/5', border: 'border-pink-500/30', text: 'text-pink-300', iconBg: 'bg-pink-600/20 text-pink-400' },
    purple: { bg: 'bg-purple-500/5', border: 'border-purple-500/30', text: 'text-purple-300', iconBg: 'bg-purple-600/20 text-purple-400' },
    cyan: { bg: 'bg-cyan-500/5', border: 'border-cyan-500/30', text: 'text-cyan-300', iconBg: 'bg-cyan-600/20 text-cyan-400' },
    green: { bg: 'bg-green-500/5', border: 'border-green-500/30', text: 'text-green-300', iconBg: 'bg-green-600/20 text-green-400' },
    orange: { bg: 'bg-orange-500/5', border: 'border-orange-500/30', text: 'text-orange-300', iconBg: 'bg-orange-600/20 text-orange-400' }
  }
  const c = colorMap[color] || colorMap.green

  return (
    <div className={`${c.bg} border-2 ${c.border} rounded-xl p-4 relative`}>
      <div className="absolute -top-3 left-4 bg-gray-900 px-3 py-0.5 rounded-full text-xs font-bold text-white border ${c.border}">
        LAYER {number}
      </div>
      <div className="flex items-center gap-3 mt-1">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.iconBg}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold ${c.text}`}>{title}</h3>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  )
}

function DeviceBlock({ icon, label, sublabel, color }: {
  icon: React.ReactNode; label: string; sublabel: string; color: string
}) {
  const colorMap: Record<string, string> = {
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
    yellow: 'text-yellow-400'
  }
  return (
    <div className="bg-gray-800 rounded-xl px-4 py-3 text-center">
      <div className={colorMap[color] || 'text-gray-300'}>{icon}</div>
      <p className="text-sm text-white font-medium mt-1">{label}</p>
      <p className="text-[10px] text-gray-500">{sublabel}</p>
    </div>
  )
}

function ResourceCard({ icon, title, value, description, useCase, color }: {
  icon: React.ReactNode; title: string; value: string; description: string; useCase: string; color: string
}) {
  const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
    purple: { bg: 'bg-purple-500/5', border: 'border-purple-500/20', text: 'text-purple-400', iconBg: 'bg-purple-600/20' },
    cyan: { bg: 'bg-cyan-500/5', border: 'border-cyan-500/20', text: 'text-cyan-400', iconBg: 'bg-cyan-600/20' },
    pink: { bg: 'bg-pink-500/5', border: 'border-pink-500/20', text: 'text-pink-400', iconBg: 'bg-pink-600/20' }
  }
  const c = colorMap[color] || colorMap.purple

  return (
    <div className={`${c.bg} border ${c.border} rounded-xl p-4`}>
      <div className={`${c.iconBg} w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${c.text}`}>
        {icon}
      </div>
      <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
      <p className={`text-lg font-bold ${c.text} mb-2`}>{value}</p>
      <p className="text-xs text-gray-400 mb-2">{description}</p>
      <p className="text-[10px] text-gray-500">Use: {useCase}</p>
    </div>
  )
}

function PipelineStep({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  const colorMap: Record<string, string> = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
    gray: 'bg-gray-800 border-gray-700 text-gray-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
    pink: 'bg-pink-500/10 border-pink-500/20 text-pink-300',
    yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
    green: 'bg-green-500/10 border-green-500/20 text-green-300'
  }
  return (
    <div className={`${colorMap[color] || colorMap.gray} border rounded-lg px-3 py-2 flex items-center gap-2`}>
      {icon}
      <span className="text-xs">{label}</span>
    </div>
  )
}
