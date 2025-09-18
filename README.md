# Team Pulse Dashboard

A productivity monitoring tool for internal teams built with React, Redux Toolkit, and Tailwind CSS. Features role-based views for Team Leads and Team Members with real-time status tracking and task management.

## 🚀 Features

### Core Functionality
- **Role-Based Views**: Switch between Team Lead and Team Member modes
- **Status Monitoring**: Real-time team member status tracking (Working, Meeting, Break, Offline)
- **Task Management**: Assign tasks with due dates and track progress
- **Progress Tracking**: Visual progress bars with increment/decrement controls

### Team Lead Features
- Monitor all team member statuses with summary cards
- Assign tasks to team members with due dates
- Filter team members by status
- Sort members by number of active tasks
- Visual status distribution chart
- Comprehensive task statistics

### Team Member Features
- Update personal status with one-click buttons
- View and manage assigned tasks
- Track task progress with visual indicators
- Overall progress overview and statistics

### Bonus Features
- **Auto Reset**: Automatically sets status to "Offline" after 10 minutes of inactivity
- **Status Chart**: Visual pie chart showing team status distribution using Recharts
- **Dark Mode**: Toggle between light and dark themes
- **Professional UI**: Clean, modern interface inspired by Vercel's dashboard design

## 🛠 Tech Stack

- **Frontend**: React 19 with Hooks
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Framework**: Next.js 15

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd team-pulse-dashboard
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗 Project Structure

\`\`\`
/src
  /redux
    /slices
      - membersSlice.js    # Team members and tasks state
      - roleSlice.js       # Current role and user state
      - activitySlice.js   # Activity tracking for auto-reset
    - store.js             # Redux store configuration
/components
  - Header.tsx             # Main header with role switching
  - TeamLeadDashboard.tsx  # Team lead view
  - TeamMemberDashboard.tsx # Team member view
  - MemberCard.tsx         # Individual member display
  - TaskForm.tsx           # Task assignment form
  - TaskList.tsx           # Task management for members
  - StatusSelector.tsx     # Status update controls
  - StatusSummary.tsx      # Status overview cards
  - StatusChart.tsx        # Visual status distribution
  - StatusBadge.tsx        # Status indicator component
  - DarkModeToggle.tsx     # Theme switching
  - ActivityTracker.tsx    # Inactivity monitoring
/app
  - page.tsx               # Main dashboard page
  - layout.tsx             # Root layout with providers
  - providers.tsx          # Redux provider setup
  - globals.css            # Global styles and theme
\`\`\`

## 🎨 Design System

The dashboard uses a professional dark theme inspired by modern developer tools:

- **Primary Colors**: Blue accent (#60a5fa) for interactive elements
- **Status Colors**: 
  - Working: Green (#4ade80)
  - Meeting: Blue (#60a5fa)
  - Break: Yellow (#facc15)
  - Offline: Gray (#9ca3af)
- **Typography**: Geist Sans for clean, readable text
- **Layout**: Card-based design with consistent spacing and visual hierarchy

## 🔧 Usage

### Switching Roles
Use the toggle switch in the top-right corner to switch between Team Lead and Team Member views.

### Team Lead Actions
1. **Monitor Team**: View all team members with their current status and active tasks
2. **Assign Tasks**: Use the task form to assign new tasks with due dates
3. **Filter & Sort**: Filter by status and sort by task load
4. **View Analytics**: Check the status distribution chart and quick stats

### Team Member Actions
1. **Update Status**: Click status buttons to update your current activity
2. **Manage Tasks**: View assigned tasks and update progress using +/- buttons
3. **Track Progress**: Monitor overall completion percentage
4. **Quick Actions**: Use "Reset" or "Complete" buttons for rapid task updates

## 🚀 Deployment

The app can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Connect your Git repository
- **GitHub Pages**: Build and deploy the `out` folder

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔮 Future Enhancements

- Real-time notifications for task assignments
- Team performance analytics
- Integration with calendar systems
- Slack/Teams integration for status updates
- Time tracking capabilities
- Custom status types
- Team chat functionality

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
