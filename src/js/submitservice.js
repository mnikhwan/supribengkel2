
// Submit Service to whatsapp lek


function submitService() {
    // Array to store selected service
    let selectedServices = [];
    
    // Get all checkbox elements
    let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const toastContainer = document.getElementById("toast-container");

    // Loop through checkboxes and add checked values to the selectedFruits array
    checkboxes.forEach(function(checkbox) {
      selectedServices.push(checkbox.value);
    });

    // If no fruits are selected, alert the user
    if (selectedServices.length === 0) {
        // alert('Please select at least one service.');
        const toast = document.createElement("div");
        toast.innerHTML = `
        <div id="toast-danger servicekosong" class="z-50 fixed bottom-5 left-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-red-50 rounded-lg shadow-sm " role="alert">
        <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-200 rounded-lg ">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
            </svg>
            <span class="sr-only">Error icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">Please select at least one service.</div>
        
    </div>
            `;

            toastContainer.appendChild(toast);
            setTimeout(() => {
                toast.remove();
            }, 5000);
        return;
    }

    // Create the WhatsApp message string
    let message = 'Assalamualaikum Supri Bengkel Mobil.\nSaya ingin mengetahui untuk rincian service berikut:\n' + '- ' + selectedServices.join('\n- ') + '\n_Terimakasih🙏🏻._ ';

    // Create the WhatsApp URL with pre-filled message
    let whatsappUrl = 'https://wa.me/62821-3784-3802?text=' + encodeURIComponent(message);
    
    // Open the URL in a new tab
    window.open(whatsappUrl, '_blank');
}


// Ending Submit Service to whatsapp leks