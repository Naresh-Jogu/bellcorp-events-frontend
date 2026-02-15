import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/events/my/registered", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const now = new Date();

  const upcoming = events.filter((e) => new Date(e.datetime) > now);

  const past = events.filter((e) => new Date(e.datetime) <= now);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <h2>My Dashboard</h2>

      <h3>Upcoming Events</h3>
      {upcoming.length === 0 ? (
        <p className="empty-msg">No upcoming events found.</p>
      ) : (
        <div className="event-list">
          {upcoming.map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-info">
                <b>{event.name}</b>
                <div className="event-date">
                  {new Date(event.datetime).toLocaleString([], {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>
              <Link className="view-link" to={`/events/${event._id}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      <h3>Past Events</h3>
      {past.length === 0 ? (
        <p className="empty-msg">No past events recorded.</p>
      ) : (
        <div className="event-list">
          {past.map((event) => (
            <div key={event._id} className="event-card past-card">
              <div className="event-info">
                <b>{event.name}</b>
                <div className="event-date">
                  {new Date(event.datetime).toLocaleString([], {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
