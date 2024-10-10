import { useState } from 'react';

const Calendar = () => {
  // Store tasks with dates as keys
  const [tasks, setTasks] = useState({
    '2024-10-06': ['*'],
    '2024-10-15': ['*'],
    '2024-10-22': ['*'],
  });

  const today = new Date(); // Get current date
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // State for month
  const [currentYear, setCurrentYear] = useState(today.getFullYear()); // State for year

  // Get the number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get the first day of the current month (to calculate empty days before the first date)
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // Create an array of dates to display in the calendar
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Handle previous/next month functionality
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(currentYear - 1);
        return 11; // December of the previous year
      }
      return prev - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(currentYear + 1);
        return 0; // January of the next year
      }
      return prev + 1;
    });
  };

  // Function to format date into "YYYY-MM-DD"
  const formatDate = (day) => {
    const month = (currentMonth + 1).toString().padStart(2, '0');
    const dayFormatted = day.toString().padStart(2, '0');
    return `${currentYear}-${month}-${dayFormatted}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <button onClick={goToPreviousMonth} className="bg-gray-200 p-2 rounded">Previous</button>
        <h3 className="font-bold text-lg">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </h3>
        <button onClick={goToNextMonth} className="bg-gray-200 p-2 rounded">Next</button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Display the names of the weekdays */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-bold text-center">{day}</div>
        ))}

        {/* Empty placeholders before the first day of the month */}
        {[...Array(firstDay)].map((_, index) => (
          <div key={index} className="p-4"></div>
        ))}

        {/* Display days */}
        {daysArray.map((day) => {
          const formattedDate = formatDate(day);
          return (
            <div key={day} className="p-4 border rounded-lg relative">
              <div className="text-center font-bold">{day}</div>

              {/* If there are tasks for this day, show them */}
              {tasks[formattedDate] && (
                <div className="mt-2 text-sm bg-yellow-100 p-2 rounded">
                  {tasks[formattedDate].map((task, idx) => (
                    <p key={idx} className="text-xs text-red-500 text-center">{task}</p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
