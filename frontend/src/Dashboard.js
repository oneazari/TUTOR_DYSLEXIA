import React from "react";

function Dashboard({ currentUser, onStartLesson, onLogout }) {
  return (
    <div style={styles.page}>

      {/* Top Bar */}
      <div style={styles.topBar}>
        <h2>Hi {currentUser}! 👋</h2>
        <div>
          <button style={styles.iconBtn}>🔔</button>
          <button style={styles.iconBtn}>⚙</button>
          <button style={styles.startBtn} onClick={onStartLesson}>
            Start!
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div style={styles.profileCard}>
        <div style={styles.avatar}>👦</div>
        <div>
          <h3>{currentUser}</h3>
          <p>Level 3 ⭐ 225 XP</p>
          <div style={styles.progressBar}>
            <div style={styles.progressFill}></div>
          </div>
        </div>
      </div>

      {/* Subject Cards */}
      <div style={styles.subjectRow}>
        <div style={styles.subjectCard}>
          📖
          <h4>Language</h4>
        </div>

        <div style={styles.subjectCard}>
          ➕
          <h4>Mathematics</h4>
        </div>
      </div>

      {/* Lesson Panel */}
      <div style={styles.lessonPanel}>
        <h3>New Lesson</h3>
        <p>The hurricane has devastated the coastal town.</p>
        <div style={styles.definition}>
          <strong>Devastated:</strong> to strongly damage or destroy.
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={styles.navRow}>
        <button style={styles.blueBtn}>🔊</button>
        <button style={styles.orangeBtn}>⬅</button>
        <button style={styles.orangeBtn}>➡</button>
      </div>

      <button onClick={onLogout} style={styles.logout}>
        Logout
      </button>

    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#FDF6E3",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial"
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  iconBtn: {
    marginRight: "10px",
    padding: "8px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer"
  },

  startBtn: {
    backgroundColor: "#FB8C00",
    color: "white",
    padding: "10px 20px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer"
  },

  profileCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFF8E7",
    padding: "20px",
    borderRadius: "20px",
    marginTop: "20px",
    boxShadow: "0px 6px 12px rgba(0,0,0,0.1)"
  },

  avatar: {
    fontSize: "50px",
    marginRight: "20px"
  },

  progressBar: {
    width: "200px",
    height: "10px",
    backgroundColor: "#ddd",
    borderRadius: "10px",
    marginTop: "5px"
  },

  progressFill: {
    width: "60%",
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: "10px"
  },

  subjectRow: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "30px"
  },

  subjectCard: {
    backgroundColor: "#FFF8E7",
    padding: "30px",
    borderRadius: "20px",
    width: "200px",
    textAlign: "center",
    boxShadow: "0px 6px 12px rgba(0,0,0,0.1)",
    cursor: "pointer"
  },

  lessonPanel: {
    backgroundColor: "#FFF8E7",
    padding: "20px",
    borderRadius: "20px",
    marginTop: "30px",
    boxShadow: "0px 6px 12px rgba(0,0,0,0.1)"
  },

  definition: {
    marginTop: "10px",
    backgroundColor: "#FFE0B2",
    padding: "10px",
    borderRadius: "10px"
  },

  navRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    gap: "20px"
  },

  blueBtn: {
    backgroundColor: "#1976D2",
    color: "white",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    border: "none",
    cursor: "pointer"
  },

  orangeBtn: {
    backgroundColor: "#FB8C00",
    color: "white",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    border: "none",
    cursor: "pointer"
  },

  logout: {
    marginTop: "30px",
    padding: "8px 20px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#E53935",
    color: "white",
    cursor: "pointer"
  }
};

export default Dashboard;
