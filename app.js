// Fast Government Scheme Monitor - Fixed Navigation JavaScript
'use strict';

// Application data (lightweight)
const appData = {
    states: [
        {name: "Uttar Pradesh", projects: 1250, completed: 890, funds: "₹150 Cr"},
        {name: "Maharashtra", projects: 980, completed: 720, funds: "₹120 Cr"},
        {name: "Bihar", projects: 850, completed: 600, funds: "₹80 Cr"},
        {name: "West Bengal", projects: 750, completed: 580, funds: "₹75 Cr"},
        {name: "Rajasthan", projects: 650, completed: 480, funds: "₹65 Cr"}
    ],
    schemes: [
        {name: "PM-AJAY Education", fund: "₹50 Cr", beneficiaries: "20L", progress: 75},
        {name: "PM-AJAY Health", fund: "₹30 Cr", beneficiaries: "15L", progress: 60},
        {name: "PM-AJAY Infrastructure", fund: "₹80 Cr", beneficiaries: "50L", progress: 45},
        {name: "PM-AJAY Skill", fund: "₹20 Cr", beneficiaries: "8L", progress: 80}
    ],
    complaints: [
        {type: "Water", location: "Lucknow, UP", status: "Progress", date: "Oct 1"},
        {type: "Road", location: "Mumbai, MH", status: "Resolved", date: "Sep 28"},
        {type: "Education", location: "Patna, BR", status: "Pending", date: "Oct 2"},
        {type: "Health", location: "Kolkata, WB", status: "Progress", date: "Sep 30"}
    ],
    alerts: [
        {type: "Fund Misuse", location: "Muzaffarpur, BR", status: "Critical"},
        {type: "Work Delay", location: "Agra, UP", status: "High"},
        {type: "Fake Info", location: "Pune, MH", status: "Medium"}
    ]
};

// Current section tracker
let currentSection = 'dashboard';

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    setupEventListeners();
    showToast('success', 'System Ready', 'Fast loading complete!');
});

// Fixed navigation system
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const section = this.getAttribute('data-section');
            if (section) {
                switchSection(section);
            }
        });
    });
}

function switchSection(sectionName) {
    console.log('Switching to section:', sectionName);
    
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionName) {
            btn.classList.add('active');
        }
    });
    
    // Update sections visibility
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
        
        // Load section-specific content
        loadSectionContent(sectionName);
        
        // Show feedback
        showToast('info', 'Navigation', `Switched to ${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`);
    } else {
        console.error('Section not found:', sectionName);
    }
}

function loadSectionContent(section) {
    switch(section) {
        case 'search':
            loadSearchContent();
            break;
        case 'alerts':
            loadAlertsContent();
            break;
        case 'engineers':
            loadEngineersContent();
            break;
        case 'complaints':
            loadComplaintsContent();
            break;
        case 'gallery':
            loadGalleryContent();
            break;
        default:
            break;
    }
}

// Search functionality
function loadSearchContent() {
    const searchInput = document.getElementById('searchInput');
    const stateFilter = document.getElementById('stateFilter');
    
    if (searchInput && !searchInput.hasEventListener) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.hasEventListener = true;
    }
    
    if (stateFilter && !stateFilter.hasEventListener) {
        stateFilter.addEventListener('change', handleStateFilter);
        stateFilter.hasEventListener = true;
    }
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    if (query.length > 0) {
        showToast('info', 'Search', `Searching for: ${query}`);
        
        // Filter state cards
        const stateCards = document.querySelectorAll('.state-card');
        stateCards.forEach(card => {
            const stateName = card.querySelector('h4').textContent.toLowerCase();
            if (stateName.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    } else {
        // Show all cards
        const stateCards = document.querySelectorAll('.state-card');
        stateCards.forEach(card => {
            card.style.display = 'block';
        });
    }
}

function handleStateFilter(e) {
    const state = e.target.value;
    const stateCards = document.querySelectorAll('.state-card');
    
    if (state) {
        showToast('info', 'Filter Applied', `Showing data for: ${e.target.options[e.target.selectedIndex].text}`);
        
        stateCards.forEach(card => {
            const stateName = card.querySelector('h4').textContent;
            if (stateName.toLowerCase().includes(state.toLowerCase()) || 
                e.target.options[e.target.selectedIndex].text === stateName) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    } else {
        showToast('info', 'Filter Cleared', 'Showing all states');
        stateCards.forEach(card => {
            card.style.display = 'block';
        });
    }
}

// Alerts functionality
function loadAlertsContent() {
    const alertFilter = document.getElementById('alertFilter');
    if (alertFilter && !alertFilter.hasEventListener) {
        alertFilter.addEventListener('change', handleAlertFilter);
        alertFilter.hasEventListener = true;
    }
}

function handleAlertFilter(e) {
    const filter = e.target.value;
    const alertCards = document.querySelectorAll('.alert-card');
    
    alertCards.forEach(card => {
        if (!filter || card.classList.contains(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    const filterText = filter ? filter.charAt(0).toUpperCase() + filter.slice(1) : 'All';
    showToast('info', 'Alerts Filtered', `Showing ${filterText} alerts`);
}

// Engineers functionality
function loadEngineersContent() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.querySelector('.upload-area');
    
    if (fileInput && !fileInput.hasEventListener) {
        fileInput.addEventListener('change', handleFileUpload);
        fileInput.hasEventListener = true;
    }
    
    if (uploadArea && !uploadArea.hasEventListener) {
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        uploadArea.hasEventListener = true;
    }
}

// Complaints functionality
function loadComplaintsContent() {
    const complaintForm = document.getElementById('complaintForm');
    if (complaintForm && !complaintForm.hasEventListener) {
        complaintForm.addEventListener('submit', handleComplaintSubmit);
        complaintForm.hasEventListener = true;
    }
}

// Gallery functionality
function loadGalleryContent() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        if (!item.hasEventListener) {
            item.addEventListener('click', function() {
                const title = this.querySelector('h6').textContent;
                showToast('info', 'Image View', title);
            });
            item.hasEventListener = true;
        }
    });
}

// Event listeners setup
function setupEventListeners() {
    // Export data function
    window.exportData = function() {
        showLoading(true);
        setTimeout(() => {
            showLoading(false);
            showToast('success', 'Export Complete', 'Data exported successfully');
        }, 1500);
    };
}

// File upload handler
function handleFileUpload(e) {
    const files = e.target.files;
    if (files.length > 0) {
        showLoading(true);
        showToast('info', 'Upload Started', `Uploading ${files.length} files...`);
        
        // Simulate upload
        setTimeout(() => {
            showLoading(false);
            showToast('success', 'Upload Complete', `Successfully uploaded ${files.length} files`);
        }, 2000);
    }
}

// Complaint form handler
function handleComplaintSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const type = e.target.querySelector('select').value;
    const description = e.target.querySelector('textarea').value;
    const location = e.target.querySelector('input[type="text"]').value;
    
    if (type && description && location) {
        showLoading(true);
        
        // Simulate submission
        setTimeout(() => {
            showLoading(false);
            showToast('success', 'Complaint Submitted', 'Your complaint has been registered');
            e.target.reset();
        }, 1500);
    } else {
        showToast('error', 'Missing Information', 'Please fill all required fields');
    }
}

// Toast notification system
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 4000);
}

// Loading indicator
function showLoading(show) {
    const indicator = document.getElementById('loadingIndicator');
    if (!indicator) return;
    
    if (show) {
        indicator.classList.remove('hidden');
    } else {
        indicator.classList.add('hidden');
    }
}

// Utility functions
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateProgress(completed, total) {
    return Math.round((completed / total) * 100);
}

// Fast search function
function quickSearch(data, query) {
    return data.filter(item => 
        JSON.stringify(item).toLowerCase().includes(query.toLowerCase())
    );
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Esc key to close modals/toasts
    if (e.key === 'Escape') {
        const toasts = document.querySelectorAll('.toast');
        toasts.forEach(toast => toast.remove());
        showLoading(false);
    }
    
    // Ctrl/Cmd + K for quick search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            switchSection('search');
            setTimeout(() => searchInput.focus(), 100);
        }
    }
    
    // Number keys for quick navigation
    if (e.key >= '1' && e.key <= '7' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const sections = ['dashboard', 'search', 'schemes', 'engineers', 'complaints', 'alerts', 'gallery'];
        const sectionIndex = parseInt(e.key) - 1;
        if (sections[sectionIndex]) {
            switchSection(sections[sectionIndex]);
        }
    }
});

// Mobile optimization - touch gestures
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
}, {passive: true});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - next section
            navigateSection(1);
        } else {
            // Swipe down - previous section
            navigateSection(-1);
        }
    }
}

function navigateSection(direction) {
    const sections = ['dashboard', 'search', 'schemes', 'engineers', 'complaints', 'alerts', 'gallery'];
    const currentIndex = sections.indexOf(currentSection);
    let newIndex = currentIndex + direction;
    
    if (newIndex < 0) newIndex = sections.length - 1;
    if (newIndex >= sections.length) newIndex = 0;
    
    switchSection(sections[newIndex]);
}

// Fast data operations
const dataOperations = {
    // Get state statistics
    getStateStats: () => {
        return appData.states.map(state => ({
            name: state.name,
            completion: calculateProgress(state.completed, state.projects),
            funds: state.funds
        }));
    },
    
    // Get pending complaints
    getPendingComplaints: () => {
        return appData.complaints.filter(c => c.status !== 'Resolved');
    },
    
    // Get critical alerts
    getCriticalAlerts: () => {
        return appData.alerts.filter(a => a.status === 'Critical');
    },
    
    // Calculate total stats
    getTotalStats: () => {
        const totalProjects = appData.states.reduce((sum, state) => sum + state.projects, 0);
        const totalCompleted = appData.states.reduce((sum, state) => sum + state.completed, 0);
        const avgProgress = calculateProgress(totalCompleted, totalProjects);
        
        return {
            totalProjects,
            totalCompleted,
            avgProgress,
            pendingComplaints: dataOperations.getPendingComplaints().length
        };
    }
};

// Performance monitoring
window.addEventListener('load', function() {
    console.log('Fast Gov Monitor loaded successfully!');
});

// Export for debugging (development only)
if (typeof window !== 'undefined') {
    window.appDebug = {
        data: appData,
        operations: dataOperations,
        switchSection,
        showToast,
        currentSection: () => currentSection
    };
}