<?php

// Chemin vers le fichier JSON
$filePath = 'messages.json';

// Vérifie si des données ont été envoyées en POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifie si les champs pseudo et message existent dans les données POST
    if (isset($_POST['pseudo']) && isset($_POST['message'])) {
        // Protège les entrées utilisateur contre les injections de code
        $pseudo = strip_tags($_POST['pseudo']);
        $message = strip_tags($_POST['message']);
        
        // Charge le contenu actuel du fichier JSON s'il existe, sinon initialise un tableau vide
        $messages = file_exists($filePath) ? json_decode(file_get_contents($filePath), true) : array();
        
        // Ajoute le nouveau message au tableau
        $messages[] = array(
            'pseudo' => $pseudo,
            'message' => $message
        );
        
        // Convertit le tableau en format JSON
        $newJsonContent = json_encode($messages, JSON_PRETTY_PRINT);
        
        // Écrit le contenu JSON dans le fichier
        file_put_contents($filePath, $newJsonContent);
        
        // Répond avec un message de succès
        echo "Message ajouté avec succès !";
    } else {
        // Si les champs pseudo ou message n'ont pas été fournis, répond avec un message d'erreur
        echo "Veuillez fournir à la fois le pseudo et le message.";
    }
} else {
    // Si la requête n'est pas de type POST, répond avec un message d'erreur
    echo "Cette page ne peut être accédée que via une requête POST.";
}
?>
