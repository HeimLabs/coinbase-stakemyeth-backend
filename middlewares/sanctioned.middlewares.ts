import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import { sanctioned } from "../services";

export const blockSanctioned = async (request: Request | any, response: Response, next: NextFunction) => {
    try {
        const address = request.body.address || request.query.address;

        if (!address)
            return next();

        const sanctionedAddresses = await sanctioned.loadSanctionedAddresses();
        if (sanctionedAddresses.includes(address)) {
            console.log(`[middleware/sanctioned] Request blocked for sanctioned address: ${address}`);
            return next(new AppError(403, "error", "This address is sanctioned and cannot be processed"));
        }
        
        return next();
    } catch (err) {
        console.error("[middleware/sanctioned] Sanction check failed");
        console.error(err);
        return next(new AppError(500, "error", "Internal server error during sanction check"));
    }
};
