import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="card-body">
        <h2 className="card-title text-xl font-bold text-primary">{project.title}</h2>
        <p className="text-base-content/80">{project.description}</p>
        
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techStack.map((tech, index) => (
              <span key={index} className="badge badge-outline badge-primary">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="card-actions justify-end mt-4">
          <Link 
            to={`/projects/${project._id}`}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    techStack: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard; 