document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const linkedinInput = document.getElementById('linkedin');
    const summaryInput = document.getElementById('summary');
    const degreeInput = document.getElementById('degree');
    const majorInput = document.getElementById('major');
    const institutionInput = document.getElementById('institution');
    const yearInput = document.getElementById('year');
    const gpaInput = document.getElementById('gpa');
    
    const previewName = document.getElementById('preview-name');
    const previewEmail = document.getElementById('preview-email');
    const previewPhone = document.getElementById('preview-phone');
    const previewAddress = document.getElementById('preview-address');
    const previewLinkedin = document.getElementById('preview-linkedin');
    const previewSummary = document.getElementById('preview-summary');
    const previewDegreeMajor = document.getElementById('preview-degree-major');
    const previewInstitution = document.getElementById('preview-institution');
    const previewYear = document.getElementById('preview-year');
    const previewGpa = document.getElementById('preview-gpa');
    
    const nextButtons = document.querySelectorAll('.next-section');
    const prevButtons = document.querySelectorAll('.prev-section');
    const progressSteps = document.querySelectorAll('.progress-step');
    const formSections = document.querySelectorAll('.form-section');
    
    const addExperienceBtn = document.getElementById('add-experience');
    const experienceEntries = document.getElementById('experience-entries');
    const previewExperience = document.getElementById('preview-experience');
    
    const addProjectBtn = document.getElementById('add-project');
    const projectEntries = document.getElementById('project-entries');
    const previewProjects = document.getElementById('preview-projects');
    
    const skillInput = document.getElementById('skill-input');
    const addSkillBtn = document.getElementById('add-skill');
    const skillsList = document.getElementById('skills-list');
    const previewSkills = document.getElementById('preview-skills');
    
    const colorOptions = document.querySelectorAll('.color-option');
    const resumePreview = document.getElementById('resume-preview');
    
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const togglePreviewBtn = document.getElementById('toggle-preview');
    const previewContainer = document.querySelector('.preview-container');
    const builderContainer = document.querySelector('.builder-container');
    
    const downloadPDFBtn = document.getElementById('downloadPDF');
    const completeResumeBtn = document.getElementById('complete-resume');
    
    // Current zoom level
    let currentZoom = 1;
    
    // Initialize the app
    function init() {
        // Set up event listeners
        setupFormListeners();
        setupNavigationListeners();
        setupColorListeners();
        setupSkillsListeners();
        setupExperienceListeners();
        setupProjectListeners();
        setupPreviewListeners();
        setupActionListeners();
        
        // Initial update of the preview
        updatePreview();
    }
    
    // Set up form input listeners
    function setupFormListeners() {
        // Personal Information
        firstNameInput.addEventListener('input', updatePreview);
        lastNameInput.addEventListener('input', updatePreview);
        emailInput.addEventListener('input', updatePreview);
        phoneInput.addEventListener('input', updatePreview);
        addressInput.addEventListener('input', updatePreview);
        linkedinInput.addEventListener('input', updatePreview);
        summaryInput.addEventListener('input', updatePreview);
        
        // Education
        degreeInput.addEventListener('input', updatePreview);
        majorInput.addEventListener('input', updatePreview);
        institutionInput.addEventListener('input', updatePreview);
        yearInput.addEventListener('input', updatePreview);
        gpaInput.addEventListener('input', updatePreview);
    }
    
    // Set up section navigation
    function setupNavigationListeners() {
        // Next buttons
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentSection = this.closest('.form-section');
                const nextSectionId = this.dataset.next;
                const nextSection = document.getElementById(`${nextSectionId}-section`);
                
                // Hide current section
                currentSection.classList.remove('active');
                
                // Show next section
                nextSection.classList.add('active');
                
                // Update progress indicator
                updateProgressIndicator(nextSectionId);
                
                // Scroll to top
                window.scrollTo(0, 0);
            });
        });
        
        // Previous buttons
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentSection = this.closest('.form-section');
                const prevSectionId = this.dataset.prev;
                const prevSection = document.getElementById(`${prevSectionId}-section`);
                
                // Hide current section
                currentSection.classList.remove('active');
                
                // Show previous section
                prevSection.classList.add('active');
                
                // Update progress indicator
                updateProgressIndicator(prevSectionId);
                
                // Scroll to top
                window.scrollTo(0, 0);
            });
        });
    }
    
    // Update progress indicator
    function updateProgressIndicator(sectionId) {
        progressSteps.forEach(step => {
            step.classList.remove('active');
            if (step.dataset.step === sectionId) {
                step.classList.add('active');
            }
        });
    }
    
    // Set up color options
    function setupColorListeners() {
        // Color options
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                colorOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update color theme
                const color = this.dataset.color;
                document.body.className = '';
                document.body.classList.add(`${color}-theme`);
                
                // Show success toast
                showToast('Color Updated', 'Your resume color theme has been updated.', 'success');
            });
        });
    }
    
    // Set up skills section listeners
    function setupSkillsListeners() {
        // Add skill button
        addSkillBtn.addEventListener('click', function() {
            addSkill();
        });
        
        // Add skill on Enter key
        skillInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
            }
        });
        
        // Remove skill
        skillsList.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-skill')) {
                const skillTag = e.target.parentElement;
                skillTag.remove();
                updatePreview();
            }
        });
    }
    
    // Add a new skill
    function addSkill() {
        const skillValue = skillInput.value.trim();
        
        if (skillValue) {
            // Split by commas if multiple skills are entered
            const skills = skillValue.split(',').map(skill => skill.trim()).filter(skill => skill);
            
            skills.forEach(skill => {
                // Create skill tag
                const skillTag = document.createElement('div');
                skillTag.className = 'skill-tag';
                skillTag.innerHTML = `${skill} <span class="remove-skill">&times;</span>`;
                
                // Add to skills list
                skillsList.appendChild(skillTag);
            });
            
            // Clear input
            skillInput.value = '';
            
            // Update preview
            updatePreview();
        }
    }
    
    // Set up experience section listeners
    function setupExperienceListeners() {
        // Add experience button
        addExperienceBtn.addEventListener('click', function() {
            addExperienceEntry();
        });
        
        // Set up listeners for existing experience entries
        setupExperienceEntryListeners(experienceEntries.querySelector('.experience-entry'));
    }
    
    // Add a new experience entry
    function addExperienceEntry() {
        const newEntry = document.createElement('div');
        newEntry.className = 'experience-entry';
        newEntry.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" class="job-title form-control" placeholder="e.g., Software Engineer">
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" class="company form-control" placeholder="e.g., Google">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="text" class="start-date form-control" placeholder="e.g., 06/2020">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="text" class="end-date form-control" placeholder="e.g., Present">
                </div>
            </div>
            
            <div class="form-group">
                <label>Description</label>
                <textarea class="description form-control" rows="3" placeholder="Describe your responsibilities and achievements"></textarea>
            </div>
            
            <button class="btn btn-outline btn-sm remove-entry"><i class="fas fa-trash"></i> Remove</button>
        `;
        
        // Add to experience entries
        experienceEntries.appendChild(newEntry);
        
        // Set up listeners for the new entry
        setupExperienceEntryListeners(newEntry);
        
        // Update preview
        updatePreview();
    }
    
    // Set up listeners for an experience entry
    function setupExperienceEntryListeners(entry) {
        const inputs = entry.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updatePreview);
        });
        
        const removeBtn = entry.querySelector('.remove-entry');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                entry.remove();
                updatePreview();
            });
        }
    }
    
    // Set up project section listeners
    function setupProjectListeners() {
        // Add project button
        addProjectBtn.addEventListener('click', function() {
            addProjectEntry();
        });
        
        // Set up listeners for existing project entries
        setupProjectEntryListeners(projectEntries.querySelector('.project-entry'));
    }
    
    // Add a new project entry
    function addProjectEntry() {
        const newEntry = document.createElement('div');
        newEntry.className = 'project-entry';
        newEntry.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" class="project-name form-control" placeholder="e.g., E-commerce Website">
                </div>
                <div class="form-group">
                    <label>Year</label>
                    <input type="text" class="project-year form-control" placeholder="e.g., 2023">
                </div>
            </div>
            
            <div class="form-group">
                <label>Description</label>
                <textarea class="project-description form-control" rows="3" placeholder="Describe your project"></textarea>
            </div>
            
            <button class="btn btn-outline btn-sm remove-entry"><i class="fas fa-trash"></i> Remove</button>
        `;
        
        // Add to project entries
        projectEntries.appendChild(newEntry);
        
        // Set up listeners for the new entry
        setupProjectEntryListeners(newEntry);
        
        // Update preview
        updatePreview();
    }
    
    // Set up listeners for a project entry
    function setupProjectEntryListeners(entry) {
        const inputs = entry.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updatePreview);
        });
        
        const removeBtn = entry.querySelector('.remove-entry');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                entry.remove();
                updatePreview();
            });
        }
    }
    
    // Set up preview control listeners
    function setupPreviewListeners() {
        // Zoom in
        zoomInBtn.addEventListener('click', function() {
            if (currentZoom < 1.5) {
                currentZoom += 0.1;
                resumePreview.style.transform = `scale(${currentZoom})`;
            }
        });
        
        // Zoom out
        zoomOutBtn.addEventListener('click', function() {
            if (currentZoom > 0.5) {
                currentZoom -= 0.1;
                resumePreview.style.transform = `scale(${currentZoom})`;
            }
        });
        
        // Toggle preview
        togglePreviewBtn.addEventListener('click', function() {
            if (previewContainer.classList.contains('expanded')) {
                // Collapse preview
                previewContainer.classList.remove('expanded');
                builderContainer.style.display = 'flex';
                this.innerHTML = '<i class="fas fa-expand-alt"></i>';
            } else {
                // Expand preview
                previewContainer.classList.add('expanded');
                builderContainer.style.display = 'none';
                this.innerHTML = '<i class="fas fa-compress-alt"></i>';
            }
        });
    }
    
    // Set up action button listeners
    // Update the download PDF functionality in script.js
function setupActionListeners() {
    // Download PDF
    downloadPDFBtn.addEventListener('click', function() {
        showToast('Preparing Download', 'Your resume is being prepared for download...', 'info');
        
        // Get the resume preview element
        const element = document.getElementById('resume-preview');
        
        // Set options for html2pdf
        const opt = {
            margin:       [0.5, 0.5, 0.5, 0.5],
            filename:     'resume.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        // Generate PDF
        html2pdf().set(opt).from(element).save().then(() => {
            showToast('Download Ready', 'Your resume has been downloaded successfully!', 'success');
        }).catch(err => {
            console.error('Error generating PDF:', err);
            showToast('Download Failed', 'There was an error generating your PDF. Please try again.', 'error');
        });
    });
    
    // Complete Resume
    completeResumeBtn.addEventListener('click', function() {
        showToast('Resume Completed', 'Your resume is ready to be downloaded or shared!', 'success');
        
        // Expand preview
        previewContainer.classList.add('expanded');
        builderContainer.style.display = 'none';
        togglePreviewBtn.innerHTML = '<i class="fas fa-compress-alt"></i>';
    });
}
    
    // Update the resume preview
    function updatePreview() {
        // Personal Information
        previewName.textContent = `${firstNameInput.value} ${lastNameInput.value}`;
        previewEmail.innerHTML = `<i class="fas fa-envelope"></i> ${emailInput.value}`;
        previewPhone.innerHTML = `<i class="fas fa-phone"></i> ${phoneInput.value}`;
        previewAddress.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${addressInput.value}`;
        previewLinkedin.innerHTML = `<i class="fab fa-linkedin"></i> ${linkedinInput.value}`;
        previewSummary.textContent = summaryInput.value;
        
        // Education
        previewDegreeMajor.textContent = `${degreeInput.value} in ${majorInput.value}`;
        previewInstitution.textContent = institutionInput.value;
        previewYear.textContent = yearInput.value;
        previewGpa.textContent = gpaInput.value ? `GPA: ${gpaInput.value}` : '';
        
        // Experience
        updateExperiencePreview();
        
        // Skills
        updateSkillsPreview();
        
        // Projects
        updateProjectsPreview();
    }
    
    // Update the experience section in the preview
    function updateExperiencePreview() {
        previewExperience.innerHTML = '';
        
        const experienceItems = experienceEntries.querySelectorAll('.experience-entry');
        experienceItems.forEach(item => {
            const jobTitle = item.querySelector('.job-title').value;
            const company = item.querySelector('.company').value;
            const startDate = item.querySelector('.start-date').value;
            const endDate = item.querySelector('.end-date').value;
            const description = item.querySelector('.description').value;
            
            if (jobTitle || company) {
                const experienceHTML = `
                    <div class="experience-entry">
                        <div class="experience-header">
                            <h3>${jobTitle}</h3>
                            <span class="experience-date">${startDate} - ${endDate}</span>
                        </div>
                        <div class="experience-company">${company}</div>
                        <p class="experience-description">${description}</p>
                    </div>
                `;
                
                previewExperience.innerHTML += experienceHTML;
            }
        });
    }
    
    // Update the skills section in the preview
    function updateSkillsPreview() {
        previewSkills.innerHTML = '';
        
        const skillItems = skillsList.querySelectorAll('.skill-tag');
        skillItems.forEach(item => {
            const skillText = item.textContent.replace('×', '').trim();
            const skillHTML = `<span class="skill-item">${skillText}</span>`;
            previewSkills.innerHTML += skillHTML;
        });
    }
    
    // Update the projects section in the preview
    function updateProjectsPreview() {
        previewProjects.innerHTML = '';
        
        const projectItems = projectEntries.querySelectorAll('.project-entry');
        projectItems.forEach(item => {
            const projectName = item.querySelector('.project-name').value;
            const projectYear = item.querySelector('.project-year').value;
            const projectDescription = item.querySelector('.project-description').value;
            
            if (projectName) {
                const projectHTML = `
                    <div class="project-entry">
                        <div class="project-header">
                            <h3>${projectName}</h3>
                            <span class="project-year">${projectYear}</span>
                        </div>
                        <p class="project-description">${projectDescription}</p>
                    </div>
                `;
                
                previewProjects.innerHTML += projectHTML;
            }
        });
    }
    
    // Show a toast notification
    function showToast(title, message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        
        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    // Initialize the app
    init();
});