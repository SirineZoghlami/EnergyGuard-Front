import React, { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Grid, Button } from "@mui/material";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import Icon from "@mui/material/Icon";
import typography from "assets/theme/base/typography";

function PlatformSettings() {
  const { size } = typography;

  const machines = [
    { title: "Machine 1", percentage: "5%", description: "Description for Machine 1" },
    { title: "Machine 2", percentage: "10%", description: "Description for Machine 2" },
    { title: "Machine 3", percentage: "68%", description: "Description for Machine 3" }
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const handleClickNext = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleClickPrev = () => {
    setCurrentPage(prevPage => prevPage - 1);
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
                chart={gradientLineChartData}
              />
            </Grid>
          ))}
        </Grid>
        {renderPaginationButtons()}
      </SoftBox>
    </Card>
  );
}

export default PlatformSettings;
