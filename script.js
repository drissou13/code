// Temps restant en secondes
let timeRemaining = 600; // 10 minutes

// Ajout du minuteur
const timerElement = document.createElement('p');
timerElement.id = 'timer';
timerElement.style.color = 'yellow';
timerElement.textContent = `Temps restant : ${Math.floor(timeRemaining / 60)}:00`;
document.getElementById('terminal').prepend(timerElement);

// Fonction de compte à rebours
const countdown = setInterval(() => {
  timeRemaining--;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerElement.textContent = `Temps restant : ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  // Si le temps est écoulé
  if (timeRemaining <= 0) {
    clearInterval(countdown);
    timerElement.textContent = "Temps écoulé ! Mission échouée. 😢";
    timerElement.style.color = 'red';
    document.getElementById('submit-button').disabled = true;
    document.getElementById('input').disabled = true;
  }
}, 1000);

// Solution correcte à valider
const correctSolution = `
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);
    $pdo = new PDO('mysql:host=localhost;dbname=secure_db', 'user', 'password');
    $stmt = $pdo->prepare('SELECT * FROM users WHERE username = :username AND password = :password');
    $stmt->execute(['username' => $username, 'password' => $password]);
}
?>
`.trim();

// Écouteur sur le bouton "Soumettre"
document.getElementById("submit-button").addEventListener("click", function () {
  const userInput = document.getElementById("input").value.trim();

  // Validation de la solution
  if (userInput === correctSolution) {
    clearInterval(countdown); // Arrêter le minuteur
    document.getElementById("feedback").textContent = "Bravo ! Vous avez corrigé la faille de sécurité et sauvé le site ! 🎉";
    document.getElementById("feedback").style.color = "green";
    timerElement.style.color = "green";
    timerElement.textContent = "Mission accomplie avec succès !";
    document.getElementById("submit-button").disabled = true;
    document.getElementById("input").disabled = true;
  } else {
    document.getElementById("feedback").textContent = "Erreur ! Le code soumis est incorrect. Essayez encore.";
    document.getElementById("feedback").style.color = "red";
  }
});

