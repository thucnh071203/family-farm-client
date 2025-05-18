import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import * as signalR from "@microsoft/signalr";

export function MapChart() {
  const chartRef = useRef(null);
  const echartsInstance = useRef(null);

  // Chuẩn hóa tên tỉnh (copy từ bạn)
  const normalizeProvinceName = (name) => {
    const mapping = {
      "TP. Hồ Chí Minh": "Hồ Chí Minh",
      "TP Hồ Chí Minh": "Hồ Chí Minh",
      "Thừa Thiên Huế": "Thừa Thiên - Huế",
      "Thừa Thiên–Huế": "Thừa Thiên - Huế",
      "Đăk Lăk": "Đắk Lắk",
      "Đắk Nông": "Đắc Nông",
      "Đăk Nông": "Đắc Nông",
      "Bà Rịa Vũng Tàu": "Bà Rịa - Vũng Tàu",
      "Bà Rịa–Vũng Tàu": "Bà Rịa - Vũng Tàu",
      "TP. Hà Nội": "Hà Nội",
      "TP Hà Nội": "Hà Nội",
      "TP. Cần Thơ": "Cần Thơ",
      "TP Cần Thơ": "Cần Thơ",
      "TP. Đà Nẵng": "Đà Nẵng",
      "TP Đà Nẵng": "Đà Nẵng",
    };
    return mapping[name] || name;
  };

  useEffect(() => {
    if (!chartRef.current) return;

    // Khởi tạo biểu đồ ECharts
    echartsInstance.current = echarts.init(chartRef.current);

    let connection = null;

    const loadMapAndConnect = async () => {
      try {
        //bản đồ geojson
        const geoRes = await fetch(
          "https://raw.githubusercontent.com/uyenvuminh/mapChartUyen/refs/heads/main/mapVN"
        );
        const vietnamGeoJSON = await geoRes.json();
        echarts.registerMap("VN", vietnamGeoJSON);

        //render biểu đồ từ dữ liệu
        const renderChart = (rawData) => {
          const data = rawData.map((item) => ({
            name: normalizeProvinceName(item.province),
            value: item.userCount,
          }));

          const option = {
            title: {
              text: "User in province",
              left: "center",
              textStyle: { color: "#8b9dff" },
            },
            tooltip: {
              trigger: "item",
              formatter: "{b}: {c} users",
            },
            visualMap: {
              min: 0,
              max: Math.max(...data.map((d) => d.value)) || 100,
              left: "left",
              top: "bottom",
              text: ["More", "Less"],
              calculable: true,
              inRange: {
                color: ["#e7c768", "#dfb127", "#b38702"],
              },
            },
            series: [
              {
                name: "Người dùng",
                type: "map",
                map: "VN",
                roam: true,
                label: {
                  show: true,
                  fontSize: 8,
                  color: "#333",
                },
                emphasis: {
                  label: {
                    show: true,
                    fontWeight: "thin",
                    color: "#000",
                  },
                },
                data: data,
              },
            ],
          };

          echartsInstance.current.setOption(option);
        };

        //dữ liệu lần đầu
        const response = await fetch(
          "https://localhost:7280/api/statistic/users-by-province"
        );
        const result = await response.json();
        renderChart(result);

        //SignalR
        connection = new signalR.HubConnectionBuilder()
          .withUrl("https://localhost:7280/topEngagedPostHub")
          .withAutomaticReconnect()
          .build();

        connection.on("UsersByProvince", (newData) => {
          console.log("Realtime update:", newData);
          renderChart(newData);
        });

        await connection.start();
        console.log("Connected to SignalR hub");
      } catch (error) {
        console.error("Lỗi khi load bản đồ hoặc kết nối SignalR:", error);
      }
    };

    loadMapAndConnect();

    // Cleanup khi unmount
    return () => {
      if (echartsInstance.current) {
        echartsInstance.current.dispose();
      }
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  return (
    <div className="p-10">
      <div
        ref={chartRef}
        style={{ width: "50%", height: "700px" }}
        className="border rounded shadow"
      ></div>
    </div>
  );
}

export default MapChart;
