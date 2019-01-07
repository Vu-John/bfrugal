import React from "react";

const UserList = ({ users, deleteUser }) => (
  <div>
    <h3>All registered users:</h3>
    {users.loading && <em>Loading users...</em>}
    {users.items && (
      <div>
        <ul>
          {users.items.map(user => (
            <li key={user.id}>
              {user.firstName + " " + user.lastName}
              {user.deleting ? (
                <em> - Deleting...</em>
              ) : user.deleteError ? (
                <span className="error"> - ERROR: {user.deleteError}</span>
              ) : (
                <span>
                  {" "}
                  -{" "}
                  <a
                    href="https://www.google.com"
                    onClick={e => deleteUser(user.id)}
                  >
                    Delete
                  </a>
                </span>
              )}
            </li>
          ))}
        </ul>
        <br />
      </div>
    )}
  </div>
);
export default UserList;
