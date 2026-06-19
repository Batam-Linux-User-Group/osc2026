import type { FormData, FormErrors } from "../types";

export const validateForm = (formData: FormData): FormErrors => {
  const newErrors: FormErrors = {};

  if (!formData.nama.trim()) {
    newErrors.nama = "Nama tidak boleh kosong";
  }

  if (!formData.sekolah.trim()) {
    newErrors.sekolah = "Asal sekolah tidak boleh kosong";
  }

  if (!formData.telepon.trim()) {
    newErrors.telepon = "Nomor HP tidak boleh kosong";
  } else if (
    !/^(\+62|62|0)[0-9]{9,13}$/.test(formData.telepon.replace(/\s+/g, ""))
  ) {
    newErrors.telepon = "Format nomor HP tidak valid";
  }

  if (!formData.lomba) {
    newErrors.lomba = "Pilih lomba yang akan diikuti";
  }

  return newErrors;
};
