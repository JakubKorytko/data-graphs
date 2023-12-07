const center = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const style = {
    col: {
        ...center, 
        paddingTop: "10px", 
        width: "350px", 
        height: "350px",
        marginBottom: "80px"
    },

    div: {
        ...center, 
        margin: "30px 0" 
    },

    row: {
        justifyContent: "center"
    },

    background: {
        position: "fixed" as "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        backgroundColor: "#f5f4f4",
        opacity: 1,
        backgroundImage:  "radial-gradient(#000000 0.35000000000000003px, transparent 0.35000000000000003px), radial-gradient(#000000 0.35000000000000003px, #f5f4f4 0.35000000000000003px)",
        backgroundSize: "14px 14px",
        backgroundPosition: "0 0,7px 7px"
    }
}

export default style;