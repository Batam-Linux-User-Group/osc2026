const axios = require('axios');

exports.register = async (req, res) => {
  try {
    const { nama, email, sekolah, kartupelajar, telepon, lomba, lomba_name, whatsapp_group } = req.body;

    if (!nama || !telepon || !lomba) {
      return res.status(400).json({ message: 'Nama, telepon, dan lomba wajib diisi' });
    }

    // Format nomor HP ke format 62xxx
    function formatNomorHP(input) {
      let nomor = input.replace(/\D/g, '');
      if (nomor.startsWith('08')) {
        nomor = '62' + nomor.slice(1);
      } else if (nomor.startsWith('8')) {
        nomor = '62' + nomor;
      }
      return nomor;
    }

    const formattedTelepon = formatNomorHP(telepon);

    // 1. Forward ke Google Apps Script
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (googleScriptUrl) {
      try {
        const formData = new URLSearchParams();
        formData.append('nama', nama);
        formData.append('email', email || '');
        formData.append('sekolah', sekolah || '');
        formData.append('kartupelajar', kartupelajar || '');
        formData.append('telepon', formattedTelepon);
        formData.append('lomba', lomba);

        await axios.post(googleScriptUrl, formData.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
      } catch (error) {
        console.error('Gagal kirim ke Google Script:', error.message);
      }
    }

    // 2. Kirim notifikasi WhatsApp
    const webhookWaUrl = process.env.WEBHOOK_WA_URL;
    if (webhookWaUrl) {
      try {
        await axios.post(
          webhookWaUrl,
          {
            to: formattedTelepon,
            message: `Halo ${nama}!\n\nTerima kasih sudah mendaftar di lomba *${lomba_name || lomba}* 🎉\n\nPendaftaranmu akan segera kami proses 💼\nPastikan semua data dan berkas yang kamu kirimkan sudah lengkap dan sesuai, ya!\n\nUntuk info selanjutnya dan koordinasi lomba, yuk gabung ke grup WhatsApp resmi lewat link berikut:\n${whatsapp_group || ''}\n\nKami tunggu semangat dan aksi terbaikmu di ajang ini! 💪🔥\n\n💡 Go Open Source, Be the Change! 🚀`,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } catch (error) {
        console.error('Gagal kirim pesan ke bot WA:', error.message);
      }
    }

    res.json({ message: 'Pendaftaran berhasil' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
