"use client";

import { useEffect, useState } from "react";
import PreCustomerLayout from "./layout";
import { addToLocalStorage, getSectionData } from "@/app/lib/use-local-storage";
import { ProfessionalInfo } from "./internal-contracts";

const ProfessionalInfoComponent = () => {
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState<ProfessionalInfo>({
    employerName: "",
    employmentStatus: "",
    employmentYear: 0,
    jobTitle: "",
    monthlyIncome: 0,
  });
  const [errors, setErrors] = useState<Partial<ProfessionalInfo>>({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedData = getSectionData("professionalInfo");
    if (savedData && Object.keys(savedData).length > 0) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = (): Partial<ProfessionalInfo> => {
    const newErrors: Partial<ProfessionalInfo> = {};
    if (!formData.employerName) newErrors.employerName = "Arbetsgivarens namn är obligatoriskt";
    if (!formData.employmentStatus) newErrors.employmentStatus = "Välj anställningsstatus";
    if (!formData.jobTitle) newErrors.jobTitle = "Jobbtitel är obligatoriskt";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      addToLocalStorage("professionalInfo", formData);
      alert("Yrkesinformation är sparad!");
      setIsSaved(true);
      setErrors({});
    }
  };

  return (
    <PreCustomerLayout title="Yrkesinformation">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="employerName" className="block mb-2 text-lg text-gray-300">
            Arbetsgivarens namn:
          </label>
          <input
            type="text"
            name="employerName"
            value={formData.employerName}
            onChange={handleChange}
            className={`form-control ${
              errors.employerName ? "border-red-500" : "border-gray-700"
            } w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400`}
            placeholder="Ange arbetsgivarens namn"
          />
          {errors.employerName && <p className="text-red-500 mt-1">{errors.employerName}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="employmentStatus" className="block mb-2 text-lg text-gray-300">
            Anställningsstatus:
          </label>
          <select
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            className={`form-control ${errors.employmentStatus ? "border-red-500" : "border-gray-700"} w-full p-3 border rounded-lg bg-gray-700 text-white`}
          >
            <option value="" disabled>
              Välj anställningsstatus
            </option>
            <option value="employed">Anställd</option>
            <option value="unemployed">Arbetslös</option>
            <option value="student">Student</option>
            <option value="retired">Pensionär</option>
          </select>
          {errors.employmentStatus && <p className="text-red-500 mt-1">{errors.employmentStatus}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="employmentYear" className="block mb-2 text-lg text-gray-300">
            Anställd sedan år:
          </label>
          <input
            type="number"
            name="employmentYear"
            value={formData.employmentYear}
            onChange={handleChange}
            min="1900"
            max={currentYear}
            className={`form-control ${errors.employmentYear ? "border-red-500" : "border-gray-700"} w-full p-3 border rounded-lg bg-gray-700 text-white`}
            placeholder="Ange år"
          />
          {errors.employmentYear && <p className="text-red-500 mt-1">{errors.employmentYear}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="jobTitle" className="block mb-2 text-lg text-gray-300">
            Jobbtitel:
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className={`form-control ${errors.jobTitle ? "border-red-500" : "border-gray-700"} w-full p-3 border rounded-lg bg-gray-700 text-white`}
            placeholder="Ange jobbtitel"
          />
          {errors.jobTitle && <p className="text-red-500 mt-1">{errors.jobTitle}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="monthlyIncome" className="block mb-2 text-lg text-gray-300">
            Månatlig inkomst:
          </label>
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleChange}
            min="0"
            className={`form-control ${errors.monthlyIncome ? "border-red-500" : "border-gray-700"} w-full p-3 border rounded-lg bg-gray-700 text-white`}
            placeholder="Ange månatlig inkomst"
          />
          {errors.monthlyIncome && <p className="text-red-500 mt-1">{errors.monthlyIncome}</p>}
        </div>

        <button type="submit" className="bg-yellow-500 text-white py-3 rounded-lg w-full hover:bg-yellow-400 transition duration-200" disabled={isSaved}>
          {isSaved ? "Sparat" : "Spara"}
        </button>
      </form>
    </PreCustomerLayout>
  );
};

export default ProfessionalInfoComponent;
