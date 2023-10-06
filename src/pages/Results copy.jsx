import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import CategoryChart from '../components/CategoryChart';
import categories from '../assets/category';
import '../styles/Results.css';

function Results() {
  const location = useLocation();
  const { nom, prenom, date, scoresByCategory } = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Initialisation de jsPDF et variables
    const exportResultsToPDF = () => {
    const doc = new jsPDF();
  
    // Définition des marges et de la taille maximale de l'image
    const marginLeft = 10; // La marge gauche où le texte et l'image commencent
    // const marginTop = 20;
    const maxWidth = 175; // La largeur maximale que l'img du graphique peut avoir tout en maintenant ses proportions
    const pageHeight = 297; // Hauteur totale d'une page A4 en points
  
    // Taille de police et couleur pour le titre
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); // Noir
  
    // Ajout de titre
    // doc.text(text, x, y) : ajoute le texte spécifié à la position (x, y) dans le document.
    doc.text('Questionnaire des schémas de Young', 20, 25);

    // Taille de police pour les sous-titres
    doc.setFontSize(14);

    // Ajout des sous-titres
    doc.text(`Patient : ${nom} ${prenom}`, 20, 35);
    doc.text(`Date du questionnaire : ${date}`, 20, 42);

    // Taille de police et couleur pour les resultats
    doc.setFontSize(12);
    // doc.setTextColor(64, 64, 64); // Gris foncé
  
    // Ajoutez les scores et d'autres informations texte
    // textYPosition: La position actuelle du texte sur l'axe Y. Initialisé à 70 pour commencer en dessous des titres.
    let textYPosition = 60;
    const indentTitre = 10; // Décalage vers la droite en points
    const indentOther = 20; // Décalage vers la droite en points

    // Object.entries(scoresByCategory).forEach(...) : Boucle sur chaque catégorie et ses scores pour les ajouter au PDF.
    // si textYPosition est proche du bas de la page, une nouvelle page est ajoutée et textYPosition est réinitialisé.
    Object.entries(scoresByCategory).forEach(([category, { totalPoints, answerCounts, schemaActif }]) => {
      if (textYPosition >= pageHeight - 20) { // vérifie si la position du texte dépasse la page
        doc.addPage(); // Ajoutez une nouvelle page
        textYPosition = 30; // Réinitialisez  la position du texte sur l'axe Y à 30 points depuis le haut de la page, chaque fois qu'une nouvelle page est ajoutée. Cela sert à laisser une marge en haut de chaque page et à positionner le début du contenu en dessous de cette marge.
      }
      

    // Formatage des titres en noir
    doc.setTextColor(0, 0, 0); // Noir pour les titres
    doc.text(category, marginLeft + indentTitre, textYPosition);

    if (schemaActif) {
      // Formatage de "Schéma actif" en rouge
      doc.setTextColor(255, 0, 0); // Rouge pour "Schéma actif"
      const textWidth = doc.getTextWidth(category);
      const schemaActifXPosition = marginLeft + indentTitre + textWidth + 5;
      doc.text('Schéma actif', schemaActifXPosition, textYPosition);
      // Revenir au format gris pour les lignes suivantes
      doc.setTextColor(100, 100, 100); // Gris pour les textes suivants
    }

    textYPosition += 7;

    // Formatage des nombres et scores en gris
    doc.setTextColor(100, 100, 100); // Gris pour les nombres et scores

    Object.entries(answerCounts).forEach(([answerText, count]) => {
      if (textYPosition >= pageHeight - 20) {
        doc.addPage();
        textYPosition = 30;
      }
      doc.text(`Nombre de réponses ${answerText} : ${count}`, marginLeft + indentOther, textYPosition);
      textYPosition += 5;
    });

    if (textYPosition >= pageHeight - 20) {
      doc.addPage();
      textYPosition = 30;
    }
    doc.text(`Score : ${totalPoints}`, marginLeft + indentOther, textYPosition);
    textYPosition += 10;
  });
  
    // Capturez le graphique en tant qu'image
    // document.querySelector('.chart-container'): Sélectionne l'élément du graphique dans le DOM
    // html2canvas(chartElement): Convertit l'élément du graphique en canvas.
    // doc.addImage(...): Ajoute l'image du canvas au document PDF.
    const chartElement = document.querySelector('.chart-container');
    html2canvas(chartElement).then(canvas => {
      if (textYPosition >= pageHeight - 20 - (canvas.height * maxWidth) / canvas.width) {
        doc.addPage();
        textYPosition = 30;
      }
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = (canvas.height * maxWidth) / canvas.width;
      doc.addImage(imgData, 'PNG', marginLeft, textYPosition, maxWidth, imgHeight);
      doc.save(`${nom}_${prenom}_resultats_complets.pdf`);
    });
};
  

const exportChartToPDF = () => {
  const doc = new jsPDF({
    orientation: 'landscape', // Pour A4 paysage
  });
  
  const marginLeft = 20;
  const marginTop = 40; // Augmentez cette valeur pour ajouter plus d'espace au-dessus du graphique
  const pageWidth = 297; // Largeur totale d'une page A4 paysage en points
  const maxWidth = pageWidth - 2.3 * marginLeft;
  
  // Ajouter le nom, le prénom et la date en haut du document
  doc.setFontSize(14);
  doc.text(`${prenom} ${nom}`, marginLeft, 15);
  doc.text(`${date}`, marginLeft, 25);

  const chartElement = document.querySelector('.chart-container');
  html2canvas(chartElement).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const imgHeight = (canvas.height * maxWidth) / canvas.width;
    doc.addImage(imgData, 'PNG', marginLeft, marginTop, maxWidth, imgHeight); // Les marges et la position de l'image peuvent être ajustées si nécessaire
    
    doc.save(`${nom}_${prenom}_diagramme.pdf`);
  });
};

  return (
    <div className='divResults'>
      <div className='score-section'>
        <h2 className='title'>Résultats Questionnaire des schémas de Young</h2>
        <h3 className='sstitle'>Patient : {nom} {prenom}</h3>
        <h4 className='sstitle'>Date du questionnaire : {date}</h4>
        <div className="scores-container">
          {Object.entries(scoresByCategory).map(([category, { totalPoints, answerCounts, schemaActif }]) => (
            <div key={category} className="score-column">
              <h3>{category}</h3>
              {Object.entries(answerCounts).map(([answerText, count]) => (
                <p key={answerText}>Nombre de réponses {answerText} : {count}</p>
              ))}
              <p>Score : {totalPoints}</p>
              {schemaActif && <p className='activ'>Schéma actif</p>}
            </div>
          ))}
        </div>
      </div>
      <div className='chart-container'>
        <CategoryChart scoresByCategory={scoresByCategory} categories={categories} />
      </div>
      <div>
        <button onClick={exportResultsToPDF}  className="submit-button">Exporter les résultats complets</button>
        <button onClick={exportChartToPDF} className="submit-button">Exporter le diagramme</button> {/* Nouveau bouton */}

      </div>
    </div>
  );
}

export default Results;
