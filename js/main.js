function showLeadShowcase() {
    document.getElementById('lead-showcase').classList.add('active');
    document.getElementById('lead-card').classList.add('border-highlight');
    

    document.getElementById('support-showcase').classList.remove('active');
    document.getElementById('support-card').classList.remove('border-highlight');
    document.getElementById('custom-showcase').classList.remove('active');
    document.getElementById('custom-card').classList.remove('border-highlight');
    // Scroll to the product showcase section
    document.getElementById('lead-showcase').scrollIntoView({behavior: 'smooth'});

}

function hideLeadShowcase() {
    document.getElementById('lead-showcase').classList.remove('active');
    document.getElementById('lead-card').classList.remove('border-highlight');
    // Scroll back to the services section
    document.getElementById('services').scrollIntoView({behavior: 'smooth'});
}


function showSupportShowcase() {
    document.getElementById('support-showcase').classList.add('active');
    document.getElementById('support-card').classList.add('border-highlight');
    

    document.getElementById('lead-showcase').classList.remove('active');
    document.getElementById('lead-card').classList.remove('border-highlight');
    document.getElementById('custom-showcase').classList.remove('active');
    document.getElementById('custom-card').classList.remove('border-highlight');
    // Scroll to the product showcase section
    document.getElementById('support-showcase').scrollIntoView({behavior: 'smooth'});

}

function hideSupportShowcase() {
    document.getElementById('support-showcase').classList.remove('active');
    document.getElementById('support-card').classList.remove('border-highlight');
    // Scroll back to the services section
    document.getElementById('services').scrollIntoView({behavior: 'smooth'});
}


function showCustomShowcase() {
    document.getElementById('custom-showcase').classList.add('active');
    document.getElementById('custom-card').classList.add('border-highlight');
    

    document.getElementById('lead-showcase').classList.remove('active');
    document.getElementById('lead-card').classList.remove('border-highlight');
    document.getElementById('support-showcase').classList.remove('active');
    document.getElementById('support-card').classList.remove('border-highlight');
    // Scroll to the product showcase section
    document.getElementById('custom-showcase').scrollIntoView({behavior: 'smooth'});
    
}

function hideCustomShowcase() {
    document.getElementById('custom-showcase').classList.remove('active');
    document.getElementById('custom-card').classList.remove('border-highlight');
    // Scroll back to the services section
    document.getElementById('services').scrollIntoView({behavior: 'smooth'});
}


function showLeadBundles() {
    document.getElementById('support-bundle-card').classList.remove('border-highlight');
    document.getElementById('support-bundles').classList.remove('active');

    document.getElementById('lead-bundle-card').classList.add('border-highlight');
    document.getElementById('lead-bundles').classList.add('active');

    document.getElementById('lead-bundles').scrollIntoView({behavior: 'smooth'});

}

function showSupportBundles() {
    document.getElementById('lead-bundle-card').classList.remove('border-highlight');
    document.getElementById('lead-bundles').classList.remove('active');

    document.getElementById('support-bundle-card').classList.add('border-highlight');
    document.getElementById('support-bundles').classList.add('active');

    document.getElementById('support-bundles').scrollIntoView({behavior: 'smooth'});
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                companyName: document.getElementById('companyName').value,
                companyDomain: document.getElementById('companyDomain').value,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                message: document.getElementById('message').value,
                preferredContact: document.querySelector('input[name="preferredContact"]:checked').value,
                dateTimeUTC: new Date().toISOString(),
                dateTimeNZT: new Date().toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" })
            };

            // Call webhook (replace with your actual webhook URL)
            const webhookUrl = 'https://dev.boostra.co.nz/webhook/29ff0371-1859-40f9-9227-116ca71c93ad';
            
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    alert('Form submitted successfully!');
                    this.reset(); // Clear the form
                } else {
                    alert('Error submitting form. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error submitting form. Please try again.');
            });
        });

// Fix for mobile position:fixed desync (especially iOS/Chrome)
window.addEventListener('scroll', () => {
  const chat = document.querySelector('.n8n-chat-toggle, #n8n-chat-toggle, .n8n-chat');
  if (chat) {
    chat.style.transform = 'translateY(0)'; // reset any visual offset
    chat.style.position = 'fixed'; // force reflow
  }
});

window.addEventListener('resize', () => {
  const chat = document.querySelector('.n8n-chat-toggle, #n8n-chat-toggle, .n8n-chat');
  if (chat) {
    chat.style.transform = 'translateY(0)';
    chat.style.position = 'fixed';
  }
});


// Initialize by showing the lead showcase by default
showLeadShowcase();
showLeadBundles();
scrollToTop();