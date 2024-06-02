document.addEventListener('DOMContentLoaded', () => {
    const applicationForm = document.getElementById('applicationForm');
    const applicationsTable = document.getElementById('applicationsTable').getElementsByTagName('tbody')[0];

    // Load applications from local storage
    const applications = JSON.parse(localStorage.getItem('applications')) || [];

    applications.forEach(application => addApplicationToTable(application));

    applicationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const university = document.getElementById('university').value;
        const program = document.getElementById('program').value;
        const status = document.getElementById('status').value;
        const applicationDate = document.getElementById('applicationDate').value;
        const notes = document.getElementById('notes').value;

        const application = { university, program, status, applicationDate, notes };
        addApplicationToTable(application);

        // Save to local storage
        applications.push(application);
        localStorage.setItem('applications', JSON.stringify(applications));

        applicationForm.reset();
    });

    function addApplicationToTable(application) {
        const newRow = applicationsTable.insertRow();

        newRow.innerHTML = `
            <td data-label="University">${application.university}</td>
            <td data-label="Program">${application.program}</td>
            <td data-label="Status" class="status">${application.status}</td>
            <td data-label="Application Date">${application.applicationDate}</td>
            <td data-label="Notes" class="notes">${application.notes}</td>
            <td class="actions">
                <button class="update-status">Update Status</button>
                <button class="update-notes">Update Notes</button>
                <button class="remove-application">Remove</button>
            </td>
        `;

        const updateStatusButton = newRow.querySelector('.update-status');
        updateStatusButton.addEventListener('click', () => {
            const newStatus = prompt('Enter new status:');
            if (newStatus) {
                newRow.querySelector('.status').innerText = newStatus;
                application.status = newStatus;
                localStorage.setItem('applications', JSON.stringify(applications));
            }
        });

        const updateNotesButton = newRow.querySelector('.update-notes');
        updateNotesButton.addEventListener('click', () => {
            const newNotes = prompt('Enter new notes:');
            if (newNotes) {
                newRow.querySelector('.notes').innerText = newNotes;
                application.notes = newNotes;
                localStorage.setItem('applications', JSON.stringify(applications));
            }
        });

        const removeButton = newRow.querySelector('.remove-application');
        removeButton.addEventListener('click', () => {
            applicationsTable.deleteRow(newRow.rowIndex - 1);
            const index = applications.indexOf(application);
            applications.splice(index, 1);
            localStorage.setItem('applications', JSON.stringify(applications));
        });
    }
});
