import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Grid, Button, ButtonGroup } from "@mui/material";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Icon from "@mui/material/Icon";
import typography from "assets/theme/base/typography";

// Static chart data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

function PlatformSettings() {
  const { size } = typography;

  const machines = [
    { title: "Machine 1", percentage: "5%", description: "Description for Machine 1" },
    { title: "Machine 2", percentage: "10%", description: "Description for Machine 2" },
    { title: "Machine 3", percentage: "68%", description: "Description for Machine 3" }
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [timeInterval, setTimeInterval] = useState("day"); // Default to per day

  const handleClickNext = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleClickPrev = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleTimeIntervalChange = (interval) => {
    setTimeInterval(interval);
  };

  const renderPaginationButtons = () => {
    return (
      <SoftBox mt={2} display="flex" justifyContent="center">
        <Button onClick={handleClickPrev} disabled={currentPage === 0}>
          Prev
        </Button>
        <Button onClick={handleClickNext} disabled={currentPage === machines.length - 1}>
          Next
        </Button>
      </SoftBox>
    );
  };

  const renderTimeIntervalButtons = () => {
    return (
      <SoftBox mt={2} display="flex" justifyContent="center">
        <ButtonGroup>
          <Button onClick={() => handleTimeIntervalChange("minute")} variant={timeInterval === "minute" ? "contained" : "outlined"}>Per Minute</Button>
          <Button onClick={() => handleTimeIntervalChange("hour")} variant={timeInterval === "hour" ? "contained" : "outlined"}>Per Hour</Button>
          <Button onClick={() => handleTimeIntervalChange("day")} variant={timeInterval === "day" ? "contained" : "outlined"}>Per Day</Button>
        </ButtonGroup>
      </SoftBox>
    );
  };

  // Modify chart data based on the selected time interval
  const modifyChartData = (interval) => {
    switch (interval) {
      case "minute":
        // Example labels for per minute
        return {
          ...gradientLineChartData,
          labels: ["0", "10", "20", "30", "40", "50", "60"]
        };
      case "hour":
        // Example labels for per hour
        return {
          ...gradientLineChartData,
          labels: ["00", "03", "06", "09", "12", "15", "18", "21", "24"]
        };
      case "day":
      default:
        // Default labels for per day
        return gradientLineChartData;
    }
  };

  const [chartData, setChartData] = useState(modifyChartData(timeInterval));

  useEffect(() => {
    setChartData(modifyChartData(timeInterval));
  }, [timeInterval]);

  return (
    <Card>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          CofiCab compressed air usage
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1.5} pb={2} px={2} lineHeight={1.25}>
        <Grid container spacing={2}>
          {machines.map((machine, index) => (
            <Grid item xs={12} lg={12} key={index} style={{ display: index === currentPage ? "block" : "none" }}>
              <GradientLineChart
                title={machine.title}
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      {machine.percentage} more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2022
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={chartData}
              />
            </Grid>
          ))}
        </Grid>
        {renderPaginationButtons()}
        {renderTimeIntervalButtons()}
      </SoftBox>
    </Card>
  );
}

export default PlatformSettings;
