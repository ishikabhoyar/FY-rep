
import { ApplicationForm } from "@/components/application-form";
import { Squares } from "@/components/ui/squares-background";

export default function ApplyPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#060606]">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        <Squares 
          direction="diagonal" 
          speed={0.5} 
          borderColor="rgba(255,255,255,0.1)" 
          squareSize={50}
          hoverFillColor="rgba(255,255,255,0.05)"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Side - Minimal Info */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-6">
              <div>
                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 mb-6">
                  Applications Open
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  Join<br />
                  <span className="text-transparent bg-gradient-to-r from-white to-white/60 bg-clip-text">
                    DataZen
                  </span>
                </h1>
                <p className="text-lg text-white/60 leading-relaxed max-w-md">
                  Become part of the official Data Science Council and shape the future of innovation.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <span className="text-sm">Data Science Excellence</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <span className="text-sm">AI & Machine Learning</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <span className="text-sm">Vibrant Community</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Application Form */}
          <div className="order-1 lg:order-2">
            <ApplicationForm />
          </div>
          
        </div>
      </div>
    </main>
  );
}
