import axios from "axios";
import {
  FileIcon,
  Info,
  Mail,
  Phone,
  School,
  User,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
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

const DEADLINE = new Date("2026-08-14T23:59:59+07:00");

const FormRegister: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    nama: "",
    sekolah: "",
    telepon: "",
    email: "",
    lomba: "",
    kartupelajar: "",
  });

  const [showSuccessModal, setShowSuccessModal] =
    useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] =
    useState<boolean>(false);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [openModal, setOpenModal] =
    useState<boolean>(false);

  const [submitError, setSubmitError] =
    useState<string>("");

  // Status deadline
  const [isRegistrationClosed, setIsRegistrationClosed] =
    useState<boolean>(new Date() >= DEADLINE);

  useEffect(() => {
    const checkDeadline = () => {
      const now = new Date();

      setIsRegistrationClosed(now >= DEADLINE);
    };

    // Check immediately
    checkDeadline();

    // Check every second
    const interval = setInterval(checkDeadline, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ): void => {
    const { name, value } = e.target;

    if (isRegistrationClosed) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const selectedCompetition = competitions.find(
    (comp) => comp.id === formData.lomba,
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (new Date() >= DEADLINE) {
      setIsRegistrationClosed(true);

      setSubmitError(
        "Pendaftaran telah ditutup. Batas pendaftaran adalah 15 Agustus 2026 pukul 23.59 WIB.",
      );

      return;
    }

    if (isSubmitting) {
      return;
    }

    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const API_URL =
      import.meta.env.VITE_API_URL ||
      "http://localhost:5000";

    try {

      await axios.post(`${API_URL}/api/register`, {
        nama: formData.nama.trim(),
        email: formData.email.trim(),
        sekolah: formData.sekolah.trim(),
        kartupelajar: formData.kartupelajar.trim(),
        telepon: formData.telepon.trim(),
        lomba: formData.lomba,
        lomba_name:
          selectedCompetition?.name ||
          formData.lomba,
        whatsapp_group:
          selectedCompetition?.whatsapp || "",
      });

      setShowSuccessModal(true);

      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error(
        "Submission error:",
        error,
      );

      if (
        axios.isAxiosError(error) &&
        error.response?.data?.message
      ) {
        setSubmitError(
          error.response.data.message,
        );
      } else {
        setSubmitError(
          "Gagal mengirim pendaftaran. Silakan periksa koneksi Anda dan coba lagi.",
        );
      }
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
    setSubmitError("");
  };


  const copyToClipboard = async (
    text: string,
  ): Promise<void> => {
    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea =
          document.createElement("textarea");

        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);
      }
    } catch (error) {
      console.error(
        "Failed to copy to clipboard:",
        error,
      );
    }
  };

  return (
    <div className="bg-[#0F0E0E] min-h-screen flex items-center justify-center p-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-primary/5 rounded-full blur-3xl animate-pulse" />

        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-dark/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <div className="fixed bottom-10 right-5 z-30 flex flex-col items-end gap-3">
        {/* Alert bubble */}
        <div className="relative bg-neutral-black border border-orange-primary/30 rounded-2xl shadow-2xl p-3 w-64 animate-bounce">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-orange-primary font-semibold">
                PIC Lomba
              </p>

              <p className="text-xs text-zinc-400">
                Siap membantu pendaftaran Anda
              </p>
            </div>
          </div>

          {/* Triangle */}
          <div className="absolute -bottom-2 right-5 w-4 h-4 bg-neutral-black border-r border-b border-orange-primary/30 rotate-45" />
        </div>

        {/* Help button */}
        <div
          onClick={() => setOpenModal(true)}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" ||
              e.key === " "
            ) {
              e.preventDefault();
              setOpenModal(true);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Buka informasi bantuan pendaftaran"
          className="bg-orange-primary text-neutral-white rounded-full p-3 shadow-lg hover:bg-orange-dark transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-primary focus:ring-offset-2 focus:ring-offset-[#0F0E0E]"
        >
          <Info size={20} />
        </div>
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Back button */}
        <div className="flex justify-start mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-zinc-700 bg-neutral-black/80 rounded-full text-neutral-white text-sm font-semibold hover:bg-zinc-800/50 transition-all cursor-pointer"
          >
            <span className="text-[10px] leading-none">
              ◀
            </span>

            Back
          </Link>
        </div>

        {/* Header */}
        <FormHeader />

        <form
          onSubmit={handleSubmit}
          className={`bg-neutral-black rounded-2xl p-8 border border-orange-primary/15 shadow-2xl ${
            isRegistrationClosed
              ? "opacity-90"
              : ""
          }`}
          id="formRegister"
          noValidate
        >
          <div className="space-y-6">

            {isRegistrationClosed && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-5 text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                    <span className="text-red-400 text-xl">
                      !
                    </span>
                  </div>
                </div>

                <h3 className="text-red-400 font-semibold text-lg">
                  Pendaftaran Ditutup
                </h3>

                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                  Pendaftaran telah ditutup.
                  <br />
                  Batas pendaftaran:
                  <br />
                  <span className="text-zinc-300 font-medium">
                    15 Agustus 2026, 23.00 WIB
                  </span>
                </p>
              </div>
            )}

            {submitError && !isRegistrationClosed && (
              <div
                role="alert"
                className="bg-red-500/10 border border-red-500/40 text-red-400 text-sm rounded-lg p-3"
              >
                {submitError}
              </div>
            )}

            {!isRegistrationClosed && (
              <>
                {/* Nama */}
                <FormField
                  label="Nama Lengkap"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Masukkan Nama Lengkap"
                  error={errors.nama}
                  icon={User}
                />

                {/* Email */}
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

                {/* Sekolah */}
                <FormField
                  label="Asal Sekolah/Instansi"
                  name="sekolah"
                  value={formData.sekolah}
                  onChange={handleInputChange}
                  placeholder="Masukkan Nama Sekolah/Universitas"
                  error={errors.sekolah}
                  icon={School}
                />

                {/* Berkas */}
                <FormField
                  label="Berkas"
                  name="kartupelajar"
                  value={formData.kartupelajar}
                  onChange={handleInputChange}
                  placeholder="Lampirkan link Google Drive"
                  error={errors.kartupelajar}
                  icon={FileIcon}
                  description="Mohon Lampirkan link Google Drive untuk diisi berkas dengan berupa Kartu pelajar/Identitas, Foto formal terbaru. Pastikan link Google Drive telah diatur dapat diakses panitia/admin (publik)."
                />

                {/* WhatsApp */}
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

                {/* Competition */}
                <SelectField
                  label="Pilih Lomba"
                  name="lomba"
                  value={formData.lomba}
                  onChange={handleInputChange}
                  options={competitions}
                  error={errors.lomba}
                />

                {/* Submit */}
                <SubmitButton
                  isSubmitting={isSubmitting}
                />
              </>
            )}
            {isRegistrationClosed && (
              <div className="text-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 text-sm font-medium hover:bg-zinc-800 hover:text-white transition-all"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            )}
          </div>
        </form>
      </div>

      {selectedCompetition && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={closeModal}
          formData={formData}
          selectedCompetition={selectedCompetition}
          copyToClipboard={copyToClipboard}
        />
      )}

      <ModalInfo
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default FormRegister;
