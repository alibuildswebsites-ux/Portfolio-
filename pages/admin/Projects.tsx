import React, { useEffect, useState } from 'react';
import PixelButton from '../../components/ui/PixelButton';
import { Plus, Trash2, Edit2, ExternalLink, Eye, EyeOff } from 'lucide-react';
import * as db from '../../services/storage';
import { Project } from '../../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const loadProjects = async () => {
    const data = await db.getProjects();
    setProjects(data);
  };

  useEffect(() => { loadProjects(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject.title || !currentProject.description) return;

    const newProject = {
      ...currentProject,
      technologies: Array.isArray(currentProject.technologies) 
        ? currentProject.technologies 
        : (currentProject.technologies as unknown as string).split(',').map((t: string) => t.trim()),
      // Ensure visibility is boolean
      isVisible: currentProject.isVisible !== false, 
      category: currentProject.category || 'Web Development',
      dateCompleted: currentProject.dateCompleted || new Date().toISOString(),
      thumbnailUrl: currentProject.thumbnailUrl || 'https://picsum.photos/400/300'
    } as Project;

    await db.saveProject(newProject);
    setIsEditing(false);
    setCurrentProject({});
    loadProjects();
  };

  const handleDelete = async () => {
    if (showDeleteModal) {
      await db.deleteProject(showDeleteModal);
      setShowDeleteModal(null);
      loadProjects();
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="font-pixel text-3xl">Manage Projects</h2>
        <PixelButton onClick={() => { setCurrentProject({ isVisible: true }); setIsEditing(true); }} className="w-full sm:w-auto">
          <Plus size={18} className="inline mr-2" /> Add Project
        </PixelButton>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 sm:p-8 border-2 border-pastel-charcoal shadow-pixel max-w-3xl mx-auto">
          <h3 className="font-pixel text-2xl mb-6">{currentProject.id ? 'Edit Project' : 'New Project'}</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="md:col-span-2">
                  <label className="block font-bold mb-1">Title</label>
                  <input 
                     className="w-full border-2 border-gray-300 p-2 focus:border-pastel-blue outline-none" 
                     value={currentProject.title || ''} 
                     onChange={e => setCurrentProject({...currentProject, title: e.target.value})} 
                     required
                  />
               </div>
               <div>
                  <label className="block font-bold mb-1">Visibility</label>
                  <select 
                     className="w-full border-2 border-gray-300 p-2 focus:border-pastel-blue outline-none"
                     value={currentProject.isVisible ? 'visible' : 'hidden'}
                     onChange={e => setCurrentProject({...currentProject, isVisible: e.target.value === 'visible'})}
                  >
                     <option value="visible">Visible</option>
                     <option value="hidden">Hidden</option>
                  </select>
               </div>
            </div>

            <div>
              <label className="block font-bold mb-1">Description</label>
              <textarea 
                 className="w-full border-2 border-gray-300 p-2 focus:border-pastel-blue outline-none" 
                 rows={3}
                 value={currentProject.description || ''} 
                 onChange={e => setCurrentProject({...currentProject, description: e.target.value})}
                 required 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select 
                     className="w-full border-2 border-gray-300 p-2 focus:border-pastel-blue outline-none"
                     value={currentProject.category || 'Web Development'}
                     onChange={e => setCurrentProject({...currentProject, category: e.target.value as any})}
                  >
                     <option>Web Development</option>
                     <option>UI Design</option>
                     <option>Mobile App</option>
                     <option>Data Science</option>
                  </select>
               </div>
               <div>
                  <label className="block font-bold mb-1">Tech Stack (comma separated)</label>
                  <input 
                     className="w-full border-2 border-gray-300 p-2 focus:border-pastel-blue outline-none" 
                     value={Array.isArray(currentProject.technologies) ? currentProject.technologies.join(', ') : currentProject.technologies || ''} 
                     onChange={e => setCurrentProject({...currentProject, technologies: e.target.value as any})}
                  />
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="md:col-span-1">
                  <label className="block font-bold mb-1">Date Completed</label>
                  <input 
                     type="date"
                     className="w-full border-2 border-gray-300 p-2 focus:border-pastel-blue outline-none" 
                     value={currentProject.dateCompleted?.split('T')[0] || ''} 
                     onChange={e => setCurrentProject({...currentProject, dateCompleted: e.target.value})}
                  />
               </div>
               <div className="md:col-span-2">
                  <label className="block font-bold mb-1">Image URL</label>
                  <input 
                     className="w-full border-2 border-gray-300 p-2 focus:border-pastel-blue outline-none" 
                     value={currentProject.thumbnailUrl || ''} 
                     onChange={e => setCurrentProject({...currentProject, thumbnailUrl: e.target.value})}
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block font-bold mb-1">Demo URL</label>
                  <input 
                     className="w-full border-2 border-gray-300 p-2 focus:border-pastel-blue outline-none" 
                     value={currentProject.demoUrl || ''} 
                     onChange={e => setCurrentProject({...currentProject, demoUrl: e.target.value})}
                  />
               </div>
               <div>
                  <label className="block font-bold mb-1">GitHub URL (Optional)</label>
                  <input 
                     className="w-full border-2 border-gray-300 p-2 focus:border-pastel-blue outline-none" 
                     value={currentProject.githubUrl || ''} 
                     onChange={e => setCurrentProject({...currentProject, githubUrl: e.target.value})}
                  />
               </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-200 mt-4">
              <PixelButton type="submit">Save Project</PixelButton>
              <PixelButton type="button" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</PixelButton>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid gap-6">
          {projects.map(p => (
            <div key={p.id} className={`bg-white border-2 border-pastel-charcoal p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm gap-4 ${!p.isVisible ? 'opacity-60 bg-gray-50' : ''}`}>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                 <img src={p.thumbnailUrl} className="w-16 h-16 object-cover border border-gray-300 shrink-0" alt="thumb" />
                 <div>
                    <h3 className="font-bold text-lg flex items-center gap-2 flex-wrap">
                       {p.title}
                       {!p.isVisible && <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-500 font-normal">Hidden</span>}
                    </h3>
                    <div className="text-xs text-gray-500">{p.category} • {p.technologies.join(', ')}</div>
                 </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <a href={p.demoUrl} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-pastel-charcoal" title="View Demo">
                   <ExternalLink size={20} />
                </a>
                <button 
                  onClick={() => { setCurrentProject(p); setIsEditing(true); }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit2 size={20} />
                </button>
                <button 
                  onClick={() => setShowDeleteModal(p.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-gray-500 italic text-center py-8">No projects found.</p>}
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 border-2 border-pastel-charcoal shadow-pixel max-w-md w-full">
            <h3 className="font-pixel text-2xl mb-4 text-red-600">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
            <div className="flex gap-4">
              <PixelButton variant="danger" onClick={handleDelete}>Delete Permanently</PixelButton>
              <PixelButton variant="secondary" onClick={() => setShowDeleteModal(null)}>Cancel</PixelButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;