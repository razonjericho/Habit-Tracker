const components = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                textTransform: "none",
                fontWeight: 600,
                padding: "10px 20px",
            },
        },
    },

    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            },
        },
    },

    MuiTextField: {
        defaultProps: {
            variant: "outlined",
            fullWidth: true,
        },
    },
};

export default components;