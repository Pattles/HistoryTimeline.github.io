// Handles closing an overlay via 'cancel' button
function closeOverlay(overlayObj, noteContent='') {
    const overlayClose = overlayObj.querySelector('.overlay-actions__cancel');

    overlayClose.addEventListener('click', () => {
        overlayObj.style.display = 'none';
        document.body.style.overflow = '';

        if ( noteContent != '' ) {
            const noteObj = overlayObj.querySelector('.overlay-form__note');
            noteObj.innerHTML = noteContent
        };
    })
}

// Handles adding Event to db
async function addEvent(date, title, desc, link, password) {
    const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-admin-password': password
        },
        body: JSON.stringify({ date, title, desc, link })
    });

    return response.ok;
}

// Responsible for opening/closing the gate overlay
document.addEventListener('DOMContentLoaded', () => {    
    const gateOverlay = document.getElementById('overlay-gate');
    const gateOpen = document.getElementById('gate-open')

    // Opening the overlay
    gateOpen.addEventListener('click', () => {
        gateOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    })

    // Closing the overlay via 'cancel' button
    closeOverlay(
        gateOverlay, 
        '&nbsp;',
    )
});

// Clears contribute form values
function clearContribute() {
    document.getElementById('contribute-date').value = '';
    document.getElementById('contribute-title').value = '';
    document.getElementById('contribute-desc').value = '';
    document.getElementById('contribute-link').value = '';
    return
}

// Responsible for closing contribute overlay via 'cancel' button
document.addEventListener('DOMContentLoaded', () => {    
    const contributeOverlay = document.getElementById('overlay-contribute');

    // Closing the overlay via 'cancel' button
    closeOverlay(
        contributeOverlay,
    );
    clearContribute();
});

// Handling contribute overlay
document.addEventListener('DOMContentLoaded', () => {
    const gateOverlay = document.getElementById('overlay-gate');
    
    const gateContinue = gateOverlay.querySelector('.overlay-actions__continue');
    const gatePass = document.getElementById('gate-pass');

    // Sending auth API request
    gateContinue.addEventListener('click', async () => {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: gatePass.value })
        });

        if (response.ok) {
            // Correct password; auth passed
            // Closing gate overlay
            closeOverlay(
                gateOverlay,
            )

            // Opening log overlay
            const contributeOverlay = document.getElementById('overlay-contribute');
            contributeOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Saving Event to db
            const saveBtn = contributeOverlay.querySelector('.overlay-actions__continue');

            saveBtn.addEventListener('click', async () => {
                // Getting form values
                const formDate = document.getElementById('contribute-date').value;
                const formTitle = document.getElementById('contribute-title').value;
                const formDesc = document.getElementById('contribute-desc').value;
                const formLink = document.getElementById('contribute-link').value;

                // Adding event to db
                await addEvent(formDate, formTitle, formDesc, formLink, gatePass.value);

                // Closing contribute overlay
                contributeOverlay.style.display = 'none';
                clearContribute();

                // Force reloading the page
                location.reload();
                return
            })

        } else if (response.status === 401) {
            // Incorrect password; auth failed
            const note = gateOverlay.querySelector('.overlay-form__note');
            note.innerHTML = 'Incorrect password. Please try again.'
        }
    })

})