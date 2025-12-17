import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Stack,
    Divider,
    CircularProgress
} from "@mui/material";
import useAPI from "../Hooks/useAPI/useAPI";
import {disambiguateCard} from "../Utils/DisambiguateCardType";
import {ICommonCardData} from "../Data/ICardData";
import {IAbility} from "../Data/IAbilities";
import JsonDiff from "../Components/Ace/JsonDiff";
import {FaExchangeAlt, FaLongArrowAltRight} from "react-icons/fa";
import AceEditor from "react-ace";

// ---- Types ----

export interface ICardRequest {
    _id: string;
    username: string;
    request_type: "update" | "create" | "delete" | string;
    json_to_update: string; // JSON string
    update_uri: string;
    update_id?: string
    status: "pending" | "approved" | "rejected" | string;
}

export interface ICardRequestPlusOriginal {
    original: IAbility | ICommonCardData | null;
    request: ICardRequest;
}

// ---- Component ----

const CardRequestReviewPage: React.FC = () => {
    const { CardRequestAPI, CardAPI } = useAPI();

    const [requests, setRequests] = useState<Array<ICardRequestPlusOriginal>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const compendiumProps = {
        isExpanded: true,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showAdd: false,
        showPrerequisites: true,
        isDraft: true
    };

    const compendiumPropsOld = {
        isExpanded: true,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showAdd: false,
        showPrerequisites: true,
        isDraft: false
    };

    useEffect(() => {
        const load = async () => {
            try {
                const res = await CardRequestAPI.GetAllRequests();
                console.log("RES")
                console.log(res)
                const newRequests = await Promise.all(
                    res.map(async (req: ICardRequest) => {
                        if (req.request_type === "update" || req.request_type === "update_ability") {
                            return {
                                request: req,
                                original: await CardAPI.GetCardById(req.update_id!)
                            };
                        }

                        return {
                            request: req,
                            original: null
                        };
                    })
                );
                console.log(newRequests)
                setRequests(newRequests);
            } catch (err) {
                console.error(err);
                setError("Failed to load requests");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [CardRequestAPI]);

    const handleApprove = async (req: ICardRequest) => {
        try {
            // await CardRequestAPI.ApproveRequest(req._id);
            setRequests((prev) =>
                prev.map((r) =>
                    r.request._id === req._id
                        ? { ...r, request: { ...r.request, status: "approved" } }
                        : r
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleReject = async (req: ICardRequest) => {
        try {
            // await CardRequestAPI.RejectRequest(req._id);
            setRequests((prev) =>
                prev.map((r) =>
                    r.request._id === req._id
                        ? { ...r, request: { ...r.request, status: "rejected" } }
                        : r
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    const renderJson = (json: string) => {
        try {
            return JSON.stringify(JSON.parse(json), null, 2);
        } catch {
            return json;
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box mt={4} textAlign="center">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }



    return (
        <Box p={3} display="grid" gap={2}>
            <Typography variant="h4">Card Change Requests</Typography>

            {requests.map((req) => (
                <Card key={req.request._id} variant="outlined">
                    <CardContent>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="h6">
                                {req.request.request_type.toUpperCase()} REQUEST
                            </Typography>
                            <Chip
                                label={req.request.status}
                                color={
                                    req.request.status === "pending"
                                        ? "warning"
                                        : req.request.status === "approved"
                                            ? "success"
                                            : "error"
                                }
                                size="small"
                            />
                        </Stack>

                        <Typography variant="body2" color="text.secondary" mt={1}>
                            Submitted by: {req.request.username}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Target URI: {req.request.update_uri}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2">Proposed JSON</Typography>
                        <Box>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-around"
                                    }}
                                >
                                    {req.original ? disambiguateCard([req.original], compendiumPropsOld) : <></>}
                                    {
                                        req.original ?
                                        <Box
                                            sx={{
                                                marginTop: "12px"
                                            }}
                                        >
                                            <FaLongArrowAltRight fontSize={72} />
                                        </Box>
                                            : <></>
                                    }


                                    {disambiguateCard([JSON.parse(req.request.json_to_update) as ICommonCardData], compendiumProps)}
                                </Box>
                                <Box>
                                    {
                                        req.original ?
                                            <>
                                                <Typography variant="subtitle2" gutterBottom>
                                                    Changes
                                                </Typography>

                                                <JsonDiff
                                                    original={req.original as Object}
                                                    modified={JSON.parse(req.request.json_to_update)}
                                                />

                                                <Divider sx={{ my: 2 }} />
                                            </>
                                            :
                                            <AceEditor
                                                mode="json"
                                                theme="monokai"
                                                value={JSON.stringify(JSON.parse(req.request.json_to_update), null, 2)}
                                                width="100%"
                                                height="400px"
                                                fontSize={14}
                                                readOnly={true}
                                                setOptions={{
                                                    tabSize: 2,
                                                    useWorker: false,
                                                    autoCloseBrackets: true,
                                                    showLineNumbers: true,
                                                    wrap: true
                                                }}
                                                editorProps={{ $blockScrolling: true }}
                                            />
                                    }

                                </Box>
                            </Box>

                            {/*{renderJson(req.json_to_update)}*/}

                        </Box>
                    </CardContent>

                    {req.request.status === "pending" && (
                        <CardActions>
                            <Button
                                color="success"
                                variant="contained"
                                onClick={() => handleApprove(req.request)}
                            >
                                Approve
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                onClick={() => handleReject(req.request)}
                            >
                                Reject
                            </Button>
                        </CardActions>
                    )}
                </Card>
            ))}
        </Box>
    );
};

export default CardRequestReviewPage;
