// ============================================
// FILE: src/pages/Dashboard.js
// ============================================
import React, { useState, useEffect } from 'react';
import { Users, FileSpreadsheet, TrendingUp, BarChart3 } from 'lucide-react';
import './Dashboard.css';
import { api } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalPapers: 0,
    averageScore: 0,
    successRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await api.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      // Use mock data if API fails
      setStats({
        totalStudents: 156,
        totalPapers: 342,
        averageScore: 76,
        successRate: 89
      });
    } finally {
      setLoading(false);
    }
  };

  const recentActivity = [
    { name: 'Ali Ahmed', score: 85, time: '5 mins ago' },
    { name: 'Sara Khan', score: 92, time: '10 mins ago' },
    { name: 'Hassan Ali', score: 78, time: '15 mins ago' },
    { name: 'Fatima Noor', score: 88, time: '20 mins ago' }
  ];

  const topPerformers = [
    { name: 'Sara Khan', score: 95 },
    { name: 'Ahmed Raza', score: 92 },
    { name: 'Fatima Ali', score: 90 },
    { name: 'Hassan Ahmed', score: 88 },
    { name: 'Zainab Hassan', score: 87 }
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Dashboard & Analytics</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatsCard
          icon={<Users size={40} />}
          title="Total Students"
          value={stats.totalStudents}
          color="blue"
        />
        <StatsCard
          icon={<FileSpreadsheet size={40} />}
          title="Papers Graded"
          value={stats.totalPapers}
          color="green"
        />
        <StatsCard
          icon={<TrendingUp size={40} />}
          title="Average Score"
          value={`${stats.averageScore}%`}
          color="yellow"
        />
        <StatsCard
          icon={<BarChart3 size={40} />}
          title="Success Rate"
          value={`${stats.successRate}%`}
          color="purple"
        />
      </div>

      {/* Activity and Performance */}
      <div className="dashboard-grid">
        {/* Recent Activity */}
        <div className="dashboard-card">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="dashboard-card">
          <h2>Top Performers</h2>
          <div className="performers-list">
            {topPerformers.map((performer, index) => (
              <PerformerItem 
                key={index} 
                performer={performer} 
                rank={index + 1} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Subject Distribution */}
      <div className="dashboard-card full-width">
        <h2>Subject Performance</h2>
        <div className="subject-bars">
          <SubjectBar subject="English Grammar" percentage={82} color="#3b82f6" />
          <SubjectBar subject="Science" percentage={75} color="#10b981" />
          <SubjectBar subject="Mathematics" percentage={68} color="#f59e0b" />
          <SubjectBar subject="Computer Science" percentage={88} color="#8b5cf6" />
        </div>
      </div>
    </div>
  );
}

function StatsCard({ icon, title, value, color }) {
  const colors = {
    blue: { bg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', shadow: 'rgba(59, 130, 246, 0.4)' },
    green: { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', shadow: 'rgba(16, 185, 129, 0.4)' },
    yellow: { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', shadow: 'rgba(245, 158, 11, 0.4)' },
    purple: { bg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', shadow: 'rgba(139, 92, 246, 0.4)' }
  };

  return (
    <div 
      className="stats-card"
      style={{ 
        background: colors[color].bg,
        boxShadow: `0 10px 30px ${colors[color].shadow}`
      }}
    >
      <div className="stats-icon">{icon}</div>
      <p className="stats-value">{value}</p>
      <p className="stats-title">{title}</p>
    </div>
  );
}

function ActivityItem({ activity }) {
  return (
    <div className="activity-item">
      <div className="activity-info">
        <p className="activity-name">{activity.name}</p>
        <p className="activity-time">{activity.time}</p>
      </div>
      <div className="activity-score">
        {activity.score}%
      </div>
    </div>
  );
}

function PerformerItem({ performer, rank }) {
  return (
    <div className="performer-item">
      <div className="performer-rank">{rank}</div>
      <div className="performer-info">
        <p className="performer-name">{performer.name}</p>
      </div>
      <div className="performer-score">
        {performer.score}%
      </div>
    </div>
  );
}

function SubjectBar({ subject, percentage, color }) {
  return (
    <div className="subject-bar">
      <div className="subject-header">
        <span className="subject-name">{subject}</span>
        <span className="subject-percentage">{percentage}%</span>
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color 
          }}
        ></div>
      </div>
    </div>
  );
}

export default Dashboard;