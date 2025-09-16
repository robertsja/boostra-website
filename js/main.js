function showLeadShowcase() {
    document.getElementById('lead-showcase').classList.add('active');
    document.getElementById('lead-card').classList.add('border-highlight');
    // Scroll to the product showcase section
    document.getElementById('lead-showcase').scrollIntoView({behavior: 'smooth'});

    document.getElementById('support-showcase').classList.remove('active');
    document.getElementById('support-card').classList.remove('border-highlight');
    document.getElementById('custom-showcase').classList.remove('active');
    document.getElementById('custom-card').classList.remove('border-highlight');

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
    // Scroll to the product showcase section
    document.getElementById('support-showcase').scrollIntoView({behavior: 'smooth'});

    document.getElementById('lead-showcase').classList.remove('active');
    document.getElementById('lead-card').classList.remove('border-highlight');
    document.getElementById('custom-showcase').classList.remove('active');
    document.getElementById('custom-card').classList.remove('border-highlight');

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
    // Scroll to the product showcase section
    document.getElementById('custom-showcase').scrollIntoView({behavior: 'smooth'});

    document.getElementById('lead-showcase').classList.remove('active');
    document.getElementById('lead-card').classList.remove('border-highlight');
    document.getElementById('support-showcase').classList.remove('active');
    document.getElementById('support-card').classList.remove('border-highlight');
    
}

function hideCustomShowcase() {
    document.getElementById('custom-showcase').classList.remove('active');
    document.getElementById('custom-card').classList.remove('border-highlight');
    // Scroll back to the services section
    document.getElementById('services').scrollIntoView({behavior: 'smooth'});
}

// Initialize by showing the lead showcase by default
showLeadShowcase();