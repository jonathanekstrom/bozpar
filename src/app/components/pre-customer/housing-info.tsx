"use client";

import { useState, useEffect } from "react";
import PreCustomerLayout from "./layout";
import { HousingInfo } from "./internal-contracts";
import { addToLocalStorage, getSectionData } from "@/app/lib/use-local-storage";

const HousingInfoComponent = () => {
  const [formData, setFormData] = useState<HousingInfo>({
    propertyType: "",
  });
  const [errors, setErrors] = useState<Partial<HousingInfo>>({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedData = getSectionData("housingInfo");
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

  const validate = (): Partial<HousingInfo> => {
    const newErrors: Partial<HousingInfo> = {};
    if (!formData.propertyType) newErrors.propertyType = "Typ av bostad är obligatorisk";

    if (formData.propertyType === "Villa" || formData.propertyType === "Annat") {
      if (!formData.address) newErrors.address = "Adress är obligatorisk";
      if (!formData.propertyDesignation) newErrors.propertyDesignation = "Fastighetsbeteckning är obligatorisk";
    }

    if (formData.propertyType === "Lägenhet") {
      if (!formData.address) newErrors.address = "Adress är obligatorisk";
      if (!formData.apartmentNumber) newErrors.apartmentNumber = "Lägenhetsnummer är obligatoriskt";
    }

    if (formData.propertyType === "Fritidshus") {
      if (!formData.ownershipType) newErrors.ownershipType = "Ägarskap är obligatoriskt";
      if (formData.ownershipType === "Fastighet") {
        if (!formData.address) newErrors.address = "Adress är obligatorisk";
        if (!formData.propertyDesignation) newErrors.propertyDesignation = "Fastighetsbeteckning är obligatorisk";
      }
      if (formData.ownershipType === "Bostadsrätt") {
        if (!formData.address) newErrors.address = "Adress är obligatorisk";
        if (!formData.apartmentNumber) newErrors.apartmentNumber = "Lägenhetsnummer är obligatoriskt";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      addToLocalStorage("housingInfo", formData);
      alert("Bostadsinformation är sparad!");
      setIsSaved(true);
      setErrors({});
    }
  };

  return (
    <PreCustomerLayout title="Bostadsinformation">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Typ av bostad */}
        <div>
          <label htmlFor="propertyType" className="block mb-2 text-lg text-gray-300">
            Typ av bostad:
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
              errors.propertyType ? "border-red-500" : "border-gray-700"
            }`}
          >
            <option value="" disabled>
              Välj typ av bostad
            </option>
            <option value="Villa">Villa</option>
            <option value="Lägenhet">Lägenhet</option>
            <option value="Fritidshus">Fritidshus</option>
            <option value="Annat">Annat</option>
          </select>
          {errors.propertyType && <p className="text-red-500 mt-1">{errors.propertyType}</p>}
        </div>

        {/* Villa eller Annat */}
        {(formData.propertyType === "Villa" || formData.propertyType === "Annat") && (
          <>
            {/* Adress */}
            <div>
              <label htmlFor="address" className="block mb-2 text-lg text-gray-300">
                Adress:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
                  errors.address ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="Skriv din adress"
              />
              {errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}
            </div>

            {/* Fastighetsbeteckning */}
            <div>
              <label htmlFor="propertyDesignation" className="block mb-2 text-lg text-gray-300">
                Fastighetsbeteckning:
              </label>
              <input
                type="text"
                id="propertyDesignation"
                name="propertyDesignation"
                value={formData.propertyDesignation || ""}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
                  errors.propertyDesignation ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="Skriv din fastighetsbeteckning"
              />
              {errors.propertyDesignation && <p className="text-red-500 mt-1">{errors.propertyDesignation}</p>}
            </div>
          </>
        )}

        {/* Lägenhet */}
        {formData.propertyType === "Lägenhet" && (
          <>
            {/* Adress */}
            <div>
              <label htmlFor="address" className="block mb-2 text-lg text-gray-300">
                Adress:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
                  errors.address ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="Skriv din adress"
              />
              {errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}
            </div>

            {/* Lägenhetsnummer */}
            <div>
              <label htmlFor="apartmentNumber" className="block mb-2 text-lg text-gray-300">
                Lägenhetsnummer:
              </label>
              <input
                type="text"
                id="apartmentNumber"
                name="apartmentNumber"
                value={formData.apartmentNumber || ""}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
                  errors.apartmentNumber ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="Skriv ditt lägenhetsnummer"
              />
              {errors.apartmentNumber && <p className="text-red-500 mt-1">{errors.apartmentNumber}</p>}
            </div>
          </>
        )}

        {/* Fritidshus */}
        {formData.propertyType === "Fritidshus" && (
          <>
            {/* Ägarskap */}
            <div>
              <label htmlFor="ownershipType" className="block mb-2 text-lg text-gray-300">
                Ägarskap:
              </label>
              <select
                id="ownershipType"
                name="ownershipType"
                value={formData.ownershipType || ""}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
                  errors.ownershipType ? "border-red-500" : "border-gray-700"
                }`}
              >
                <option value="" disabled>
                  Välj ägarskap
                </option>
                <option value="Fastighet">Fastighet</option>
                <option value="Bostadsrätt">Bostadsrätt</option>
              </select>
              {errors.ownershipType && <p className="text-red-500 mt-1">{errors.ownershipType}</p>}
            </div>

            {/* Fastighet eller Bostadsrätt */}
            {formData.ownershipType === "Fastighet" && (
              <>
                {/* Adress */}
                <div>
                  <label htmlFor="address" className="block mb-2 text-lg text-gray-300">
                    Adress:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
                      errors.address ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Skriv din adress"
                  />
                  {errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}
                </div>

                {/* Fastighetsbeteckning */}
                <div>
                  <label htmlFor="propertyDesignation" className="block mb-2 text-lg text-gray-300">
                    Fastighetsbeteckning:
                  </label>
                  <input
                    type="text"
                    id="propertyDesignation"
                    name="propertyDesignation"
                    value={formData.propertyDesignation || ""}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
                      errors.propertyDesignation ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Skriv din fastighetsbeteckning"
                  />
                  {errors.propertyDesignation && <p className="text-red-500 mt-1">{errors.propertyDesignation}</p>}
                </div>
              </>
            )}

            {formData.ownershipType === "Bostadsrätt" && (
              <>
                {/* Adress */}
                <div>
                  <label htmlFor="address" className="block mb-2 text-lg text-gray-300">
                    Adress:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
                      errors.address ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Skriv din adress"
                  />
                  {errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}
                </div>

                {/* Lägenhetsnummer */}
                <div>
                  <label htmlFor="apartmentNumber" className="block mb-2 text-lg text-gray-300">
                    Lägenhetsnummer:
                  </label>
                  <input
                    type="text"
                    id="apartmentNumber"
                    name="apartmentNumber"
                    value={formData.apartmentNumber || ""}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
                      errors.apartmentNumber ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="Skriv ditt lägenhetsnummer"
                  />
                  {errors.apartmentNumber && <p className="text-red-500 mt-1">{errors.apartmentNumber}</p>}
                </div>
              </>
            )}
          </>
        )}

        {/* Spara-knapp */}
        <button
          type="submit"
          className={`bg-yellow-500 text-white py-3 rounded-lg w-full hover:bg-yellow-400 transition duration-200 ${
            isSaved ? "cursor-not-allowed opacity-70" : ""
          }`}
          disabled={isSaved}
        >
          {isSaved ? "Sparat" : "Spara"}
        </button>
      </form>
    </PreCustomerLayout>
  );
};

export default HousingInfoComponent;
