import { useAuthStore } from "@/modules/auth/auth-store";
import { Avatar, Box, ListItem, ListItemAvatar, Typography } from "@mui/material";
import React from "react";

export default function UserCard() {
    const user = useAuthStore((state) => state.user);

    return (
        <Box width={280} height={56} borderRadius="8px" bgcolor="#F9FAFB" sx={{ border: "1px solid", borderColor: "Grey.200" }}>
            <ListItem sx={{ px: "12px", pt: "7px" }}>
                <ListItemAvatar sx={{ minWidth: 52 }}>
                    <Avatar></Avatar>
                </ListItemAvatar>
                <Box>
                    <Typography variant="h6" color="Grey.700">
                        {user?.full_name}
                    </Typography>
                    <Typography variant="h6" fontWeight={500} color="Grey.600" textAlign="start">
                        {user?.role}
                    </Typography>
                </Box>
            </ListItem>
        </Box>
    );
}
