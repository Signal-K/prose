export default function AppPage() {
    return (
      <div className="relative min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-6 bg-green-300 inline-block p-4 border-4 border-black">
          Welcome to Your Product Journey
        </h1>
        
        <div className="bg-white border-4 border-black p-6 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <p className="mb-4">
            Select a stage from the left sidebar to begin working on your product. 
            Each stage provides specialized AI assistance to help you make informed decisions 
            and move your project forward.
          </p>
          
          <div className="bg-yellow-200 border-4 border-black p-4 mb-6">
            <h3 className="font-bold mb-2">Pro Tip</h3>
            <p>
              Use the chat panel on the right to ask specific questions about your current stage. 
              The AI will provide contextual guidance based on where you are in the development process.
            </p>
          </div>
  
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-200 border-4 border-black p-4">
              <h3 className="font-bold mb-2">Current Stage</h3>
              <p>Ideation Phase</p>
            </div>
            
            <div className="bg-green-200 border-4 border-black p-4">
              <h3 className="font-bold mb-2">Next Steps</h3>
              <p>Define your product vision and core features</p>
            </div>
          </div>
        </div>
      </div>
    );
}