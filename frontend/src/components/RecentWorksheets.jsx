const RecentWorksheets = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold mb-4">Recent Worksheets Submissions</h3>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">No.</th>
            <th className="px-4 py-2">Worksheet Title</th>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Points</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <WorksheetRow number="1" title="Submit the assignment" subject="Hindi" points="10" status="Pending" />
          {/* More rows can be added */}
        </tbody>
      </table>
    </div>
  );
};

const WorksheetRow = ({ number, title, subject, points, status }) => (
  <tr>
    <td className="border px-4 py-2">{number}</td>
    <td className="border px-4 py-2">{title}</td>
    <td className="border px-4 py-2">{subject}</td>
    <td className="border px-4 py-2">{points}</td>
    <td className="border px-4 py-2">{status}</td>
  </tr>
);

export default RecentWorksheets;
