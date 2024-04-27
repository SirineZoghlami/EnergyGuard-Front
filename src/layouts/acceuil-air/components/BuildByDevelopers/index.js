import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Grid, Button, ButtonGroup } from "@mui/material";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Icon from "@mui/material/Icon";
import typography from "assets/theme/base/typography";
import gradientLineChartData from "layouts/acceuil-air/data/gradientLineChartData";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Pression() {
    const { size } = typography;

    const machines = [
        { title: "pressure 1", percentage: "", description: "Description for pression 1" },
        { title: "pressure 2", percentage: "", description: "Description for pression 2" },
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const [timeInterval, setTimeInterval] = useState("day");

    const [notification, setNotification] = useState({ open: false, message: "" });

    const handleClickNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleClickPrev = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleTimeIntervalChange = (interval) => {
        setTimeInterval(interval);
    };

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

    const detectAnomalies = (data) => {
        const threshold = 500; 
        data.forEach((value, index) => {
            if (value > threshold) {
                setNotification({
                    open: true,
                    message: `Excess in compressed air pressure detected at index ${index}: ${value} bars`,
                });
            }
        });
    };

    const [chartData, setChartData] = useState(modifyChartData(timeInterval));

    useEffect(() => {
        const updatedChartData = modifyChartData(timeInterval);
        if (JSON.stringify(updatedChartData) !== JSON.stringify(chartData)) {
            setChartData(updatedChartData);
        }

        detectAnomalies(updatedChartData.datasets[0].data);
    }, [timeInterval]);

    return (
        <Card>
            <SoftBox pt={2} px={2}>
                <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Pressure idexes
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
                                        <SoftTypography variant="button" color="text" fontWeight="medium">
                                            <SoftTypography variant="button" color="text" fontWeight="regular">
                                                 Energy[kwh]
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

export default Pression;
