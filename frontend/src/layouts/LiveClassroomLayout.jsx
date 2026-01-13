const LiveClassroomLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-black flex flex-col">
      {/* Main content */}
      <div className="flex-1 overflow-hidden">{children}</div>

      {/* Bottom status bar */}
      <div className="h-10 bg-[#0b132b] text-gray-300 text-sm px-4 flex items-center">
        Live • Connected
      </div>
    </div>
  );
};

export default LiveClassroomLayout;
