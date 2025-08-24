function showLeadShowcase() {
    document.getElementById('lead-showcase').classList.add('active');
    // Scroll to the product showcase section
    document.getElementById('lead-showcase').scrollIntoView({behavior: 'smooth'});

    document.getElementById('support-showcase').classList.remove('active');
    document.getElementById('custom-showcase').classList.remove('active');
    
}

function hideLeadShowcase() {
    document.getElementById('lead-showcase').classList.remove('active');
    // Scroll back to the services section
    document.getElementById('services').scrollIntoView({behavior: 'smooth'});
}


function showSupportShowcase() {
    document.getElementById('support-showcase').classList.add('active');
    // Scroll to the product showcase section
    document.getElementById('support-showcase').scrollIntoView({behavior: 'smooth'});

    document.getElementById('lead-showcase').classList.remove('active');
    document.getElementById('custom-showcase').classList.remove('active');
    
}

function hideSupportShowcase() {
    document.getElementById('support-showcase').classList.remove('active');
    // Scroll back to the services section
    document.getElementById('services').scrollIntoView({behavior: 'smooth'});
}


function showCustomShowcase() {
    document.getElementById('custom-showcase').classList.add('active');
    // Scroll to the product showcase section
    document.getElementById('custom-showcase').scrollIntoView({behavior: 'smooth'});

    document.getElementById('lead-showcase').classList.remove('active');
    document.getElementById('support-showcase').classList.remove('active');
    
}

function hideCustomShowcase() {
    document.getElementById('custom-showcase').classList.remove('active');
    // Scroll back to the services section
    document.getElementById('services').scrollIntoView({behavior: 'smooth'});
}

