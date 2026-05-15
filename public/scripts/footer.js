// Updates 'Events catalogued: ?' 
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/events');
    const events = await response.json();

    const cataloguedNote = document.getElementById('footer-catalogued');

    cataloguedNote.innerHTML = `Events catalogued: ${events.length}`
})