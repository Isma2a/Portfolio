<?php session_start(); ?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat-Médical</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="main-container">

    <!-- Barre gauche avec liens -->
    <div class="sidebar">
      <a href="https://www.ameli.fr" target="_blank">
        <img src="images/pharmacie.png" alt="Pharmacie" class="side-img">
      </a>
      <a href="https://www.doctolib.fr" target="_blank">
        <img src="images/docteur.png" alt="Docteur" class="side-img">
      </a>
    </div>

    <!-- Conteneur du chat -->
    <div class="chat-container">
      <div class="chat-header">
        <img src="images/hopital .png" alt="Hopital" class="logo">
        <h1>Chat-Médical</h1>
      </div>

      <div class="messages">
        <?php
        if (file_exists("messages.txt")) {
          foreach (file("messages.txt", FILE_IGNORE_NEW_LINES) as $line) {
            $isUser = strpos($line, 'Toi :') !== false;
            $class = $isUser ? 'user' : 'bot';
            echo "<p class='$class'>" . htmlspecialchars($line) . "</p>";
          }
        }
        ?>
      </div>

      <form action="chat.php" method="post" class="form">
        <input type="text" name="message" placeholder="Écris ton message..." required autofocus>
        <button type="submit">Envoyer</button>
      </form>
    </div>

    <!-- Barre droite -->
    <div class="sidebar">
      <a href="https://www.service-public.fr" target="_blank">
        <img src="images/urgence.webp" alt="Urgence" class="side-img">
      </a>
      <a href="https://www.who.int/fr" target="_blank">
        <img src="images/poumon.webp" alt="Médicament" class="side-img">
      </a>
    </div>
  </div>
</body>
</html>
