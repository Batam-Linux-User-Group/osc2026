export interface FormData {
  nama: string;
  sekolah: string;
  telepon: string;
  lomba: string;
  kartupelajar: string;
  email: string;
}

export interface Competition {
  id: string;
  name: string;
  contactNumber: string;
  whatsapp: string;
}

export interface FormErrors {
  [key: string]: string;
}
export interface Kontak {
  nomor: string;       // Nomor asli (misal: 08...)
  whatsapp: string;    // Nomor untuk wa.me (format 62...)
  nama: string;
  lomba: string;
};
