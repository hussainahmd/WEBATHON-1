import { useState, useEffect } from 'react';
// import axios from 'axios';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    userId: '',
    title: '',
    description: '',
    subject: '',
    priority: '',
    deadline: '',
    status: 'Pending',
  });
  const [editMode, setEditMode] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks/1'); // Replace with actual userId
      setTasks(response.data);
    } catch (error) {
      alert('Error fetching tasks: ' + error.message);
    }
  };

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
      if (editMode) {
        await axios.put(`/api/tasks/${currentTaskId}`, taskData);
        alert('Task updated successfully');
      } else {
        await axios.post('/api/tasks', taskData);
        alert('Task created successfully');
      }
      resetForm();
      fetchTasks();
    } catch (error) {
      alert('Error saving task: ' + error.message);
    }
  };

  const handleEdit = (task) => {
    setTaskData(task);
    setCurrentTaskId(task._id);
    setEditMode(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      alert('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      alert('Error deleting task: ' + error.message);
    }
  };

  const resetForm = () => {
    setTaskData({
      userId: '',
      title: '',
      description: '',
      subject: '',
      priority: '',
      deadline: '',
      status: 'Pending',
    });
    setEditMode(false);
    setCurrentTaskId('');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="font-bold text-xl mb-4">{editMode ? 'Edit Task' : 'Create New Task'}</h2>
        
        {Object.entries(taskData).map(([key, value]) => (
          key !== 'status' ? (
            <div className="mb-4" key={key}>
              <label className="block mb-1" htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              {key === 'priority' ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="border rounded w-full p-2"
                >
                  <option value="">Select priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              ) : (
                <input
                  type={key === 'deadline' ? 'date' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="border rounded w-full p-2"
                />
              )}
            </div>
          ) : null
        ))}

        <button type="submit" className="bg-blue-500 text-white rounded p-2">
          {editMode ? 'Update Task' : 'Create Task'}
        </button>
        <button type="button" onClick={resetForm} className="ml-2 bg-gray-300 text-black rounded p-2">Reset</button>
      </form>

      <h2 className="font-bold text-xl mb-4">Task List</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {tasks.map((task) => (
          <div key={task._id} className="border-b mb-4 pb-4">
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Subject:</strong> {task.subject}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(task)} className="bg-yellow-500 text-white rounded p-2">Edit</button>
              <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white rounded p-2">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
