import React from 'react';
import {
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

type Props = {
  totalUsers: number;
  totalActiveUsers: number;
  totalInactiveUsers: number;
  totalNotes: number;
  totalCompletedNotes: number;
  totalPendingNotes: number;
  totalOverdueNotes: number;
  totalUndatedNotes: number;
};

export const Charts: React.FC<Props> = ({
  totalUsers,
  totalActiveUsers,
  totalInactiveUsers,
  totalNotes,
  totalCompletedNotes,
  totalPendingNotes,
  totalOverdueNotes,
  totalUndatedNotes,
}) => {
  const data = [
    {
      x: totalActiveUsers,
      y: totalNotes,
    },
    {
      x: totalInactiveUsers,
      y: totalNotes,
    },
    {
      x: totalUsers,
      y: totalNotes,
    },
    {
      x: totalUsers,
      y: totalCompletedNotes,
    },
    {
      x: totalUsers,
      y: totalPendingNotes,
    },
    {
      x: totalUsers,
      y: totalOverdueNotes,
    },
    {
      x: totalUsers,
      y: totalUndatedNotes,
    },
  ];

  return (
    <>
      <div style={{ marginTop: '15px' }}>
        <XYPlot height={500} width={500}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries data={data} color="red" />
          <LineSeries data={data} color="purple" />
          <LineSeries data={data} color="yellow" />
        </XYPlot>
      </div>
    </>
  );
};
