import { Box, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const FoundItemVisual = ({ foundItems }: any) => {
    console.log(foundItems)

    // Initialize foundItemStatusCounts with zero counts for "NOTFOUND" and "FOUND"
    const foundItemStatusCounts = foundItems?.reduce((acc: any, item: any) => {
        acc[item.foundItemStatus] = (acc[item.foundItemStatus] || 0) + 1;
        return acc;
    }, { 'NOTFOUND': 0, 'FOUND': 0 });

    // Create data array for PieChart, including entries for all statuses
    const data = [
        { label: 'NOTFOUND', value: foundItemStatusCounts['NOTFOUND'] || 0, color: '#EF6F6C' }, // Custom color for 'NOTFOUND'
        { label: 'FOUND', value: foundItemStatusCounts['FOUND'] || 0, color: '#56E39F' }, // Custom color for 'FOUND'
    ];

    console.log(data)

    const chartSize = {
        width: 300, 
        height: 300, 
    };

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: 2,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1200,
                    marginBottom: 2,
                    boxShadow: 3, 
                    borderRadius: 2, 
                    backgroundColor: "background.paper", 
                    padding: 2, 
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Found Items
                </Typography>
                <Box
                    display={"flex"}
                    sx={{
                        flexDirection: { xs: "column", md: "row" }, 
                        alignItems: "center", 
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            maxHeight: 250, 
                            maxWidth: 300, 
                        }}
                    >
                        <PieChart
                            slotProps={{ legend: { hidden: true } }}
                            series={[
                                {
                                    arcLabel: (item) => `${item.label} (${item.value})`,
                                    arcLabelMinAngle: 45,
                                    data,
                                    cx: 150,
                                    cy: 150,
                                },
                            ]}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem', 
                                },
                            }}
                            {...chartSize}
                        />
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        gap={2}
                        sx={{
                            flex: 1,
                            padding: 2, 
                        }}
                    >
                        <Typography fontWeight={600}>Not Found: {data[0].value}</Typography>
                        <Typography fontWeight={600}>Found: {data[1].value}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default FoundItemVisual;
