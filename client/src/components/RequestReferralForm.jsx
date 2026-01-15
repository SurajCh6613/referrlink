import axios from "axios";
import { useState } from "react";
import BACKEND_API from "../config/config";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const RequestReferralForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    jobRole: "",
    company: "",
    resumeUrl: "",
    message: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_API}/api/referral/request/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success("Referral Request Sent Successfully");
      navigate(`/junior-dashboard`);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "Something went wrong!"
      );
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <div className="bg-white shadow-lg rounded-md mx-auto max-w-2xl section-padding h-full">
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
              value={formData.jobRole}
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
              value={formData.company}
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
              value={formData.resumeUrl}
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
              value={formData.message}
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
