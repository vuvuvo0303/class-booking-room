import React from "react";
import { ResponsivePie } from "@nivo/pie";

const data = [
  {
    id: "K15",
    label: "K15",
    value: 335,
    color: "hsl(348, 100%, 61%)",
  },
  {
    id: "K16",
    label: "K16",
    value: 540,
    color: "hsl(207, 90%, 54%)",
  },
  {
    id: "K17",
    label: "K17",
    value: 180,
    color: "hsl(48, 100%, 67%)",
  },
  {
    id: "K18",
    label: "K18",

    value: 230,
    color: "hsl(30, 100%, 50%)",
  },
  {
    id: "K19",
    label: "K19",
    value: 123,
    color: "hsl(150, 50%, 45%)",
  },
];

const PieChart = () => (
  <div style={{ height: "370px" }}>
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
      ]}
      legends={
        [
        //   {
        //       anchor: 'bottom',
        //       direction: 'row',
        //       justify: false,
        //       translateX: 0,
        //       translateY: 56,
        //       itemsSpacing: 0,
        //       itemWidth: 100,
        //       itemHeight: 18,
        //       itemTextColor: '#999',
        //       itemDirection: 'left-to-right',
        //       itemOpacity: 1,
        //       symbolSize: 18,
        //       symbolShape: 'circle',
        //       effects: [
        //           {
        //               on: 'hover',
        //               style: {
        //                   itemTextColor: '#000'
        //               }
        //           }
        //       ]
        //   }
        ]
      }
    />
  </div>
);

export default PieChart;
