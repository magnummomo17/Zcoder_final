import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import LoadingIcons from "react-loading-icons";

import axios from 'axios';

const Contest = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('/api/contest'); // Replace with your backend URL
        setContests(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch contest data');
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return <div className="profile">Loading <LoadingIcons.BallTriangle style={{ marginLeft: '-15px' }} height={'18px'} fill="var(--batch)" stroke='var(--batch)'/></div>;
}

  if (error) {
    return <div className='calendar'>Error: {error}</div>;
  }

  const handleEventClick = (info) => {
    info.jsEvent.preventDefault(); // Prevent the default action
    if (info.event.url) {
      window.open(info.event.url, '_blank'); // Open the URL in a new tab
    }
  };

  return (
    <div className="calendar">
      <h1>Contest Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="listMonth" // Set the initial view to listMonth
        height="auto"
        events={contests.map(contest => ({
          title: contest.name,
          start: new Date(contest.startTimeSeconds * 1000),
          end: new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000),
          url: `https://codeforces.com/contests/${contest.id}` // Example URL
        }))}
        scrollTime="00:00"
        eventClick={handleEventClick} // Add event click handler
      />
    </div>
  );
};

export default Contest;
