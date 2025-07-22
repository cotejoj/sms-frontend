import { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = ({ studentId, onSuccess, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    courses: [],
  });
  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCoursesList(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, [token]);

  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/students/${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const student = res.data;
        setForm({
          name: student.name || '',
          email: student.email || '',
          age: student.age || '',
          gender: student.gender || '',
          courses: student.courses ? student.courses.map((c) => c._id || c) : [],
        });
      } catch (err) {
        setError('Failed to load student data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'courses') {
      const options = e.target.options;
      const selected = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) selected.push(options[i].value);
      }
      setForm((prev) => ({ ...prev, courses: selected }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (studentId) {
        await axios.put(
          `http://localhost:5000/api/students/${studentId}`,
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post('http://localhost:5000/api/students', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to save student');
    } finally {
      setLoading(false);
    }
  };

  // Close modal on clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-white bg-opacity-10 flex items-center justify-center z-50"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md max-w-lg w-full mx-4 relative"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-2xl"
          aria-label="Close form"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          {studentId ? 'Edit Student' : 'Add New Student'}
        </h2>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
          disabled={loading}
        />

        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
          disabled={loading}
        />

        <label htmlFor="age" className="block mb-1 font-medium">
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          disabled={loading}
        />

        <label htmlFor="gender" className="block mb-1 font-medium">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
          disabled={loading}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="courses" className="block mb-1 font-medium">
          Courses
        </label>
        <select
          id="courses"
          name="courses"
          multiple
          value={form.courses}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-6"
          disabled={loading}
        >
          {coursesList.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : studentId ? 'Update Student' : 'Add Student'}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
