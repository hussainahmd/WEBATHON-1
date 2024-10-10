import { useEffect, useState } from 'react';
// import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditTaskForm = () => {
  const { taskId } = useParams(); // Get taskId from the URL
  const history = useHistory();
  
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    subject: '',
    priority: '',
    deadline: '',
    status: 'Pending',
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/${taskId}`);
        setTaskData(response.data);
      } catch (error) {
        alert('Error fetching task: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/tasks/${taskId}`, taskData);
      alert(response.data.message);
      history.push('/tasks'); // Redirect to the tasks list after editing
    } catch (error) {
      alert('Error updating task: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="font-bold text-xl mb-4">Edit Task</h2>

      <div className="mb-4">
        <label className="block mb-1" htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1" htmlFor="description">Description</label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1" htmlFor="subject">Subject</label>
        <input
          type="text"
          name="subject"
          value={taskData.subject}
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1" htmlFor="priority">Priority</label>
        <select
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        >
          <option value="">Select priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1" htmlFor="deadline">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={taskData.deadline}
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white rounded p-2">Update Task</button>
    </form>
  );
};

export default EditTaskForm;
