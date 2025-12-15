import React, { useEffect, useState } from 'react';
import * as db from '../../services/storage';
import { ContactSubmission } from '../../types';
import { CheckCircle, Trash2 } from 'lucide-react';
import PixelButton from '../../components/ui/PixelButton';

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await db.getMessages();
      setMessages(data);
    };
    load();
  }, []);

  const handleMarkRead = async (id: string) => {
    await db.markMessageRead(id);
    const data = await db.getMessages();
    setMessages(data);
  };

  const handleDelete = async () => {
    if (showDeleteModal) {
       await db.deleteMessage(showDeleteModal);
       const data = await db.getMessages();
       setMessages(data);
       setShowDeleteModal(null);
    }
  };

  return (
    <div>
      <h2 className="font-pixel text-3xl mb-8 text-pastel-charcoal">Inbox</h2>
      <div className="space-y-4">
        {messages.length === 0 && <p className="text-pastel-charcoal/50 italic border-2 border-dashed border-pastel-charcoal/30 p-8 text-center rounded">No messages yet.</p>}
        {messages.map(msg => (
          <div key={msg.id} className={`bg-pastel-surface border-2 border-pastel-charcoal p-6 shadow-sm ${msg.status === 'unread' ? 'border-l-8 border-l-pastel-blue' : ''}`}>
             <div className="flex justify-between items-start mb-4">
               <div>
                  <h3 className="font-bold text-lg flex items-center gap-2 text-pastel-charcoal">
                     {msg.status === 'unread' && <span className="bg-blue-500 w-2 h-2 rounded-full"></span>}
                     {msg.name}
                  </h3>
                  <a href={`mailto:${msg.email}`} className="text-blue-500 text-sm hover:underline">{msg.email}</a>
                  <span className="text-pastel-charcoal/50 text-xs ml-2"> | {new Date(msg.submittedAt).toLocaleDateString()} {new Date(msg.submittedAt).toLocaleTimeString()}</span>
               </div>
               <div className="flex gap-2">
                  {msg.status === 'unread' && (
                    <button onClick={() => handleMarkRead(msg.id)} className="text-green-500 text-sm flex items-center gap-1 hover:bg-green-500/10 px-2 py-1 rounded transition-colors" title="Mark as Read">
                        <CheckCircle size={18} />
                    </button>
                  )}
                  <button onClick={() => setShowDeleteModal(msg.id)} className="text-red-500 hover:bg-red-500/10 p-1 rounded transition-colors" title="Delete Message">
                     <Trash2 size={18} />
                  </button>
               </div>
             </div>
             <div className="bg-pastel-cream p-4 border border-pastel-charcoal/20 rounded text-pastel-charcoal whitespace-pre-wrap font-mono text-sm">
                {msg.message}
             </div>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-pastel-surface p-8 border-2 border-pastel-charcoal shadow-pixel max-w-md">
            <h3 className="font-pixel text-2xl mb-4 text-red-500">Confirm Deletion</h3>
            <p className="mb-6 text-pastel-charcoal">Are you sure you want to delete this message? This cannot be undone.</p>
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

export default Messages;