
const Sidebar = () => {
  return (
    <div className="w-64 bg-white p-4 shadow-md">
      <h1 className="text-lg font-bold text-center mb-6">STUDY APP</h1>
      <nav>
        <ul>
          <li className="mb-4"><a href="#" className="flex items-center p-2 bg-blue-500 text-white rounded">Dashboard</a></li>
          <li className="mb-4"><a href="#" className="flex items-center p-2">My Calendar</a></li>
          <li className="mb-4"><a href="#" className="flex items-center p-2">Worksheets</a></li>
          <li className="mb-4"><a href="#" className="flex items-center p-2">My Progress</a></li>
          <li className="mb-4"><a href="#" className="flex items-center p-2">Discussion</a></li>
          <li className="mb-4"><a href="#" className="flex items-center p-2">Help</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
