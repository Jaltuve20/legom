document.addEventListener('DOMContentLoaded', function() {
  var minifigure = document.querySelector('.minifigure');
  var faces = document.querySelector('.faces');
  var upperBody = document.querySelector('.upper-body');
  var lowerBody = document.querySelector('.lower-body');
  var Explotar = document.querySelector('.Explotar');
  var randomize = document.querySelector('.randomize');
  var expressionRangeInput = document.querySelector('.expression-range');
  var colorRangeInput = document.querySelectorAll('.color-range');
  var upperHue = document.getElementById('upper-hue');
  var upperSaturation = document.getElementById('upper-saturation');
  var upperLightness = document.getElementById('upper-lightness');
  var lowerHue = document.getElementById('lower-hue');
  var lowerSaturation = document.getElementById('lower-saturation');
  var lowerLightness = document.getElementById('lower-lightness');

  var playButton = document.querySelector('.music');
  var backgroundMusic = document.getElementById('backgroundMusic');
  var volumeControl = document.querySelector('.volume-control');
  var letraCancion = document.getElementById('letra-cancion');

  // Selecciona el span donde mostrar el porcentaje del volumen
var volumePercentage = document.getElementById('volumePercentage');

// Ajusta el volumen del audio según el valor del control deslizante
volumeControl.addEventListener('input', function() {
  var volume = parseFloat(volumeControl.value) / 100;
  backgroundMusic.volume = volume;

  // Actualiza el texto del span con el porcentaje del volumen
  var percentage = Math.round(volume * 100) + '%';
  volumePercentage.textContent = percentage;
});

  // Definir los tiempos y textos de la letra de la canción
  var tiemposLetra = [
    { tiempo: 0, texto: 'Girls Just Wanna Have Some.' },
    { tiempo: 8, texto: 'I come home in the morning light my mother says.' },
    { tiempo: 13, texto: '"When you gonna live your life right?".' },
    { tiempo: 17, texto: 'Oh, mother dear were not fortunate ones' },
    { tiempo: 20, texto: 'Oh girls, they wanna have fun' },
    { tiempo: 35, texto: 'The phone rings in the middle of night my father yells' },
    { tiempo: 39, texto: '"What you gonna do with your life?"' },
    { tiempo: 43, texto: 'Oh, daddy did you know you still number one?' },
    { tiempo: 47, texto: 'But girls, they wanna have fun' },
    { tiempo: 60, texto: 'Oh, girls just wanna have fun' },
    // Añadir más líneas conforme necesites
  ];

  // Reproducir o pausar la música al hacer clic en el botón de Play
  playButton.addEventListener('click', function() {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      playButton.innerHTML = 'Pause'; // Cambia el texto del botón a 'Pause' cuando se reproduce
    } else {
      backgroundMusic.pause();
      playButton.innerHTML = 'Play'; // Cambia el texto del botón a 'Play' cuando se pausa
    }
  });

  // Ajustar el volumen del audio según el valor del control deslizante
  volumeControl.addEventListener('input', function() {
    var volume = parseFloat(volumeControl.value) / 100;
    backgroundMusic.volume = volume;
  });

  Explotar.addEventListener('click', ExplotarMinifigure);
  randomize.addEventListener('click', randomizeInputs);
  expressionRangeInput.addEventListener('input', setExpression);

  for (var i = 0; i < colorRangeInput.length; i++) {
    colorRangeInput[i].addEventListener('input', setColors);
  }

  function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
  }

  function ExplotarMinifigure() {
    minifigure.classList.toggle('Explotar');
  
    if (minifigure.classList.contains('Explotar')) {
      Explotar.innerHTML = 'Reconstruir';
    } else {
      Explotar.innerHTML = 'Explotar';
    }
  }

  function randomizeInputs() {
    var randomExpression = getRandomNum(0, 5);
    var randomUpperHue = getRandomNum(0, 360);
    var randomUpperSaturation = getRandomNum(0, 100);
    var randomUpperLightness = getRandomNum(0, 90);
    var randomLowerHue = getRandomNum(0, 360);
    var randomLowerSaturation = getRandomNum(0, 100);
    var randomLowerLightness = getRandomNum(0, 90);
  
    expressionRangeInput.value = randomExpression * 100;
    upperHue.value = randomUpperHue;
    upperSaturation.value = randomUpperSaturation;
    upperLightness.value = randomUpperLightness;
    lowerHue.value = randomLowerHue;
    lowerSaturation.value = randomLowerSaturation;
    lowerLightness.value = randomLowerLightness;
  
    setExpression();
    setColors();
  }

  function setExpression() {
    var expressionVal = parseInt(expressionRangeInput.value);
    faces.style.transform = 'translateX(-' + expressionVal + '%)';
  }

  function setColors() {
    var upperHueVal = parseInt(upperHue.value);
    var upperSaturationVal = parseInt(upperSaturation.value);
    var upperLightnessVal = parseInt(upperLightness.value);
    var lowerHueVal = parseInt(lowerHue.value);
    var lowerSaturationVal = parseInt(lowerSaturation.value);
    var lowerLightnessVal = parseInt(lowerLightness.value);
  
    upperBody.style.color = 'hsl(' + upperHueVal + ',' + upperSaturationVal + '%,' + upperLightnessVal + '%)';
    lowerBody.style.color = 'hsl(' + lowerHueVal + ',' + lowerSaturationVal + '%,' + lowerLightnessVal + '%)';
  }

  // Actualizar la letra de la canción según el tiempo de reproducción del audio
  backgroundMusic.addEventListener('timeupdate', function() {
    var tiempoActual = backgroundMusic.currentTime;
    actualizarLetra(tiempoActual);
  });

  // Función para actualizar la letra de la canción
  function actualizarLetra(tiempoActual) {
    for (var i = 0; i < tiemposLetra.length; i++) {
      if (tiempoActual >= tiemposLetra[i].tiempo) {
        letraCancion.textContent = tiemposLetra[i].texto;
      } else {
        break;
      }
    }
  }
});
