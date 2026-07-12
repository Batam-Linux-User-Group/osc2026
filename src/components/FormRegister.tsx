import axios from "axios";
import {
  ArrowLeft,
  FileIcon,
  Info,
  Mail,
  Phone,
  School,
  User,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormField from "../components/Register/FormField";
import FormHeader from "../components/Register/FormHeader";
import SelectField from "../components/Register/SelectField";
import SubmitButton from "../components/Register/SubmitButton";
import SuccessModal from "../components/Register/SuccessModal";
import { competitions } from "../constant/competitions";
import { validateForm } from "../utils/validation";
import type { FormData, FormErrors } from "./../types";
import ModalInfo from "./Register/ModalInfo";

const FormRegister: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    sekolah: "",
    telepon: "",
    email: "",
    lomba: "",
    kartupelajar: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      await axios.post(`${API_URL}/api/register`, {
        nama: formData.nama.trim(),
        email: formData.email.trim(),
        sekolah: formData.sekolah.trim(),
        kartupelajar: formData.kartupelajar.trim(),
        telepon: formData.telepon.trim(),
        lomba: formData.lomba,
        lomba_name: selectedCompetition?.name || formData.lomba,
        whatsapp_group: selectedCompetition?.whatsapp || "",
      });

      setShowSuccessModal(true);
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = (): void => {
    setShowSuccessModal(false);
    document.body.style.overflow = "unset";

    // Reset form
    setFormData({
      nama: "",
      sekolah: "",
      telepon: "",
      email: "",
      lomba: "",
      kartupelajar: "",
    });
    setErrors({});
  };

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const selectedCompetition = competitions.find(
    (comp) => comp.id === formData.lomba,
  );

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-[#0F0E0E] min-h-screen flex items-center justify-center p-4 py-10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-dark/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div
        onClick={() => setOpenModal(true)}
        className="fixed bottom-10 right-5 z-30 bg-orange-primary text-neutral-white rounded-full p-3 shadow-lg hover:bg-orange-dark transition-colors cursor-pointer"
      >
        <Info size={20} />
      </div>
      {/* Main Form Container */}
      <div className="relative w-full max-w-md z-10">
        <div className="flex justify-start mb-4">
          <Link
            to={"/"}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-zinc-700 bg-neutral-black/80 rounded-full text-neutral-white text-sm font-semibold hover:bg-zinc-800/50 transition-all cursor-pointer"
          >
            <span className="text-[10px] leading-none">◀</span> Back
          </Link>
        </div>
        <FormHeader />

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-black rounded-2xl p-8 border border-orange-primary/15 shadow-2xl"
          id="formRegister"
        >
          <div className="space-y-6">
            <FormField
              label="Nama Lengkap"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              placeholder="Masukkan Nama Lengkap"
              error={errors.nama}
              icon={User}
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Masukkan Email"
              error={errors.email}
              icon={Mail}
            />

            <FormField
              label="Asal Sekolah/Instansi"
              name="sekolah"
              value={formData.sekolah}
              onChange={handleInputChange}
              placeholder="Masukkan Nama Sekolah/Universitas"
              error={errors.sekolah}
              icon={School}
            />

            <FormField
              label="Berkas"
              name="kartupelajar"
              value={formData.kartupelajar}
              onChange={handleInputChange}
              placeholder="Lampirkan link Google Drive"
              error={errors.kartupelajar}
              icon={FileIcon}
              description="Mohon Lampirkan link Google Drive untuk diisi berkas dengan berupa Kartu pelajar/Identitas, Foto formal terbaru, dan bukti pembayaran biaya pendaftaran. Pastikan link Google Drive telah diatur dapat diakses panitia/admin (publik)."
            />

            <FormField
              label="Nomor Whatsapp"
              name="telepon"
              type="tel"
              value={formData.telepon}
              onChange={handleInputChange}
              placeholder="Contoh: 0899218902"
              error={errors.telepon}
              icon={Phone}
            />

            <SelectField
              label="Pilih Lomba"
              name="lomba"
              value={formData.lomba}
              onChange={handleInputChange}
              options={competitions}
              error={errors.lomba}
            />

            <SubmitButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {selectedCompetition && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={closeModal}
          formData={formData}
          selectedCompetition={selectedCompetition}
          copyToClipboard={copyToClipboard}
        />
      )}
      <ModalInfo isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default FormRegister;
