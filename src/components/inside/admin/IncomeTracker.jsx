// import React, { useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const IncomeTracker = () => {
//   const [filter, setFilter] = useState('week');

//   const getChartData = () => {
//     switch (filter) {
//       case 'month':
//         return {
//           labels: ['1', '2', '3', '4'],
//           data: [5000, 7500, 6200, 8100],
//         };
//       case 'year':
//         return {
//           labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//           data: [21000, 19500, 23200, 18000, 26000, 24000, 21500, 23000, 22500, 25000, 27000, 29000],
//         };
//       default:
//         return {
//           labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
//           data: [1200, 1600, 2567, 1900, 2300, 1700, 1500],
//         };
//     }
//   };

//   const chartData = {
//     labels: getChartData().labels,
//     datasets: [
//       {
//         label: 'Income',
//         data: getChartData().data,
//         backgroundColor: getChartData().data.map((v, i) =>
//           v === Math.max(...getChartData().data) ? '#1744a5' : '#B9BBBE'
//         ),
//         borderRadius: 12,
//         borderSkipped: false,
//         barThickness: 3,
//         hoverBackgroundColor: '#68A2F0', // Change color on hover
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         enabled: true,
//         displayColors: false,
//         backgroundColor: '#0f172a',
//         titleColor: '#fff',
//         bodyColor: '#fff',
//         callbacks: {
//           label: (ctx) => {
//             return `$${ctx.raw}`; // Display value as $ currency
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         display: false,
//       },
//       y: {
//         display: false,
//       },
//     },
//     hover: {
//       onHover: (event, chartElement) => {
//         // Change bar color on hover
//         if (chartElement.length) {
//           const index = chartElement[0].index;
//           chartData.datasets[0].backgroundColor = chartData.datasets[0].data.map((v, i) =>
//             i === index ? '#10b981' : '#B9BBBE'
//           );
//         }
//       },
//     },
//   };

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.card}>
//         <div style={styles.header}>
//           <div>
//             <h2 style={styles.title}>📊 Income Tracker</h2>
//             <p style={styles.subText}>Track changes in income over time and access detailed data on each project and payments received</p>
//           </div>
//           <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.select}>
//             <option value="week">Week</option>
//             <option value="month">Month</option>
//             <option value="year">Year</option>
//           </select>
//         </div>

//         <div style={{ position: 'relative', paddingTop: '30px' }}>
//           <Bar data={chartData} options={chartOptions} />

//           {/* Labels under each bar */}
//           <div style={styles.labelContainer}>
//             {getChartData().labels.map((label, i) => (
//               <div key={i} style={styles.labelItem}>
//                 <div
//                   style={{
//                     ...styles.circle,
//                     backgroundColor:
//                       chartData.datasets[0].data[i] === Math.max(...chartData.datasets[0].data)
//                         ? '#1744a5'
//                         : '#e2e8f0',
//                     color:
//                       chartData.datasets[0].data[i] === Math.max(...chartData.datasets[0].data)
//                         ? '#fff'
//                         : '#334155',
//                   }}
//                 >
//                   {label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div style={styles.footer}>
//           <div style={styles.percentage}>+20%</div>
//           <p style={styles.footerText}>This week's income is higher than last week's</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   wrapper: {
//     padding: '40px 0',
//     minHeight: '100vh',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: '20px',
//     padding: '30px',
//     boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
//     width: '700px',
//     margin: '0 auto',
//     fontFamily: 'Inter, sans-serif',
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     gap: '30px',
//     position: 'relative',
//   },
//   title: {
//     fontWeight: '600',
//     fontSize: '24px',
//     marginBottom: '6px',
//     color: '#0f172a',
//   },
//   subText: {
//     fontSize: '14px',
//     color: '#64748b',
//     maxWidth: '400px',
//   },
//   select: {
//     fontSize: '14px',
//     padding: '8px 12px',
//     borderRadius: '10px',
//     backgroundColor: '#f1f5f9',
//     border: '1px solid #e2e8f0',
//     outline: 'none',
//     cursor: 'pointer',
//     position: 'absolute',
//     top: '-5px',
//     right: '0',
//   },
//   footer: {
//     marginTop: '30px',
//   },
//   percentage: {
//     fontSize: '24px',
//     fontWeight: '600',
//     color: '#10b981',
//   },
//   footerText: {
//     marginTop: '6px',
//     color: '#64748b',
//   },
//   labelContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginTop: '10px',
//     padding: '0 10px',
//   },
//   labelItem: {
//     flex: 1,
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   circle: {
//     width: '30px',
//     height: '30px',
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '14px',
//     fontWeight: '500',
//     transition: 'all 0.3s ease',
//   },
// };

// export default IncomeTracker;

// //   topDots: {
// //     position: 'absolute',
// //     top: '-12px', // Adjust top to 5px above each bar
// //     left: 0,
// //     right: 0,
// //     height: '0',
// //     pointerEvents: 'none',
// //   },
// //   dot: {
// //     position: 'absolute',
// //     width: '12px',
// //     height: '12px',
// //     borderRadius: '50%',
// //     transform: 'translateX(-50%)', // Center the dot horizontally over the bar
// //   },

