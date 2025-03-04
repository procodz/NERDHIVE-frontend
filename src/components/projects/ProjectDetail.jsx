import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collaborators, setCollaborators] = useState([]);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    assignedTo: '', 
    dueDate: '' 
  });
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/projects/${id}`, {
          withCredentials: true
        });
        setProject(response.data);
        
        // Create a list of collaborators including the owner and project collaborators
        const allCollaborators = [
          response.data.owner,
          ...response.data.collaborators.map(c => c.user)
        ];
        setCollaborators(allCollaborators);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProject();
    }
  }, [id, user]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    
    // Don't send assignedTo if no user is selected
    const taskData = {
      ...newTask,
      assignedTo: newTask.assignedTo || undefined
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/projects/${id}/tasks`,
        taskData,
        { withCredentials: true }
      );
      setProject(response.data);
      setNewTask({ title: '', description: '', assignedTo: '', dueDate: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/projects/${id}/tasks/${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setProject(response.data);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center text-accent/80">Loading...</div>;
  }

  if (!project) {
    return <div className="p-4 text-accent/80">Project not found</div>;
  }

  return (
    <div className="py-8 px-4 min-h-[calc(100vh-10rem)]">
      <div className="mb-6">
        <h1 className="text-5xl font-bold mb-2 text-gradient">{project.title}</h1>
        <p className="text-base-content/80 mb-4">{project.description}</p>
        <div className="flex space-x-4 mb-4">
          <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
            Status: {project.status}
          </span>
          <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full">
            Visibility: {project.visibility}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gradient">Tasks</h2>
        <form onSubmit={handleAddTask} className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="border border-accent/50 rounded-lg px-3 py-2 bg-base-200 text-base placeholder:text-neutral focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="border border-accent/50 rounded-lg px-3 py-2 bg-base-200 text-base placeholder:text-neutral focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <select
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className="border border-accent/50 rounded-lg px-3 py-2 bg-base-200 text-base focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="" className="text-neutral">Assign to...</option>
              {collaborators.map((collaborator) => (
                <option key={collaborator._id} value={collaborator._id} className="text-base">
                  {collaborator.firstName} {collaborator.lastName}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="border border-accent/50 rounded-lg px-3 py-2 bg-base-200 text-base focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-focus transition-all"
            >
              Add Task
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {project.tasks.map((task) => (
            <div key={task._id} className="border border-accent/50 rounded-lg p-4 bg-base-200 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-base-content/90">{task.title}</h3>
                  <p className="text-base-content/70">{task.description}</p>
                  {task.assignedTo && (
                    <p className="text-sm text-base-content/70">
                      Assigned to: {task.assignedTo.firstName} {task.assignedTo.lastName}
                    </p>
                  )}
                  {task.dueDate && (
                    <p className="text-sm text-base-content/70">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <select
                  value={task.status}
                  onChange={(e) => handleTaskStatusChange(task._id, e.target.value)}
                  className="border border-accent/50 rounded-lg px-2 py-1 bg-base-200 text-base focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="pending" className="text-base">Pending</option>
                  <option value="in-progress" className="text-base">In Progress</option>
                  <option value="completed" className="text-base">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;