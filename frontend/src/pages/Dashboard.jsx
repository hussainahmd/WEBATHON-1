import Sidebar from '../components/sidebar';
import Welcome from '../components/Welcome';
import CourseProgress from '../components/CourseProgress';
import Calendar from '../components/Calendar';
import RecentWorksheets from '../components/RecentWorksheets';
import Tasks from '../components/Task';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-2">
            <Welcome />
            <div className="mt-4"> {/* Add margin top here */}
              <CourseProgress />
            </div>
          </div>
          <div className="col-span-2">
            <Calendar />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentWorksheets />
        </div>
		<Tasks />
      </div>
    </div>
  );
};

export default Dashboard;
