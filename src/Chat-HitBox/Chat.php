<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['message'])) {
    $userMessage = trim($_POST['message']);
    $file = "messages.txt";
    $timestamp = "[" . date("H:i:s") . "]";

    file_put_contents($file, "$timestamp Toi : $userMessage\n", FILE_APPEND);

    $lower = strtolower($userMessage);
    $botReply = "";

    // === BIBLIOTHÈQUE PRINCIPALE ===
    $responses = [
        // — Conversations de base —
        'salut' => "Salut 👋 Comment te sens-tu aujourd’hui ?",
        'bonjour' => "Bonjour ☀️ ! Heureux de te revoir !",
        'bonsoir' => "Bonsoir 🌙 Tu veux parler un peu avant de dormir ?",
        'ça va' => "Je vais bien 😄 Et toi, comment tu te sens ?",
        'merci' => "Avec plaisir 🙌 Je suis là pour t’aider !",
        'au revoir' => "À bientôt 👋 Prends soin de ta santé !",
        'comment tu t’appelles' => "Je suis Chat-Hitbox, ton assistant médical virtuel 🩺",
        'qui es-tu' => "Je suis ton assistant médical virtuel 💬, là pour t’aider à te sentir mieux !",

        // — Santé & Médecine —
        'mal tête' => "Tu devrais te reposer et boire un grand verre d’eau 💧. Si la douleur continue, prends un paracétamol 💊.",
        'migraine' => "Essaie de t’allonger dans une pièce sombre 🕯️ et de limiter les écrans. Hydrate-toi bien !",
        'mal dos' => "Fais quelques étirements doux 🧘‍♂️ et évite de rester assis trop longtemps.",
        'mal gorge' => "Bois chaud (miel-citron 🍯) et évite les aliments irritants. Si ça gratte trop, consulte un médecin 👨‍⚕️.",
        'toux' => "Bois beaucoup d’eau et garde-toi au chaud 🧣. Si ça dure plus de 3 jours, consulte !",
        'rhume' => "Repos, hydratation et mouchoirs 🧻 ! Un bon sommeil aidera ton système immunitaire 😴.",
        'blessure' => "Nettoie bien la plaie 🩹, désinfecte-la et laisse respirer. Si c’est profond, consulte rapidement 🏥.",
        'brûlure' => "Passe la zone sous l’eau froide 10 minutes 🚿, ne mets pas de glace. Si c’est grave, file à l’hôpital !",
        'fatigue' => "Tu sembles fatigué 😴. Essaie de dormir tôt et évite les écrans avant le coucher.",
        'fièvre' => "Bois beaucoup, repose-toi 🛌, et prends du paracétamol si besoin. Si elle dépasse 39°C, consulte.",
        'covid' => "Symptômes du Covid ? 😷 Teste-toi et repose-toi. Si tu as du mal à respirer, consulte d’urgence !",

        // — Émotions —
        'triste' => "Je comprends 😔. Parfois parler aide, tu veux en discuter ?",
        'stressé' => "Respire profondément 🫁. Inspire 4s, retiens 4s, expire 4s. Ça aide à calmer le stress.",
        'heureux' => "C’est génial 😄 ! Continue comme ça, la bonne humeur est contagieuse ✨",
        'peur' => "Respire lentement et souviens-toi que tu n’es pas seul 💪.",
        'colère' => "Laisse retomber un peu la pression 😤. Parle-moi, si tu veux évacuer.",
        'déprimé' => "Courage ❤️. Tu peux en parler à quelqu’un de confiance ou à un professionnel si ça dure.",

        // — Logique & vie quotidienne —
        'quel jour' => "On est aujourd’hui le " . date("d/m/Y") . " 📅",
        'quelle heure' => "Il est actuellement " . date("H:i") . " ⏰",
        'je suis fatigué' => "Tu devrais te reposer 😴. Une sieste de 20 min peut aider énormément.",
        'j\'ai faim' => "Mange quelque chose de léger 🍎 et bois un peu d’eau avant.",
        'j\'ai soif' => "Bois de l’eau 💧, ton corps en a besoin !",
        'je suis malade' => "Tu veux me décrire tes symptômes ? Je te dirai quoi faire 💊.",
        'je tousse' => "Bois chaud, repose-toi, et surveille si ça empire 🫁.",
        'j\'ai mal a la george' => "prend du miel, repose-toi, tu peux aussi prendre du lait 💪.",
        'j\'ai fais caca partout' => "laissse moi tout manger miam💪.",
        
        

        // — Divers — 
        'bourse' => "La bourse ? 📈 Un monde de risques et d’opportunités !",
        'musique' => "La musique, c’est une excellente thérapie 🎵 !",
        'sport' => "Le sport aide à se sentir mieux mentalement et physiquement 🏃‍♂️.",
        'dormir' => "Essaie d’aller dormir avant minuit 😴. Ton corps te remerciera demain.",
        'eau' => "L’eau, c’est la vie 💧 ! Bois régulièrement, même sans soif.",
    ];

    // Recherche de mot-clé dans le message utilisateur
    foreach ($responses as $keyword => $reply) {
        if (strpos($lower, $keyword) !== false) {
            $botReply = $reply;
            break;
        }
    }

    // Si rien trouvé : réponse logique
    if (empty($botReply)) {
        if (preg_match('/\?$/', $userMessage)) {
            $botReply = "Hmm 🤔 bonne question ! Je vais chercher une réponse plus précise.";
        } elseif (strlen($userMessage) < 5) {
            $botReply = "Peux-tu m’en dire un peu plus ? 😊";
        } else {
            $botReply = "Je n’ai pas bien compris 😅. Peux-tu reformuler autrement ?";
        }
    }

    file_put_contents($file, "$timestamp Chat-Hitbox : $botReply\n", FILE_APPEND);
}

header("Location: index.php");
exit;
?>
