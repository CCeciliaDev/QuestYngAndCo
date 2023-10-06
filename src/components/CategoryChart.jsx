import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  // Tooltip,
  // Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import '../styles/CategoryChart.css';

function CategoryChart({ scoresByCategory, categories }) {
  const data = categories.map((cat) => ({
    category: cat.category,
    '% Score Obtenu': (scoresByCategory[cat.category]?.totalPoints || 0) / cat.maxVal * 100,
    totalPoints: scoresByCategory[cat.category]?.totalPoints || 0,
  }));

  return (
    <ResponsiveContainer className="chart-container" width="100%" height={500}>
      <BarChart data={data} margin={{ top: 80, right: 30, left: 20, bottom: 100 }}>
        <XAxis
          dataKey="category"
          angle={-45}
          textAnchor="end"
          interval={0}
          height={80}
          tick={{ fontSize: 18 }}
        />
        <YAxis />
        {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Bar dataKey="% Score Obtenu" fill="rgba(75, 192, 192, 0.6)">
          <LabelList
            dataKey="% Score Obtenu"
            position="top"
            // angle={-45}
            formatter={(value) => `${Math.round(value)}%`}
            />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
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
