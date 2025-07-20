import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import TeacherRegistration from "./pages/TeacherRegistration";
import Dashboard from "./pages/Dashboard";
import SubjectDiscovery from "./pages/SubjectDiscovery";
import BookingPage from "./pages/BookingPage";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  if (!user) {
    if (page === "login")
      return <LoginPage onLogin={setUser} onSwitch={() => setPage("register")} />;
    if (page === "register")
      return <TeacherRegistration onRegister={setUser} onSwitch={() => setPage("login")} />;
  }

  if (user.role === "learner")
    return (
      <div>
        <button onClick={() => setUser(null)}>Logout</button>
        <Dashboard user={user} />
        <SubjectDiscovery
          onSelectTeacher={(teacher, subject) => {
            setSelectedTeacher(teacher);
            setSelectedSubject(subject);
            setPage("booking");
          }}
        />
        {page === "booking" && (
          <BookingPage
            learner={user}
            teacher={selectedTeacher}
            subject={selectedSubject}
            onDone={() => setPage("dashboard")}
          />
        )}
      </div>
    );

  if (user.role === "teacher")
    return (
      <div>
        <button onClick={() => setUser(null)}>Logout</button>
        <h2>Welcome, {user.name}!</h2>
        <p>Your CBC Subjects: {user.selectedSubjects.join(", ")}</p>
        <p>Feature: Set your availability and view bookings (demo)</p>
      </div>
    );

  return null;
}

export default App;
