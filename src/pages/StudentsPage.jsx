import { useEffect, useState } from 'react';
import axios from 'axios';
import StudentForm from '../components/StudentForm'; // Adjust the path as needed

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const limit = 5;

  const token = localStorage.getItem('token');

  const fetchStudents = async () => {
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (gender) params.gender = gender;
      if (course) params.course = course;

      const res = await axios.get('http://localhost:5000/api/students', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setStudents(res.data.students);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      // Optionally handle errors (e.g., logout on 401)
    }
  };

  // Reset page to 1 whenever filters/search change
  useEffect(() => {
    setPage(1);
  }, [search, gender, course]);

  useEffect(() => {
    fetchStudents();
  }, [page, search, gender, course]);

  const openForm = (studentId = null) => {
    setEditingStudentId(studentId);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingStudentId(null);
    setShowForm(false);
    fetchStudents();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex justify-between items-center">
        Students
        <button
          onClick={() => openForm()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Student
        </button>
      </h1>

      {showForm && (
        <StudentForm studentId={editingStudentId} onSuccess={closeForm} onClose={() => setShowForm(false)}/>
      )}

      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Filter by course ID"
          className="p-2 border rounded"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
      </div>

      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Enrollment Number</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Courses</th>
            <th className="p-3 text-left">Actions</th> {/* Added for Edit */}
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-3 text-center">
                No students found.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id} className="border-t">
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.enrollmentNumber}</td>
                <td className="p-3">{student.gender}</td>
                <td className="p-3">
                  {student.courses && student.courses.length > 0
                    ? student.courses.map((c) => c.name || c).join(', ')
                    : '—'}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => openForm(student._id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentsPage;
