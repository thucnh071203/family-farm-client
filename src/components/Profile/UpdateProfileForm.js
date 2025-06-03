import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAddress from '../../hooks/useAddress';

const UpdateProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    gender: '',
    email: '',
    phone: '',
    province: '', // Thay cho city
    district: '', // Thêm trường district
    ward: '', // Thay cho address
    country: 'Vietnam', // Cố định
    school: '',
    workplace: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    province: '', // Thay cho city
    ward: '', // Thay cho address
    country: '',
  });

  // Sử dụng useAddress hook
  const { provinces, districts, wards } = useAddress(formData.province, formData.district);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === 'province' ? { district: '', ward: '' } : {}), // Reset district và ward khi province thay đổi
      ...(name === 'district' ? { ward: '' } : {}), // Reset ward khi district thay đổi
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      province: '',
      ward: '',
      country: '',
    };
    let isValid = true;

    // Check for empty required fields
    const requiredFields = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      province: formData.province.trim(),
      ward: formData.ward.trim(),
      country: formData.country.trim(),
    };

    for (let field in requiredFields) {
      if (!requiredFields[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (requiredFields.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Basic phone validation (at least 10 digits)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (requiredFields.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (at least 10 digits)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Chuẩn bị dữ liệu để gửi (ánh xạ tên đầy đủ cho API hoặc hiển thị)
      const submittedData = {
        ...formData,
        province: provinces.find((p) => p.id === formData.province)?.name_en || '',
        district: districts.find((d) => d.id === formData.district)?.name_en || '',
        ward: wards.find((w) => w.id === formData.ward)?.name_en || '',
      };
      toast.success('PROFILE UPDATED SUCCESSFULLY!');
      console.log('Form submitted:', submittedData);
    }
  };

  return (
    <div className="w-full p-8 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex flex-col p-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="name">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={`mt-1 p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="flex flex-col p-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="birthday">
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <div className="flex mt-1 space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Other
              </label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex flex-col p-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className={`mt-1 p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div className="flex flex-col p-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="phone">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone"
              className={`mt-1 p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
          <div className="flex flex-col p-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="country">
              Country *
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              readOnly
              className={`mt-1 p-2 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md bg-gray-100 cursor-not-allowed`}
            />
            {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex flex-col p-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="province">
              Province/City *
            </label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className={`mt-1 p-2 border ${errors.province ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select province/city</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name_en}
                </option>
              ))}
            </select>
            {errors.province && <p className="mt-1 text-sm text-red-500">{errors.province}</p>}
          </div>
          <div className="flex flex-col p-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="district">
              District *
            </label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={`mt-1 p-2 border ${errors.district ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={!formData.province}
            >
              <option value="">Select district</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name_en}
                </option>
              ))}
            </select>
            {errors.district && <p className="mt-1 text-sm text-red-500">{errors.district}</p>}
          </div>
          <div className="flex flex-col p-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="ward">
              Ward (Address) *
            </label>
            <select
              id="ward"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              className={`mt-1 p-2 border ${errors.ward ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={!formData.district}
            >
              <option value="">Select ward</option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name_en}
                </option>
              ))}
            </select>
            {errors.ward && <p className="mt-1 text-sm text-red-500">{errors.ward}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex flex-col p-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="school">
              School
            </label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="Your school"
              className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="workplace">
              Workplace
            </label>
            <input
              type="text"
              id="workplace"
              name="workplace"
              value={formData.workplace}
              onChange={handleChange}
              placeholder="Your workplace"
              className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="flex flex-col p-2">
            <button
              type="submit"
              className="w-full px-4 py-2 text-black bg-white rounded-lg hover:bg-green-600 border border-solid "
            >
              Back
            </button>
          </div>

          <div className="flex flex-col p-2">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#26ACE2] rounded-lg hover:bg-[#5688f3]"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;