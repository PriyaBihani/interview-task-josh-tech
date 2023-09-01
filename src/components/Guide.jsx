const Guide = () => {
  return (
    <div className="flex flex-col items-start m-2">
      <div className="flex justify-center items-center w-full">
        <div className="flex items-center mr-4">
          <div className="w-6 h-6 rounded-full bg-green-500 mr-2"></div>
          <p className="text-sm font-medium">Marked Answer</p>
        </div>
        <div className="flex items-center mr-4">
          <div className="w-6 h-6 rounded-full bg-red-500 mr-2"></div>
          <p className="text-sm font-medium">Visited but Not Marked Answer</p>
        </div>
        <div className="flex items-center mr-4">
          <div className="w-6 h-6 rounded-full bg-gray-400 mr-2"></div>
          <p className="text-sm font-medium">Not Visited</p>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-blue-500 mr-2"></div>
          <p className="text-sm font-medium">Current Question</p>
        </div>
      </div>
    </div>
  );
};

export default Guide;
