const centerContent = {
    textAlign: "center" as "center",
    verticalAlign: "middle",
}

export const style = {
    center: centerContent,
    percents: {
        width: "100%",
        height: "100%",
        color: "white",
        textAlign: "center" as "center",
        verticalAlign: "middle"
    },
    bg_white: {
        backgroundColor: "white"
    },
    button: {
        ...centerContent,
        width: "10%",
    }
}

export default style;