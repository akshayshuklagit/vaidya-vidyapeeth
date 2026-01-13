import { useState, useEffect } from 'react';
import { 
  DocumentTextIcon, 
  BookmarkIcon,
  ClockIcon,
  PlusIcon 
} from '@heroicons/react/24/outline';

const NotesPanel = ({ isVisible, meetingTitle, courseTitle }) => {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');

  // Auto-save notes every 30 seconds
  useEffect(() => {
    if (!notes.trim()) return;

    const timer = setTimeout(() => {
      const noteData = {
        id: Date.now(),
        content: notes,
        timestamp: new Date(),
        meetingTitle,
        courseTitle
      };
      
      // Save to localStorage (in production, save to backend)
      const existingNotes = JSON.parse(localStorage.getItem('classNotes') || '[]');
      const updatedNotes = [...existingNotes, noteData];
      localStorage.setItem('classNotes', JSON.stringify(updatedNotes));
      
      setAutoSaveStatus('Auto-saved');
      setTimeout(() => setAutoSaveStatus(''), 2000);
    }, 30000);

    return () => clearTimeout(timer);
  }, [notes, meetingTitle, courseTitle]);

  // Load existing notes on mount
  useEffect(() => {
    const existingNotes = JSON.parse(localStorage.getItem('classNotes') || '[]');
    setSavedNotes(existingNotes.slice(-5)); // Show last 5 notes
  }, []);

  const handleSaveNote = () => {
    if (!notes.trim()) return;

    const noteData = {
      id: Date.now(),
      content: notes.trim(),
      timestamp: new Date(),
      meetingTitle,
      courseTitle
    };

    // Save to localStorage
    const existingNotes = JSON.parse(localStorage.getItem('classNotes') || '[]');
    const updatedNotes = [...existingNotes, noteData];
    localStorage.setItem('classNotes', JSON.stringify(updatedNotes));
    
    setSavedNotes(prev => [...prev.slice(-4), noteData]);
    setNotes('');
    setAutoSaveStatus('Note saved!');
    setTimeout(() => setAutoSaveStatus(''), 2000);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Notes Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <DocumentTextIcon className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Class Notes</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">{courseTitle}</p>
        {autoSaveStatus && (
          <p className="text-xs text-green-600 mt-1">{autoSaveStatus}</p>
        )}
      </div>

      {/* Note Taking Area */}
      <div className="p-4 border-b border-gray-200">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Take notes during the class..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          maxLength={1000}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">
            {notes.length}/1000 characters
          </span>
          <button
            onClick={handleSaveNote}
            disabled={!notes.trim()}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
          >
            <PlusIcon className="w-3 h-3" />
            <span>Save Note</span>
          </button>
        </div>
      </div>

      {/* Quick Notes Templates */}
      <div className="p-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Quick Templates</h4>
        <div className="space-y-1">
          {[
            'Key Point: ',
            'Question: ',
            'Important: ',
            'Remember: ',
            'Action Item: '
          ].map((template) => (
            <button
              key={template}
              onClick={() => setNotes(prev => prev + template)}
              className="block w-full text-left px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
            >
              {template}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Notes */}
      <div className="flex-1 overflow-y-auto p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center space-x-1">
          <BookmarkIcon className="w-4 h-4" />
          <span>Recent Notes</span>
        </h4>
        <div className="space-y-3">
          {savedNotes.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No notes yet. Start taking notes during the class!
            </p>
          ) : (
            savedNotes.map((note) => (
              <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-900 mb-2 line-clamp-3">
                  {note.content}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <ClockIcon className="w-3 h-3" />
                  <span>{formatTimestamp(note.timestamp)}</span>
                </div>
                {note.meetingTitle && (
                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {note.meetingTitle}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Notes Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-600 text-center">
          Notes are auto-saved every 30 seconds
        </p>
      </div>
    </div>
  );
};

export default NotesPanel;