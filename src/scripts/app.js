"use strict";

document.addEventListener('DOMContentLoaded', () => {
  

  










  const icons = document.querySelectorAll('.icon');
  icons.forEach(icon => {
    icon.addEventListener('click', () => {
      const target = icon.getAttribute('data-target');
      const window = document.querySelector(`.window--${target}`);
      if (window) {
        window.classList.add('active');
        bringToFront(window);
      }
    });
  });

  function hideProjects(projects) {
    projects.forEach(project => {
      project.style.display = 'none';
    });
  }

  function showProjects(projects) {
    projects.forEach(project => {
      project.style.display = 'flex';
    });
  }

  function bringToFront(window) {
    const windows = document.querySelectorAll('.window');
    let maxZIndex = 2;
  
    windows.forEach(win => {
      const zIndex = parseInt(win.style.zIndex);
      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });
  
    window.style.zIndex = maxZIndex + 1;
  
    window.addEventListener('touchstart', onTouchStart, { passive: false });
  
    function onTouchStart() {
      windows.forEach(win => {
        win.style.zIndex = parseInt(win.style.zIndex) - 1;
      });
      window.style.zIndex = maxZIndex + 1;
    }
  }
  










  const windows = document.querySelectorAll('.window');
  windows.forEach(window => {
    makeDraggable(window);
    window.addEventListener('click', () => {
      bringToFront(window);
    });
    const controls = window.querySelector('.title-bar__controls');
    if (controls) {
      controls.querySelectorAll('div').forEach(control => {
        control.addEventListener('click', () => {
          window.classList.remove('active');
        });
      });
    }
  });









////gsap windows



windows.forEach(window => {

  gsap.set(window, {
    opacity: 0,
    y: '-100px' 
  });


  gsap.to(window, {
    opacity: 1,
    y: 0, 
    duration: 0.5,
    ease: 'power2.out'
  });
});


icons.forEach(icon => {
  icon.addEventListener('click', () => {
    const target = icon.getAttribute('data-target');
    const window = document.querySelector(`.window--${target}`);

    gsap.set(window, {
      opacity: 0,
      yPercent: -50,
      y: '-100px' 
    });
  

    gsap.to(window, {
      opacity: 1,
      y: '0%',
      duration: 0.5, 
      ease: 'power2.out'
    });
  });
});

////gsap windows





  
const projects = document.querySelectorAll('.project');
let activeProjectDetailsWindows = {};

projects.forEach(project => {
  project.addEventListener('click', () => {
    const projectId = project.getAttribute('data-id');
    const projectDetailsWindow = document.querySelector(`.window--project-details[data-project-id="${projectId}"]`);

    if (!activeProjectDetailsWindows[projectId]) {
      activeProjectDetailsWindows[projectId] = projectDetailsWindow;
      activeProjectDetailsWindows[projectId].classList.add('active');
      makeDraggable(activeProjectDetailsWindows[projectId]); // Rendre la fenêtre draggable
    } else {
      const isActive = activeProjectDetailsWindows[projectId].classList.contains('active');
      if (!isActive) {
        activeProjectDetailsWindows[projectId].classList.add('active');
        bringToFront(activeProjectDetailsWindows[projectId]); 
      }
    }
  });
});

const projectDetailsWindows = document.querySelectorAll('.window--project-details');

projectDetailsWindows.forEach(window => {
  const closeButtons = window.querySelectorAll('.title-bar__close');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.classList.remove('active');
    });
  });
});



///DRAGABBLEEEEEEEEEEEEEEEEEE



  function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const titleBar = element.querySelector('.title-bar');
  

    if (titleBar) {
      titleBar.onmousedown = dragMouseDown;
      titleBar.addEventListener('touchstart', onTouchStart, { passive: false });
    } else {
      element.onmousedown = dragMouseDown;
      element.addEventListener('touchstart', onTouchStart, { passive: false });
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function onTouchStart(e) {
      const touch = e.touches[0];
      pos3 = touch.clientX;
      pos4 = touch.clientY;
      element.addEventListener('touchmove', onTouchMove, { passive: false });
      element.addEventListener('touchend', onTouchEnd);
    }
  
    function onTouchMove(e) {
      const touch = e.touches[0];
      e.preventDefault();
      pos1 = pos3 - touch.clientX;
      pos2 = pos4 - touch.clientY;
      pos3 = touch.clientX;
      pos4 = touch.clientY;
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    }
  
    function onTouchEnd() {
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  










  const audioPlayer = document.querySelector('.audio-player audio');
  const audioTitle = document.querySelector('.audio-title');
  const audioImage = document.querySelector('.audio-image');
  const prevButton = document.querySelector('.audio-controls__prev-button img');
  const nextButton = document.querySelector('.audio-controls__next-button img');  
  const audioElements = document.querySelectorAll('.audio-player audio');
  const volumeSlider = document.querySelector('.music-section__slider');
  const progressBar = document.querySelector('.audio-controls__progress-bar');
  
  function adjustVolume() {
    const volumeValue = volumeSlider.value / 100;
    audioElements.forEach(audio => {
      audio.volume = volumeValue;
    });
  }
  
  volumeSlider.addEventListener('input', adjustVolume);
  adjustVolume();
  
  const musiques = [
    { title: 'Strawberry Cake - Nobonoko', source: './assets/musiques/nobonoko_Strawberry_Cake.wav', image: './assets/images/strawberry_cake.jpg' },
    { title: 'Picobossa - Nobonoko', source: './assets/musiques/nobonoko_Picobossa.wav', image: './assets/images/picobossa.png' },
    { title: 'Aerodynamics - Tohomoko', source: './assets/musiques/Tohomoko_Aerodynamics.wav', image: './assets/images/aerodynamics.jpg' }
  ];
  
  let currentMusicIndex = 0;
  
  function loadMusic(index) {
    const music = musiques[index];
    audioPlayer.src = music.source;
    audioTitle.textContent = music.title;
    audioImage.src = music.image;
  }
  
  window.addEventListener('load', () => {
    loadMusic(currentMusicIndex);
  });
  
  prevButton.addEventListener('click', () => {
    currentMusicIndex = (currentMusicIndex - 1 + musiques.length) % musiques.length;
    loadMusic(currentMusicIndex);
  });
  
  nextButton.addEventListener('click', () => {
    currentMusicIndex = (currentMusicIndex + 1) % musiques.length;
    loadMusic(currentMusicIndex);
  });

  audioPlayer.addEventListener('timeupdate', () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    progressBar.value = (currentTime / duration) * 100;
  });
  
  progressBar.addEventListener('click', (event) => {
    const progressBarWidth = progressBar.clientWidth;
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const duration = audioPlayer.duration;
    const newPosition = (clickX / progressBarWidth) * duration;
    audioPlayer.currentTime = newPosition;
  });
  
  const playIcon = document.querySelector('.audio-controls__play-icon');
  const pauseIcon = document.querySelector('.audio-controls__pause-icon');
  
  audioPlayer.addEventListener('play', () => {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  });
  
  audioPlayer.addEventListener('pause', () => {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  });
  
  document.querySelector('.audio-controls__toggle').addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  });
  






// CLICCCCCCCCCCCC
const clicSound = new Audio('./assets/musiques/clic2.wav');


function playClicSound() {
  clicSound.currentTime = 0; 
  clicSound.play();
}


document.body.addEventListener('mousedown', playClicSound);








});

// PAINTTTTT

const paintWindow = document.querySelector('.window--paint');
if (paintWindow) {
  const canvas = paintWindow.querySelector('.content canvas');
  const context = canvas.getContext('2d');
  const saveButton = paintWindow.querySelector('.content .save-button');
  const blackButton = paintWindow.querySelector('.content .blackButton');
  const greyButton = paintWindow.querySelector('.content .greyButton');
  const pinkButton = paintWindow.querySelector('.content .pinkButton');

  let isPainting = false;
  let lastX = 0;
  let lastY = 0;
  let currentColor = '#000000'; 

  canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isPainting) return;
    context.strokeStyle = currentColor;
    context.lineJoin = 'round';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  canvas.addEventListener('mouseup', () => {
    isPainting = false;
  });

  saveButton.addEventListener('click', () => {
    const image = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = image;
    a.download = 'cute_drawing.png';
    a.click();
  });

  blackButton.addEventListener('click', () => {
    currentColor = '#000000'; 
  });

  greyButton.addEventListener('click', () => {
    currentColor = '#808080'; 
  });

  pinkButton.addEventListener('click', () => {
    currentColor = '#F1DCEF';
  });
}

















// l'heure :3
const footerTime = document.querySelector('.footer__time');

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  footerTime.textContent = formattedHours + ':' + formattedMinutes;
}

setInterval(updateClock, 1000);

updateClock();
















































////french

/*
// Sélectionner le sélecteur de langue
var langueSelect = document.querySelector('.music-section__select');

// Écouter les changements de sélection de langue
langueSelect.addEventListener('change', function() {
  // Obtenir la langue sélectionnée
  var langue = this.value;
  
  // Mettre à jour tous les textes du site en français
  var elements = document.querySelectorAll('body *');
  elements.forEach(function(element) {
    if (element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE') {
      if (element.dataset.langFr) {
        element.textContent = element.dataset.langFr;
      }
    }
  });
});
*/

//////CHAT
/*

document.getElementById('message-form').addEventListener('submit', function(event) {
  // Empêche le comportement par défaut de soumission du formulaire
  event.preventDefault();
  
  // Récupère les valeurs des champs pseudo et message
  var pseudo = document.getElementById('username').value;
  var message = document.getElementById('user-message').value;
  
  // Crée un objet FormData pour envoyer les données du formulaire
  var formData = new FormData();
  formData.append('pseudo', pseudo);
  formData.append('message', message);
  
  // Envoie les données du formulaire avec la méthode POST en utilisant Fetch
  fetch('http://salwa-bachetti.be/projets/chatphp/savechat.php', {

      mode:'no-cors',
      method: 'POST',
      body: formData
  })
  .then(function(response) {
      // Vérifie si la réponse est OK
      if (response.ok) {
          // Affiche un message de succès
          ///alert('Message envoyé avec succès !');
          // Réinitialise le formulaire
          document.getElementById('message-form').reset();
      } else {
          // Affiche un message d'erreur
         ////alert('Une erreur est survenue. Veuillez réessayer.');
      }
  })
  .catch(function(error) {
      // Affiche un message d'erreur en cas d'erreur réseau ou autre
      console.error('Erreur lors de l\'envoi du formulaire :', error);
      ///alert('Une erreur est survenue. Veuillez réessayer.');
  });
});



// Récupère les données du fichier JSON
fetch('../../assets/json/messages.json')
/////pour que ca fonctionne sur un serveur faut mettre ca -> http://salwa-bachetti.be/projets/chatphp/messages.json
  .then(function(response) {
    // Vérifie si la réponse est OK
    if (response.ok) {
      // Convertit la réponse en JSON
      return response.json();
    } else {
      // Lance une erreur si la réponse n'est pas OK
      throw new Error('Erreur lors de la récupération des messages.');
    }
  })
  .then(function(messages) {
    // Sélectionne l'élément où les messages seront insérés
    var messagesContainer = document.getElementById('messages-container');
    
    // Parcourt chaque message et l'insère dans l'élément HTML
    messages.forEach(function(message) {
      var messageDiv = document.createElement('div');
      messageDiv.textContent = message.pseudo + ': ' + message.message;
      messageDiv.classList.add('message', 'received');
      messagesContainer.appendChild(messageDiv);
    });
  })
  .catch(function(error) {
    // Affiche un message d'erreur en cas d'erreur réseau ou autre
    console.error('Erreur lors de la récupération des messages :', error);
  });

  */