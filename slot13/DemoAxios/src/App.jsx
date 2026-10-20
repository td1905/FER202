// src/App.jsx – NC6: React Router với đầy đủ routes
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PostsPage from './pages/PostsPage';
import NewPostPage from './pages/NewPostPage';
import PostDetailPage from './pages/PostDetailPage';
import EditPostPage from './pages/EditPostPage';
import NotFoundPage from './pages/NotFoundPage';
import DemoPage from './pages/DemoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Redirect / → /posts */}
          <Route index element={<Navigate to="/posts" replace />} />

          {/* NC6: CRUD routes */}
          <Route path="posts"           element={<PostsPage />} />
          <Route path="posts/new"       element={<NewPostPage />} />
          <Route path="posts/:id"       element={<PostDetailPage />} />
          <Route path="posts/:id/edit"  element={<EditPostPage />} />

          {/* Trang demo tất cả components */}
          <Route path="demo"            element={<DemoPage />} />

          {/* NC6: trang 404 */}
          <Route path="*"               element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;