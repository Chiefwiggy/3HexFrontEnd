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

// ---- Types ----

export interface ICardRequest {
    _id: string;
    username: string;
    request_type: "update" | "create" | "delete" | string;
    json_to_update: string; // JSON string
    update_uri: string;
    status: "pending" | "approved" | "rejected" | string;
}

// ---- Component ----

const CardRequestReviewPage: React.FC = () => {
    const { CardRequestAPI, CardAPI } = useAPI();

    const [requests, setRequests] = useState<ICardRequest[]>([]);
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
                setRequests(res);
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
                    r._id === req._id ? { ...r, status: "approved" } : r
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
                    r._id === req._id ? { ...r, status: "rejected" } : r
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

    const GetOldJSON = async(req: ICardRequest) => {
        const new_data = JSON.parse(req.json_to_update);
        const old_data = await CardAPI.GetCardById(new_data._id) as ICommonCardData;
        return disambiguateCard([old_data], compendiumPropsOld)
    }


    return (
        <Box p={3} display="grid" gap={2}>
            <Typography variant="h4">Card Change Requests</Typography>

            {requests.map((req) => (
                <Card key={req._id} variant="outlined">
                    <CardContent>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="h6">
                                {req.request_type.toUpperCase()} REQUEST
                            </Typography>
                            <Chip
                                label={req.status}
                                color={
                                    req.status === "pending"
                                        ? "warning"
                                        : req.status === "approved"
                                            ? "success"
                                            : "error"
                                }
                                size="small"
                            />
                        </Stack>

                        <Typography variant="body2" color="text.secondary" mt={1}>
                            Submitted by: {req.username}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Target URI: {req.update_uri}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2">Proposed JSON</Typography>
                        <Box>
                            <Box>
                                {/*{*/}
                                {/*    req.request_type == "update" ?*/}
                                {/*        GetOldJSON(req)*/}
                                {/*        :*/}
                                {/*        <></>*/}
                                {/*}*/}
                            </Box>

                            {/*{renderJson(req.json_to_update)}*/}
                            {disambiguateCard([JSON.parse(req.json_to_update) as ICommonCardData], compendiumProps)}
                        </Box>
                    </CardContent>

                    {req.status === "pending" && (
                        <CardActions>
                            <Button
                                color="success"
                                variant="contained"
                                onClick={() => handleApprove(req)}
                            >
                                Approve
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                onClick={() => handleReject(req)}
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
