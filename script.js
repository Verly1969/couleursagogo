window.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("popup");
    const hex = document.getElementById("hex");   
    const hsl = document.getElementById("hsl");
    const rgb = document.getElementById("rgb");   
    const nuanceHex = document.getElementById("nuanceHex");
    const nuanceRgb = document.getElementById("nuanceRgb");
    const nuanceHsl = document.getElementById("nuanceHsl");    
    const btnAlea = document.getElementById("btnAlea");
    const colorAlea = document.getElementById("colorAlea");
    const colorHue = document.getElementById("colorHue");
    const boxColors = document.getElementById("boxColors");
    const select = document.getElementById("select");
    const pMessage = document.getElementById("pMessage");
    const codeMessage = document.getElementById("codeMessage");
    const nuanceMessage = document.getElementById("nuanceMessage");
    const h1 = document.getElementById("h1");
    const liAlea = document.getElementById("liAlea");
    const liTeinte = document.getElementById("liTeinte");
    const alea = document.getElementById("alea");
    const teinte = document.getElementById("teinte");

    // messages
    const rightClickCopy = "Click droit sur le code pour copier dans le presse-papier ...";
    const infosMessage = "Cliquez pour plus d'infos ...";
    const copyMessage = "La donnée est copiée dans le presse-papiers ...";

    // tableau de couleurs
    const colorTab = 
        [
            "red", 
            "pink", 
            "purple", 
            "navy", 
            "blue", 
            "aqua", 
            "green", 
            "lime", 
            "yellow", 
            "orange"
        ];
        
    // adresse de l'API
    const url = `https://x-colors.yurace.pro/api/`;

    //#region Fonction
    /**
     * Fonction qui affiche de façon aléatoire une couleur avec ses codes.
     */
    async function randomColor(){
        const randomUrl = url + `random`;
        const response = await fetch(randomUrl);
        const color = await response.json();
        codeMessage.textContent = rightClickCopy;
        displayDetails("hex", hex, color);
        displayDetails("hsl", hsl, color);
        displayDetails("rgb", rgb, color);
        codeMessage.textContent = rightClickCopy;
        displayDetails("hex", hex, color);
        displayDetails("hsl", hsl, color);
        displayDetails("rgb", rgb, color);
        colorAlea.style.backgroundColor = color.hex;
    }

    /**
     * Fonction qui affiche 10 nuances de couleur
     * 
     * @param {String} nuance 
     */
    async function nuanceAlea(nuance){
        nuanceHex.textContent = "";
        nuanceHsl.textContent = "";
        nuanceRgb.textContent = "";
        nuanceHex.textContent = "";
        nuanceHsl.textContent = "";
        nuanceRgb.textContent = "";
        const nuanceUrl = `${url}random/${nuance}`;
        pMessage.innerText = " ⇊ click sur la nuance pour afficher les infos ⇊";
        pMessage.innerText = " ⇊ click sur la nuance pour afficher les infos ⇊";
        for (let i = 0; i < 10; i++)
        {
            const response = await fetch(nuanceUrl);
            const color = await response.json();
            const div = document.createElement("div");
            div.classList.add("colortest");
            div.style.backgroundColor = color.hex;
            div.style.border = "solid 1px black";
            displayMessage(div, infosMessage);
            div.addEventListener("click", () => {
                nuanceMessage.textContent = rightClickCopy;
                displayDetails("hex", nuanceHex, color);
                displayDetails("rgb", nuanceRgb, color);
                displayDetails("hsl", nuanceHsl, color);
            })
            displayMessage(div, infosMessage);
            div.addEventListener("click", () => {
                nuanceMessage.textContent = rightClickCopy;
                displayDetails("hex", nuanceHex, color);
                displayDetails("rgb", nuanceRgb, color);
                displayDetails("hsl", nuanceHsl, color);
            })
            boxColors.append(div);
        }
    }

    /**
     * Fonction qui affiche un message selon le besoin
     * @param {HTMLElement} element 
     * @param {String} message 
     */
    function displayMessage(element, message){
        element.title = message;
    }

    /**
     * Fonction qui affiche les données de l'objet et les transmets
     * dans un élément HTML en fonction d'une clé.
     * 
     * @param {String} code 
     * @param {HTMLElement} element 
     * @param {Object} reponse 
     */
    function displayDetails(code, element, reponse){
        switch (code) {
            case "hex":
                element.textContent = `Code ${code}: ${reponse.hex}`;
                displayMessage(element, rightClickCopy);
                element.addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    saveCode(reponse.hex);
                });
                break;
            case "rgb":
                element.textContent = `Code ${code}: ${reponse.rgb}`;
                displayMessage(element, rightClickCopy);
                element.addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    saveCode(reponse.rgb);
                })
                break;
            case "hsl":
                element.textContent = `Code ${code}: ${reponse.hsl}`;
                displayMessage(element, rightClickCopy);
                element.addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    saveCode(reponse.hsl);
                })
                break;
        }
    }

    /**
     * Fonction qui copie dans le presse-papier
     * 
     * @param {Object} reponse 
     */
    function saveCode(reponse){
        navigator.clipboard.writeText(reponse);
        displayPopUp(reponse);
    }

    /**
     * Fonction de remplissage du select --> couleurs par teinte
     */
    function loadSelect(){
        for (let i = 0; i < colorTab.length; i++) {
            const option = document.createElement("option");
            option.style.backgroundColor = colorTab[i];
            option.setAttribute("value", colorTab[i]);
            select.append(option);
        }
    }

    /**
     * Affiche une popup avec la donnée copiée
     * 
     * @param {Object} donnee 
     */
    function displayPopUp(donnee){
        deleteDiv(popup);
        const message = document.createElement('p');
        message.textContent = `${copyMessage}`;
        const valeur = document.createElement("p");
        valeur.textContent = `Donnée: ${donnee}`;

        popup.append(message);
        popup.append(valeur);
        popup.style.display = "block";

        // fermeture de la popup après 2 secondes
        setTimeout(() => {
            popup.style.display = "none";
        }, 2000);
    }

    /**
     * Fonction qui supprime les enfants d'un parent direct
     * 
     * @param {HTMLElement} element 
     */
    function deleteDiv(element){
        if (element.childElementCount !== 0){
            for (let i = 0; element.childElementCount; i++){
                element.lastElementChild.remove();
            }
        }
    }

    //#endregion

    //#region Event
    btnAlea.addEventListener("click", randomColor);

    select.addEventListener("change", () => {
        deleteDiv(boxColors);
        nuanceMessage.textContent = "";
        deleteDiv(boxColors);
        nuanceMessage.textContent = "";
        const element = select.selectedIndex;
        if (element !== 0){
            colorHue.style.backgroundColor = select[element].value;
            nuanceAlea(select.value);
        }
        select.selectedIndex = 0;
    })

    liAlea.addEventListener("click", () => {
        alea.style.display = "block";
        teinte.style.display = "none";
        h1.classList.add("position");
    })

    liTeinte.addEventListener("click", () => {
        alea.style.display = "none";
        teinte.style.display = "block";
        h1.classList.add("position");
    })

    nuanceHex.addEventListener("mouseenter", () => {
        nuanceHex.style.backgroundColor = "gray";
        nuanceHex.style.color = "white";
    })

    nuanceRgb.addEventListener("mouseenter", () => {
        nuanceRgb.style.backgroundColor = "gray";
        nuanceRgb.style.color = "white";
    })

    nuanceHsl.addEventListener("mouseenter", () => {
        nuanceHsl.style.backgroundColor = "gray";
        nuanceHsl.style.color = "white";
    })

    nuanceHex.addEventListener("mouseout", () => {
        nuanceHex.style.backgroundColor = "antiquewhite";
        nuanceHex.style.color = "black";
    })
    
    nuanceRgb.addEventListener("mouseout", () => {
        nuanceRgb.style.backgroundColor = "antiquewhite";
        nuanceRgb.style.color = "black";
    })
    
    nuanceHsl.addEventListener("mouseout", () => {
        nuanceHsl.style.backgroundColor = "antiquewhite";
        nuanceHsl.style.color = "black";
    })
    
    hex.addEventListener("mouseenter", () => {
        hex.style.backgroundColor = "gray";
        hex.style.color = "white";
    })

    rgb.addEventListener("mouseenter", () => {
        rgb.style.backgroundColor = "gray";
        rgb.style.color = "white";
    })

    hsl.addEventListener("mouseenter", () => {
        hsl.style.backgroundColor = "gray";
        hsl.style.color = "white";
    })

    hex.addEventListener("mouseout", () => {
        hex.style.backgroundColor = "antiquewhite";
        hex.style.color = "black";
    })
    
    rgb.addEventListener("mouseout", () => {
        rgb.style.backgroundColor = "antiquewhite";
        rgb.style.color = "black";
    })
    
    hsl.addEventListener("mouseout", () => {
        hsl.style.backgroundColor = "antiquewhite";
        hsl.style.color = "black";
    })    


    //#endregion

    loadSelect();
})