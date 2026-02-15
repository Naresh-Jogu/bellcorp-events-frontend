import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

import "../styles/EventsDetails.css";

export default function EventDetails() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvent(res.data);
      setRegistered(res.data.isRegistered);
    } catch (err) {
      console.error(err);
      alert("Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    fetchEvent();
  }, [id, token, navigate]);

  const handleRegister = async () => {
    try {
      await api.post(
        `/events/${id}/register`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Registered successfully");
      setRegistered(true);
      fetchEvent();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to register");
    }
  };

  const handleCancel = async () => {
    try {
      await api.post(
        `/events/${id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Registration cancelled");
      setRegistered(false);
      fetchEvent();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to cancel");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>No event found</p>;

  return (
    <div style={{ padding: 20 }} className="event-details-container">
      <h2>{event.name}</h2>
      <p>
        <b>Organizer:</b> {event.organizer}
      </p>
      <p>
        <b>Location:</b> {event.location}
      </p>
      <p>
        <b>Date:</b> {new Date(event.datetime).toLocaleString()}
      </p>
      <p>
        <b>Category:</b> {event.category}
      </p>
      <p>
        <b>Description:</b> {event.description}
      </p>
      <p>
        <b>Available Seats:</b> {event.capacity - event.registeredCount || 0}
      </p>

      {!registered ? (
        <button onClick={handleRegister}>Register</button>
      ) : (
        <button onClick={handleCancel}>Cancel Registration</button>
      )}
    </div>
  );
}
