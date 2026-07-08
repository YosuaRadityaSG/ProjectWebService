const { google } = require("googleapis");
const User = require("../models/User"); // Pastikan path ini sesuai dengan projectmu

// Inisialisasi konfigurasi dasar OAuth2
const createOAuthClient = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );
};

/**
 * 1. Menghasilkan URL untuk User menghubungkan kalender.
 * Kita sisipkan `userId` ke dalam parameter `state` agar saat Google
 * mengembalikan data ke callback, kita tahu siapa user yang sedang login.
 */
const getAuthUrl = (userId) => {
  const oauth2Client = createOAuthClient();
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // Wajib agar Google selalu memberikan refresh_token
    scope: ["https://www.googleapis.com/auth/calendar.events"],
    state: userId.toString(), // Titip ID User di sini
  });
};

/**
 * 2. Fungsi untuk menukar kode dari Google menjadi Token
 * lalu menyimpannya ke database User secara otomatis.
 */
const saveTokenToUser = async (code, userId) => {
  const oauth2Client = createOAuthClient();
  const { tokens } = await oauth2Client.getToken(code);

  if (tokens.refresh_token) {
    // Simpan refresh_token ke database agar user tidak perlu login Google lagi
    await User.findByIdAndUpdate(userId, {
      google_refresh_token: tokens.refresh_token,
    });
  }

  return tokens;
};

/**
 * 3. Fungsi Utama: Membuat Jadwal di Kalender User.
 * Dipanggil SETELAH pembayaran tiket berhasil (atau simulasi berhasil).
 */
const createTrainScheduleEvent = async (userId, scheduleData) => {
  try {
    // Cari user untuk mendapatkan token Google miliknya
    const user = await User.findById(userId);
    if (!user || !user.google_refresh_token) {
      throw new Error("User belum menghubungkan akun ke Google Calendar");
    }

    const oauth2Client = createOAuthClient();
    // Gunakan refresh_token dari database. Google akan otomatis membuat access_token baru di belakang layar!
    oauth2Client.setCredentials({ refresh_token: user.google_refresh_token });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Menyusun detail acara
    const trainName = scheduleData.train_id.name || "Kereta Api"; // Pastikan sudah di-populate
    const origin = scheduleData.origin_station_id.name || "Stasiun Asal";
    const destination =
      scheduleData.destination_station_id.name || "Stasiun Tujuan";

    const event = {
      summary: `🚆 Perjalanan KAI: ${trainName}`,
      location: `Stasiun ${origin}`,
      description: `Perjalanan Anda dari ${origin} menuju ${destination}.`,
      start: {
        dateTime: scheduleData.departure_time.toISOString(), // Konversi Date mongoose ke ISO String
        timeZone: "UTC",
      },
      end: {
        dateTime: scheduleData.arrival_time.toISOString(),
        timeZone: "UTC",
      },
      reminders: {
        useDefault: false,
        overrides: [{ method: "popup", minutes: 120 }], // Ingatkan 2 jam sebelumnya
      },
    };

    // Eksekusi insert ke Google
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    return response.data.htmlLink; // Kembalikan URL kalender jika sukses
  } catch (error) {
    console.error("Gagal membuat kalender:", error.message);
    throw error; // Lempar error agar bisa ditangkap oleh controller
  }
};

module.exports = {
  getAuthUrl,
  saveTokenToUser,
  createTrainScheduleEvent,
};
