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

// Initialize by showing the lead showcase by default
showLeadShowcase();
showLeadBundles();
scrollToTop();