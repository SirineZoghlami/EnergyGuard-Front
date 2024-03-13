import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Grid } from "@mui/material";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import typography from "assets/theme/base/typography";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";

function PlatformSettings() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
 

  return (
    <Card>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          CofiCab compressed air usage
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1.5} pb={2} px={2} lineHeight={1.25}>
        <Grid container spacing={2}> {/* Add a container around the Grid items */}
          <Grid item xs={12} lg={12}> {/* Set xs and lg to 12 to occupy full width */}
            <ReportsBarChart
              title="Machine 1"
              description={
                <>
                  (<strong>+23%</strong>) than last week
                </>
              }
              chart={chart}
            />
          </Grid>
          <Grid item xs={12} lg={12}> {/* Set xs and lg to 12 to occupy full width */}
            <ReportsBarChart
              title="Machine 2"
              description={
                <>
                  (<strong>+2.5%</strong>) than last week
                </>
              }
              chart={chart}
            />
          </Grid>
          <Grid item xs={12} lg={12}> {/* Set xs and lg to 12 to occupy full width */}
            <ReportsBarChart
              title="Machine 3"
              description={
                <>
                  (<strong>-2.1%</strong>) than last week
                </>
              }
              chart={chart}
            />
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default PlatformSettings;
