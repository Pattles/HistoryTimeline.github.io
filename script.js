// Declaring important stuff
let allEvents = []

// Formatting dates into readable ones
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const day = date.getDate();

    const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
        day === 2 || day === 22 ? 'nd' :
        day === 3 || day === 23 ? 'rd' : 'th';

    return `${month} ${day}${suffix} ${year}`;
};

// # Adding a new card on button press
function handleGenerate() {
    // Clearing everything first under the div
    document.getElementById('section-events__cards').innerHTML = '';

    const cardsContainer = document.getElementById('section-events__cards');

    // Getting all relevant events
    const heroDate = document.getElementById('hero-date').value;
    const results = allEvents.filter(event => event.date === heroDate);

    // Changing headline -> What happened on [date]? – if no date/invalid date entered, default to today's date
    document.getElementById('section-events__headline').innerHTML = `What happened on ${formatDate(heroDate || new Date().toISOString().split('T')[0])}?`;

    if (results.length === 0 || !heroDate) {
        // Create a bogus card
        const card = document.createElement('div');
        card.classList.add('section-events__card');
        card.innerHTML = `
            <h4>Nothing happened!</h4>
            <p>Just kidding, I didn\'t add anything for this date</p>
        `;
        cardsContainer.appendChild(card); 
    } else {
        // Creating a new card for each event
        results.forEach(event => {
            const card = document.createElement('div');
            card.classList.add('section-events__card');
            card.innerHTML = `
                <h4>${event.title}${event.link ? ` - <a href="${event.link}" target="_blank">Read more</a>` : ''}</h4>
                <p>${event.desc}</p>
            `;
            cardsContainer.appendChild(card);
        })
    }
};

// # Generating random date
function handleRandom() {
    // Clearing everything first under the div
    document.getElementById('section-events__cards').innerHTML = '';

    const cardsContainer = document.getElementById('section-events__cards');

    // Getting a random date
    const allDates = allEvents.map(event => event.date);
    const randomDate = allDates[Math.floor(Math.random() * allDates.length)];

    // Changing headline -> What happened on [date]? – if no date/invalid date entered, default to today's date
    document.getElementById('section-events__headline').innerHTML = `What happened on ${formatDate(randomDate)}?`;

    const results = allEvents.filter(event => event.date === randomDate);

    // Creating a new card for each event
    results.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('section-events__card');
        card.innerHTML = `
            <h4>${event.title}${event.link ? ` - <a href="${event.link}" target="_blank">Read more</a>` : ''}</h4>
            <p>${event.desc}</p>
        `;
        cardsContainer.appendChild(card);
    });

}

// Handling opening the Addnew modal
function handleAddnewOpen() {
    const modalAddnew = document.getElementById('modal-addnew')

    // Making the popup visible on click
    modalAddnew.style.display = "flex";
};

// Handling closing the Addnew modal
function handleAddnewClose() {
    const modalAddnew = document.getElementById('modal-addnew')

    // Making the popup invisible on click
    modalAddnew.style.display = "none";
};

// Handling submitting content from Addnew modal with content
function handleAddnewSubmit() {
    // Getting event date & time
    const date = document.getElementById('input-addnewDate').value

    // Getting event content
    const title = document.getElementById('input-addnewTitle').value;
    const desc = document.getElementById('input-addnewDesc').value;
    const link = document.getElementById('input-addnewLink').value;

    fetch('/add-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({date, title, desc, link})
    }).then(() => {
        location.reload();
    });
};

// On page load
document.addEventListener('DOMContentLoaded', () => {
    // Fetching events.json
    fetch('/get-events')
        .then(res => res.json())
        .then(events => {
            allEvents = events;
        });

    // Changing the headline to today's date
    document.getElementById('section-events__headline').innerHTML = `What happened on ${formatDate(new Date().toISOString().split('T')[0])}?`;

    // Hero buttons
    document.getElementById('hero-btnGen').addEventListener('click', handleGenerate);
    document.getElementById('hero-btnRandom').addEventListener('click', handleRandom);

    // Addnew modal
    document.getElementById('hero-btnAddnew').addEventListener('click', handleAddnewOpen);
    document.getElementById('modal-addnewClose').addEventListener('click', handleAddnewClose);
    document.getElementById('modal-addnewSubmit').addEventListener('click', handleAddnewSubmit);
});