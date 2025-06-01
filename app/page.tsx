"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import {
  Users,
  Target,
  PresentationIcon as PresentationChart,
  Database,
} from "lucide-react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function FloatingElements() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      group.current.position.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
      group.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-2, 1, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#0c7ff2"
            emissive="#0c7ff2"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[2, -1, -1]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial
            color="#223649"
            emissive="#223649"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0, 2, -2]}>
          <octahedronGeometry args={[0.25]} />
          <meshStandardMaterial
            color="#314d68"
            emissive="#314d68"
            emissiveIntensity={0.15}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#0c7ff2" />
          <FloatingElements />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#101a23] text-white font-['Spline_Sans','Noto_Sans',sans-serif] overflow-x-hidden">
      <Scene3D />

      <SiteHeader />
      {/* Header */}
      {/* <header className="relative z-10 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#223649] px-10 py-3">
        <div className="flex items-center gap-4 text-white">
          <div className="size-4">
            <Database className="w-4 h-4" />
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">LeadNest</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link
              className="text-white text-sm font-medium leading-normal hover:text-[#0c7ff2] transition-colors"
              href="/features"
            >
              Features
            </Link>
            <Link
              className="text-white text-sm font-medium leading-normal hover:text-[#0c7ff2] transition-colors"
              href="/pricing"
            >
              Pricing
            </Link>
            <Link
              className="text-white text-sm font-medium leading-normal hover:text-[#0c7ff2] transition-colors"
              href="/documentation"
            >
              Resources
            </Link>
            <Link
              className="text-white text-sm font-medium leading-normal hover:text-[#0c7ff2] transition-colors"
              href="/contact"
            >
              Contact
            </Link>
          </div>
          <div className="flex gap-2">
            <Link href="/auth/signup">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0a6fd1] transition-colors">
                <span className="truncate">Get started</span>
              </button>
            </Link>
            <Link href="/contact">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#223649] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#2a4158] transition-colors">
                <span className="truncate">Contact sales</span>
              </button>
            </Link>
          </div>
        </div>
      </header> */}

      <div className="relative z-10 px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col max-w-[960px] flex-1">
          {/* Hero Section */}
        
          <div className="@container">     
            <div className="@[480px]:p-4">
              <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10 relative overflow-hidden">
                  <video
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            autoPlay
            loop
            muted
            playsInline
            src="/market.mp4"
          ></video>
                <div className="flex flex-col gap-2 text-left relative z-10">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Revolutionize Your Contact Marketing with AI
                  </h1>
                  <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    LeadNest is your all-in-one solution for creating
                    personalized, engaging contact marketing campaigns that
                    drive results. Powered by cutting-edge AI, our assistant
                    helps you craft compelling content, optimize your
                    strategies, and maximize your impact.
                  </h2>
                </div>
                <Link href="/auth/signup">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-[#0a6fd1] transition-colors relative z-10">
                    <span className="truncate">Get started</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="flex flex-col gap-10 px-4 py-10 @container">
            <div className="flex flex-col gap-4">
              <h1 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                Key Features
              </h1>
              <p className="text-white text-base font-normal leading-normal max-w-[720px]">
                LeadNest offers a suite of powerful features designed to
                streamline your contact marketing efforts and boost your ROI.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
              <div className="flex flex-col gap-3 pb-3 group hover:transform hover:scale-105 transition-transform duration-300">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{
                    backgroundImage: `url("/placeholder.svg?height=200&width=300")`,
                  }}
                ></div>
                <div>
                  <p className="text-white text-base font-medium leading-normal">
                    AI-Powered Content Creation
                  </p>
                  <p className="text-[#90adcb] text-sm font-normal leading-normal">
                    Generate high-converting email copy, social media posts, and
                    more with our advanced AI writing assistant. Customize your
                    content to resonate with your target audience and achieve
                    your marketing goals.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3 group hover:transform hover:scale-105 transition-transform duration-300">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{
                    backgroundImage: `url("/placeholder.svg?height=200&width=300")`,
                  }}
                ></div>
                <div>
                  <p className="text-white text-base font-medium leading-normal">
                    Intelligent Campaign Optimization
                  </p>
                  <p className="text-[#90adcb] text-sm font-normal leading-normal">
                    Leverage AI-driven insights to optimize your campaigns for
                    maximum engagement and conversion rates. Our assistant
                    analyzes performance data and provides actionable
                    recommendations for continuous improvement.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3 group hover:transform hover:scale-105 transition-transform duration-300">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{
                    backgroundImage: `url("/placeholder.svg?height=200&width=300")`,
                  }}
                ></div>
                <div>
                  <p className="text-white text-base font-medium leading-normal">
                    Automated Scheduling & Delivery
                  </p>
                  <p className="text-[#90adcb] text-sm font-normal leading-normal">
                    Automate your contact marketing workflow with intelligent
                    scheduling and delivery. Ensure your messages reach the
                    right people at the right time, without manual intervention.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="flex flex-col gap-10 px-4 py-10 @container">
            <div className="flex flex-col gap-4">
              <h1 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                Benefits
              </h1>
              <p className="text-white text-base font-normal leading-normal max-w-[720px]">
                Experience the transformative power of LeadNest and unlock a new
                level of contact marketing success.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
              <div className="flex flex-1 gap-3 rounded-lg border border-[#314d68] bg-[#182634] p-4 flex-col hover:border-[#0c7ff2] hover:bg-[#1a2a3a] transition-all duration-300 group">
                <div className="text-white group-hover:text-[#0c7ff2] transition-colors">
                  <Users size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Increased Engagement
                  </h2>
                  <p className="text-[#90adcb] text-sm font-normal leading-normal">
                    Craft personalized, relevant content that resonates with
                    your audience and drives meaningful interactions.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#314d68] bg-[#182634] p-4 flex-col hover:border-[#0c7ff2] hover:bg-[#1a2a3a] transition-all duration-300 group">
                <div className="text-white group-hover:text-[#0c7ff2] transition-colors">
                  <Target size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Improved Targeting
                  </h2>
                  <p className="text-[#90adcb] text-sm font-normal leading-normal">
                    Identify and segment your ideal customers with precision,
                    ensuring your messages reach the most receptive recipients.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#314d68] bg-[#182634] p-4 flex-col hover:border-[#0c7ff2] hover:bg-[#1a2a3a] transition-all duration-300 group">
                <div className="text-white group-hover:text-[#0c7ff2] transition-colors">
                  <PresentationChart size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">
                    Higher Conversion Rates
                  </h2>
                  <p className="text-[#90adcb] text-sm font-normal leading-normal">
                    Optimize your campaigns for maximum impact and achieve
                    higher conversion rates, leading to increased revenue and
                    growth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="@container">
            <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto">
                  Ready to Transform Your Contact Marketing?
                </h1>
                <p className="text-white text-base font-normal leading-normal max-w-[720px] mx-auto">
                  Join thousands of businesses already leveraging the power of
                  LeadNest to achieve their marketing goals.
                </p>
              </div>
              <div className="flex flex-1 justify-center">
                <div className="flex justify-center">
                  <Link href="/auth/signup">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] grow hover:bg-[#0a6fd1] transition-colors">
                      <span className="truncate">Get started</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter />
      {/* <footer className="relative z-10 flex justify-center">
        <div className="flex max-w-[960px] flex-1 flex-col">
          <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
            <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
              <Link
                className="text-[#90adcb] text-base font-normal leading-normal min-w-40 hover:text-white transition-colors"
                href="/features"
              >
                Features
              </Link>
              <Link
                className="text-[#90adcb] text-base font-normal leading-normal min-w-40 hover:text-white transition-colors"
                href="/pricing"
              >
                Pricing
              </Link>
              <Link
                className="text-[#90adcb] text-base font-normal leading-normal min-w-40 hover:text-white transition-colors"
                href="/documentation"
              >
                Resources
              </Link>
              <Link
                className="text-[#90adcb] text-base font-normal leading-normal min-w-40 hover:text-white transition-colors"
                href="/contact"
              >
                Contact Us
              </Link>
              <Link
                className="text-[#90adcb] text-base font-normal leading-normal min-w-40 hover:text-white transition-colors"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="text-[#90adcb] hover:text-[#0c7ff2] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                </svg>
              </a>
              <a href="#" className="text-[#90adcb] hover:text-[#0c7ff2] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                </svg>
              </a>
              <a href="#" className="text-[#90adcb] hover:text-[#0c7ff2] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                </svg>
              </a>
            </div>
            <p className="text-[#90adcb] text-base font-normal leading-normal">© 2024 LeadNest. All rights reserved.</p>
          </footer>
        </div>
      </footer> */}
    </div>
  );
}
