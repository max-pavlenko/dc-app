import {PaletteMode} from "@mui/material";
import {grey, deepOrange} from "@mui/material/colors";
import {ThemeOptions} from "@mui/material/styles/createTheme";

export default (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        // contrastThreshold: 3,
        // tonalOffset: 0.2,
        ...(mode === 'light'
            ? {
                primary: {
                    main: '#4755e0',
                },
                secondary: {
                    main: '#5C76B7'
                },
                error: {
                    main: '#F40B27'
                },

            }
            : {
                background: {
                    default: '#222',
                    paper: '#333',
                },
                primary: {
                    main: '#4755e0',
                },
                secondary: {
                    main: '#03dcff'
                },
                success: {
                    main: '#fff',
                    dark: '#57d249',
                },
                error: {
                    main: '#ff5b5b'
                },
                text: {
                    primary: '#fff',
                    secondary: grey[500],
                },
            }),
    },
});
