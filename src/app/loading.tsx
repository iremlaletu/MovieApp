const loading = () => {
  return (
    <div className="flex flex-row gap-3 justify-center items-center h-screen">
      <div className="w-6 h-6 rounded-full bg-black animate-bounce [animation-delay:.1s]"></div>
      <div className="w-6 h-6 rounded-full bg-black animate-bounce [animation-delay:.3s]"></div>
      <div className="w-6 h-6 rounded-full bg-black animate-bounce [animation-delay:.1s]"></div>
    </div>
  );
};

export default loading;
