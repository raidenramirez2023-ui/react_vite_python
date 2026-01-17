import { Users, Target, Award, Globe } from 'lucide-react';

export default function About() {
  const teamMembers = [
    { name: 'Juan Dela Cruz', position: 'General Manager', department: 'Administration' },
    { name: 'Maria Santos', position: 'Chief Engineer', department: 'Operations' },
    { name: 'Robert Lim', position: 'Finance Director', department: 'Finance' },
    { name: 'Anna Reyes', position: 'Customer Service Head', department: 'Customer Relations' }
  ];

  const milestones = [
    { year: '1985', title: 'Establishment', desc: 'Santa Cruz Water District founded' },
    { year: '1995', title: 'Expansion', desc: 'Service coverage extended to 5 barangays' },
    { year: '2005', title: 'Modernization', desc: 'Digital billing system implemented' },
    { year: '2020', title: 'Award', desc: 'Regional Excellence Award received' }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About Santa Cruz Water District</h2>
        <div className="prose max-w-none text-gray-700 space-y-4">
          <p>
            Established in 1985, Santa Cruz Water District has been committed to providing safe, 
            reliable, and affordable water services to the communities of Santa Cruz and surrounding areas. 
            Our mission is to ensure sustainable water management while prioritizing customer satisfaction 
            and environmental stewardship.
          </p>
          <p>
            With over 35 years of service, we have grown from serving 500 households to now providing 
            water to more than 15,000 residential and commercial customers. Our state-of-the-art water 
            treatment facilities ensure that every drop meets or exceeds national water quality standards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Target className="text-blue-600" />
            Our Vision & Mission
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border">
              <h4 className="font-bold text-blue-700 mb-2">Vision</h4>
              <p className="text-gray-600">
                To be the leading water service provider in the region, known for excellence, 
                innovation, and community partnership.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border">
              <h4 className="font-bold text-green-700 mb-2">Mission</h4>
              <p className="text-gray-600">
                To provide sustainable, safe, and reliable water services through efficient operations, 
                technological innovation, and dedicated customer service.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Award className="text-orange-600" />
            Milestones
          </h3>
          <div className="space-y-4">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-lg">
                  {milestone.year}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{milestone.title}</h4>
                  <p className="text-gray-600 text-sm">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Users className="text-purple-600" />
          Leadership Team
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h4 className="font-bold text-gray-800">{member.name}</h4>
              <p className="text-blue-600 text-sm font-medium">{member.position}</p>
              <p className="text-gray-500 text-xs">{member.department}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}