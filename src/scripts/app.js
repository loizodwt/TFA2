
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

  function bringToFront(window) {
    const windows = document.querySelectorAll('.window,.window--project-details'); // Inclure les fenêtres de détails du projet
    let maxZIndex = 1;
  
    // Trouver le niveau de z-index maximum parmi toutes les fenêtres
    windows.forEach(win => {
      const zIndex = parseInt(win.style.zIndex);
      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });
  
    // Mettre la fenêtre spécifique au premier plan
    window.style.zIndex = maxZIndex + 1;
  
    // Gestionnaires d'événements pour les événements tactiles
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
    const controls = window.querySelector('.title-bar__controls'); // Changez .controls à .title-bar__controls
    if (controls) {
      controls.querySelectorAll('div').forEach(control => {
        control.addEventListener('click', () => {
          window.classList.remove('active');
        });
      });
    }
  });

  const projects = document.querySelectorAll('.project');
  let activeProjectDetailsWindows = {}; // Garder une référence à la fenêtre active pour chaque projet

  projects.forEach(project => {
    project.addEventListener('click', () => {
      const projectId = project.getAttribute('data-id');
      const content = project.getAttribute('data-content');
      if (!activeProjectDetailsWindows[projectId]) {
        activeProjectDetailsWindows[projectId] = createProjectDetailsWindow(content);
        activeProjectDetailsWindows[projectId].classList.add('active');
        makeDraggable(activeProjectDetailsWindows[projectId]); // Rendre la fenêtre draggable
      } else {
        bringToFront(activeProjectDetailsWindows[projectId]);
      }
    });
  });























  function createProjectDetailsWindow(content) {
    const projectDetailsWindow = document.createElement('div');
    projectDetailsWindow.classList.add('window', 'window--project-details');
  
    const titleBar = document.createElement('div');
    titleBar.classList.add('title-bar');
  
    const title = document.createElement('div');
    title.classList.add('title-bar__title');
    title.textContent = 'Project Details';
  
    const controls = document.createElement('div');
    controls.classList.add('title-bar__controls');
  
    const minimize = document.createElement('div');
    minimize.classList.add('title-bar__minimize');
    minimize.textContent = '_';
  
    const maximize = document.createElement('div');
    maximize.classList.add('title-bar__maximize');
    maximize.textContent = '[]';
  
    const close = document.createElement('div');
    close.classList.add('title-bar__close');
    close.textContent = 'X';
  
    controls.appendChild(minimize);
    controls.appendChild(maximize);
    controls.appendChild(close);
  
    titleBar.appendChild(title);
    titleBar.appendChild(controls);
  
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content', 'project-details-content');
    contentContainer.textContent = content;
  
    projectDetailsWindow.appendChild(titleBar);
    projectDetailsWindow.appendChild(contentContainer);
  
    // Ajouter la fenêtre en tant qu'enfant du corps du document
    document.body.appendChild(projectDetailsWindow);
  
    close.addEventListener('click', () => {
      projectDetailsWindow.classList.remove('active');
    });
  
    return projectDetailsWindow;
  }
  

  function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const titleBar = element.querySelector('.title-bar');
  
    // Événement de souris pour les ordinateurs de bureau
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
  



















});

// L'autre code JavaScript reste inchangé


const paintWindow = document.querySelector('.window--paint');
if (paintWindow) {
  const canvas = paintWindow.querySelector('.content canvas');
  const context = canvas.getContext('2d');
  const saveButton = paintWindow.querySelector('.content #saveButton');
  const blackButton = paintWindow.querySelector('.content #blackButton');
  const greyButton = paintWindow.querySelector('.content #greyButton');
  const pinkButton = paintWindow.querySelector('.content #pinkButton');

  let isPainting = false;
  let lastX = 0;
  let lastY = 0;
  let currentColor = '#000000'; // Default color is black

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
    currentColor = '#000000'; // Set color to black
  });

  greyButton.addEventListener('click', () => {
    currentColor = '#808080'; // Set color to grey
  });

  pinkButton.addEventListener('click', () => {
    currentColor = '#FFC0CB'; // Set color to pink
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