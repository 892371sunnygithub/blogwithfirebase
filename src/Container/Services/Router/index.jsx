import Login from "../../Auth/Login";
import Signup from "../../Auth/Signup";
import Logout from "../../Common/Logout";
import Blogs from "../../Pages/Blogs";
import Home from "../../Pages/Home";
import AdminNotification from "../../Pages/superadminpages/AdminNotification";
import BlogersListing from "../../Pages/superadminpages/BlogersListing";
import Dashboard from "../../Pages/superadminpages/dashboard";
import DashboardCounter from "../../Pages/superadminpages/dashboardcounter";
import UserListing from "../../Pages/superadminpages/userlisting";
import BlogListing from "../../Pages/user/BlogListing";
import CreateBlog from "../../Pages/user/CreateBlog";
import UpdateBlog from "../../Pages/user/UpdateBlog";
import UserProfilePage from "../../Pages/user/UserProfilePage";
import ProtectedRoute from "../../ProtectedRoute";
import AdminLayout from "../../view/adminlayout";
import UserLayout from "../../view/userlayout";

const Router = [
  {
    path: "/",
    element: (
      <UserLayout>
        <Home />
      </UserLayout>
    ),
  },

  {
    path: "/blogs",
    element: (
      <UserLayout>
        <Blogs />
      </UserLayout>
    ),
  },

  {
    path: "/user/blogs",
    element: (
      <UserLayout>
        <BlogListing />
      </UserLayout>
    ),
  },

  {
    path: "/user/create/blog",
    element: (
      <UserLayout>
        <CreateBlog />
      </UserLayout>
    ),
  },

  {
    path: "/user/edit/blog/:id",
    element: (
      <UserLayout>
        <UpdateBlog />
      </UserLayout>
    ),
  },

  {
    path: "/user/profile/:id",
    element: (
      <UserLayout>
        <UserProfilePage />
      </UserLayout>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/logout",
    element: <Logout />,
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <Dashboard>
            <DashboardCounter />
          </Dashboard>
        </AdminLayout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/users",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <Dashboard>
            <UserListing />
          </Dashboard>
        </AdminLayout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/bloger/list",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <Dashboard>
            <BlogersListing />
          </Dashboard>
        </AdminLayout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/notification",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <Dashboard>
            <AdminNotification />
          </Dashboard>
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
];

export default Router;
