import { AlertCircle, Calendar } from 'lucide-react';

export default function AnnouncementCard({ announcement }) {
  return (
    <div className={`p-6 rounded-xl border-l-4 ${
      announcement.priority === 'high' ? 'border-red-500 bg-red-50' :
      announcement.priority === 'medium' ? 'border-orange-500 bg-orange-50' :
      'border-blue-500 bg-blue-50'
    } hover:shadow-md transition-shadow`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            announcement.priority === 'high' ? 'bg-red-100' :
            announcement.priority === 'medium' ? 'bg-orange-100' :
            'bg-blue-100'
          }`}>
            <AlertCircle size={20} className={
              announcement.priority === 'high' ? 'text-red-600' :
              announcement.priority === 'medium' ? 'text-orange-600' :
              'text-blue-600'
            } />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{announcement.title}</h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
            <Calendar size={14} className="inline mr-1" />
            {announcement.date}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            announcement.type === 'maintenance' ? 'bg-red-100 text-red-700' :
            announcement.type === 'news' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {announcement.type}
          </span>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
    </div>
  );
}