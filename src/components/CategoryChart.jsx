import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import '../styles/CategoryChart.css';

function CategoryChart({ scoresByCategory, categories }) {
  const [fontSize, setFontSize] = useState(16);
  const [chartDimensions, setChartDimensions] = useState({ width: 600, height: 500 });
  const [margin, setMargin] = useState({ top: 80, right: 30, left: 20, bottom: 100 });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;

      // Mettre à jour la taille de la police
      if (width < 320) {
        setFontSize(6);

      } else if (width >= 320 && width < 480) {
        setFontSize(6);

      } else if (width >= 480 && width < 580) { // ok 
        setFontSize(7);

      } else if (width >= 580 && width < 670) {
        setFontSize(9);

      } else if (width >= 670 && width < 768) {
        setFontSize(10);

      } else if (width >= 768 && width < 900) {
        setFontSize(12);

      } else if (width >= 900 && width < 1024) {
        setFontSize(14);

      } else if (width >= 1024 && width < 1200) {
        setFontSize(14);

      } else {
        setFontSize(16);
      }
      
      // Mettre à jour les dimensions du graphique
      if (width < 320) {
        setChartDimensions({ width: 300, height: 300 });
        setMargin({ top: 60, right: 5, left: 5, bottom: 80 });

      } else if (width >= 320 && width < 480) {
        setChartDimensions({ width: 280, height: 280 });
        setMargin({ top: 40, right: 5, left: 0, bottom: 90 });

      } else if (width >= 480 && width < 580) { // OK
        setChartDimensions({ width: 350, height: 320 });
        setMargin({ top: 50, right: 10, left: 0, bottom: 90 });

      } else if (width >= 580 && width < 670) { // OK
        setChartDimensions({ width: 430, height: 350 });
        setMargin({ top: 50, right: 10, left: 0, bottom: 90 });

      } else if (width >= 670 && width < 768) { // OK
        setChartDimensions({ width: 500, height: 400 });
        setMargin({ top: 60, right: 15, left: 10, bottom: 90 });

      } else if (width >= 768 && width < 900) { // OK
        setChartDimensions({ width: 550, height: 400 });
        setMargin({ top: 60, right: 15, left: 10, bottom: 90 });

      } else if (width >= 900 && width < 1024) { // OK
        setChartDimensions({ width: 650, height: 400 });
        setMargin({ top: 60, right: 15, left: 10, bottom: 90 });

      } else if (width >= 1024 && width < 1200) { // OK
        setChartDimensions({ width: 700, height: 400 });
        setMargin({ top: 60, right: 15, left: 10, bottom: 90 });

      } else { // OK
        setChartDimensions({ width: 900, height: 500 });
        setMargin({ top: 80, right: 30, left: 20, bottom: 100 });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();  // Ajustement des dimensions et de la taille de la police lors du montage

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const data = categories.map((cat) => ({
    category: cat.category,
    '% Score Obtenu': (scoresByCategory[cat.category]?.totalPoints || 0) / cat.maxVal * 100,
    totalPoints: scoresByCategory[cat.category]?.totalPoints || 0,
  }));

  return (
    // <div style={{ width: '100%', overflowX: 'auto' }}>
    <div>
      <ResponsiveContainer className="chart-container" width={chartDimensions.width} height={chartDimensions.height}>
        <BarChart data={data} margin={margin}>
          <XAxis
            dataKey="category"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={80}
            tick={{ fontSize }}
          />
          <YAxis tick={{ fontSize }} />
          <Bar dataKey="% Score Obtenu" fill="rgba(75, 192, 192, 0.6)">
            <LabelList
              dataKey="% Score Obtenu"
              position="top"
              formatter={(value) => `${Math.round(value)}%`}
              style={{ fontSize }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

CategoryChart.propTypes = {
  scoresByCategory: PropTypes.objectOf(
    PropTypes.shape({
      totalPoints: PropTypes.number.isRequired,
      answerCounts: PropTypes.objectOf(PropTypes.number).isRequired,
      schemaActif: PropTypes.bool.isRequired,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      maxVal: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CategoryChart;
