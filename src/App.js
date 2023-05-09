import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import LeaderboardPage from "./pages/LeaderboardPage";
import NavigationBar from "./components/NavigationBar";
import PollPage from "./pages/PollPage";
import { handleInitialData } from "./services/pollService";
import NewPollPage from "./pages/NewPollPage";

function App({ dispatch }) {
  useEffect(() => {
    dispatch(handleInitialData());
  });
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/login" exact element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            exact
            element={
              <ProtectedRoute>
                <NewPollPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            exact
            element={
              <ProtectedRoute>
                <LeaderboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions/:id"
            element={
              <ProtectedRoute>
                <PollPage />
              </ProtectedRoute>
            }
          />
          <Route path="/404" exact element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: Boolean(authedUser),
});

export default connect(mapStateToProps)(App);
