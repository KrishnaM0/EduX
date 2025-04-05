let deferredPrompt;
const installBtn = document.getElementById('installAppBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent automatic prompt
  e.preventDefault();
  deferredPrompt = e;

  // Show the install button
  if (installBtn) {
    installBtn.classList.remove('d-none');

    installBtn.addEventListener('click', async () => {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;

      if (result.outcome === 'accepted') {
        console.log("✅ User accepted the install prompt");
        installBtn.classList.add('d-none');
        deferredPrompt = null;
      } else {
        console.log("❌ User dismissed the install prompt");
      }
    });
  }
});

// Optional: Hide install button after app installed
window.addEventListener('appinstalled', () => {
  console.log("✅ App installed");
  if (installBtn) {
    installBtn.classList.add('d-none');
  }
});
