import axios from "axios";
import { useState } from "react";
import BACKEND_API from "../config/config";
import { useNavigate } from "react-router-dom";

const RequestReferralForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobRole: "",
    company: "",
    resumeUrl: "",
    message: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${BACKEND_API}/referral/`);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <div className="bg-white shadow-lg rounded-md mx-auto max-w-2xl mt-6 px-6 py-6">
        <div>
          <h2 className="text-sm md:text-xl font-semibold mb-3">
            Request Referral Form
          </h2>
        </div>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label htmlFor="">
              Job Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="jobRole"
              value={formData.value}
              onChange={onChangeHandler}
              className="border border-gray-200 shadow-sm w-full rounded-sm py-2 px-2"
              placeholder="Software Engineer"
              required
            />
          </div>
          <div>
            <label htmlFor="">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.value}
              onChange={onChangeHandler}
              className="border border-gray-200 shadow-sm w-full rounded-sm py-2 px-2"
              required
              placeholder="Google"
            />
          </div>
          <div>
            <label htmlFor="">
              Resume URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="resumeUrl"
              value={formData.value}
              onChange={onChangeHandler}
              className="border border-gray-200 shadow-sm w-full rounded-sm py-2 px-2"
              required
              placeholder="Your Resume url"
            />
          </div>
          <div>
            <label htmlFor="">
              Personal Message <span className="text-red-500">*</span>
            </label>
            <textarea
              type="text"
              name="message"
              value={formData.value}
              onChange={onChangeHandler}
              className="border border-gray-200 shadow-sm w-full rounded-sm py-2 px-2"
              required
              placeholder="Describe the position and why you're a good fit..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate("/find-senior")}
              className=" border border-gray-600 px-2 py-1 font-semibold rounded-md hover:text-white hover:bg-gray-700 duration-300 cursor-pointer hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 font-semibold duration-300 cursor-pointer hover:scale-105"
            >
              Sent Request
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RequestReferralForm;
