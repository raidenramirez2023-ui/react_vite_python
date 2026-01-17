import { Bell, Calendar } from 'lucide-react';
import AnnouncementCard from './AnnouncementCard';

export default function Announcements({ announcements }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Bell size={28} className="text-blue-600" />
          Latest Announcements
        </h2>
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          {announcements.length} Active
        </span>
      </div>
      
      <div className="space-y-6">
        {announcements.map(announcement => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </div>
  );
}