(function () {
  // ─── Progress / file-upload (Home page) ───────────────────────────────────
  const startBtn = document.getElementById('startBtn');
  const overlay = document.getElementById('processingOverlay');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const fileInput = document.getElementById('fileInput');
  const dropZone = document.getElementById('dropZone');

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (!fileInput || !fileInput.files.length) {
        alert('Please upload a PDF first');
        return;
      }

      overlay.classList.remove('hidden');
      overlay.classList.add('flex');

      let progress = 0;
      progressBar.style.width = '0%';

      const stages = [
        'Uploading file…',
        'Extracting content…',
        'Running AI processing…',
        'Finalizing output…',
      ];

      let stageIndex = 0;

      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        if (progress >= 100) progress = 100;
        progressBar.style.width = progress + '%';

        if (stageIndex < stages.length) {
          progressText.innerText = stages[stageIndex];
          stageIndex++;
        }

        if (progress === 100) {
          clearInterval(interval);
          progressText.innerText = 'Completed';
          setTimeout(() => {
            overlay.classList.add('hidden');
            overlay.classList.remove('flex');
            progressBar.style.width = '0%';
          }, 800);
        }
      }, 600);
    });
  }

  // ─── Drop-zone (Home page only — PDF/Image pages handle this inline) ──────
  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', e => {
      e.preventDefault();
      dropZone.classList.add('border-indigo-400');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('border-indigo-400');
    });

    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      fileInput.files = e.dataTransfer.files;
      dropZone.classList.remove('border-indigo-400');
      const label = dropZone.querySelector('p');
      if (label && fileInput.files.length) label.innerText = fileInput.files[0].name;
    });

    fileInput.addEventListener('change', () => {
      const label = dropZone.querySelector('p');
      if (label && fileInput.files.length) label.innerText = fileInput.files[0].name;
    });
  }

  
})();