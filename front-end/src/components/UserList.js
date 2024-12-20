import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                ID
              </th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                Username
              </th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                Email
              </th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                Role
              </th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {user.id}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {user.username}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {user.email}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {user.role}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {new Date(user.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
