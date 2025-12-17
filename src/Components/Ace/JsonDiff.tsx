
import {diff as DiffEditor} from 'react-ace'
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import {Box, GlobalStyles} from "@mui/material";


interface JsonDiffProps {
    original: object;
    modified: object;
}

const JsonDiff: React.FC<JsonDiffProps> = ({ original, modified }) => {
    return (
        <Box
            sx={{
                height: "400px",
                overflow: "auto"
            }}
        >
            <GlobalStyles
                styles={{
                    '.codeMarker': {
                        background: '#ff0000 !important',
                        position: 'absolute',
                        zIndex: 20,
                    },
                }}
            />
            <DiffEditor
                value={[JSON.stringify(original, null, 2), JSON.stringify(modified, null, 2)]}
                mode="json"
                enableBasicAutocompletion
                enableLiveAutocompletion
                highlightActiveLine
                showGutter
                showPrintMargin
                wrapEnabled
                readOnly
                width="100%"
                height="400px"
                theme="monokai"
                setOptions={{
                    useWorker: false,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    showConnectors: true,
                    readOnly: true,
                    tabSize: 2,
                }}
            />
        </Box>
    )
};

export default JsonDiff;
