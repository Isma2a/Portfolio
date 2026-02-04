// Initialisation d'un tableau vide pour le panier
let cart = [];
// Compteur pour le nombre d'articles dans le panier
let cartItemCount = 0;

// Gestion des produits (ajout au panier)
document.querySelectorAll('.add-to-cart').forEach((btn) => {
    // Pour chaque bouton "Ajouter au panier", on ajoute un événement au clic
    btn.addEventListener('click', () => {
        // Trouve la carte du produit la plus proche du bouton cliqué
        const productCard = btn.closest('.item');
        // Récupère le nom du produit depuis la carte produit
        const productName = productCard.querySelector('p').textContent;

        // Initialise la taille sélectionnée sur null
        let selectedSize = null;
        // Si c'est un produit de type "t-shirts" ou "hoodies", on récupère la taille sélectionnée
        if (productCard.classList.contains('t-shirts') || productCard.classList.contains('hoodies')) {
            selectedSize = productCard.querySelector('.size-circle.selected');
        }
        
        // Récupère la couleur sélectionnée
        const selectedColor = productCard.querySelector('.color-circle.selected');

        // Si c'est un accessoire et aucune couleur n'est sélectionnée, on demande à l'utilisateur de sélectionner une couleur
        if (productCard.classList.contains('accessories') && !selectedColor) {
            alert('Veuillez sélectionner une couleur.');
            return;  // Stoppe l'ajout au panier
        }

        // Si un produit de type t-shirt ou hoodie n'a pas de taille sélectionnée, on affiche un message d'alerte
        if (!selectedSize && (productCard.classList.contains('t-shirts') || productCard.classList.contains('hoodies'))) {
            alert('Veuillez sélectionner une taille.');
            return;  // Stoppe l'ajout au panier
        }

        // Si une taille a été sélectionnée, on la récupère, sinon on met "null"
        const size = selectedSize ? selectedSize.dataset.size : null;
        // Si une couleur a été sélectionnée, on la récupère, sinon on met "null"
        const color = selectedColor ? selectedColor.dataset.color : null;

        // Crée un objet représentant le produit avec son nom, sa taille et sa couleur
        const product = { name: productName, size, color };
        // Ajoute le produit au panier
        cart.push(product);
        // Incrémente le compteur d'articles dans le panier
        cartItemCount++;
        // Met à jour l'affichage du panier
        updateCart();
    });
});

// Affichage du panier lorsqu'on clique sur le bouton "panier"
document.getElementById('cart-btn').addEventListener('click', () => {
    // Vérifie si la modale du panier existe et l'affiche
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.classList.remove('hidden');
    }
    updateCart();  // Met à jour le panier à chaque fois qu'on l'affiche
});

// Fermeture de la modale du panier
document.getElementById('close-cart').addEventListener('click', () => {
    // Cache la modale du panier
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.classList.add('hidden');
    }
});

// Gestion du changement de thème (mode sombre)
document.getElementById('theme-toggle').addEventListener('click', () => {
    // Bascule la classe "dark-mode" sur le body pour activer/désactiver le mode sombre
    document.body.classList.toggle('dark-mode');
    // Applique également la classe "dark-mode" sur l'en-tête et tous les éléments produits
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelectorAll('.item').forEach(item => item.classList.toggle('dark-mode'));
    document.querySelectorAll('button').forEach(button => button.classList.toggle('dark-mode'));
});

// Fonction pour mettre à jour l'affichage du panier
function updateCart() {
    // Récupère l'élément où seront affichés les articles du panier
    const cartItems = document.getElementById('cart-items');
    // Récupère l'élément où sera affiché le prix total
    const totalPriceElement = document.getElementById('total-price');
    // Vide la liste des articles dans le panier
    cartItems.innerHTML = '';

    // Pour chaque article dans le panier, crée un élément de liste
    cart.forEach((item) => {
        const li = document.createElement('li');
        // Affiche le nom, la taille et la couleur de l'article dans le panier
        li.textContent = `${item.name} - Taille: ${item.size ? item.size : 'N/A'} - Couleur: ${item.color}`;
        // Ajoute cet élément de liste à la liste d'articles du panier
        cartItems.appendChild(li);
    });

    // Met à jour le total dans le panier (ici un prix fictif de 25€ par article)
    totalPriceElement.textContent = `Total : ${(cartItemCount * 25).toFixed(2)}€`;
    // Met à jour le texte du bouton "panier" pour afficher le nombre d'articles
    document.getElementById('cart-btn').textContent = `Panier (${cartItemCount})`;
}

// Fonction de filtrage des catégories de produits
function filterCategory(category) {
    // Récupère tous les éléments produits
    const allItems = document.querySelectorAll('.item');
    // Parcourt chaque élément produit pour ajuster son affichage en fonction de la catégorie sélectionnée
    allItems.forEach(item => {
        if (category === 'all') {
            // Si la catégorie est "all", on affiche tous les produits
            item.style.display = 'block';
        } else if (item.classList.contains(category)) {
            // Si l'élément appartient à la catégorie sélectionnée, on l'affiche
            item.style.display = 'block';
        } else {
            // Sinon, on cache l'élément
            item.style.display = 'none';
        }
    });
}

// Fonction pour changer l'image en fonction de la couleur choisie
document.querySelectorAll('.color-circle').forEach(button => {
    button.addEventListener('click', function () {
        // Récupère l'image associée au bouton cliqué
        const newImage = this.getAttribute('data-image');
        // Récupère l'élément parent (le produit) et trouve l'image à mettre à jour
        const productItem = this.closest('.item');
        const productImage = productItem.querySelector('.product-image');
        
        // Change la source de l'image
        productImage.src = newImage;
    });
});


// Fonction pour changer l'image en fonction de la couleur choisie
document.querySelectorAll('.color-circle').forEach(button => {
    button.addEventListener('click', function () {
        // Récupère l'image associée au bouton cliqué
        const newImage = this.getAttribute('data-image');
        // Récupère l'élément parent (le produit) et trouve l'image à mettre à jour
        const productItem = this.closest('.item');
        const productImage = productItem.querySelector('.product-image');
        
        // Change la source de l'image
        productImage.src = newImage;
    });
});
