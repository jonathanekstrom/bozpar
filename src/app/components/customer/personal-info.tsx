"use client";

import { useEffect, useState } from "react";
import { addToLocalStorage, getSectionData } from "@/app/lib/use-local-storage";
import CustomerLayout from "./layout";
import { PersonalInfo } from "./internal-contracts";

const PersonalInfoComponent = () => {
  const [formData, setFormData] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    year: 0,
    month: 0,
    day: 0,
    martialStatus: "",
    nbrOfChilds: "",
    phoneNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState<Partial<PersonalInfo>>({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedData = getSectionData("personalInfo");
    if (savedData) {
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

  const validate = (): Partial<PersonalInfo> => {
    const newErrors: Partial<PersonalInfo> = {};
    if (!formData.firstName) newErrors.firstName = "Förnamn är obligatoriskt";
    if (!formData.lastName) newErrors.lastName = "Efternamn är obligatoriskt";
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formData.phoneNumber)) newErrors.phoneNumber = "Mobilnummer måste vara 10 siffror";
    const emailPattern = /^\S+@\S+$/i;
    if (!emailPattern.test(formData.email)) newErrors.email = "Ogiltig e-postadress";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      addToLocalStorage("personalInfo", formData);
      alert("Personlig information är sparad!");
      setIsSaved(true);
      setErrors({});
    }
  };

  return (
    <CustomerLayout title="Personlig Information">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="firstName" className="block mb-2 text-lg text-gray-300">
            Förnamn:
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`form-control ${
              errors.firstName ? "border-red-500" : "border-gray-700"
            } w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200`}
            placeholder="Skriv ditt förnamn"
          />
          {errors.firstName && <p className="text-red-500 mt-1">{errors.firstName}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="lastName" className="block mb-2 text-lg text-gray-300">
            Efternamn:
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`form-control ${
              errors.lastName ? "border-red-500" : "border-gray-700"
            } w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200`}
            placeholder="Skriv ditt efternamn"
          />
          {errors.lastName && <p className="text-red-500 mt-1">{errors.lastName}</p>}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-lg text-gray-300">Personnummer:</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="År"
              className={`form-control ${
                errors.year ? "border-red-500" : "border-gray-700"
              } p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200`}
            />
            <input
              type="number"
              name="month"
              value={formData.month}
              onChange={handleChange}
              placeholder="Månad"
              className={`form-control ${
                errors.month ? "border-red-500" : "border-gray-700"
              } p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200`}
            />
            <input
              type="number"
              name="day"
              value={formData.day}
              onChange={handleChange}
              placeholder="Dag"
              className={`form-control ${
                errors.day ? "border-red-500" : "border-gray-700"
              } p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200`}
            />
          </div>
          {errors.year && <p className="text-red-500 mt-1">{errors.year}</p>}
          {errors.month && <p className="text-red-500 mt-1">{errors.month}</p>}
          {errors.day && <p className="text-red-500 mt-1">{errors.day}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="martialStatus" className="block mb-2 text-lg text-gray-300">
            Civilstånd:
          </label>
          <select
            id="martialStatus"
            name="martialStatus"
            value={formData.martialStatus}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
              errors.martialStatus ? "border-red-500" : "border-gray-700"
            }`}
          >
            <option value="" disabled>
              Välj relationsstatus
            </option>
            <option value="Singel">Singel</option>
            <option value="Gift">Gift</option>
            <option value="Sambo">Sambo</option>
            <option value="Skild">Skild</option>
          </select>
          {errors.martialStatus && <p className="text-red-500 mt-1">{errors.martialStatus}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="nbrOfChilds" className="block mb-2 text-lg text-gray-300">
            Antal barn:
          </label>
          <select
            id="nbrOfChilds"
            name="nbrOfChilds"
            value={formData.nbrOfChilds}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
              errors.nbrOfChilds ? "border-red-500" : "border-gray-700"
            }`}
          >
            <option value="" disabled>
              Välj antalet barn
            </option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7+">7+</option>
          </select>
          {errors.nbrOfChilds && <p className="text-red-500 mt-1">{errors.nbrOfChilds}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="phoneNumber" className="block mb-2 text-lg text-gray-300">
            Mobilnummer:
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`form-control ${
              errors.phoneNumber ? "border-red-500" : "border-gray-700"
            } w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200`}
            placeholder="Skriv ditt mobilnummer"
          />
          {errors.phoneNumber && <p className="text-red-500 mt-1">{errors.phoneNumber}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-lg text-gray-300">
            E-post:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${
              errors.email ? "border-red-500" : "border-gray-700"
            } w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200`}
            placeholder="Skriv din e-postadress"
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
        </div>

        <button type="submit" className="bg-yellow-500 text-white py-3 rounded-lg w-full hover:bg-yellow-400 transition duration-200" disabled={isSaved}>
          {isSaved ? "Sparat" : "Spara"}
        </button>
      </form>
    </CustomerLayout>
  );
};

export default PersonalInfoComponent;
