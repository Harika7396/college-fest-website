const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// Event category filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    eventCards.forEach(card => {
      card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category);
    });
  });
});

// Agenda changes with the selected day
const agendas = [
  [
    ['09:00 AM', 'MAIN GROUNDS', 'Opening Ceremony', 'Kick off the celebration with the welcome address.', 'CEREMONY'],
    ['10:00 AM', 'COMPUTER LAB 1', 'Code Clash', 'Problem-solving challenge for coders.', 'TECH'],
    ['02:00 PM', 'OPEN-AIR STAGE', 'Rhythm Riot', 'Dance performances and group battles.', 'CULTURE'],
    ['05:00 PM', 'MAIN STAGE', 'Sunset Social', 'Music, food stalls and campus hangouts.', 'LIVE']
  ],
  [
    ['09:30 AM', 'SEMINAR HALL', 'Fest Check-in', 'Collect your event bands and find your venue.', 'WELCOME'],
    ['11:30 AM', 'INNOVATION LAB', 'AI Studio', 'A hands-on session on generative AI and prototyping.', 'WORKSHOP'],
    ['03:30 PM', 'CAMPUS QUAD', 'Campus Quest', 'Follow clues and race other teams across campus.', 'GAMES'],
    ['04:00 PM', 'OPEN-AIR STAGE', 'Open Mic Live', 'Poetry, music, comedy and stories from students.', 'CULTURE']
  ],
  [
    ['09:30 AM', 'EXHIBITION HALL', 'Project Expo', 'Student teams present their ideas and prototypes.', 'EXPO'],
    ['12:00 PM', 'FOOD COURT', 'Food & Fun Break', 'Explore food stalls and student pop-ups.', 'SOCIAL'],
    ['02:30 PM', 'MAIN STAGE', 'Final Performances', 'A final showcase of standout student talent.', 'CULTURE'],
    ['05:00 PM', 'MAIN GROUNDS', 'Awards & Closing', 'Celebrate winners and close the fest together.', 'CEREMONY']
  ]
];

const agenda = document.querySelector('#agenda');
const dayButtons = document.querySelectorAll('.day-btn');

function renderAgenda(dayIndex) {
  agenda.innerHTML = agendas[dayIndex].map(item => `
    <div class="agenda-row">
      <time>${item[0]}</time><span class="agenda-dot"></span>
      <div><small>${item[1]}</small><h3>${item[2]}</h3><p>${item[3]}</p></div>
      <span class="agenda-type">${item[4]}</span>
    </div>
  `).join('');
}

dayButtons.forEach(button => {
  button.addEventListener('click', () => {
    dayButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    renderAgenda(Number(button.dataset.day));
  });
});

// Front-end demo validation only. No data is transmitted or stored.
const form = document.querySelector('#registrationForm');
const formMessage = document.querySelector('#formMessage');

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const name = document.querySelector('#fullName').value.trim();
  formMessage.textContent = `Thanks, ${name}! Your demo registration is complete on this page. No data was sent or saved.`;
  form.reset();
});
