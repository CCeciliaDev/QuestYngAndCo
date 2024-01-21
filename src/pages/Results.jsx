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
    
    const marginLeft = 10;
    const maxWidth = 200;
    const pageHeight = 297;
    const indentTitre = 10;
    const indentOther = 20;
  
    // Fonctions utilitaires
    const addSectionTitle = (text, isSchemaActif) => {
      doc.setTextColor(0, 0, 0);
      doc.text(text, marginLeft + indentTitre, textYPosition);
      if (isSchemaActif) {
        doc.setTextColor(255, 0, 0);
        const textWidth = doc.getTextWidth(text);
        doc.text('Schéma actif', marginLeft + indentTitre + textWidth + 5, textYPosition);
      }
      textYPosition += 7;
    };
  
    const addText = (text) => {
      doc.setTextColor(100, 100, 100);
      if (textYPosition >= pageHeight - 20) {
        doc.addPage();
        textYPosition = 30;
      }
      doc.text(text, marginLeft + indentOther, textYPosition);
      textYPosition += 5;
    };
  
    // Titre et sous-titres
    doc.setFontSize(18).text('Questionnaire des schémas de Young', 20, 25);
    doc.setFontSize(14).text(`Patient : ${nom} ${prenom}`, 20, 35);
    doc.text(`Date du questionnaire : ${date}`, 20, 42);
  
    doc.setFontSize(12);
    let textYPosition = 60;
  
    Object.entries(scoresByCategory).forEach(([category, { totalPoints, answerCounts, schemaActif }]) => {
      if (textYPosition >= pageHeight - 20) {
        doc.addPage();
        textYPosition = 30;
      }
      addSectionTitle(category, schemaActif);
      Object.entries(answerCounts).forEach(([answerText, count]) => {
        addText(`Nombre de réponses ${answerText} : ${count}`);
      });
      addText(`Score : ${totalPoints}`);
      textYPosition += 5; // Petite marge après chaque catégorie
    });
  
    const chartElement = document.querySelector('.chart-container');
    html2canvas(chartElement).then(canvas => {
      if (textYPosition + (canvas.height * maxWidth) / canvas.width >= pageHeight - 20) {
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
    const doc = new jsPDF({ orientation: 'landscape' });
    const marginLeft = 20;
    const marginTop = 30;
    const pageWidth = 297;
    // const maxWidth = pageWidth - 2.5 * marginLeft;
    const maxWidth = pageWidth - 2 * marginLeft;
  
    doc.setFontSize(14).text(`${prenom} ${nom}`, marginLeft, 15);
    doc.text(`${date}`, marginLeft, 25);
  
    // const chartElement = document.querySelector('.chart-container');
    // html2canvas(chartElement).then(canvas => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const imgHeight = (canvas.height * maxWidth) / canvas.width;

    //   doc.addImage(imgData, 'PNG', marginLeft, marginTop, maxWidth, imgHeight);
    //   doc.save(`${nom}_${prenom}_diagramme.pdf`);

    const chartElement = document.querySelector('.chart-container');
    html2canvas(chartElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = maxWidth;  // Utiliser la largeur maximale pour l'image
      const imgHeight = (canvas.height * maxWidth) / canvas.width;  // Calculer la hauteur pour maintenir les proportions de l'image
      const xCentered = (pageWidth - imgWidth) / 2;  // Calculer la position x pour que l'image soit centrée
      
      doc.addImage(imgData, 'PNG', xCentered, marginTop, imgWidth, imgHeight);  // Ajouter l'image au PDF
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
