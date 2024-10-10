const Welcome = () => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
        <img className="w-16 h-16 rounded-full" src="https://via.placeholder.com/150" alt="profile" />
        <div className="ml-4 flex-grow">
          <h2 className="text-lg font-bold">Welcome, Ibshaam Arslan</h2>
          <p>Thursday, October 10, 2024</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md ml-4">
          <h2 className="text-lg font-bold">My Total Points</h2>
          <div className="text-center">
            <p className="text-3xl font-bold">291</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Welcome;
  