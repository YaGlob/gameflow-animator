// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Main background image */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{ 
          backgroundImage: "url('/images/game-background.png')", 
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
          <p className="text-xl text-gray-600">Start building your amazing project here!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
