import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Grid, Button, ButtonGroup } from "@mui/material";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Icon from "@mui/material/Icon";
import typography from "assets/theme/base/typography";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function PlatformSettings() {
    const { size } = typography;

    const machines = [
        { title: "Machine 1", percentage: "5%", description: "Description for Machine 1" },
        { title: "Machine 2", percentage: "10%", description: "Description for Machine 2" },
        { title: "Machine 3", percentage: "68%", description: "Description for Machine 3" },
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const [timeInterval, setTimeInterval] = useState("day");

    // State for managing notifications
    const [notification, setNotification] = useState({ open: false, message: "" });

    // Event handlers for pagination and interval change
    const handleClickNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleClickPrev = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleTimeIntervalChange = (interval) => {
        setTimeInterval(interval);
    };

    // Function to render pagination buttons
    const renderPaginationButtons = () => (
        <SoftBox mt={2} display="flex" justifyContent="center">
            <Button onClick={handleClickPrev} disabled={currentPage === 0}>
                Prev
            </Button>
            <Button onClick={handleClickNext} disabled={currentPage === machines.length - 1}>
                Next
            </Button>
        </SoftBox>
    );

    // Function to render interval buttons
    const renderTimeIntervalButtons = () => (
        <SoftBox mt={2} display="flex" justifyContent="center">
            <ButtonGroup>
                <Button
                    onClick={() => handleTimeIntervalChange("minute")}
                    variant={timeInterval === "minute" ? "contained" : "outlined"}
                >
                    Per Minute
                </Button>
                <Button
                    onClick={() => handleTimeIntervalChange("hour")}
                    variant={timeInterval === "hour" ? "contained" : "outlined"}
                >
                    Per Hour
                </Button>
                <Button
                    onClick={() => handleTimeIntervalChange("day")}
                    variant={timeInterval === "day" ? "contained" : "outlined"}
                >
                    Per Day
                </Button>
            </ButtonGroup>
        </SoftBox>
    );

    // Function to modify chart data based on selected interval
    const modifyChartData = (interval) => {
        switch (interval) {
            case "minute":
                return {
                    ...gradientLineChartData,
                    labels: ["0", "10", "20", "30", "40", "50", "60"]
                };
            case "hour":
                return {
                    ...gradientLineChartData,
                    labels: ["00", "03", "06", "09", "12", "15", "18", "21", "24"]
                };
            case "day":
                return gradientLineChartData;
            default:
                return gradientLineChartData;
        }
    };

    // Define the anomaly detection function
    const detectAnomalies = (data) => {
        const threshold = 500; // Set your threshold here, e.g., 500 liters
        data.forEach((value, index) => {
            if (value > threshold) {
                // Show a notification when an anomaly is detected
                setNotification({
                    open: true,
                    message: `Excess in air compressed usage detected at index ${index}: ${value} liters`,
                });
            }
        });
    };

    // State variable for chart data
    const [chartData, setChartData] = useState(modifyChartData(timeInterval));

    // Use effect to update chart data and detect anomalies when time interval changes
    useEffect(() => {
        const updatedChartData = modifyChartData(timeInterval);
        // Avoid updating state if there is no change
        if (JSON.stringify(updatedChartData) !== JSON.stringify(chartData)) {
            setChartData(updatedChartData);
        }

        // Detect anomalies in the data
        detectAnomalies(updatedChartData.datasets[0].data);
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

            {/* Snackbar for notifications */}
            <Snackbar
                open={notification.open}
                autoHideDuration={5000} 
                onClose={() => setNotification({ open: false, message: "" })}
            >
                <Alert severity="warning" onClose={() => setNotification({ open: false, message: "" })}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Card>
    );
}

export default PlatformSettings;
