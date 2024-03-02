import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import { useLayoutEffect } from "react";
const SecondChart = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv2");
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalHorizontal
      })
    );
    let data = [
      {
        country: "France",
        sales: 100000
      },
      {
        country: "Spain",
        sales: 160000
      },
      {
        country: "United Kingdom",
        sales: 80000
      },
      {
        country: "India",
        sales: 22000
      },
      {
        country: "Americe",
        sales: 6000
      },
      {
        country: "Brazil",
        sales: 4000
      },
      {
        country: "Japan",
        sales: 8000
      },
      {
        country: "Canada",
        sales: 18000
      }

    ];
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "sales",
        categoryField: "country",
      })
    );

    
    series.data.setAll(data);
    return () => {
      root.dispose();
    };
  }, []);
  return (
    <div id="chartdiv2" style={{ width: "100%", height: "500px" }}></div>
  );
};
export default SecondChart;




