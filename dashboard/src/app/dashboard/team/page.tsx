'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Users, 
  UserPlus, 
  Settings, 
  Search, 
  ChevronDown,
  UserCircle,
  Mail,
  Calendar,
  Shield,
  MoreHorizontal,
  Grid,
  List,
  X,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

// Team member type definition
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  status: 'active' | 'pending' | 'inactive';
  avatar: string;
}

// Sample team members data
const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'Admin',
    department: 'Engineering',
    joinDate: '2023-01-15',
    status: 'active',
    avatar: '/avatars/avatar-1.jpg'
  },
  {
    id: '2',
    name: 'Sara Williams',
    email: 'sara.williams@example.com',
    role: 'Developer',
    department: 'Engineering',
    joinDate: '2023-02-20',
    status: 'active',
    avatar: '/avatars/avatar-2.jpg'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'Data Scientist',
    department: 'AI Research',
    joinDate: '2023-03-10',
    status: 'active',
    avatar: '/avatars/avatar-3.jpg'
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    role: 'Designer',
    department: 'UX/UI',
    joinDate: '2023-04-05',
    status: 'active',
    avatar: '/avatars/avatar-4.jpg'
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    role: 'Developer',
    department: 'Engineering',
    joinDate: '2023-05-15',
    status: 'pending',
    avatar: '/avatars/avatar-5.jpg'
  }
];

// Add InviteModal component before the main TeamPage component
const InviteModal = ({ 
  isOpen, 
  onClose, 
  t, 
  isDark,
  onAddMember
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  t: (key: string) => string;
  isDark: boolean;
  onAddMember: (member: { name: string; email: string; role: string; department: string }) => void;
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Member');
  const [department, setDepartment] = useState('Engineering');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create the new member object
    const newMember = {
      name,
      email,
      role,
      department
    };
    
    // Simulate API call
    setTimeout(() => {
      // Add the new member
      onAddMember(newMember);
      
      // Reset form and state
      setIsSubmitting(false);
      onClose();
      setEmail('');
      setName('');
      setRole('Member');
      setDepartment('Engineering');
    }, 1500);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      <motion.div 
        className={`relative w-full max-w-md p-6 rounded-xl shadow-lg ${
          isDark 
            ? 'bg-[#00091b]/95 border border-[#00cbdd]/20'
            : 'bg-white border border-gray-200'
        }`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('inviteTeamMember')}
          </h3>
          <button 
            onClick={onClose}
            className={`p-1 rounded-full ${
              isDark ? 'hover:bg-[#00cbdd]/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('full_name')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-[#000426] border border-[#00cbdd]/20 text-white placeholder-gray-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('email_address')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-[#000426] border border-[#00cbdd]/20 text-white placeholder-gray-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                placeholder="john.doe@example.com"
                required
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('role')}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg appearance-none ${
                  isDark 
                    ? 'bg-[#000426] border border-[#00cbdd]/20 text-white'
                    : 'bg-gray-50 border border-gray-200 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                required
              >
                <option value="Admin">{t('adminRole')}</option>
                <option value="Member">{t('memberRole')}</option>
                <option value="Viewer">{t('viewerRole')}</option>
                <option value="Developer">Developer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Designer">Designer</option>
              </select>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('department')}
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg appearance-none ${
                  isDark 
                    ? 'bg-[#000426] border border-[#00cbdd]/20 text-white'
                    : 'bg-gray-50 border border-gray-200 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                required
              >
                <option value="Engineering">Engineering</option>
                <option value="AI Research">AI Research</option>
                <option value="UX/UI">UX/UI</option>
                <option value="Operations">Operations</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white rounded-lg hover:opacity-90 transition-all duration-200 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <UserPlus className="h-4 w-4 mr-2" />
                )}
                {t('inviteTeamMember')}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function TeamPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [teamMembersData, setTeamMembersData] = useState(teamMembers);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  
  // Filter team members based on search and filters
  const filteredMembers = teamMembersData.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesRole = selectedRole === 'All Roles' || member.role === selectedRole;
    const matchesDepartment = selectedDepartment === 'All Departments' || member.department === selectedDepartment;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });
  
  // Get unique roles and departments for filters
  const roles = ['All Roles', ...Array.from(new Set(teamMembers.map(m => m.role)))];
  const departments = ['All Departments', ...Array.from(new Set(teamMembers.map(m => m.department)))];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };
  
  // Add a new team member
  const addTeamMember = (member: Omit<TeamMember, 'id' | 'avatar' | 'status' | 'joinDate'>) => {
    const newMember: TeamMember = {
      id: `${teamMembersData.length + 1}`,
      name: member.name,
      email: member.email,
      role: member.role,
      department: member.department,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      avatar: '/avatars/avatar-placeholder.jpg',
    };
    
    setTeamMembersData([...teamMembersData, newMember]);
  };
  
  // Remove a team member
  const removeTeamMember = (id: string) => {
    setTeamMembersData(teamMembersData.filter(member => member.id !== id));
    setShowActionMenu(null);
  };
  
  // Update member status
  const updateMemberStatus = (id: string, status: 'active' | 'pending' | 'inactive') => {
    setTeamMembersData(
      teamMembersData.map(member => 
        member.id === id ? { ...member, status } : member
      )
    );
    setShowActionMenu(null);
  };
  
  // Action menu for member options
  const MemberActionMenu = ({ memberId, position }: { memberId: string, position: 'grid' | 'list' }) => {
    const member = teamMembersData.find(m => m.id === memberId);
    if (!member) return null;
    
    return (
      <div 
        className={`absolute z-10 shadow-lg rounded-lg ${
          isDark 
            ? 'bg-[#000426] border border-[#00cbdd]/20 text-white'
            : 'bg-white border border-gray-200 text-gray-900'
        } w-48 ${position === 'grid' ? 'right-0 top-full mt-1' : 'right-8 top-0'}`}
      >
        <div className="py-1">
          <button
            onClick={() => {
              updateMemberStatus(
                memberId, 
                member.status === 'active' ? 'inactive' : 'active'
              );
            }}
            className="w-full text-left px-4 py-2 hover:bg-[#00cbdd]/10 flex items-center"
          >
            <Check className="h-4 w-4 mr-2" />
            {member.status === 'active' ? t('inactiveStatus') : t('activeStatus')}
          </button>
          
          <button
            onClick={() => removeTeamMember(memberId)}
            className="w-full text-left px-4 py-2 hover:bg-red-100/10 text-red-500 flex items-center"
          >
            <X className="h-4 w-4 mr-2" />
            {t('remove')}
          </button>
        </div>
      </div>
    );
  };
  
  // Update the grid view with action menus
  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredMembers.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`rounded-xl p-5 ${
            isDark 
              ? 'bg-[#00091b]/90 border border-[#00cbdd]/20 hover:border-[#00cbdd]/50'
              : 'bg-white border border-gray-200 hover:border-blue-300'
          } transition-all duration-200 relative`}
        >
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative w-20 h-20 mb-4">
              <div className={`absolute inset-0 rounded-full ${
                member.status === 'active' ? 'bg-green-500' :
                member.status === 'pending' ? 'bg-amber-500' : 'bg-gray-500'
              } opacity-20 blur-md`} />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#00cbdd]/20 to-blue-500/20 flex items-center justify-center">
                <UserCircle className={`h-12 w-12 ${isDark ? 'text-[#00cbdd]' : 'text-blue-500'}`} />
              </div>
              <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 ${
                isDark ? 'border-[#00091b]/90' : 'border-white'
              } ${
                member.status === 'active' ? 'bg-green-500' :
                member.status === 'pending' ? 'bg-amber-500' : 'bg-gray-500'
              }`} />
            </div>
            
            {/* Member Info */}
            <h3 className={`font-medium text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{member.role}</p>
            
            <div className="w-full mt-4 pt-4 border-t border-dashed border-gray-600/20">
              <div className="flex items-center mb-2">
                <Mail className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <p className={`text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{member.email}</p>
              </div>
              <div className="flex items-center mb-2">
                <Shield className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{member.department}</p>
              </div>
              <div className="flex items-center">
                <Calendar className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Joined {formatDate(member.joinDate)}
                </p>
              </div>
            </div>
            
            <div className="w-full mt-4 flex justify-center relative">
              <button 
                className={`p-2 rounded-full ${
                  isDark 
                    ? 'hover:bg-[#00cbdd]/10' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setShowActionMenu(showActionMenu === member.id ? null : member.id)}
              >
                <MoreHorizontal className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
              
              {showActionMenu === member.id && (
                <MemberActionMenu memberId={member.id} position="grid" />
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
  
  // Update the list view with action menus
  const renderListView = () => (
    <div className={`rounded-xl overflow-hidden ${
      isDark 
        ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
        : 'bg-white border border-gray-200'
    }`}>
      <table className="min-w-full divide-y divide-gray-600/20">
        <thead className={isDark ? 'bg-[#000426]' : 'bg-gray-50'}>
          <tr>
            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
              isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'
            }`}>
              {t('member')}
            </th>
            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
              isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'
            }`}>
              {t('role')}
            </th>
            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
              isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'
            }`}>
              {t('department')}
            </th>
            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
              isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'
            }`}>
              {t('status')}
            </th>
            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
              isDark ? 'text-gray-400 uppercase tracking-wider' : 'text-gray-500 uppercase tracking-wider'
            }`}>
              {t('joinDate')}
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">{t('actions')}</span>
            </th>
          </tr>
        </thead>
        <tbody className={`${
          isDark ? 'divide-y divide-gray-600/20' : 'divide-y divide-gray-200'
        }`}>
          {filteredMembers.map((member, index) => (
            <motion.tr 
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={isDark ? 'hover:bg-[#000426]/50' : 'hover:bg-gray-50'}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 relative">
                    <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-[#00cbdd]/20 to-blue-500/20 flex items-center justify-center">
                      <UserCircle className={`h-6 w-6 ${isDark ? 'text-[#00cbdd]' : 'text-blue-500'}`} />
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
                      isDark ? 'border-[#00091b]/90' : 'border-white'
                    } ${
                      member.status === 'active' ? 'bg-green-500' :
                      member.status === 'pending' ? 'bg-amber-500' : 'bg-gray-500'
                    }`} />
                  </div>
                  <div className="ml-4">
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{member.name}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{member.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{member.role}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{member.department}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  member.status === 'active' 
                    ? isDark ? 'bg-green-100/10 text-green-400' : 'bg-green-100 text-green-800'
                    : member.status === 'pending'
                      ? isDark ? 'bg-yellow-100/10 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                      : isDark ? 'bg-gray-100/10 text-gray-400' : 'bg-gray-100 text-gray-800'
                }`}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className={isDark ? 'text-gray-300' : 'text-gray-900'}>{formatDate(member.joinDate)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                <button 
                  className={`text-indigo-600 hover:text-indigo-900 ${
                    isDark ? 'text-[#00cbdd] hover:text-[#00cbdd]/80' : 'text-blue-600 hover:text-blue-800'
                  }`}
                  onClick={() => setShowActionMenu(showActionMenu === member.id ? null : member.id)}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
                
                {showActionMenu === member.id && (
                  <MemberActionMenu memberId={member.id} position="list" />
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  // Replace the existing render logic with the new functions
  return (
    <div className="space-y-6" onClick={() => showActionMenu && setShowActionMenu(null)}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('teamManagement')}
          </h1>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('manageTeamMembers')}
          </p>
        </div>
        
        <motion.button
          className="flex items-center px-4 py-2 bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white rounded-lg hover:opacity-90 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            setShowInviteModal(true);
          }}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {t('inviteTeamMember')}
        </motion.button>
      </div>
      
      {/* Invite Modal */}
      <InviteModal 
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        t={t}
        isDark={isDark}
        onAddMember={addTeamMember}
      />
      
      {/* Filters and Search */}
      <div className={`p-4 rounded-xl ${
        isDark 
          ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
          : 'bg-white border border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder={t('searchTeamMembers')}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                isDark 
                  ? 'bg-[#000426] border border-[#00cbdd]/20 text-white placeholder-gray-500'
                  : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Role Filter */}
          <div className="relative min-w-[180px]">
            <select
              className={`appearance-none w-full pl-4 pr-10 py-2 rounded-lg ${
                isDark 
                  ? 'bg-[#000426] border border-[#00cbdd]/20 text-white'
                  : 'bg-gray-50 border border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
          </div>
          
          {/* Department Filter */}
          <div className="relative min-w-[180px]">
            <select
              className={`appearance-none w-full pl-4 pr-10 py-2 rounded-lg ${
                isDark 
                  ? 'bg-[#000426] border border-[#00cbdd]/20 text-white'
                  : 'bg-gray-50 border border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
          </div>
          
          {/* View Mode Toggle */}
          <div className={`flex rounded-lg overflow-hidden ${
            isDark 
              ? 'bg-[#000426] border border-[#00cbdd]/20'
              : 'bg-gray-50 border border-gray-200'
          }`}>
            <button
              className={`flex items-center justify-center px-3 py-2 ${
                viewMode === 'grid' 
                  ? isDark 
                    ? 'bg-[#00cbdd]/20 text-[#00cbdd]' 
                    : 'bg-blue-100 text-blue-600'
                  : isDark 
                    ? 'text-gray-400' 
                    : 'text-gray-600'
              }`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              className={`flex items-center justify-center px-3 py-2 ${
                viewMode === 'list' 
                  ? isDark 
                    ? 'bg-[#00cbdd]/20 text-[#00cbdd]' 
                    : 'bg-blue-100 text-blue-600'
                  : isDark 
                    ? 'text-gray-400' 
                    : 'text-gray-600'
              }`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Team Members */}
      {viewMode === 'grid' ? renderGridView() : renderListView()}
      
      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className={`rounded-xl p-8 text-center ${
          isDark 
            ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
            : 'bg-white border border-gray-200'
        }`}>
          <Users className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
          <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('noTeamMembersFound')}
          </h3>
          <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('tryAdjustingFilters')}
          </p>
          <button 
            className="px-4 py-2 bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white rounded-lg hover:opacity-90 transition-all duration-200"
            onClick={() => setShowInviteModal(true)}
          >
            {t('inviteTeamMember')}
          </button>
        </div>
      )}
    </div>
  );
} 