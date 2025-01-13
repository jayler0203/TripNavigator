const searchInput = document.getElementById('search_input');
const clearBtn = document.getElementById('clear_btn');

searchInput.addEventListener('input', () => {
  clearBtn.classList.toggle('hidden', !searchInput.value);
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.classList.add('hidden');
});
