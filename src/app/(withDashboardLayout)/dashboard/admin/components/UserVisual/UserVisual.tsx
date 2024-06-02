import { Box, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const UserVisual = ({ users }: { users: any[] }) => {
    console.log(users);

    // Initialize userStatusCounts with zero counts for "ACTIVE" and "INACTIVE"
    const userStatusCounts = users?.reduce((acc: any, user: any) => {
        acc[user.status] = (acc[user.status] || 0) + 1;
        return acc;
    }, { 'ACTIVE': 0, 'INACTIVE': 0 });

    // Create data array for PieChart, including entries for all statuses
    const data = [
        { label: 'ACTIVE', value: userStatusCounts['ACTIVE'] || 0, color: '#56E39F' }, // Custom color for 'ACTIVE'
        { label: 'INACTIVE', value: userStatusCounts['INACTIVE'] || 0, color: '#EF6F6C' }, // Custom color for 'INACTIVE'
    ];

    console.log(data);

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
                    Users
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
                        <Typography fontWeight={600}>Active Users: {data[0].value}</Typography>
                        <Typography fontWeight={600}>Inactive Users: {data[1].value}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default UserVisual;
