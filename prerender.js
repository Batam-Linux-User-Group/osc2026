import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

async function prerender() {
  const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
  
  // Load entry-server module
  const { render } = await import('./dist/server/entry-server.js');

  // Daftar routes statis yang akan di-pre-render
  const routesToPrerender = [
    { url: '/', filename: 'index.html' },
    { url: '/daftar', filename: 'daftar/index.html' },
    { url: '/leaderboard', filename: 'leaderboard/index.html' },
    { url: '/login', filename: 'login/index.html' },
    { url: '/404', filename: '404.html' }
  ];

  const seoData = {
    '/': {
      title: 'Open Source Competition 2026 | Beranda',
      meta: `
    <meta name="description" content="Kompetisi IT nasional Open Source Competition 2026 yang diselenggarakan oleh Batam Linux User Group di Politeknik Negeri Batam." />
    <meta property="og:title" content="Open Source Competition 2026" />
    <meta property="og:description" content="Ajang kompetisi IT nasional berbasis open source untuk siswa dan mahasiswa di seluruh Indonesia." />
    <meta property="og:type" content="website" />`
    },
    '/daftar': {
      title: 'Pendaftaran Lomba | OSC 2026',
      meta: `
    <meta name="description" content="Formulir Pendaftaran Resmi Open Source Competition 2026. Daftarkan diri atau tim sekolah/kampus Anda sekarang!" />
    <meta property="og:title" content="Pendaftaran Lomba OSC 2026" />
    <meta property="og:description" content="Daftarkan diri atau tim sekolah/kampus Anda di ajang Open Source Competition 2026 sekarang!" />`
    },
    '/leaderboard': {
      title: 'Peringkat Peserta | OSC 2026',
      meta: `
    <meta name="description" content="Hasil nilai dan peringkat kompetisi Web Design, Linux System Admin, Network Simulation, & Mascot Design OSC 2026." />
    <meta property="og:title" content="Leaderboard Peserta OSC 2026" />
    <meta property="og:description" content="Pantau nilai dan peringkat peserta kompetisi IT nasional OSC 2026 secara live!" />`
    },
    '/login': {
      title: 'Login Admin | OSC 2026',
      meta: '\n    <meta name="robots" content="noindex, nofollow" />'
    },
    '/404': {
      title: 'Halaman Tidak Ditemukan | OSC 2026',
      meta: '\n    <meta name="robots" content="noindex, nofollow" />'
    }
  };

  for (const route of routesToPrerender) {
    const { html: appHtml } = render(route.url);

    // Sisipkan html ke template
    let html = template.replace(`<!--app-html-->`, appHtml)
                          .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);

    const seo = seoData[route.url] || seoData['/404'];

    if (seo) {
      // Ganti title statis dari index.html dengan dynamic title
      html = html.replace(/<title>.*?<\/title>/, `<title>${seo.title}</title>`);

      // Sisipkan meta tags dinamis sebelum tag </head>
      html = html.replace('</head>', `${seo.meta}\n  </head>`);
    }

    const filePath = toAbsolute(`dist/${route.filename}`);
    
    // Buat parent directory jika belum ada
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, html);
    console.log(`[pre-render] generated: ${route.filename}`);
  }

  // Bersihkan build server temporary folder
  fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true });
  console.log(`[pre-render] server folder cleaned successfully.`);
}

prerender().catch((err) => {
  console.error('[pre-render] failed:', err);
  process.exit(1);
});
