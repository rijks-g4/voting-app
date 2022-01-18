import React from 'react';
import { useQuery } from 'react-query';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function Summary(): JSX.Element {
  const { data } = useQuery('summary', getSummary);

  function getSummary(): Promise<any> {
    return fetch(`${process.env.REACT_APP_BACK_END_URL}/summary`)
      .then(async (res) => {
        const jsonRes = await res.json();

        const chartData = {
          'labels': new Array(),
          'datasets': [{
            label: 'Votes',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: new Array(),
          }],
        };

        Object.keys(jsonRes).forEach((key) => {
          chartData['labels'].push(key);
          chartData['datasets'][0]['data'].push(parseInt(jsonRes[key]));
        });

        return chartData;
      });
  }

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Votes for best model',
      },
    },
  };

  return (
    <>
      {data && (
        <Bar options={options} data={data} />
      )}
    </>
  );
}

Summary.displayName = 'Summary';
export default Summary;
