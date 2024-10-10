const CourseProgress = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-2 gap-4">
        <div className="text-center">
          <h3 className="font-bold text-xl">Overall Progress</h3>
          <div className="mt-4 flex justify-center"> {/* Use flex to center the graph */}
            <CircularProgress percentage={81} />
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-2">Subject-wise Progress</h3>
          <Progress subject="Web Dev." progress="76%" />
          <Progress subject="Machine Learning" progress="90%" />
          <Progress subject="Differential Equations" progress="83%" />
          <Progress subject="Professional Practices" progress="70%" />
          <Progress subject="Parallel & Distributed Comp." progress="46%" />
        </div>
      </div>
    );
  };
  
  const Progress = ({ subject, progress }) => (
    <div className="mb-2">
      <p className="font-bold">{subject}</p>
      <div className="bg-gray-200 h-2 rounded-full">
        <div className="bg-[#4caf50] h-2 rounded-full" style={{ width: progress }}></div>
      </div>
    </div>
  );
  
  const CircularProgress = ({ percentage }) => {
    const radius = 85; // Radius of the circle
    const strokeWidth = 20; // Width of the stroke
    const normalizedRadius = radius - strokeWidth * 0.5;
    const circumference = normalizedRadius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;
  
    return (
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#4caf50"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease 0s' }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xl font-bold fill-current text-gray-800"
        >
          {percentage}%
        </text>
      </svg>
    );
  };
  
  export default CourseProgress;
  