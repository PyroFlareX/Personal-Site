// Resume Generator with AI-Powered Job Matching
// Integrates directly into resume.html for internal use

let resumeData = null;
let projectsData = null;
let currentResumeHtml = null;

document.addEventListener('DOMContentLoaded', async () => {
  await loadResumeData();
  setupResumeGenerator();
});

async function loadResumeData() {
  try {
    // Load both resume-data.json and projects.json in parallel
    const [resumeResponse, projectsResponse] = await Promise.all([
      fetch('resume-data.json'),
      fetch('projects.json')
    ]);

    resumeData = await resumeResponse.json();
    projectsData = await projectsResponse.json();

    // Inject projects from projects.json into resumeData
    resumeData.projects = projectsData;
  } catch (err) {
    console.error('Failed to load resume data:', err);
    document.getElementById('tailor-status').textContent = 'Error loading resume data.';
  }
}

function setupResumeGenerator() {
  const generateBtn = document.getElementById('generate-tailored-btn');
  const downloadFullBtn = document.getElementById('download-full-resume');
  const downloadTailoredBtn = document.getElementById('download-tailored-resume');
  const saveKeyBtn = document.getElementById('save-api-key-btn');

  if (generateBtn) generateBtn.addEventListener('click', generateTailoredResume);
  if (downloadFullBtn) downloadFullBtn.addEventListener('click', () => downloadResumePDF('full'));
  if (downloadTailoredBtn) downloadTailoredBtn.addEventListener('click', () => downloadResumePDF('tailored'));
  if (saveKeyBtn) saveKeyBtn.addEventListener('click', saveApiKey);

  // Load saved API key if exists
  const savedKey = localStorage.getItem('resume_claude_api_key');
  const apiKeyInput = document.getElementById('claude-api-key-input');
  if (savedKey && apiKeyInput) {
    apiKeyInput.value = '••••••••' + savedKey.slice(-4);
    apiKeyInput.dataset.hasKey = 'true';
  }

  // Generate full resume on load
  displayFullResume();
}

function displayFullResume() {
  if (!resumeData) return;
  currentResumeHtml = buildHTMLResume(resumeData.projects, resumeData.coreskills, resumeData.experience, true);
  const preview = document.getElementById('resume-preview');
  if (preview) {
    preview.innerHTML = currentResumeHtml;
  }
}

function saveApiKey() {
  const apiKeyInput = document.getElementById('claude-api-key-input');
  let key = apiKeyInput.value;

  // Remove mask if user pasted over it
  if (key.includes('•')) {
    key = '';
  }

  if (key && key.startsWith('sk-')) {
    localStorage.setItem('resume_claude_api_key', key);
    apiKeyInput.value = '••••••••' + key.slice(-4);
    apiKeyInput.dataset.hasKey = 'true';
    alert('API key saved securely in browser.');
  } else if (key) {
    alert('Invalid API key. Must start with sk-');
  }
}

async function generateTailoredResume() {
  const jobDesc = document.getElementById('job-description-input').value.trim();
  const statusDiv = document.getElementById('tailor-status');

  if (!jobDesc) {
    statusDiv.textContent = '⚠️ Paste a job description first.';
    return;
  }

  const apiKey = localStorage.getItem('resume_claude_api_key');
  if (!apiKey) {
    statusDiv.textContent = '⚠️ Save your Claude API key first.';
    return;
  }

  statusDiv.textContent = '🔄 Analyzing job description...';

  try {
    const tailoredResume = await callClaudeAPI(jobDesc, apiKey);
    currentResumeHtml = tailoredResume;

    const preview = document.getElementById('resume-preview');
    if (preview) {
      preview.innerHTML = tailoredResume;
    }

    statusDiv.textContent = '✓ Tailored resume generated successfully!';
    document.getElementById('download-tailored-resume').style.display = 'inline-block';
  } catch (err) {
    statusDiv.textContent = `❌ Error: ${err.message}`;
  }
}

async function callClaudeAPI(jobDescription, apiKey) {
  const prompt = buildPrompt(jobDescription);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'API request failed');
  }

  const data = await response.json();
  return data.content[0].text;
}

function buildPrompt(jobDescription) {
  const resumeJSON = JSON.stringify(resumeData, null, 2);

  return `You are an expert resume optimizer. Given a resume and job description, create a tailored resume that:
1. Prioritizes the most relevant projects and skills
2. Highlights achievements that match job requirements
3. Reorders content by relevance to the role
4. Uses keywords from the job description naturally
5. Maintains authenticity—never invent experience
6. INCLUDE ALL PROJECTS with sufficient reason to be there in the resume—do NOT omit any projects
7. INCLUDE ALL RELEVANT AND RECENT WORK EXPERIENCE in the resume
8. Do NOT include a "Services" section

Return ONLY valid HTML resume content (no markdown, no extra text, no code blocks).
Start with <div class="resume-content"> and use semantic HTML5.
Do NOT include <html>, <head>, <body>, or <style> tags.

RESUME DATA:
${resumeJSON}

JOB DESCRIPTION:
${jobDescription}

Generate a complete tailored resume in clean HTML format, optimized for printing/PDF. Include all projects and work experience, reordered by relevance.`;
}

function buildHTMLResume(projects, skills, experience, isFull = false) {
  let html = `<div class="resume-content">
    <section class="resume-header">
      <h1>${resumeData.personal.name}</h1>
      <p class="tagline">${resumeData.personal.title}</p>
      <p style="margin: 0.5rem 0; font-size: 0.9rem;"><a href="mailto:${resumeData.personal.email}">${resumeData.personal.email}</a> • ${resumeData.personal.location}</p>
    </section>

    <section class="resume-section">
      <h2>Core Competencies</h2>
      <ul class="competencies">
  `;

  skills.forEach(skill => {
    html += `<li>${skill}</li>`;
  });

  html += `
      </ul>
    </section>
  `;

  // Work experience section - ALWAYS show
  if (experience && experience.length > 0) {
    html += `
    <section class="resume-section">
      <h2>Work Experience</h2>
    `;
    experience.forEach(exp => {
      html += `
      <article class="resume-work">
        <h3>${exp.position}</h3>
        <p style="margin: 0.25rem 0;"><strong>${exp.company}</strong> | ${exp.location} | ${exp.duration}</p>
        <p style="margin: 0.5rem 0; font-size: 0.95rem;">${exp.description}</p>
        <ul style="margin: 0.5rem 0 0.75rem 1.5rem;">
          ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </article>
      `;
    });
    html += `</section>`;
  }

  // Projects section - ALWAYS show ALL projects
  if (projects && projects.length > 0) {
    html += `
    <section class="resume-section">
      <h2>Projects</h2>
    `;

    projects.forEach(proj => {
      // Support both 'tags' (from projects.json) and 'skills' (from old format)
      const projectTags = proj.tags || proj.skills || [];
      const projectHighlights = proj.highlights || [];

      html += `
      <article class="resume-project">
        <h3>${proj.title}</h3>
        <p style="margin: 0.25rem 0;"><strong>${proj.role}</strong> | ${proj.year}</p>
        <p style="margin: 0.5rem 0; font-size: 0.95rem;">${proj.description}</p>
        <div class="resume-project-specs" style="margin: 0.5rem 0;">
          ${projectTags.map(s => `<span>${s}</span>`).join('')}
        </div>
        <ul style="margin: 0.5rem 0 0.75rem 1.5rem;">
          ${projectHighlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </article>
      `;
    });

    html += `</section>`;
  }

  // NO SERVICES SECTION - REMOVED

  html += `</div>`;

  return html;
}

async function downloadResumePDF(type) {
  const content = document.getElementById('resume-preview');
  if (!content) return;

  // Load html2pdf library
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';

  script.onload = () => {
    const filename = type === 'full'
      ? `Zack_Dell_Resume_Full_${new Date().toISOString().split('T')[0]}.pdf`
      : `Zack_Dell_Resume_Tailored_${new Date().toISOString().split('T')[0]}.pdf`;

    // Create a styled clone for PDF to ensure proper formatting
    const pdfContent = content.cloneNode(true);
    pdfContent.style.padding = '20px';
    pdfContent.style.fontSize = '11px';
    pdfContent.style.lineHeight = '1.5';
    pdfContent.style.color = '#222';
    pdfContent.style.fontFamily = '"Arial", serif';

    const options = {
      margin: [10, 10, 10, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        orientation: 'portrait', 
        unit: 'mm', 
        format: 'a4'
      }
    };

    html2pdf()
      .set(options)
      .from(pdfContent)
      .save();
  };

  document.head.appendChild(script);
}
