import { Box, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const ClaimVisual = ({ claims }: any) => {
    console.log(claims)

    // Initialize claimStatusCounts with zero counts for "PENDING", "APPROVED", and "REJECTED"
    const claimStatusCounts = claims?.reduce((acc: any, claim: any) => {
        acc[claim.status] = (acc[claim.status] || 0) + 1;
        return acc;
    }, { 'PENDING': 0, 'APPROVED': 0, 'REJECTED': 0 });

    // Create data array for PieChart, including entries for all statuses with specified colors
    const data = [
        { label: 'PENDING', value: claimStatusCounts['PENDING'] || 0, color: '#465775' }, // Custom color for 'PENDING'
        { label: 'APPROVED', value: claimStatusCounts['APPROVED'] || 0, color: '#56E39F' }, // Custom color for 'APPROVED'
        { label: 'REJECTED', value: claimStatusCounts['REJECTED'] || 0, color: '#EF6F6C' }, // Custom color for 'REJECTED'
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
                    Claims
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
                        <Typography fontWeight={600}>Pending : {data[0].value}</Typography>
                        <Typography fontWeight={600}>Approved : {data[1].value}</Typography>
                        <Typography fontWeight={600}>Rejected : {data[2].value}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ClaimVisual;
