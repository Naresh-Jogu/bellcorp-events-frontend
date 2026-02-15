import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import api from "../api/axios";
import "../styles/Events.css";

export default function Events() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10; // 10 events per page

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const params = { page, limit };
      if (search) {
        params.search = search;
      }

      if (date) {
        params.date = date;
      }
      if (location) {
        params.location = location;
      }
      if (category) {
        params.category = category;
      }

      const response = await api.get("/events", { params });
      if (response.data.events) {
        setEvents(response.data.events);
        setTotalPages(response.data.totalPages);
      } else {
        setEvents(response.data);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/register", { replace: true });
      return;
    }
    fetchEvents();
  }, [page, token, navigate]);

  const handleFilter = (e) => {
    e.preventDefault();
    setPage(1);
    fetchEvents();
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div style={{ padding: 20 }} className="events-container">
        <h2>Events</h2>
        {token && <button onClick={handleLogout}>Logout</button>}
        {/* Flters*/}
        <form
          onSubmit={handleFilter}
          style={{ marginBottom: 20 }}
          className="events-filter "
        >
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button type="submit">Apply</button>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setDate("");
              setLocation("");
              setCategory("");
              setPage(1);
              setTimeout(fetchEvents, 0);
            }}
          >
            Reset
          </button>
        </form>

        {/* Lists */}
        {loading && <p>loading...</p>}

        {!loading && events.length === 0 && <p> No events found</p>}

        <ul className="events-list">
          {events.map((event) => (
            <li key={event._id} style={{ marginBottom: 12 }}>
              <h4>{event.name}</h4>
              <p>{event.location}</p>
              <p>{new Date(event.datetime || event.date).toLocaleString()}</p>
              <p>category : {event.category}</p>
              <p>
                Available Seats : {event.capacity - event.registeredCount || 0}
              </p>
              l <Link to={`/events/${event._id}`}>View Details</Link>
            </li>
          ))}
        </ul>

        {/* Pagination Buttons */}
        <div style={{ marginTop: 20 }}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              style={{
                margin: "0 5px",
                backgroundColor: page === index + 1 ? "black" : "white",
                color: page === index + 1 ? "white" : "black",
              }}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
