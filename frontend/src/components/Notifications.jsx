import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, X, Settings, Filter } from 'lucide-react';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  
  // Mock notifications data - replace with real data later
  const mockNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'Resume Review Completed',
      message: 'Your resume has been reviewed by Sarah Chen. Check your feedback now!',
      time: '2 hours ago',
      read: false,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Reviewer Available',
      message: 'Michael Rodriguez is now available for resume reviews in your field.',
      time: '1 day ago',
      read: true,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Resume Pending Review',
      message: 'Your resume has been in queue for 18 hours. Expected completion in 6 hours.',
      time: '1 day ago',
      read: false,
      avatar: null
    },
    {
      id: 4,
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile information has been successfully updated.',
      time: '3 days ago',
      read: true,
      avatar: null
    }
  ];

  const [notifications, setNotifications] = useState(mockNotifications);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-green-400 bg-green-50/50';
      case 'warning':
        return 'border-l-amber-400 bg-amber-50/50';
      case 'info':
        return 'border-l-blue-400 bg-blue-50/50';
      default:
        return 'border-l-gray-400 bg-gray-50/50';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Notifications</h1>
                  <p className="text-blue-100 text-sm">
                    {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 text-sm font-medium backdrop-blur-sm"
                  >
                    Mark all read
                  </button>
                )}
                <div className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 cursor-pointer">
                  <Settings className="w-5 h-5" />
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full"></div>
          </div>

          {/* Filter Bar */}
          <div className="px-8 py-4 bg-gradient-to-r from-gray-50 to-blue-50/30 border-b border-blue-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 font-medium">Filter:</span>
                </div>
                <div className="flex space-x-2">
                  {['all', 'unread', 'read'].map((filterType) => (
                    <button
                      key={filterType}
                      onClick={() => setFilter(filterType)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        filter === filterType
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-white/70 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                      {filterType === 'unread' && unreadCount > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded text-xs">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="p-8">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                  <Bell className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {filter === 'unread' ? 'No unread notifications' : 
                   filter === 'read' ? 'No read notifications' : 'No notifications yet'}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {filter === 'all' 
                    ? "You're all caught up! New notifications will appear here when they arrive."
                    : `Switch to a different filter to see ${filter === 'unread' ? 'read' : 'unread'} notifications.`
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`group relative bg-white border-l-4 ${getTypeColor(notification.type)} 
                      rounded-r-xl border border-gray-200/50 p-6 shadow-sm hover:shadow-lg 
                      transition-all duration-300 hover:transform hover:-translate-y-1
                      ${!notification.read ? 'ring-2 ring-blue-100 ring-opacity-50' : ''}`}
                  >
                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    )}

                    <div className="flex items-start space-x-4">
                      {/* Avatar or Icon */}
                      <div className="flex-shrink-0">
                        {notification.avatar ? (
                          <img
                            src={notification.avatar}
                            alt="Avatar"
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                            {getIcon(notification.type)}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`text-lg font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'} mb-1`}>
                              {notification.title}
                            </h4>
                            <p className={`text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-600'} leading-relaxed mb-3`}>
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-4">
                              <span className="text-xs text-gray-500 font-medium">
                                {notification.time}
                              </span>
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200"
                                >
                                  Mark as read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="px-8 py-4 bg-gradient-to-r from-gray-50 to-blue-50/30 border-t border-blue-100/50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Showing {filteredNotifications.length} of {notifications.length} notifications
                </span>
                <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200">
                  View notification settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;