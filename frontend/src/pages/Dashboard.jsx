import React, { useEffect, useState } from "react";
import { usePageContext } from "../context/pageContext.js";
import { useAuth } from "../context/authContext.js";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import EditContactModal from "./EditContactModal.jsx";
import axios from "axios";
import '../styles/dashboard.css';

const Dashboard = () => {
  const [pages, setPages] = usePageContext();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [contacts, setContacts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editContact, setEditContact] = useState(null);

  const handleSaveContact = async (updatedContact) => {
    try {
      const { data } = await axios.put(`api/v1/contacts/${auth?.user_id}`, updatedContact);
      setContacts((prev) =>
        prev.map((contact) =>
          contact.contact_id === updatedContact.contact_id ? updatedContact : contact
        )
      );
      console.log(data)
      toast.success(data?.message);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating contact:", err);
      toast.error("Failed to update contact.");
    }
  };


  const getContacts = async () => {
    try {
      const tuples = 10 * pages;
      const { data } = await axios.get(`api/v1/contacts/${auth?.user_id}?tuples=${tuples}`);
      setContacts(data?.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  const handleLoadMore = () => {
    setPages(pages + 1);
  };

  const handleSignOut = () => {
    localStorage.removeItem("auth");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(`api/v1/delete-user/${auth.user_id}`);
      localStorage.removeItem("auth");
      toast.success("Account deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContact = async (contact_id) => {
    try {
      await axios.delete(`api/v1/contacts/${contact_id}`);
      toast.success("Contact deleted successfully!");
      getContacts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (contact) => {
    setEditContact(contact);
    setIsEditing(true);
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    try {
      const parsedAuth = JSON.parse(storedAuth);
      if (parsedAuth) {
        setAuth((prev) => ({
          ...prev,
          user_id: parsedAuth,
        }));
      } else {
        throw new Error("Invalid auth data in localStorage");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      toast.error("Please sign in");
      navigate("/");
    }
  }, [navigate, setAuth]);

  useEffect(() => {
    if (auth?.user_id) {
      getContacts();
    }
  }, [auth, pages]);

  return (
    <div className={`dashboard-container ${isEditing ? "modal-active" : ""}`}>
      {isEditing && (
        <EditContactModal
          contact={editContact}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveContact}
        />
      )}


      <div className="dashboard-nav">
        <ul>
          <li><button onClick={() => navigate("/dashboard")}>Contacts</button></li>
          <li><button onClick={() => navigate("/add-contact", { state: location.pathname })}>Add Contact</button></li>
          <li><button onClick={handleSignOut}>Sign Out</button></li>
          <li><button onClick={handleDeleteProfile}>Delete Profile</button></li>
        </ul>
      </div>

      <div className="dashboard-content">
        <h2>Contact List</h2>
        {contacts.length > 0 ? (
          <div>
            <ul className="contact-list">
              {contacts.map((contact) => (
                <li key={contact.contact_id} className="contact-item">
                  <p>
                    <strong>Name:</strong> {contact.first_name} {contact.last_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {contact.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {contact.phone}
                  </p>
                  <p>
                    <strong>Company:</strong> {contact.company}
                  </p>
                  <p>
                    <strong>Job:</strong> {contact.job}
                  </p>
                  <button onClick={() => handleEditClick(contact)}>Edit</button>
                  <button onClick={() => handleDeleteContact(contact.contact_id)}>Delete</button>
                </li>
              ))}
            </ul>
            {contacts.length >= pages * 10 && (
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load More
              </button>
            )}
          </div>
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
