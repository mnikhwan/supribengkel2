// Toggle mobile menu visibility
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});




// //////////////////////////////// LIST DATAAAAAAAAA////////////////////////////////////
let allItems = [];

  document.addEventListener("DOMContentLoaded", function () {
    fetch('./src/js/data/list-service.json')
      .then(response => response.json())
      .then(data => {
        allItems = flattenItems(data.kategori);
        renderTable(data.kategori);
        setupSearch();
        updateCount(allItems.length);
      })
      .catch(error => {
        console.error("Error loading JSON:", error);
        document.getElementById("kategoriTable").innerHTML =
          "<tr><td colspan='3' class='text-center py-4'>Gagal memuat data</td></tr>";
      });
  });

  function flattenItems(kategoriList) {
    return kategoriList.reduce((acc, kategori, kategoriIndex) => {
      kategori.items.forEach((item, itemIndex) => {
        acc.push({
          nama: item.nama.toLowerCase(),
          kategoriIndex,
          itemIndex,
          value: item.value,
          checkboxId: `checkbox-${kategoriIndex}-${itemIndex}`
        });
      });
      return acc;
    }, []);
  }

  function renderTable(kategoriList) {
    const table = document.getElementById("kategoriTable");
    table.innerHTML = "";

    kategoriList.forEach((kategori, kategoriIndex) => {
      table.innerHTML += `
        <thead class="text-base w-auto text-zinc-100 uppercase bg-blue-950 border-b border-gray-200">
          <tr>
            <th colspan="2" class="px-0 md:px-6 py-2 md:py-3 text-center">${kategori.nama}</th>
          </tr>
        </thead>
        <thead class="text-xs text-zinc-100 uppercase bg-blue-950/80">
          <tr>
            <th class="p-2 md:p-4">Pilih</th>
            <th class="px-2 md:px-6 text-left md:text-center">Nama Layanan</th>
          </tr>
        </thead>
        <tbody id="tbody-${kategoriIndex}"></tbody>
      `;

      const tbody = document.getElementById(`tbody-${kategoriIndex}`);

      kategori.items.forEach((item, itemIndex) => {
        const checkboxId = `checkbox-${kategoriIndex}-${itemIndex}`;
        tbody.innerHTML += `
          <tr class="bg-white border-b border-gray-200 hover:bg-gray-50 item-row" data-nama="${item.nama.toLowerCase()}">
            <td class="w-4 p-4 justify-items-center">
              <div class="flex items-center">
                <input id="${checkboxId}" value="${item.value}" type="checkbox"
                      class="w-5 h-5 text-blue-600 bg-gray-300 border-gray-300 rounded-md focus:ring-blue-500">
                <label for="${checkboxId}" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="px-2 md:px-6 py-4 font-medium text-xs md:text-sm text-gray-900 text-pretty whitespace-nowrap">
              ${item.nama}
            </th>
          </tr>
        `;
      });
    });
  }

  function setupSearch() {
    const searchInput = document.getElementById("table-search");
    searchInput.addEventListener("input", function () {
      const keyword = this.value.toLowerCase();
      const rows = document.querySelectorAll(".item-row");

      let visibleCount = 0;
      rows.forEach(row => {
        const nama = row.getAttribute("data-nama");
        const match = nama.includes(keyword);
        row.style.display = match ? "" : "none";
        if (match) visibleCount++;
      });

      updateCount(visibleCount);
    });
  }

  function updateCount(count) {
    const countSpan = document.querySelector("#listing-count span");
    countSpan.textContent = count;
  }
// //////////////////////////////// LIST DATAAAAAAAAA////////////////////////////////////










// MEDIAAAAAAAAAAAAAAAAAAAAAAAAAAA //////////////




    
    // Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const mediaItems = document.querySelectorAll('.media-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        mediaItems.forEach(item => {
          item.style.display = (filter === 'all' || item.classList.contains(filter)) ? 'block' : 'none';
        });
      });
    });

    // Modal
    const modal = document.getElementById('modalPreview');
    const modalEmbed = document.getElementById('modalEmbed');
    const modalContent = document.getElementById('modalContent');

    function openModal(type, url) {
      modal.classList.remove('hidden');
      setTimeout(() => {
        modalContent.classList.add('scale-100', 'opacity-100');
        modalContent.classList.remove('scale-95', 'opacity-0');
      }, 10);

      if (type === 'tiktok') {
        modalEmbed.innerHTML = `
          <blockquote class="tiktok-embed" cite="${url}" data-video-id="${getTiktokId(url)}" style="max-width: 100%;">
            <section>Loading TikTok...</section>
          </blockquote>
        `;
        const script = document.createElement('script');
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
      } else if (type === 'instagram') {
        modalEmbed.innerHTML = `
          <blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14" style="max-width: 100%; width: 100%;">
            <p>Loading Instagram...</p>
          </blockquote>
        `;
        const script = document.createElement('script');
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
      } else if (type === 'youtube') {
        const youtubeId = getYoutubeId(url);
        modalEmbed.innerHTML = `
          <div class="aspect-video w-full">
            <iframe class="w-full h-full rounded" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen></iframe>
          </div>
        `;
      }
    }

    function closeModal() {
      modalContent.classList.remove('scale-100', 'opacity-100');
      modalContent.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        modal.classList.add('hidden');
        modalEmbed.innerHTML = '';
      }, 300);
    }

    function getTiktokId(url) {
      const parts = url.split('/video/');
      return parts.length > 1 ? parts[1] : '';
    }

    function getYoutubeId(url) {
      const regExp = /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regExp);
      return match ? match[1] : '';
    }

    window.addEventListener('load', () => {
      if (window.instgrm) window.instgrm.Embeds.process();
    });



// MEDIAAAAAAAAAAAAAAAAAAAAAAAAAAA //////////////



// ///////////////////////CONTACT /////////////////////LADPLAPDLADPLAPDLAPDL


function openWhatsApp() {
  window.open('https://wa.me/62821-3784-3802', '_blank');
}

function sendEmail() {
  window.location.href = 'mailto:supribengkel@gmail.com';
}

function openMaps() {
  window.open('https://maps.app.goo.gl/oLbFRWGcpTDVrSPs8', '_blank');
}

// Reveal animation
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.contact-item');
  items.forEach((item, i) => {
    setTimeout(() => {
      item.classList.add('opacity-100', 'translate-y-0');
    }, i * 150);
    item.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500');
  });
});




// ///////////////////////CONTACT /////////////////////LADPLAPDLADPLAPDLAPDL