import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AuthPage from "../pages/AuthPage";
import CoursesPage from "../pages/CoursesPage";
import HomePage from "../pages/HomePage";
import StatsPage from "../pages/StatsPage";
import WordsPage from "../pages/WordsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "courses", element: <CoursesPage /> },
      { path: "words", element: <WordsPage /> },
      {
        path: "stats",
        element: (
          <ProtectedRoute>
            <StatsPage />
          </ProtectedRoute>
        ),
      },
      { path: "auth", element: <AuthPage /> },
    ],
  },
]);

export default router;
