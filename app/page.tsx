import Link from 'next/link';
import { ArrowRight, Sparkles, Rocket, Target, Code, Palette } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="border-b-8 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-6xl font-black mb-6 bg-yellow-300 inline-block p-4 rotate-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            AI-Powered Product Development
          </h1>
          <p className="text-2xl max-w-2xl mb-8 bg-blue-200 p-4 -rotate-1 border-4 border-black">
            Transform your ideas into reality with AI assistance at every stage of your product journey.
          </p>
          <Link 
            href="login" 
            className="inline-flex items-center gap-2 bg-green-400 text-black px-8 py-4 text-xl font-bold 
                     border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                     hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
          >
            Start Building <ArrowRight />
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold mb-12 bg-purple-300 inline-block p-4 border-4 border-black">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: "Ideation",
              description: "Brainstorm and validate your product ideas with AI assistance",
              color: "bg-pink-200"
            },
            {
              icon: Target,
              title: "Market Research",
              description: "Analyze market trends and identify your target audience",
              color: "bg-blue-200"
            },
            {
              icon: Palette,
              title: "Design",
              description: "Get AI-powered design suggestions and feedback",
              color: "bg-yellow-200"
            },
            {
              icon: Code,
              title: "Development",
              description: "Technical guidance and best practices for building your product",
              color: "bg-green-200"
            },
            {
              icon: Rocket,
              title: "Launch",
              description: "Strategic advice for successful product launch and marketing",
              color: "bg-orange-200"
            }
          ].map((feature, i) => (
            <div 
              key={i} 
              className={`${feature.color} p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                         hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all`}
            >
              <feature.icon className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}