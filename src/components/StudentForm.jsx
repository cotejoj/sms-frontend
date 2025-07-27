import { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = ({ studentId, onSuccess, onClose }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    status: 'Active',
    email: '',
    age: '',
    gender: '',
    course: '',
    addressLine1: '',
    addressLine2: '',
    state: '',
    country: '',
    postalCode: '',
    city: '',
    birthdate: '',
    birthplace: '',
    phone: '',
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
          firstName: student.firstName || '',
          lastName: student.lastName || '',
          middleName: student.middleName || '',
          status: student.status || 'Active',
          email: student.email || '',
          age: student.age || '',
          gender: student.gender || '',
          course: student.course?._id || '',
          addressLine1: student.addressLine1 || '',
          addressLine2: student.addressLine2 || '',
          state: student.state || '',
          country: student.country || '',
          postalCode: student.postalCode || '',
          city: student.city || '',
          birthdate: student.birthdate?.substring(0, 10) || '',
          birthplace: student.birthplace || '',
          phone: student.phone || '',
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
    setForm((prev) => ({ ...prev, [name]: value }));
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
          { headers: { Authorization: `Bearer ${token}` } }
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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
    >
    <form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded-xl shadow-xl max-w-4xl w-full mx-4 overflow-y-auto max-h-[95vh] relative"
    >
    <button
      type="button"
      onClick={onClose}
      className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-2xl"
    >
      &times;
    </button>

    <h2 className="text-2xl font-semibold mb-6">
      {studentId ? 'Edit Student' : 'Add New Student'}
    </h2>
    <div className="mb-6 flex items-center gap-3">
      <span className="font-medium text-gray-700">Status:</span>
      <button
        type="button"
        onClick={() =>
          setForm((prev) => ({
            ...prev,
            status: prev.status === 'Active' ? 'Inactive' : 'Active',
          }))
        }
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          form.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            form.status === 'Active' ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm text-gray-600">{form.status === 'Active' ? 'Active' : 'InActive'}</span>
    </div>


    {error && <div className="mb-4 text-red-600">{error}</div>}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* FIRST NAME */}
      <div>
        <label className="block mb-1 font-medium">First Name</label>
        <input required name="firstName" value={form.firstName} onChange={handleChange}  className="w-full p-2 border rounded" />
      </div>
      {/* Middle Name */}
      <div>
        <label className="block mb-1 font-medium">Middle Name (Optional)</label>
        <input name="middleName" value={form.middleName} onChange={handleChange}  className="w-full p-2 border rounded" />
      </div>
      {/* LAST NAME */}
      <div>
        <label className="block mb-1 font-medium">Last Name</label>
        <input name="lastName" value={form.lastName} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>

      {/* EMAIL */}
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>

      {/* PHONE */}
      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      {/* AGE */}
      <div>
        <label className="block mb-1 font-medium">Age</label>
        <input type="number" name="age" value={form.age} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      {/* GENDER */}
      <div>
        <label className="block mb-1 font-medium">Gender</label>
        <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* COURSE */}
      <div>
        <label className="block mb-1 font-medium">Course</label>
        <select name="course" value={form.course} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select a course</option>
          {coursesList.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* BIRTHDATE */}
      <div>
        <label className="block mb-1 font-medium">Birthdate</label>
        <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      {/* BIRTHPLACE */}
      <div>
        <label className="block mb-1 font-medium">Birthplace</label>
        <input name="birthplace" value={form.birthplace} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      {/* ADDRESS LINE 1 */}
      <div>
        <label className="block mb-1 font-medium">Address Line 1</label>
        <input name="addressLine1" value={form.addressLine1} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      {/* ADDRESS LINE 2 */}
      <div>
        <label className="block mb-1 font-medium">Address Line 2</label>
        <input name="addressLine2" value={form.addressLine2} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
        {/* City */}
      <div>
        <label className="block mb-1 font-medium">City</label>
        <input name="city" value={form.city} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      {/* STATE */}
      <div>
        <label className="block mb-1 font-medium">State</label>
        <input name="state" value={form.state} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      {/* Postal Code */}
      <div>
        <label className="block mb-1 font-medium">Postal Code</label>
        <input type='number' name="postalCode" value={form.postalCode} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      
      {/* COUNTRY */}
      <div>
        <label className="block mb-1 font-medium">Country</label>
        <input name="country" value={form.country} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

    </div>

      {/* SUBMIT BUTTON */}
      <div className="mt-6 text-right">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : studentId ? 'Update Student' : 'Add Student'}
        </button>
      </div>
    </form>
    </div>
  );
};

export default StudentForm;
