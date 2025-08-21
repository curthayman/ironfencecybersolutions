/**
 * Iron Fence Cyber Solutions - Security Tools
 * Interactive cybersecurity tools and utilities
 */

class SecurityTools {
    constructor() {
        this.init();
    }

    init() {
        this.initPasswordChecker();
        this.initRiskCalculator();
        this.initIPLookup();
        this.initSecurityChecklist();
        this.initToolAnimations();
    }

    initPasswordChecker() {
        const passwordInput = document.getElementById('password-input');
        const strengthBar = document.getElementById('strength-bar');
        const strengthText = document.getElementById('strength-text');
        const passwordTips = document.getElementById('password-tips');

        if (!passwordInput || !strengthBar || !strengthText) return;

        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const result = this.checkPasswordStrength(password);
            
            this.updatePasswordDisplay(result, strengthBar, strengthText, passwordTips);
        });

        passwordInput.addEventListener('focus', () => {
            passwordTips.innerHTML = this.getPasswordTips();
        });

        passwordInput.addEventListener('blur', () => {
            if (!passwordInput.value) {
                passwordTips.innerHTML = '';
            }
        });
    }

    checkPasswordStrength(password) {
        let score = 0;
        let feedback = [];
        
        // Length check
        if (password.length >= 12) {
            score += 25;
        } else if (password.length >= 8) {
            score += 15;
        } else if (password.length >= 6) {
            score += 10;
        } else {
            feedback.push('Use at least 8 characters');
        }

        // Character variety checks
        if (/[a-z]/.test(password)) {
            score += 10;
        } else {
            feedback.push('Add lowercase letters');
        }

        if (/[A-Z]/.test(password)) {
            score += 10;
        } else {
            feedback.push('Add uppercase letters');
        }

        if (/[0-9]/.test(password)) {
            score += 10;
        } else {
            feedback.push('Add numbers');
        }

        if (/[^A-Za-z0-9]/.test(password)) {
            score += 15;
        } else {
            feedback.push('Add special characters (!@#$%^&*)');
        }

        // Pattern checks
        if (!/(.)\1{2,}/.test(password)) {
            score += 10; // No repeated characters
        } else {
            feedback.push('Avoid repeated characters');
        }

        if (!/012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) {
            score += 10; // No sequential characters
        } else {
            feedback.push('Avoid sequential characters');
        }

        // Common password check
        const commonPasswords = [
            'password', '123456', '123456789', 'qwerty', 'abc123', 
            'password123', 'admin', 'letmein', 'welcome', 'monkey'
        ];
        
        if (!commonPasswords.some(common => password.toLowerCase().includes(common))) {
            score += 10;
        } else {
            feedback.push('Avoid common passwords');
        }

        // Determine strength level
        let strength, color, percentage;
        
        if (score >= 80) {
            strength = 'Very Strong';
            color = '#00ff88';
            percentage = 100;
        } else if (score >= 60) {
            strength = 'Strong';
            color = '#00ffff';
            percentage = 80;
        } else if (score >= 40) {
            strength = 'Medium';
            color = '#ffaa00';
            percentage = 60;
        } else if (score >= 20) {
            strength = 'Weak';
            color = '#ff6600';
            percentage = 40;
        } else {
            strength = 'Very Weak';
            color = '#ff4444';
            percentage = 20;
        }

        return {
            score,
            strength,
            color,
            percentage,
            feedback: feedback.slice(0, 3) // Limit to 3 suggestions
        };
    }

    updatePasswordDisplay(result, strengthBar, strengthText, passwordTips) {
        // Update strength bar
        strengthBar.style.width = `${result.percentage}%`;
        strengthBar.style.background = `linear-gradient(90deg, ${result.color}, ${result.color}aa)`;
        strengthBar.style.boxShadow = `0 0 10px ${result.color}44`;

        // Update strength text
        strengthText.textContent = result.strength;
        strengthText.style.color = result.color;

        // Update feedback
        if (result.feedback.length > 0) {
            passwordTips.innerHTML = `
                <strong>Suggestions:</strong><br>
                ${result.feedback.map(tip => `• ${tip}`).join('<br>')}
            `;
        } else {
            passwordTips.innerHTML = '<strong style="color: var(--success-color);">✓ Excellent password!</strong>';
        }
    }

    getPasswordTips() {
        return `
            <strong>Password Security Tips:</strong><br>
            • Use at least 12 characters<br>
            • Mix uppercase and lowercase letters<br>
            • Include numbers and special characters<br>
            • Avoid personal information<br>
            • Don't reuse passwords across sites<br>
            • Consider using a password manager
        `;
    }

    initRiskCalculator() {
        const likelihoodSlider = document.getElementById('likelihood');
        const impactSlider = document.getElementById('impact');
        const likelihoodValue = document.getElementById('likelihood-value');
        const impactValue = document.getElementById('impact-value');
        const riskScore = document.getElementById('risk-score');
        const riskMatrix = document.getElementById('risk-matrix');

        if (!likelihoodSlider || !impactSlider) return;

        const updateRisk = () => {
            const likelihood = parseInt(likelihoodSlider.value);
            const impact = parseInt(impactSlider.value);
            
            likelihoodValue.textContent = likelihood;
            impactValue.textContent = impact;
            
            const riskLevel = this.calculateRisk(likelihood, impact);
            this.updateRiskDisplay(riskLevel, riskScore, riskMatrix);
        };

        likelihoodSlider.addEventListener('input', updateRisk);
        impactSlider.addEventListener('input', updateRisk);

        // Initial calculation
        updateRisk();
    }

    calculateRisk(likelihood, impact) {
        const riskValue = likelihood * impact;
        let level, color, description;

        if (riskValue >= 20) {
            level = 'Critical Risk';
            color = '#ff0000';
            description = 'Immediate action required. Implement emergency controls.';
        } else if (riskValue >= 15) {
            level = 'High Risk';
            color = '#ff4444';
            description = 'Urgent attention needed. Implement mitigation strategies.';
        } else if (riskValue >= 10) {
            level = 'Medium Risk';
            color = '#ffaa00';
            description = 'Moderate risk. Plan mitigation within reasonable timeframe.';
        } else if (riskValue >= 5) {
            level = 'Low Risk';
            color = '#00ffff';
            description = 'Acceptable risk. Monitor and review periodically.';
        } else {
            level = 'Very Low Risk';
            color = '#00ff88';
            description = 'Minimal risk. Standard monitoring sufficient.';
        }

        return { level, color, description, value: riskValue };
    }

    updateRiskDisplay(risk, scoreElement, matrixElement) {
        scoreElement.textContent = risk.level;
        scoreElement.style.color = risk.color;
        scoreElement.style.borderColor = risk.color;
        scoreElement.style.backgroundColor = `${risk.color}11`;

        if (matrixElement) {
            matrixElement.innerHTML = `
                <div style="color: var(--text-secondary); font-size: var(--font-size-sm); margin-top: var(--spacing-md);">
                    <strong>Risk Score:</strong> ${risk.value}/25<br>
                    <strong>Recommendation:</strong> ${risk.description}
                </div>
            `;
        }
    }

    initIPLookup() {
        const ipInput = document.getElementById('ip-input');
        const lookupBtn = document.getElementById('lookup-btn');
        const ipResults = document.getElementById('ip-results');

        if (!ipInput || !lookupBtn || !ipResults) return;

        lookupBtn.addEventListener('click', () => {
            const ip = ipInput.value.trim();
            if (this.isValidIP(ip)) {
                this.lookupIP(ip, ipResults);
            } else {
                this.showIPError('Please enter a valid IP address', ipResults);
            }
        });

        ipInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                lookupBtn.click();
            }
        });

        // Auto-detect user's IP
        const detectBtn = document.createElement('button');
        detectBtn.textContent = 'Detect My IP';
        detectBtn.className = 'btn btn-small';
        detectBtn.style.marginLeft = 'var(--spacing-sm)';
        detectBtn.addEventListener('click', () => {
            this.detectUserIP(ipInput, ipResults);
        });
        
        lookupBtn.parentNode.insertBefore(detectBtn, lookupBtn.nextSibling);
    }

    isValidIP(ip) {
        const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
        return ipv4Regex.test(ip) || ipv6Regex.test(ip);
    }

    async lookupIP(ip, resultsElement) {
        resultsElement.innerHTML = '<div class="loading-spinner"></div><span style="margin-left: 10px;">Looking up IP information...</span>';

        try {
            // Using a free IP geolocation service
            const response = await fetch(`https://ipapi.co/${ip}/json/`);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.reason || 'IP lookup failed');
            }

            this.displayIPResults(data, resultsElement);
        } catch (error) {
            this.showIPError(`Error: ${error.message}`, resultsElement);
        }
    }

    async detectUserIP(inputElement, resultsElement) {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            if (data.ip) {
                inputElement.value = data.ip;
                this.displayIPResults(data, resultsElement);
            } else {
                throw new Error('Could not detect IP address');
            }
        } catch (error) {
            this.showIPError(`Error detecting IP: ${error.message}`, resultsElement);
        }
    }

    displayIPResults(data, resultsElement) {
        const securityInfo = this.analyzeIPSecurity(data);
        
        resultsElement.innerHTML = `
            <div class="ip-info">
                <h4 style="color: var(--primary-color); margin-bottom: var(--spacing-md);">IP Information</h4>
                <div class="info-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-md);">
                    <div class="info-item">
                        <strong>IP Address:</strong><br>
                        <span style="color: var(--text-primary);">${data.ip}</span>
                    </div>
                    <div class="info-item">
                        <strong>Location:</strong><br>
                        <span style="color: var(--text-primary);">${data.city || 'Unknown'}, ${data.region || ''} ${data.country_name || ''}</span>
                    </div>
                    <div class="info-item">
                        <strong>ISP:</strong><br>
                        <span style="color: var(--text-primary);">${data.org || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <strong>Timezone:</strong><br>
                        <span style="color: var(--text-primary);">${data.timezone || 'Unknown'}</span>
                    </div>
                </div>
                <div class="security-analysis" style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: var(--bg-tertiary); border-radius: var(--border-radius-md); border-left: 4px solid ${securityInfo.color};">
                    <h5 style="color: ${securityInfo.color}; margin-bottom: var(--spacing-sm);">${securityInfo.level}</h5>
                    <p style="color: var(--text-secondary); font-size: var(--font-size-sm);">${securityInfo.description}</p>
                </div>
            </div>
        `;
    }

    analyzeIPSecurity(data) {
        // Basic security analysis based on IP type and location
        let level = 'Normal';
        let color = '#00ffff';
        let description = 'Standard residential/business IP address.';

        // Check for potential VPN/Proxy indicators
        if (data.org && (
            data.org.toLowerCase().includes('vpn') ||
            data.org.toLowerCase().includes('proxy') ||
            data.org.toLowerCase().includes('hosting') ||
            data.org.toLowerCase().includes('cloud')
        )) {
            level = 'Potential VPN/Proxy';
            color = '#ffaa00';
            description = 'This IP may be associated with VPN, proxy, or hosting services.';
        }

        // Check for known datacenter ranges (simplified)
        if (data.org && (
            data.org.toLowerCase().includes('amazon') ||
            data.org.toLowerCase().includes('google') ||
            data.org.toLowerCase().includes('microsoft') ||
            data.org.toLowerCase().includes('digitalocean')
        )) {
            level = 'Datacenter IP';
            color = '#ff6600';
            description = 'This appears to be a datacenter or cloud service IP address.';
        }

        return { level, color, description };
    }

    showIPError(message, resultsElement) {
        resultsElement.innerHTML = `
            <div style="color: var(--danger-color); padding: var(--spacing-md); background: rgba(255, 68, 68, 0.1); border-radius: var(--border-radius-md); border: 1px solid var(--danger-color);">
                <i class="fas fa-exclamation-triangle"></i> ${message}
            </div>
        `;
    }

    initSecurityChecklist() {
        const checklist = document.getElementById('security-checklist');
        const progressFill = document.getElementById('checklist-progress');
        const percentage = document.getElementById('checklist-percentage');

        if (!checklist) return;

        const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
        
        const updateProgress = () => {
            const checked = checklist.querySelectorAll('input[type="checkbox"]:checked').length;
            const total = checkboxes.length;
            const percent = Math.round((checked / total) * 100);
            
            progressFill.style.width = `${percent}%`;
            percentage.textContent = `${percent}%`;
            
            // Change color based on completion
            let color;
            if (percent >= 80) {
                color = 'var(--success-color)';
            } else if (percent >= 60) {
                color = 'var(--primary-color)';
            } else if (percent >= 40) {
                color = 'var(--warning-color)';
            } else {
                color = 'var(--danger-color)';
            }
            
            progressFill.style.background = `linear-gradient(90deg, ${color}, ${color}aa)`;
            
            // Save progress to localStorage
            this.saveChecklistProgress(checkboxes);
        };

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateProgress);
        });

        // Load saved progress
        this.loadChecklistProgress(checkboxes);
        updateProgress();

        // Add additional checklist items dynamically
        this.addAdvancedChecklistItems(checklist, updateProgress);
    }

    saveChecklistProgress(checkboxes) {
        const progress = Array.from(checkboxes).map(cb => cb.checked);
        localStorage.setItem('securityChecklistProgress', JSON.stringify(progress));
    }

    loadChecklistProgress(checkboxes) {
        try {
            const progress = JSON.parse(localStorage.getItem('securityChecklistProgress') || '[]');
            checkboxes.forEach((checkbox, index) => {
                if (progress[index] !== undefined) {
                    checkbox.checked = progress[index];
                }
            });
        } catch (error) {
            console.warn('Could not load checklist progress:', error);
        }
    }

    addAdvancedChecklistItems(checklist, updateCallback) {
        const advancedItems = [
            'Configure firewall properly',
            'Enable automatic security updates',
            'Use encrypted communications (HTTPS/VPN)',
            'Implement access controls and user permissions',
            'Regularly audit and monitor system logs',
            'Have an incident response plan',
            'Conduct regular security training',
            'Perform regular penetration testing'
        ];

        advancedItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'checklist-item';
            itemElement.innerHTML = `
                <input type="checkbox" id="advanced-check${index + 6}">
                <label for="advanced-check${index + 6}">${item}</label>
            `;
            
            checklist.appendChild(itemElement);
            
            const checkbox = itemElement.querySelector('input');
            checkbox.addEventListener('change', updateCallback);
        });
    }

    initToolAnimations() {
        // Add hover effects to tool cards
        const toolCards = document.querySelectorAll('.tool-card');
        
        toolCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });

        // Add typing effect to tool descriptions
        this.addTypingEffect();
    }

    addTypingEffect() {
        const toolHeaders = document.querySelectorAll('.tool-header h3');
        
        toolHeaders.forEach(header => {
            const originalText = header.textContent;
            header.textContent = '';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < originalText.length) {
                    header.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        });
    }

    // Public utility methods
    generateSecurePassword(length = 16) {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        const allChars = lowercase + uppercase + numbers + symbols;
        let password = '';
        
        // Ensure at least one character from each category
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];
        
        // Fill the rest randomly
        for (let i = 4; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        
        // Shuffle the password
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }

    exportSecurityReport() {
        const checkboxes = document.querySelectorAll('#security-checklist input[type="checkbox"]');
        const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
        const total = checkboxes.length;
        
        const report = {
            timestamp: new Date().toISOString(),
            completionRate: Math.round((completed / total) * 100),
            completedItems: Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.nextElementSibling.textContent),
            recommendations: Array.from(checkboxes)
                .filter(cb => !cb.checked)
                .map(cb => cb.nextElementSibling.textContent)
        };
        
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `security-report-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Add additional styles for tools
const toolStyles = document.createElement('style');
toolStyles.textContent = `
    .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(0, 255, 255, 0.2);
        border-top: 2px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        display: inline-block;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .info-item {
        padding: var(--spacing-sm);
        background: var(--bg-secondary);
        border-radius: var(--border-radius-sm);
        border: 1px solid rgba(0, 255, 255, 0.1);
    }
    
    .info-item strong {
        color: var(--primary-color);
        font-size: var(--font-size-xs);
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .tool-card {
        transition: all 0.3s ease;
    }
    
    .checklist-item {
        transition: background-color 0.2s ease;
    }
    
    .checklist-item:hover {
        background: rgba(0, 255, 255, 0.05) !important;
    }
    
    #password-input {
        font-family: monospace;
        letter-spacing: 2px;
    }
    
    .strength-bar {
        transition: all 0.3s ease;
    }
    
    .risk-score {
        font-family: var(--font-display);
        text-align: center;
        border: 2px solid;
        border-radius: var(--border-radius-md);
        transition: all 0.3s ease;
    }
    
    input[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        height: 6px;
        border-radius: 3px;
        background: var(--bg-secondary);
        outline: none;
        margin: var(--spacing-sm) 0;
    }
    
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--primary-color);
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    }
    
    input[type="range"]::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--primary-color);
        cursor: pointer;
        border: none;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    }
`;

document.head.appendChild(toolStyles);

// Initialize security tools
const securityTools = new SecurityTools();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecurityTools;
}
