import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import Quizzes from "./pages/Quizzes";
import CreateQuiz from "./pages/CreateQuiz";
import EditQuiz from "./pages/EditQuiz";
import ViewQuiz from "./pages/ViewQuiz";
import Questions from "./pages/Questions";
import AddQuestion from "./pages/AddQuestion";
import EditQuestion from "./pages/EditQuestion";
import ViewQuestion from "./pages/ViewQuestion";
import Subjects from "./pages/Subjects";
import Results from "./pages/Results";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentSubjects from "./pages/student/StudentSubjects";
import QuizList from "./pages/student/QuizList";
import AttemptQuiz from "./pages/student/AttemptQuiz";
import Result from "./pages/student/Result";
import StudentResults from "./pages/student/StudentResults";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>

      <Route path="/" element={<AdminDashboard />} />

      <Route path="/users" element={<Users />} />
      <Route path="/quizzes" element={<Quizzes />} />
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/edit-quiz/:id" element={<EditQuiz />} />
      <Route path="/view-quiz/:id" element={<ViewQuiz />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/add-question" element={<AddQuestion />} />
      <Route path="/edit-question" element={<EditQuestion />} />
      <Route path="/view-question" element={<ViewQuestion />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/results" element={<Results />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      

      <Route
        path="/student-dashboard"
        element={<StudentDashboard />}
      />

      <Route
        path="/student-subjects"
        element={<StudentSubjects />}
      />

      <Route
        path="/quiz-list"
        element={<QuizList />}
      />

      <Route
        path="/attempt-quiz/:id"
        element={<AttemptQuiz />}
      />


      <Route
        path="/result"
        element={<Result />}
      />

      <Route
        path="/student-results"
        element={<StudentResults />}
      />
      

    </Routes>
  );
}

export default App;